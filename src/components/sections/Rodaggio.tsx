"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/Icon";

/**
 * Rodaggio di 6 mesi: appena il blocco entra nello schermo la linea avanza da sola mese dopo mese (i mesi si accendono, la fase
 * attiva si evidenzia) e quando arriva in fondo "esplode": dal traguardo partono richieste, numeri e clienti.
 * Reversibile. Con movimento ridotto è già tutto completo.
 */
export function Rodaggio() {
  const r = site.metodo.rodaggio;
  const ref = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let started = false;
    const run = () => {
      const t0 = performance.now();
      const step = (now: number) => {
        const k = Math.min(1, (now - t0) / 1800);
        setP(1 - Math.pow(1 - k, 2));
        if (k < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    };
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e?.isIntersecting || started) return;
        started = true;
        if (reduced) raf = requestAnimationFrame(() => setP(1));
        else run();
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  const month = p * 6; // 0 → 6
  const done = p >= 0.98;

  return (
    <div ref={ref} className="rd3 relative rounded-[1.5rem] border border-white/10 bg-[linear-gradient(150deg,rgb(13_39_61/0.7),rgb(1_15_28/0.7))] p-5 sm:p-8">
      <div className="relative pt-2">
        {/* binario */}
        <div className="relative h-2 rounded-full bg-white/10">
          <div className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-azure-300 via-gold-300 to-gold-200 shadow-[0_0_18px_rgb(247_200_92/0.6)]" style={{ width: `${p * 100}%` }} />
          <span className="absolute top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-200 shadow-[0_0_20px_6px_rgb(247_200_92/0.65)]" style={{ left: `${p * 100}%` }} />
          {Array.from({ length: 7 }, (_, i) => (
            <span key={i} className={cn("absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 transition-colors duration-300", month >= i ? "border-gold-200 bg-gold-300" : "border-white/30 bg-night")} style={{ left: `${(i / 6) * 100}%` }} />
          ))}
        </div>
        <ol className="mt-3 grid grid-cols-6 text-center">
          {Array.from({ length: 6 }, (_, i) => (
            <li key={i} className={cn("font-mono text-[0.625rem] font-bold uppercase tracking-wider transition-colors duration-300 sm:text-[0.6875rem]", month >= i + 0.5 ? "text-gold-200" : "text-fg-3")}>
              Mese {i + 1}
            </li>
          ))}
        </ol>

        {/* fasi */}
        <ol className="mt-5 flex gap-2">
          {r.phases.map((ph, i) => {
            const active = month >= ph.from - 1 + 0.2 && month <= ph.to + 0.2;
            const passed = month > ph.to;
            return (
              <li key={ph.title} className={cn("min-w-0 rounded-xl border p-3 transition-[border-color,background-color,transform] duration-500", active ? "-translate-y-1 border-gold-300/70 bg-gold-300/[0.08]" : passed ? "border-azure-300/30 bg-azure-300/[0.04]" : "border-white/[0.07] bg-white/[0.02]")} style={{ flex: ph.to - ph.from + 1 }}>
                <p className="font-mono text-[0.625rem] font-bold uppercase tracking-wider text-fg-3">{ph.from === ph.to ? `Mese ${ph.from}` : `Mesi ${ph.from}–${ph.to}`}</p>
                <p className={cn("mt-0.5 font-display text-[0.875rem] font-bold sm:text-[1rem]", active ? "text-gold-200" : "text-fg")}>
                  {i + 1}. {ph.title}
                </p>
                <p className="mt-0.5 hidden text-[0.75rem] leading-snug text-fg-3 sm:block">{ph.text}</p>
              </li>
            );
          })}
        </ol>
      </div>

      {/* esplosione finale */}
      <div className={cn("rd3-burst pointer-events-none relative mt-6 flex min-h-[5.5rem] flex-wrap items-center justify-center gap-2", done && "is-on")}>
        <span aria-hidden="true" className="rd3-flash absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full" />
        {r.burst.map((b, i) => (
          <span key={b} className="rd3-chip relative inline-flex items-center gap-1.5 rounded-full border border-gold-300/50 bg-night/80 px-3 py-1.5 text-[0.8125rem] font-bold text-gold-100 shadow-[0_0_24px_-6px_rgb(247_200_92/0.7)]" style={{ "--i": i, "--x": `${(i % 3 - 1) * 60}px`, "--y": `${i < 3 ? -30 : 30}px` } as React.CSSProperties}>
            <Icon name={["users", "trending", "calendar", "zap", "handshake", "target"][i % 6] as "users"} className="h-3.5 w-3.5 text-gold-300" strokeWidth={2.2} />
            {b}
          </span>
        ))}
      </div>
    </div>
  );
}
