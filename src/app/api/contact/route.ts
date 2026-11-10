import { NextResponse } from "next/server";
import { validateContact, type ContactValues } from "@/lib/validation";

export const runtime = "nodejs";

/**
 * POST /api/contact — riceve il form contatti.
 *
 * Stato: validazione + anti-spam (honeypot) pronti. L'invio reale NON è ancora collegato.
 *
 * TODO: collegare i servizi (vedi .env.example):
 *   1) Supabase — salvare il lead:
 *        const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
 *        await supabase.from("leads").insert({ name, email, service, message });
 *   2) Resend — notifica al team + conferma al cliente:
 *        const resend = new Resend(process.env.RESEND_API_KEY);
 *        await resend.emails.send({ from, to: process.env.CONTACT_TO_EMAIL!, subject, text });
 *   3) Rate limiting per IP (es. Upstash Ratelimit / Vercel KV) per evitare abusi.
 */
export async function POST(req: Request) {
  let body: Partial<ContactValues>;
  try {
    body = (await req.json()) as Partial<ContactValues>;
  } catch {
    return NextResponse.json({ ok: false, code: "invalid_json" }, { status: 400 });
  }

  // Honeypot: risposta "ok" senza fare nulla, così il bot non impara.
  if (body.website) return NextResponse.json({ ok: true });

  const errors = validateContact(body);
  if (Object.keys(errors).length) {
    return NextResponse.json({ ok: false, code: "validation", errors }, { status: 422 });
  }

  const configured = Boolean(process.env.RESEND_API_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY);
  if (!configured) {
    // In produzione NON fingiamo un invio riuscito se nulla è collegato.
    if (process.env.NODE_ENV === "production") {
      return NextResponse.json({ ok: false, code: "not_configured" }, { status: 503 });
    }
    console.info("[contact] (dev) messaggio ricevuto, nessun servizio collegato:", {
      name: body.name,
      service: body.service,
    });
    return NextResponse.json({ ok: true, delivered: false });
  }

  // TODO: invio reale (Supabase / Resend) — vedi commento in testa al file.
  return NextResponse.json({ ok: true, delivered: true });
}
