"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

/** Contatti al mese per cliente: minimo e massimo reali dai casi studio. */
const DATA = [
  { client: "Forme Fitness", place: "Varese", before: 30, after: 60 },
  { client: "Urban Fitness", place: "Lecco", before: 30, after: 60 },
  { client: "Emme Diffusion", place: "Genova", before: 20, after: 30 },
  { client: "Gabriele Gatti", place: "Meda", before: 10, after: 30 },
];
const MAX = 60;

/**
 * Grafico dei contatti al mese per cliente: per ognuno il mese minimo e il mese migliore (dati reali). Le barre crescono
 * quando il riquadro entra nello schermo, poi a turno un cliente si mette in evidenza con il suo moltiplicatore.
 */
export function ResultsVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  const [hl, setHl] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let t = 0;
    const io = new IntersectionObserver(([e]) => {
      window.clearInterval(t);
      if (e?.isIntersecting) {
        setOn(true);
        if (!reduced) t = window.setInterval(() => setHl((h) => (h + 1) % DATA.length), 2200);
      }
    });
    io.observe(el);
    return () => {
      io.disconnect();
      window.clearInterval(t);
    };
  }, []);

  const d = DATA[hl]!;
  const mult = d.before === d.after ? `~${d.after}` : `${d.before}–${d.after}`;

  return (
    <div ref={ref} className="relative mx-auto w-full max-w-md">
      <span aria-hidden="true" className="phone-glow !w-[120%]" />
      <div className="relative overflow-hidden rounded-[1.5rem] border border-gold-300/40 bg-[linear-gradient(160deg,rgb(13_39_61/0.95),rgb(4_33_58/0.95))] p-5 shadow-[0_40px_80px_-30px_rgb(0_0_0/0.9)]">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-fg-3">Contatti al mese</p>
            <p className="mt-1 font-display text-[1.125rem] font-bold text-fg">Clienti reali, ogni mese</p>
          </div>
          <div key={hl} className="rv-badge shrink-0 rounded-xl border border-gold-300/40 bg-gold-300/[0.08] px-3 py-2 text-right">
            <p className="font-display text-[1.75rem] font-bold leading-none tracking-[-0.04em] text-gold">{mult}</p>
            <p className="text-[0.625rem] font-semibold uppercase tracking-wider text-fg-3">{d.client}</p>
          </div>
        </div>
        <div className="mt-9 flex h-40 items-end justify-between gap-3 border-b border-white/10 pb-0">
          {DATA.map((c, i) => (
            <button key={c.client} type="button" onMouseEnter={() => setHl(i)} onFocus={() => setHl(i)} className={cn("group/b flex h-full flex-1 items-end justify-center gap-1.5 rounded-t-lg transition-colors", i === hl && "bg-white/[0.04]")} aria-label={`${c.client}: da ${c.before} a ${c.after} contatti al mese`}>
              <span className="rv-bar w-1/3 rounded-t-md bg-white/20" style={{ height: on ? `${Math.max(3, (c.before / MAX) * 100)}%` : "0%", transitionDelay: `${i * 0.12}s` }} />
              <span className={cn("rv-bar relative w-1/3 rounded-t-md bg-gradient-to-t from-gold-500 to-gold-200", i === hl && "shadow-[0_0_24px_rgb(247_200_92/0.6)]")} style={{ height: on ? `${(c.after / MAX) * 100}%` : "0%", transitionDelay: `${0.3 + i * 0.12}s` }}>
                <span className={cn("absolute -top-6 left-1/2 -translate-x-1/2 font-display text-[0.8125rem] font-bold text-gold-200 transition-opacity", on ? "opacity-100" : "opacity-0")} style={{ transitionDelay: `${1.2 + i * 0.12}s` }}>{c.after}</span>
              </span>
            </button>
          ))}
        </div>
        <div className="mt-2 flex justify-between gap-3">
          {DATA.map((c, i) => (
            <p key={c.client} className={cn("flex-1 truncate text-center text-[0.6875rem] leading-tight transition-colors", i === hl ? "font-semibold text-fg" : "text-fg-3")}>
              {c.client}
              <span className="block text-[0.5625rem] text-fg-3">{c.place}</span>
            </p>
          ))}
        </div>
        <div className="mt-4 flex items-center gap-4 text-[0.6875rem] text-fg-2">
          <span className="inline-flex items-center gap-1.5"><i className="h-2.5 w-2.5 rounded-sm bg-white/25" />Mese minimo</span>
          <span className="inline-flex items-center gap-1.5"><i className="h-2.5 w-2.5 rounded-sm bg-gold-300" />Mese migliore</span>
        </div>
      </div>
    </div>
  );
}
