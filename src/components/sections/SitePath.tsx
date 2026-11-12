"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/Icon";

/**
 * Il percorso del sito: sette passi numerati. Appena la sezione è sullo schermo si accende il primo passo (lampeggia)
 * e poi la luce passa al successivo, uno dopo l'altro; passando il mouse si accende quello scelto. L'ultima casella,
 * centrata, invita a prenotare la call.
 */
export function SitePath() {
  const steps = site.sitiProcess.steps;
  const ref = useRef<HTMLDivElement>(null);
  const [cur, setCur] = useState(-1);
  const [hold, setHold] = useState(false);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setSeen(!!e?.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  useEffect(() => {
    if (!seen || hold || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const first = window.setTimeout(() => setCur((c) => (c < 0 ? 0 : c)), 300);
    const t = window.setInterval(() => setCur((c) => (c + 1) % steps.length), 2200);
    return () => {
      window.clearTimeout(first);
      window.clearInterval(t);
    };
  }, [seen, hold, steps.length]);
  const pct = cur < 0 ? 0 : ((cur + 1) / steps.length) * 100;
  return (
    <div ref={ref} onMouseLeave={() => setHold(false)}>
      {/* barra di avanzamento: passo X di 7 */}
      <div className="mb-5 flex items-center gap-4">
        <span className="shrink-0 font-display text-[0.9375rem] font-bold text-fg">Passo {Math.max(1, cur + 1)} di {steps.length}</span>
        <span className="relative h-2.5 flex-1 overflow-hidden rounded-full border border-azure-300/40 bg-night/60">
          <span className="absolute inset-y-0 left-0 rounded-full bg-[image:var(--gradient-gold-btn)] shadow-[0_0_12px_rgb(247_200_92/0.8)] transition-[width] duration-700 ease-out-expo" style={{ width: `${pct}%` }} />
        </span>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((s, i) => {
          const on = i === cur;
          const done = cur >= 0 && i < cur;
          return (
            <div
              key={s.title}
              onMouseEnter={() => {
                setHold(true);
                setCur(i);
              }}
              className={cn("gl-card relative flex h-full flex-col rounded-[1.25rem] p-5 transition-transform duration-500", on && "gl-card--gold -translate-y-1")}
            >
              <div className="flex items-center justify-between">
                <span className={cn("relative transition-transform duration-500", on ? "scale-110 text-gold-200" : "text-gold-300")}>
                  <Icon name={s.icon} className="h-8 w-8" strokeWidth={1.6} />
                  {done && <span className="absolute -bottom-1 -right-2 grid h-4 w-4 place-items-center rounded-full bg-gold-300 text-night"><Icon name="check" className="h-2.5 w-2.5" strokeWidth={3.2} /></span>}
                </span>
                <span className={cn("font-display text-[1rem] font-semibold", on ? "text-gold-200" : "text-fg-2")}>0{i + 1}</span>
              </div>
              <p className="mt-4 font-display text-[1.25rem] font-bold leading-tight text-fg">{s.title}</p>
              <p className="mt-1.5 flex-1 text-[0.875rem] leading-snug text-fg-2">{s.text}</p>
            </div>
          );
        })}
        <Link href="/contatti" className="gl-card group flex h-full flex-col items-center justify-center gap-3 rounded-[1.25rem] p-5 text-center">
          <span className="text-gold-300">
            <Icon name="rocket" className="h-9 w-9" strokeWidth={1.6} />
          </span>
          <span className="font-display text-[1.25rem] font-bold text-fg">Iniziamo dal primo passo?</span>
          <span className="cta-btn inline-flex items-center gap-2 rounded-full bg-[image:var(--gradient-gold-btn)] px-5 py-2.5 text-[0.875rem] font-bold text-night">
            Prenota la call gratuita <Icon name="arrow-right" className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={2.4} />
          </span>
        </Link>
      </div>
    </div>
  );
}
