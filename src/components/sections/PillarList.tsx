"use client";

import { useState } from "react";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/Icon";

const MORE = [
  "Studiamo la tua attività e prepariamo il piano del mese: idee per i contenuti e script già scritti, da leggere.",
  "Veniamo noi a girare sul posto, oppure ti guidiamo passo passo per farlo da solo con il telefono.",
  "Montiamo i video: tagli, sottotitoli, musica e grafiche. Ti arrivano pronti da pubblicare.",
  "Pubblichiamo nei giorni e negli orari migliori e ti mandiamo il report con i numeri del mese.",
];

/**
 * Le quattro fasi del lavoro social, tutte allineate allo stesso modo. Interattive: passando il mouse o toccando
 * una fase si apre la sua spiegazione e l'icona si accende. Nessuna animazione automatica.
 */
export function PillarList() {
  const pillars = site.social.pillars;
  const [cur, setCur] = useState(0);
  return (
    <ol className="space-y-2.5">
      {pillars.map((p, i) => {
        const on = i === cur;
        return (
          <li key={p.title}>
            <button
              type="button"
              aria-expanded={on}
              onMouseEnter={() => setCur(i)}
              onFocus={() => setCur(i)}
              onClick={() => setCur(i)}
              className={cn("pl-card gl-card group relative flex w-full items-start gap-4 overflow-hidden rounded-2xl px-4 py-3.5 text-left transition-[box-shadow,transform] duration-400", on && "gl-card--gold")}
            >
              <span className={cn("grid h-11 w-11 shrink-0 place-items-center rounded-xl border transition-[background-color,color,border-color] duration-300", on ? "border-gold-300 bg-[image:var(--gradient-gold-btn)] text-night" : "border-white/15 bg-night/60 text-gold-300")}>
                <Icon name={p.icon} className="h-5 w-5" strokeWidth={1.8} />
              </span>
              <span className="min-w-0 flex-1 pt-0.5">
                <span className="flex items-baseline gap-2.5">
                  <span className="w-5 shrink-0 font-mono text-[0.6875rem] font-bold text-gold-300">0{i + 1}</span>
                  <span className="font-display text-[1.0625rem] font-semibold text-fg">{p.title}</span>
                </span>
                <span className="block pl-[1.875rem] text-[0.8125rem] leading-snug text-fg-2">{p.text}</span>
                <span className={cn("grid pl-[1.875rem] transition-[grid-template-rows,opacity] duration-500 ease-out-expo", on ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}>
                  <span className="overflow-hidden">
                    <span className="block pt-2 text-[0.8125rem] leading-relaxed text-fg-3">{MORE[i]}</span>
                  </span>
                </span>
              </span>
              <Icon name="chevron-down" className={cn("mt-3 h-4 w-4 shrink-0 transition-transform duration-300", on ? "rotate-180 text-gold-300" : "text-fg-3")} strokeWidth={2.2} />
            </button>
          </li>
        );
      })}
    </ol>
  );
}
