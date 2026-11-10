"use client";

import { useState } from "react";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/Icon";

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
      <p className="mb-3 flex items-center justify-between text-[0.75rem] font-semibold text-fg-3">
        <span>Clicca le domande in cui ti riconosci</span>
        <span className={cn("rounded-full px-2.5 py-0.5 font-bold transition-colors", n ? "bg-lime-300 text-night" : "bg-white/10 text-fg-2")}>
          {n} / {items.length}
        </span>
      </p>
      <ul className="qs3 space-y-2">
        {items.map((it, i) => {
          const on = picked.includes(i);
          return (
            <li key={it.title} className="qs3-row" style={{ "--i": i } as React.CSSProperties}>
              <button
                type="button"
                aria-pressed={on}
                onClick={() => toggle(i)}
                className={cn("group/q relative flex w-full items-center gap-4 overflow-hidden rounded-2xl border px-5 py-3.5 text-left transition-[border-color,background-color,transform] duration-300 ease-out-expo hover:translate-x-1.5", on ? "border-lime-300/60 bg-lime-300/[0.07]" : "border-white/10 bg-[rgb(13_39_61/0.55)] hover:border-gold-300/60")}
              >
                <span aria-hidden="true" className={cn("absolute inset-y-0 left-0 w-1 origin-top transition-transform duration-300", on ? "scale-y-100 bg-lime-300" : "scale-y-0 bg-gold-300 group-hover/q:scale-y-100")} />
                <span className="font-mono text-[0.75rem] font-bold text-gold-300">{String(i + 1).padStart(2, "0")}</span>
                <span className="flex-1 font-display text-[clamp(1rem,0.9rem+0.5vw,1.25rem)] font-bold leading-tight tracking-[-0.02em] text-fg">{it.title}</span>
                <span className={cn("grid h-7 w-7 shrink-0 place-items-center rounded-full border-2 transition-[background-color,border-color,transform] duration-300", on ? "scale-110 border-lime-300 bg-lime-300 text-night" : "border-white/25 text-transparent group-hover/q:border-gold-300")}>
                  <Icon name="check" className="h-4 w-4" strokeWidth={3} />
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
