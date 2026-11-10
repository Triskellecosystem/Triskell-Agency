"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/Button";

/**
 * Simulatore: "Quanti contatti potresti ricevere?". Sposti lo slider del budget pubblicitario mensile e i numeri
 * (contatti al mese, prove/appuntamenti, clienti) si aggiornano; sotto, una fila di "persone" che si accendono.
 * Stima basata sui costi per contatto dei nostri casi (circa 6–17 € a contatto, ~1 su 3 prenota).
 */
const MIN_CPL = 6;
const MAX_CPL = 17;
const fmt = (n: number) => n.toLocaleString("it-IT");

export function LeadSimulator({ compact }: { compact?: boolean }) {
  const [budget, setBudget] = useState(500);
  const [shown, setShown] = useState({ lo: 0, hi: 0 });
  const lo = Math.round(budget / MAX_CPL);
  const hi = Math.round(budget / MIN_CPL);
  // i numeri "corrono" verso il valore nuovo
  useEffect(() => {
    let raf = 0;
    const step = () => {
      setShown((s) => {
        const t = { lo, hi };
        const n = { lo: s.lo + Math.ceil((t.lo - s.lo) * 0.2), hi: s.hi + Math.ceil((t.hi - s.hi) * 0.2) };
        if (Math.abs(t.lo - n.lo) <= 1 && Math.abs(t.hi - n.hi) <= 1) return t;
        raf = requestAnimationFrame(step);
        return n;
      });
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [lo, hi]);

  const trials = [Math.round(shown.lo / 3), Math.round(shown.hi / 3)];
  const pct = ((budget - 200) / (2000 - 200)) * 100;
  const people = Math.min(40, Math.round(hi / 4));

  return (
    <div className="relative mx-auto w-full max-w-md">
      <span aria-hidden="true" className="phone-glow !w-[120%]" />
      <div className="relative overflow-hidden rounded-[1.5rem] border border-gold-300/40 bg-[linear-gradient(160deg,rgb(13_39_61/0.95),rgb(4_33_58/0.95))] p-5 shadow-[0_40px_80px_-30px_rgb(0_0_0/0.9)] sm:p-6">
        <p className="text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-gold-300">Simulatore</p>
        <p className="mt-1 font-display text-[1.25rem] font-bold leading-tight text-fg">Quanti contatti potresti ricevere?</p>

        <label className="mt-5 block">
          <span className="flex items-baseline justify-between text-[0.8125rem] text-fg-2">
            Budget pubblicitario al mese
            <span className="font-display text-[1.375rem] font-bold text-fg">{fmt(budget)} €</span>
          </span>
          <input type="range" min={200} max={2000} step={50} value={budget} onChange={(e) => setBudget(Number(e.target.value))} className="sim-range mt-3 w-full" style={{ "--p": `${pct}%` } as React.CSSProperties} aria-label="Budget pubblicitario al mese in euro" />
        </label>

        <dl className="mt-5 grid grid-cols-2 gap-3">
          <div className="rounded-2xl border border-gold-300/40 bg-gold-300/[0.07] p-3.5">
            <dt className="text-[0.625rem] font-bold uppercase tracking-wider text-fg-2">Contatti al mese</dt>
            <dd className="mt-1 font-display text-[1.875rem] font-bold leading-none tracking-[-0.04em] text-gold tabular-nums">{shown.lo}–{shown.hi}</dd>
          </div>
          <div className="rounded-2xl border border-lime-300/40 bg-lime-300/[0.06] p-3.5">
            <dt className="text-[0.625rem] font-bold uppercase tracking-wider text-fg-2">Prove / appuntamenti</dt>
            <dd className="mt-1 font-display text-[1.875rem] font-bold leading-none tracking-[-0.04em] text-lime-300 tabular-nums">{trials[0]}–{trials[1]}</dd>
          </div>
        </dl>

        {!compact && (
          <div aria-hidden="true" className="mt-4 flex flex-wrap gap-1">
            {Array.from({ length: 40 }, (_, i) => (
              <span key={i} className={cn("sim-dot h-3 w-3 rounded-full transition-[background-color,transform] duration-300", i < people ? (i % 3 === 0 ? "bg-lime-300" : "bg-gold-300") : "bg-white/10")} style={{ transitionDelay: `${i * 12}ms` }} />
            ))}
          </div>
        )}
        <p className="mt-3 text-[0.6875rem] leading-snug text-fg-3">Stima indicativa basata sui costi per contatto dei nostri clienti (6–17 € a contatto, circa 1 su 3 prenota). Dipende dal settore e dalla zona.</p>
        <div className="mt-4">
          <Button href="/contatti" size="md" icon="calendar" iconPosition="start" pulse className="w-full">
            Voglio questi numeri
          </Button>
        </div>
      </div>
    </div>
  );
}
