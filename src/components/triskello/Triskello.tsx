"use client";

import Link from "next/link";
import { Fragment, useEffect, useRef, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { TRISKELLO_HELLO } from "@/lib/triskello-hello";
import { TriskelloBot } from "./Bot";

type Msg = { role: "user" | "assistant"; content: string };

const SUGGEST = ["Cosa fate?", "Voglio più clienti", "Come funziona Irelia?", "Come ti contatto?"];
const PAGES = /(\*\*[^*]+\*\*|\/(?:metodo-triskell|social|siti-web|risultati|chi-siamo|contatti)\b)/g;

/** Testo semplice → React: **grassetto**, righe "- " come elenco, link alle pagine del sito. */
function Rich({ text }: { text: string }) {
  const inline = (s: string, k: string) =>
    s.split(PAGES).map((p, i) => {
      if (p.startsWith("**") && p.endsWith("**")) return <strong key={k + i} className="font-semibold">{p.slice(2, -2)}</strong>;
      if (/^\/[a-z-]+$/.test(p)) return <Link key={k + i} href={p} className="font-semibold text-gold-200 underline underline-offset-2">{p}</Link>;
      return <Fragment key={k + i}>{p}</Fragment>;
    });
  const out: React.ReactNode[] = [];
  let list: string[] = [];
  const flush = (k: number) => {
    if (list.length) out.push(<ul key={"u" + k} className="my-1 list-disc space-y-0.5 pl-4">{list.map((l, j) => <li key={j}>{inline(l, `l${k}-${j}-`)}</li>)}</ul>);
    list = [];
  };
  const lines = text.split("\n");
  lines.forEach((l, k) => {
    const m = /^\s*[-•*]\s+(.*)/.exec(l);
    if (m) return void list.push(m[1]!);
    flush(k);
    if (l.trim()) out.push(<span key={k} className="block [&+span]:mt-1.5">{inline(l, `p${k}-`)}</span>);
  });
  flush(lines.length);
  return <>{out}</>;
}

/** Triskello: lo stesso assistente AI del sito Triskell Ecosystem, in basso a destra. */
export function Triskello() {
  const [open, setOpen] = useState(false);
  const [hello, setHello] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const list = useRef<HTMLDivElement>(null);
  const field = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem("tk-triskello") === "1";
    } catch {}
    if (seen) return;
    const t = window.setTimeout(() => setHello(true), 2500);
    return () => window.clearTimeout(t);
  }, []);

  // su cellulare il fumetto copre parte della pagina: dopo qualche secondo si chiude da solo
  useEffect(() => {
    if (!hello || window.innerWidth >= 640) return;
    const t = window.setTimeout(() => setHello(false), 8000);
    return () => window.clearTimeout(t);
  }, [hello]);

  useEffect(() => {
    list.current?.scrollTo({ top: list.current.scrollHeight });
  }, [msgs, open]);

  useEffect(() => {
    if (!open) return;
    field.current?.focus({ preventScroll: true });
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [open]);

  const dismiss = () => {
    setHello(false);
    try {
      sessionStorage.setItem("tk-triskello", "1");
    } catch {}
  };

  const send = async (text: string) => {
    const q = text.trim();
    if (!q || busy) return;
    const next: Msg[] = [...msgs, { role: "user", content: q }];
    setMsgs([...next, { role: "assistant", content: "" }]);
    setInput("");
    setBusy(true);
    try {
      const res = await fetch("/api/triskello", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ messages: next }) });
      if (!res.ok || !res.body) throw new Error(String(res.status));
      const reader = res.body.getReader();
      const dec = new TextDecoder();
      let acc = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += dec.decode(value, { stream: true });
        setMsgs([...next, { role: "assistant", content: acc }]);
      }
      if (!acc.trim()) throw new Error("empty");
    } catch {
      setMsgs([...next, { role: "assistant", content: "Ops, ho avuto un piccolo intoppo. Riprova tra un attimo, oppure scrivici dalla pagina /contatti." }]);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="triski-root fixed bottom-3 right-3 z-[70] sm:bottom-5 sm:right-5">
      {open && (
        <section
          role="dialog"
          aria-label="Chat con Triskello"
          className="triski-bubble absolute bottom-[calc(100%+0.75rem)] right-0 flex h-[min(34rem,calc(100svh-8rem))] w-[min(23rem,calc(100vw-1.5rem))] flex-col overflow-hidden rounded-card border border-azure-300/50 bg-night shadow-[0_30px_80px_-16px_rgb(0_0_0/0.9),0_0_60px_-20px_rgb(58_164_212/0.6)]"
        >
          <header className="flex items-center gap-3 border-b border-line bg-[linear-gradient(160deg,var(--color-cobalt-700),var(--color-night-raised))] px-4 py-3">
            <span className="grid h-11 w-11 place-items-center rounded-full border border-azure-300/60 bg-night">
              <TriskelloBot className="h-9 w-9" talk={busy} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-display text-[1.0625rem] font-bold leading-tight text-fg">Triskello</p>
              <p className="text-[0.75rem] text-[#a9dcf2]">Assistente AI di Triskell Ecosystem</p>
            </div>
            <button type="button" onClick={() => setOpen(false)} aria-label="Chiudi la chat" className="grid h-9 w-9 place-items-center rounded-full border border-line-strong text-fg hover:border-gold-300 hover:text-gold-300">
              <Icon name="close" className="h-4 w-4" />
            </button>
          </header>

          <div ref={list} data-lenis-prevent="" className="flex-1 space-y-3 overflow-y-auto overscroll-contain px-4 py-4" aria-live="polite">
            <div className="flex justify-start">
              <p className="max-w-[90%] whitespace-pre-line rounded-2xl rounded-bl-sm border border-line bg-night-raised px-3.5 py-2.5 text-[0.9375rem] leading-snug text-fg">{TRISKELLO_HELLO}</p>
            </div>
            {msgs.length === 0 && (
              <ul className="flex flex-wrap gap-2 pt-1">
                {SUGGEST.map((s) => (
                  <li key={s}>
                    <button type="button" onClick={() => send(s)} className="rounded-full border border-azure-300/50 px-3.5 py-1.5 text-[0.8125rem] font-semibold text-[#a9dcf2] transition-colors hover:border-gold-300 hover:text-gold-200">
                      {s}
                    </button>
                  </li>
                ))}
              </ul>
            )}
            {msgs.map((m, i) =>
              m.role === "user" ? (
                <div key={i} className="flex justify-end">
                  <p className="max-w-[90%] whitespace-pre-line rounded-2xl rounded-br-sm bg-[image:var(--gradient-gold-btn)] px-3.5 py-2.5 text-[0.9375rem] font-medium leading-snug text-night">{m.content}</p>
                </div>
              ) : (
                <div key={i} className="flex justify-start">
                  <div className="max-w-[90%] rounded-2xl rounded-bl-sm border border-line bg-night-raised px-3.5 py-2.5 text-[0.9375rem] leading-snug text-fg">
                    {m.content ? <Rich text={m.content} /> : (
                      <span className="triski-dots inline-flex gap-1 py-1" aria-label="Triskello sta scrivendo"><i /><i /><i /></span>
                    )}
                  </div>
                </div>
              ),
            )}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              void send(input);
            }}
            className="flex items-center gap-2 border-t border-line bg-night-raised/70 p-3"
          >
            <label htmlFor="triski-input" className="sr-only">Scrivi a Triskello</label>
            <input
              id="triski-input"
              ref={field}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              maxLength={400}
              placeholder="Scrivi una domanda…"
              autoComplete="off"
              className="min-w-0 flex-1 rounded-full border border-line-strong bg-night px-4 py-2.5 text-[0.9375rem] text-fg placeholder:text-fg-3 focus:border-gold-300 focus:outline-none"
            />
            <button type="submit" disabled={busy || !input.trim()} aria-label="Invia" className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[image:var(--gradient-gold-btn)] text-night disabled:opacity-50">
              <Icon name="send" className="h-4 w-4" strokeWidth={2} />
            </button>
          </form>
          <p className="px-4 pb-2.5 text-center text-[0.6875rem] text-fg-3">
            Risposte generate da un&apos;AI: per prezzi e condizioni scrivi al team.{" "}
            <Link href="/privacy" className="underline underline-offset-2">Privacy</Link>
          </p>
        </section>
      )}

      {hello && !open && (
        <div role="status" className="triski-bubble absolute bottom-[calc(100%+0.75rem)] right-0 w-[16rem] max-w-[calc(100vw-1.5rem)] rounded-2xl rounded-br-sm border border-azure-300/50 bg-night-raised/95 p-3.5 text-[0.875rem] leading-snug text-fg shadow-[0_16px_40px_-10px_rgb(0_0_0/0.8)] backdrop-blur">
          <button type="button" onClick={dismiss} aria-label="Chiudi il messaggio" className="absolute -right-2 -top-2 grid h-6 w-6 place-items-center rounded-full border border-line-strong bg-night text-[0.75rem] text-fg-2 hover:text-fg">×</button>
          {TRISKELLO_HELLO}
        </div>
      )}

      <button
        type="button"
        onClick={() => {
          setOpen((o) => !o);
          dismiss();
        }}
        aria-expanded={open}
        aria-label={open ? "Chiudi Triskello" : "Apri Triskello, l'assistente AI"}
        className="group/t relative grid h-[3.25rem] w-[3.25rem] place-items-center rounded-full border-2 border-azure-300/70 bg-night-raised/90 shadow-[0_10px_34px_-6px_rgb(0_0_0/0.8),0_0_30px_-6px_rgb(58_164_212/0.7)] backdrop-blur transition-[border-color,box-shadow,transform] duration-[var(--dur-base)] ease-out-expo hover:border-gold-300 hover:shadow-[0_10px_34px_-6px_rgb(0_0_0/0.8),0_0_36px_-4px_rgb(247_200_92/0.7)] sm:h-[4.75rem] sm:w-[4.75rem]"
      >
        <TriskelloBot className="h-[2.6rem] w-[2.6rem] sm:h-[3.8rem] sm:w-[3.8rem]" talk={busy} />
        <span className="absolute -left-1.5 -top-1.5 rounded-full bg-gold-300 px-1.5 py-0.5 font-display text-[0.5625rem] font-bold uppercase tracking-wider text-night">AI</span>
      </button>
    </div>
  );
}
