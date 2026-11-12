import Anthropic from "@anthropic-ai/sdk";
import { TRISCHELLO_SYSTEM } from "@/lib/trischello";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Msg = { role: "user" | "assistant"; content: string };

const MAX_TURNS = 24;
const MAX_CHARS = 1500;

/** Risposta di riserva quando la chiave API non è configurata: il widget resta utile. */
function offline(q: string) {
  const t = q.toLowerCase();
  if (/prezz|cost|quanto/.test(t)) return "Il costo dipende da cosa ti serve: ogni attività è diversa. Il modo più veloce è una call gratuita di 30 minuti, senza impegno: trovi il pulsante \"Prenota una call gratuita\" in alto o nella pagina Contatti.";
  if (/social|instagram|tiktok|reel|video/.test(t)) return "Sui social pensiamo a quasi tutto noi: strategia, script, riprese, editing e pubblicazione, con 12 contenuti al mese come base consigliata. Trovi i dettagli nella pagina Social media.";
  if (/sito|web|landing/.test(t)) return "Realizziamo siti e landing page su misura, pensati per portarti contatti. Dai un'occhiata alla pagina Siti web per vedere il percorso e i lavori.";
  if (/irelia|ai|intelligenza|assistente|automaz/.test(t)) return "Con Irelia, l'assistente AI, ogni contatto delle campagne riceve subito un messaggio su WhatsApp e ti dice quando richiamarlo. Lo trovi spiegato nella Home.";
  if (/contatt|whatsapp|chiam|email|mail/.test(t)) return "Puoi prenotare una call gratuita dal pulsante in alto, scriverci dal pulsante WhatsApp nella pagina Contatti o mandarci una mail: ti rispondiamo noi.";
  return "Bella domanda! In questo momento posso darti solo risposte brevi: per qualunque dubbio prenota una call gratuita di 30 minuti, senza impegno, dal pulsante \"Prenota una call gratuita\".";
}

export async function POST(req: Request) {
  let messages: Msg[];
  try {
    const body = (await req.json()) as { messages?: unknown };
    messages = (Array.isArray(body.messages) ? body.messages : [])
      .filter((m): m is Msg => !!m && typeof m === "object" && ((m as Msg).role === "user" || (m as Msg).role === "assistant") && typeof (m as Msg).content === "string")
      .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_CHARS) }))
      .slice(-MAX_TURNS);
  } catch {
    return new Response("Richiesta non valida", { status: 400 });
  }
  while (messages[0]?.role === "assistant") messages.shift();
  const last = messages.at(-1);
  if (!last || last.role !== "user" || !last.content.trim()) return new Response("Messaggio vuoto", { status: 400 });

  if (!process.env.ANTHROPIC_API_KEY) {
    return new Response(offline(last.content), { headers: { "content-type": "text/plain; charset=utf-8" } });
  }

  const client = new Anthropic();
  const enc = new TextEncoder();
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        const s = client.beta.messages.stream({
          model: "claude-opus-5-5",
          max_tokens: 2000,
          betas: ["server-side-fallback-2026-07-01"],
          fallbacks: "default",
          output_config: { effort: "low" },
          cache_control: { type: "ephemeral" },
          system: TRISCHELLO_SYSTEM,
          messages,
        });
        for await (const ev of s) {
          if (ev.type === "content_block_delta" && ev.delta.type === "text_delta") controller.enqueue(enc.encode(ev.delta.text));
        }
        const final = await s.finalMessage();
        if (final.stop_reason === "refusal") controller.enqueue(enc.encode("Su questo non posso aiutarti, mi dispiace. Posso darti una mano con altro?"));
      } catch (err) {
        console.error("trischello", err instanceof Anthropic.APIError ? `${err.status} ${err.message}` : err);
        controller.enqueue(enc.encode(offline(last.content)));
      } finally {
        controller.close();
      }
    },
  });
  return new Response(stream, { headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "no-store" } });
}
