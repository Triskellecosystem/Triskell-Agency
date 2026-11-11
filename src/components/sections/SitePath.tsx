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
        <span className="shrink-0 font-mono text-[0.75rem] font-bold text-gold-300">Passo {Math.max(1, cur + 1)} di {steps.length}</span>
        <span className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
          <span className="absolute inset-y-0 left-0 rounded-full bg-[image:var(--gradient-gold-btn)] transition-[width] duration-700 ease-out-expo" style={{ width: `${pct}%` }} />
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
              className={cn(
                "relative flex h-full flex-col rounded-2xl border bg-[linear-gradient(170deg,var(--color-surface-2),var(--color-night-raised))] p-4 shadow-[0_18px_40px_-24px_rgb(0_0_0/0.9)] transition-[border-color,transform,opacity] duration-500",
                on ? "-translate-y-1.5 scale-[1.02] border-white/40" : done ? "border-gold-300/35" : "border-white/[0.09]",
              )}
            >
              <span aria-hidden="true" className={cn("absolute inset-x-4 top-0 h-[3px] rounded-b-full transition-colors duration-500", on ? "bg-[image:var(--gradient-gold-btn)]" : done ? "bg-gold-300/40" : "bg-white/10")} />
              <div className="flex items-center justify-between">
                <span className={cn("grid h-10 w-10 place-items-center rounded-xl border transition-colors duration-300", on ? "border-gold-300 bg-gold-300 text-night" : "border-white/10 bg-white/[0.04] text-gold-300")}>
                  <Icon name={done ? "check" : s.icon} className="h-[1.1rem] w-[1.1rem]" strokeWidth={done ? 2.6 : 1.9} />
                </span>
                <span className={cn("rounded-full px-2.5 py-0.5 font-mono text-[0.6875rem] font-bold", on ? "bg-gold-300/15 text-gold-200" : "text-fg-3")}>{on ? "In corso" : `0${i + 1}`}</span>
              </div>
              <p className="mt-3.5 font-display text-[1.0625rem] font-semibold text-fg">{s.title}</p>
              <p className="mt-1 flex-1 text-[0.8125rem] leading-snug text-fg-2">{s.text}</p>
              <p className="mt-3 flex items-center gap-1.5 border-t border-white/[0.07] pt-2.5 text-[0.75rem] font-medium text-fg">
                <Icon name="arrow-right" className="h-3.5 w-3.5 text-gold-300" strokeWidth={2.4} />
                {s.get}
              </p>
            </div>
          );
        })}
        <Link href="/contatti" className="group flex h-full flex-col items-center justify-center gap-3 rounded-2xl border border-gold-300/40 bg-[linear-gradient(150deg,rgb(247_200_92/0.14),rgb(5_31_54/0.7))] p-5 text-center transition-colors hover:border-gold-300/80">
          <span className="grid h-11 w-11 place-items-center rounded-full bg-gold-300/15 text-gold-300">
            <Icon name="rocket" className="h-5 w-5" strokeWidth={1.9} />
          </span>
          <span className="font-display text-[1.0625rem] font-semibold text-fg">Iniziamo dal primo passo?</span>
          <span className="cta-btn inline-flex items-center gap-2 rounded-full bg-[image:var(--gradient-gold-btn)] px-5 py-2.5 text-[0.875rem] font-bold text-night">
            Prenota la call gratuita <Icon name="arrow-right" className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={2.4} />
          </span>
        </Link>
      </div>
    </div>
  );
}
