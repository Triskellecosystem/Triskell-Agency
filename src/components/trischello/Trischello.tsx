"use client";

import Link from "next/link";
import { Fragment, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/Icon";
import { TRISCHELLO_HELLO } from "@/lib/trischello-hello";
import { TrischelloBot } from "./Bot";

type Msg = { role: "user" | "assistant"; content: string };

const SUGGEST = ["Cosa fate per la mia attività?", "Come funziona Irelia?", "Quanto costa?", "Come vi contatto?"];

/** Testo semplice → React: **grassetto**, righe "- " come elenco, link alle pagine del sito (/pagina). */
function Rich({ text }: { text: string }) {
  const inline = (s: string, k: string) =>
    s.split(/(\*\*[^*]+\*\*|\/(?:metodo-triskell|social|siti-web|risultati|chi-siamo|contatti)\b)/g).map((p, i) => {
      if (p.startsWith("**") && p.endsWith("**")) return <strong key={k + i} className="font-semibold text-fg">{p.slice(2, -2)}</strong>;
      if (/^\/[a-z-]+$/.test(p)) return <Link key={k + i} href={p} className="font-semibold text-gold-200 underline underline-offset-2">{p}</Link>;
      return <Fragment key={k + i}>{p}</Fragment>;
    });
  const lines = text.split("\n");
  const out: React.ReactNode[] = [];
  let list: string[] = [];
  const flush = (k: number) => {
    if (list.length) out.push(<ul key={"u" + k} className="my-1 list-disc space-y-0.5 pl-4">{list.map((l, j) => <li key={j}>{inline(l, `l${k}-${j}-`)}</li>)}</ul>);
    list = [];
  };
  lines.forEach((l, k) => {
    const m = /^\s*[-•*]\s+(.*)/.exec(l);
    if (m) return void list.push(m[1]!);
    flush(k);
    if (l.trim()) out.push(<p key={k} className="[&+p]:mt-1.5">{inline(l, `p${k}-`)}</p>);
  });
  flush(lines.length);
  return <>{out}</>;
}

/** Trischello: robottino in basso a destra che saluta e apre la chat con l'assistente AI. */
export function Trischello() {
  const [open, setOpen] = useState(false);
  const [hello, setHello] = useState(false);
  const [typed, setTyped] = useState(0);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const list = useRef<HTMLDivElement>(null);
  const field = useRef<HTMLTextAreaElement>(null);

  // dopo qualche secondo il fumetto di saluto compare e si "scrive" da solo
  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem("tk-trischello") === "1";
    } catch {}
    if (seen) return;
    const t = window.setTimeout(() => setHello(true), 3200);
    return () => window.clearTimeout(t);
  }, []);
  useEffect(() => {
    if (!hello || typed >= TRISCHELLO_HELLO.length) return;
    const t = window.setTimeout(() => setTyped((n) => n + 1), 28);
    return () => window.clearTimeout(t);
  }, [hello, typed]);

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
      sessionStorage.setItem("tk-trischello", "1");
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
      const res = await fetch("/api/trischello", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ messages: next }) });
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
      setMsgs([...next, { role: "assistant", content: "Ops, ho avuto un piccolo intoppo 🤖 Riprova tra un attimo, oppure scrivici dalla pagina /contatti." }]);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="trs fixed bottom-4 right-4 z-[60] flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      {/* finestra della chat */}
      <section
        role="dialog"
        aria-label="Chat con Trischello, l'assistente AI"
        aria-hidden={!open}
        inert={!open}
        className={cn("trs-panel flex w-[min(23rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-[1.5rem]", open ? "trs-panel--on" : "")}
      >
        <header className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
          <span className="trs-avatar grid h-11 w-11 shrink-0 place-items-center rounded-full">
            <TrischelloBot className="h-10 w-10" />
          </span>
          <span className="min-w-0 flex-1">
            <strong className="block font-display text-[1rem] font-bold text-fg">Trischello</strong>
            <span className="flex items-center gap-1.5 text-[0.75rem] text-fg-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
              Assistente AI di Triskell Ecosystem
            </span>
          </span>
          <button type="button" onClick={() => setOpen(false)} aria-label="Chiudi la chat" className="grid h-9 w-9 place-items-center rounded-full text-fg-2 hover:bg-white/10 hover:text-fg">
            <Icon name="close" className="h-4 w-4" />
          </button>
        </header>

        <div ref={list} data-lenis-prevent="" className="flex max-h-[min(26rem,55svh)] min-h-[16rem] flex-col gap-2.5 overflow-y-auto overscroll-contain px-4 py-4" aria-live="polite">
          <div className="trs-msg trs-msg--ai">{TRISCHELLO_HELLO}</div>
          {msgs.map((m, i) => (
            <div key={i} className={cn("trs-msg", m.role === "user" ? "trs-msg--me" : "trs-msg--ai")}>
              {m.role === "assistant" ? m.content ? <Rich text={m.content} /> : <span className="trs-dots" aria-label="Trischello sta scrivendo"><i /><i /><i /></span> : m.content}
            </div>
          ))}
          {msgs.length === 0 && (
            <div className="mt-1 flex flex-wrap gap-1.5">
              {SUGGEST.map((s) => (
                <button key={s} type="button" onClick={() => send(s)} className="rounded-full border border-sky-300/35 bg-sky-300/[0.08] px-3 py-1.5 text-[0.75rem] font-semibold text-sky-100 transition-colors hover:border-gold-300 hover:text-gold-200">
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            void send(input);
          }}
          className="flex items-end gap-2 border-t border-white/10 p-3"
        >
          <textarea
            ref={field}
            value={input}
            onChange={(e) => setInput(e.target.value.slice(0, 1500))}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                void send(input);
              }
            }}
            rows={1}
            placeholder="Scrivi una domanda…"
            aria-label="Scrivi una domanda a Trischello"
            className="max-h-28 min-h-[2.5rem] flex-1 resize-none rounded-xl border border-white/15 bg-night/60 px-3 py-2 text-[0.875rem] text-fg placeholder:text-fg-3 focus:border-sky-300/60 focus:outline-none"
          />
          <button type="submit" disabled={busy || !input.trim()} aria-label="Invia" className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[image:var(--gradient-gold-btn)] text-night transition-opacity disabled:opacity-40">
            <Icon name="arrow-right" className="h-4 w-4" strokeWidth={2.4} />
          </button>
        </form>
      </section>

      {/* fumetto di saluto */}
      {hello && !open && (
        <div className="trs-hello relative mr-2 max-w-[16rem] rounded-2xl rounded-br-md px-4 py-3 text-[0.875rem] leading-snug text-fg">
          <button type="button" onClick={dismiss} aria-label="Chiudi il saluto" className="absolute -left-2 -top-2 grid h-6 w-6 place-items-center rounded-full border border-white/20 bg-night text-fg-2 hover:text-fg">
            <Icon name="close" className="h-3 w-3" />
          </button>
          <button type="button" onClick={() => { setOpen(true); dismiss(); }} className="text-left">
            {TRISCHELLO_HELLO.slice(0, typed)}
            {typed < TRISCHELLO_HELLO.length && <span className="trs-caret" />}
          </button>
        </div>
      )}

      {/* il robottino */}
      <button
        type="button"
        onClick={() => {
          setOpen((o) => !o);
          dismiss();
        }}
        aria-expanded={open}
        aria-label={open ? "Chiudi la chat con Trischello" : "Apri la chat con Trischello, l'assistente AI"}
        className="trs-fab relative grid h-[4.75rem] w-[4.75rem] place-items-center rounded-full"
      >
        <TrischelloBot className="trs-bot h-[4.25rem] w-[4.25rem]" wave={hello && !open} />
      </button>
    </div>
  );
}
