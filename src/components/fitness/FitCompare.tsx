"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/Icon";
import { fit } from "./data";

/**
 * Tabella "Dove sei ora" → "Con Triskell Fitness". Scendendo con la pagina le righe si accendono da sole,
 * una alla volta, man mano che arrivano a metà schermo (con un lampo verde quando si accendono).
 */
export function FitCompare() {
  const ref = useRef<HTMLUListElement>(null);
  const [lit, setLit] = useState(-1);
  useEffect(() => {
    const ul = ref.current;
    if (!ul) return;
    let raf = 0;
    const check = () => {
      raf = 0;
      const rows = [...ul.children] as HTMLElement[];
      const line = window.innerHeight * 0.72;
      let n = -1;
      rows.forEach((r, i) => { if (r.getBoundingClientRect().top < line) n = i; });
      setLit((l) => Math.max(l, n));
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(check); };
    window.addEventListener("scroll", on, { passive: true });
    check();
    return () => { window.removeEventListener("scroll", on); cancelAnimationFrame(raf); };
  }, []);
  const all = lit >= fit.compare.length - 1;
  return (
    <div className={cn("fit-table overflow-hidden rounded-2xl", all && "fit-table--all")}>
      <div className="fit-table-head grid grid-cols-[1fr_auto_1fr] items-center gap-3 px-4 py-4 sm:px-6">
        <span className="flex items-center gap-2 text-[0.75rem] font-bold uppercase tracking-[0.18em] text-white/55"><span className="h-2 w-2 rounded-full bg-[#ff5a5a] shadow-[0_0_8px_#ff5a5a]" />Dove sei ora</span>
        <span className="w-8" />
        <span className="flex items-center gap-2 text-[0.75rem] font-bold uppercase tracking-[0.18em] text-fit-300"><span className="fit-blink h-2 w-2 rounded-full bg-fit-300 shadow-[0_0_10px_#a6ff00]" />Con Triskell Fitness</span>
      </div>
      <ul ref={ref}>
        {fit.compare.map((r, i) => (
          <li key={r.now} className={cn("fit-row grid grid-cols-[1fr_auto_1fr] items-center gap-3 px-4 py-4 sm:px-6", i <= lit && "fit-row--on")}>
            <span className="fit-row-now text-[0.875rem] leading-snug text-white/55 sm:text-[0.9375rem]">{r.now}</span>
            <span className="fit-row-arrow grid h-8 w-8 place-items-center rounded-full"><Icon name="arrow-right" className="h-4 w-4" strokeWidth={2.6} /></span>
            <span className="fit-row-next text-[0.875rem] font-semibold leading-snug sm:text-[0.9375rem]">{r.next}</span>
          </li>
        ))}
      </ul>
      {all ? (
        <a href="#contatti" className="fit-table-foot fit-table-foot--on flex items-center justify-center gap-2 px-4 py-3.5 text-center text-[0.875rem] font-bold uppercase tracking-[0.12em] sm:px-6">
          Ti abbiamo convinto? Prenota la tua call gratuita <Icon name="arrow-right" className="h-4 w-4" strokeWidth={2.8} />
        </a>
      ) : (
        <p className="fit-table-foot px-4 py-3.5 text-center text-[0.8125rem] font-bold uppercase tracking-[0.16em] sm:px-6">Scorri: ogni riga si accende da sola</p>
      )}
    </div>
  );
}
