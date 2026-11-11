"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/motion/Reveal";

type Row = { them: string; us: string };

/**
 * Confronto interattivo: ogni riga è una carta che mostra come lavorano "gli altri"; passandoci sopra (o toccandola)
 * si gira e mostra come lavoriamo noi. In alto un interruttore gira tutte le carte insieme, una dopo l'altra.
 * Le righe entrano una alla volta quando arrivi alla sezione. Niente si muove da solo.
 */
export function Compare({ them, us, rows }: { them: string; us: string; rows: Row[] }) {
  const [all, setAll] = useState(false);
  const [one, setOne] = useState<Record<number, boolean>>({});
  const isOn = (i: number) => one[i] ?? all;
  const setMode = (v: boolean) => {
    setAll(v);
    setOne({});
  };
  const done = rows.filter((_, i) => isOn(i)).length;
  return (
    <Reveal y={0} blur={0}>
      <div className="cmp4 mx-auto max-w-xl">
        <div className="flex flex-col items-center gap-2">
          <div role="group" aria-label="Scegli il confronto" className="relative inline-grid grid-cols-2 rounded-full border border-white/10 bg-night/60 p-1">
            <span aria-hidden="true" className={cn("absolute inset-y-1 left-1 w-[calc(50%-0.25rem)] rounded-full transition-[transform,background-color] duration-500 ease-out-expo", all ? "translate-x-full bg-[image:var(--gradient-gold-btn)]" : "bg-white/10")} />
            <button type="button" aria-pressed={!all} onClick={() => setMode(false)} className={cn("relative z-[1] rounded-full px-4 py-2 text-[0.8125rem] font-semibold transition-colors sm:px-6", !all ? "text-fg" : "text-fg-3")}>{them}</button>
            <button type="button" aria-pressed={all} onClick={() => setMode(true)} className={cn("relative z-[1] inline-flex items-center justify-center gap-1.5 rounded-full px-4 py-2 text-[0.8125rem] font-bold transition-colors sm:px-6", all ? "text-night" : "text-gold-200")}>
              <Icon name="award" className="h-3.5 w-3.5" strokeWidth={2.2} />
              {us}
            </button>
          </div>
          <p className="text-[0.6875rem] text-fg-3">Passa sopra o tocca una riga per vedere la differenza · {done}/{rows.length}</p>
        </div>

        <ul className="mt-4 space-y-2">
          {rows.map((r, i) => {
            const on = isOn(i);
            return (
              <li key={r.us} className="cmp4-row" style={{ "--i": i } as React.CSSProperties}>
                <button
                  type="button"
                  aria-pressed={on}
                  aria-label={on ? r.us : r.them}
                  onMouseEnter={() => setOne((o) => ({ ...o, [i]: true }))}
                  onClick={() => setOne((o) => ({ ...o, [i]: !on }))}
                  className="cmp4-card block w-full text-left"
                >
                  <span className={cn("cmp4-inner grid", on && "is-on")} style={{ transitionDelay: one[i] === undefined ? `${i * 0.08}s` : "0s" }}>
                    <span className="cmp4-face flex items-center gap-3 rounded-xl border border-white/10 bg-[rgb(10_30_48/0.9)] px-4 py-2.5">
                      <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-ember-400/15 text-ember-300">
                        <Icon name="close" className="h-3 w-3" strokeWidth={3} />
                      </span>
                      <span className="flex-1 text-[0.875rem] text-fg-2">{r.them}</span>
                      <span className="text-[0.625rem] font-bold uppercase tracking-wider text-fg-3">{them}</span>
                    </span>
                    <span className="cmp4-face cmp4-back flex items-center gap-3 rounded-xl border border-gold-300/60 bg-[linear-gradient(120deg,rgb(247_200_92/0.2),rgb(11_42_70/0.95))] px-4 py-2.5 shadow-[0_0_34px_-12px_rgb(247_200_92/0.7)]">
                      <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-gold-300 text-night">
                        <Icon name="check" className="h-3.5 w-3.5" strokeWidth={3} />
                      </span>
                      <span className="flex-1 text-[0.875rem] font-semibold text-fg">{r.us}</span>
                      <span className="text-[0.625rem] font-bold uppercase tracking-wider text-gold-200">{us}</span>
                    </span>
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
