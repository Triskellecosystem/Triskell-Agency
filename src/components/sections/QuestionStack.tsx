"use client";

import { useState } from "react";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";

/**
 * Le domande, tutte visibili: righe grandi che si accendono al passaggio del mouse (barra d'oro, scivolano un po'),
 * e con un clic si spuntano "Mi riconosco". In alto il contatore delle risposte e, appena ce n'è una, l'invito.
 * Niente timer: nessuna attesa, nessun salto.
 */
export function QuestionStack() {
  const items = site.forWho.items;
  const [picked, setPicked] = useState<number[]>([]);
  const toggle = (i: number) => setPicked((p) => (p.includes(i) ? p.filter((x) => x !== i) : [...p, i]));
  const n = picked.length;

  return (
    <div className="w-full">
      <p className="mb-4 flex items-center justify-between text-[0.9375rem] font-semibold text-fg">
        <span>Clicca le domande in cui ti riconosci</span>
        <span className={cn("gl-card rounded-full px-3 py-1 font-display text-[0.9375rem] font-bold transition-colors", n ? "text-gold-200" : "text-fg")}>
          {n} / {items.length}
        </span>
      </p>
      <ul className="qs3 grid gap-3 sm:grid-cols-2">
        {items.map((it, i) => {
          const on = picked.includes(i);
          return (
            <li key={it.title} className="qs3-row" style={{ "--i": i } as React.CSSProperties}>
              <button
                type="button"
                aria-pressed={on}
                onClick={() => toggle(i)}
                className={cn("group/q relative flex h-full min-h-[4.75rem] w-full items-center gap-4 overflow-hidden rounded-2xl px-5 py-3.5 text-left transition-[transform,box-shadow] duration-300 ease-out-expo hover:-translate-y-0.5", on ? "gl-card gl-card--gold" : "gl-card")}
              >
                                <span className="font-display text-[1rem] font-bold text-gold-300">{String(i + 1).padStart(2, "0")}</span>
                <span className="flex-1 font-display text-[clamp(1rem,0.9rem+0.5vw,1.25rem)] font-bold leading-tight tracking-[-0.02em] text-fg">{it.title}</span>
                <span className={cn("grid h-7 w-7 shrink-0 place-items-center rounded-full border-2 transition-[background-color,border-color,transform] duration-300", on ? "scale-110 border-gold-300 bg-[image:var(--gradient-gold-btn)] text-night" : "border-white/40 text-transparent group-hover/q:border-gold-300")}>
                  <Icon name="check" className="h-4 w-4" strokeWidth={3} />
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      {/* risultato: compare appena si spunta qualcosa e cambia con il punteggio */}
      <div className={cn("qs-res grid transition-[grid-template-rows,opacity] duration-500 ease-out-expo", n ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}>
        <div className="overflow-hidden">
          <div key={verdict(n).k} className="qs-res-card gl-card gl-card--gold relative mt-5 overflow-hidden rounded-[1.5rem] p-5 sm:p-6">
            <span aria-hidden="true" className="cta-gold-shine opacity-30" />
            <div className="relative flex flex-wrap items-center gap-x-6 gap-y-4">
              <div className="relative grid h-20 w-20 shrink-0 place-items-center sm:border-r sm:border-white/15 sm:pr-6 sm:box-content">
                <svg viewBox="0 0 40 40" className="absolute inset-0 h-full w-full -rotate-90" aria-hidden="true">
                  <circle cx="20" cy="20" r="17" fill="none" stroke="rgb(255 255 255 / 0.12)" strokeWidth="3" />
                  <circle cx="20" cy="20" r="17" fill="none" stroke="var(--color-gold-300)" strokeWidth="3" strokeLinecap="round" strokeDasharray={`${(n / items.length) * 106.8} 106.8`} className="transition-[stroke-dasharray] duration-700" />
                </svg>
                <span className="font-display text-[1.125rem] font-bold text-gold">{n}/{items.length}</span>
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-display text-[1.375rem] font-bold leading-tight text-fg">{verdict(n).title}</p>
                <p className="mt-1 text-[0.9375rem] leading-snug text-fg-2">{verdict(n).text}</p>
              </div>
              <Button href="/contatti" size="md" icon="calendar" iconPosition="start" pulse>
                Prenota la call gratuita
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function verdict(n: number) {
  if (n >= 5) return { k: "c", title: "È proprio il momento di parlarne.", text: "Ti riconosci quasi in tutto: in 30 minuti ti mostriamo come sistemare tutto, passo per passo." };
  if (n >= 3) return { k: "b", title: "Ci sono margini enormi di crescita.", text: "Più di una cosa ti frena: prenota una call gratuita e vediamo insieme da dove partire." };
  return { k: "a", title: "Forse è il caso di fare due chiacchiere.", text: "Anche una sola di queste cose ti fa perdere clienti. Parliamone gratis, senza impegno." };
}
