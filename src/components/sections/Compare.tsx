"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/motion/Reveal";

type Row = { them: string; us: string };

/**
 * Confronto a due colonne, sempre visibili: a sinistra "gli altri", a destra noi. Passando sopra (o toccando) una riga
 * la nostra risposta si accende d'oro e il contatore conta le differenze viste. L'interruttore in alto accende tutte
 * le nostre risposte insieme. Le righe entrano una alla volta.
 */
export function Compare({ them, us, rows }: { them: string; us: string; rows: Row[] }) {
  const [all, setAll] = useState(false);
  const [hover, setHover] = useState<number | null>(null);
  const [seen, setSeen] = useState<number[]>([]);
  const see = (i: number) => {
    setHover(i);
    setSeen((s) => (s.includes(i) ? s : [...s, i]));
  };
  return (
    <Reveal y={0} blur={0}>
      <div className="cmp5 mx-auto max-w-5xl">
        <div className="flex flex-col items-center gap-2.5">
          <div role="group" aria-label="Evidenzia il confronto" className="inline-flex items-center gap-2">
            <button type="button" aria-pressed={!all} onClick={() => setAll(false)} className={cn("gl-card rounded-full px-6 py-2.5 font-display text-[0.9375rem] font-semibold transition-colors", !all ? "text-fg" : "text-fg-3")}>{them}</button>
            <Icon name="arrow-right" className="h-5 w-5 text-gold-300" strokeWidth={2.4} />
            <button type="button" aria-pressed={all} onClick={() => setAll((a) => !a)} className={cn("gl-card inline-flex items-center gap-2 rounded-full px-6 py-2.5 font-display text-[0.9375rem] font-bold text-gold-200", all && "gl-card--gold")}>
              <Icon name="award" className="h-4 w-4" strokeWidth={2.2} />
              {us}
            </button>
          </div>
          <p className="text-[0.8125rem] text-fg-2">Passa sopra o tocca una riga per vedere la differenza · {seen.length}/{rows.length}</p>
        </div>
        <ul className="mt-6 space-y-2.5" onMouseLeave={() => setHover(null)}>
          {rows.map((r, i) => {
            const on = all || hover === i;
            return (
              <li key={r.us} className="cmp5-row" style={{ "--i": i } as React.CSSProperties}>
                <button type="button" onMouseEnter={() => see(i)} onFocus={() => see(i)} onClick={() => see(i)} className="grid w-full gap-2.5 text-left md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
                  <span className={cn("gl-card flex items-center gap-3 rounded-xl px-4 py-3 transition-opacity duration-300", on ? "opacity-100" : "opacity-85")}>
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-ember-400/20 text-ember-300"><Icon name="close" className="h-3 w-3" strokeWidth={3} /></span>
                    <span className="text-[0.9375rem] text-fg-2">{r.them}</span>
                  </span>
                  <span className={cn("gl-card flex items-center gap-3 rounded-xl px-4 py-3 transition-[transform,box-shadow,border-color] duration-300", on && "gl-card--gold md:scale-[1.02]")}>
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[image:var(--gradient-gold-btn)] text-night"><Icon name="check" className="h-3.5 w-3.5" strokeWidth={3} /></span>
                    <span className="flex-1 text-[0.9375rem] font-semibold text-fg">{r.us}</span>
                    <span className="hidden text-[0.625rem] font-bold uppercase tracking-wider text-gold-200 sm:inline">{us}</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </Reveal>
  );
}
