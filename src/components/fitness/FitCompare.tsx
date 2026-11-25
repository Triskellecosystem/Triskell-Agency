"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/Icon";
import { fit } from "./data";

/** Tabella "Dove sei ora" → "Con Triskell Fitness": le righe si accendono una dopo l'altra; col mouse si sceglie la riga. */
export function FitCompare() {
  const ref = useRef<HTMLDivElement>(null);
  const [lit, setLit] = useState(-1);
  const [hover, setHover] = useState<number | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let t = 0;
    const io = new IntersectionObserver(([e]) => {
      if (!e?.isIntersecting) return;
      io.disconnect();
      let k = -1;
      t = window.setInterval(() => { k++; setLit(k); if (k >= fit.compare.length - 1) window.clearInterval(t); }, 420);
    }, { threshold: 0.3 });
    io.observe(el);
    return () => { io.disconnect(); window.clearInterval(t); };
  }, []);
  return (
    <div ref={ref} className="fit-table overflow-hidden rounded-2xl">
      <div className="fit-table-head grid grid-cols-[1fr_auto_1fr] items-center gap-3 px-4 py-4 sm:px-6">
        <span className="flex items-center gap-2 text-[0.75rem] font-bold uppercase tracking-[0.18em] text-white/55"><span className="h-2 w-2 rounded-full bg-[#ff5a5a] shadow-[0_0_8px_#ff5a5a]" />Dove sei ora</span>
        <span className="w-8" />
        <span className="flex items-center gap-2 text-[0.75rem] font-bold uppercase tracking-[0.18em] text-fit-300"><span className="fit-blink h-2 w-2 rounded-full bg-fit-300 shadow-[0_0_10px_#a6ff00]" />Con Triskell Fitness</span>
      </div>
      <ul>
        {fit.compare.map((r, i) => {
          const on = hover === null ? i <= lit : hover === i;
          return (
            <li
              key={r.now}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
              className={cn("fit-row grid grid-cols-[1fr_auto_1fr] items-center gap-3 px-4 py-4 sm:px-6", on && "fit-row--on", hover === i && "fit-row--hover")}
            >
              <span className="flex items-start gap-3 text-[0.875rem] leading-snug text-white/55 sm:text-[0.9375rem]">
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-md bg-[#ff5a5a]/10 text-[#ff7a7a]"><Icon name="close" className="h-3.5 w-3.5" strokeWidth={2.6} /></span>
                <span className="fit-row-now">{r.now}</span>
              </span>
              <span className="fit-row-arrow grid h-8 w-8 place-items-center rounded-full"><Icon name="arrow-right" className="h-4 w-4" strokeWidth={2.6} /></span>
              <span className="fit-row-next flex items-start gap-3 text-[0.875rem] font-semibold leading-snug sm:text-[0.9375rem]">
                <span className="fit-row-ico mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-md"><Icon name={r.icon} className="h-3.5 w-3.5" strokeWidth={2.4} /></span>
                {r.next}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
