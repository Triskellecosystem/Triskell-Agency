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
  return (
    <div ref={ref} className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4" onMouseLeave={() => setHold(false)}>
      {steps.map((s, i) => {
        const on = i === cur;
        return (
          <div
            key={s.title}
            onMouseEnter={() => {
              setHold(true);
              setCur(i);
            }}
            className={cn("sp-card group relative flex h-full flex-col overflow-hidden rounded-2xl border p-4 transition-[border-color,background-color,box-shadow,transform] duration-500", on ? "-translate-y-1 border-gold-300/70 bg-[linear-gradient(160deg,rgb(247_200_92/0.12),rgb(10_30_48/0.75))] shadow-[0_0_40px_-14px_rgb(247_200_92/0.6)]" : "border-white/[0.08] bg-[rgb(10_30_48/0.55)]")}
          >
            {on && <span aria-hidden="true" className="sp-flash" />}
            <div className="relative flex items-center justify-between">
              <span className={cn("relative grid h-9 w-9 place-items-center rounded-xl transition-colors duration-300", on ? "bg-gold-300 text-night" : "bg-gold-300/10 text-gold-300")}>
                {on && <span aria-hidden="true" className="sp-ping absolute inset-0 rounded-xl" />}
                <Icon name={s.icon} className="h-4 w-4" strokeWidth={1.9} />
              </span>
              <span className={cn("font-display text-[1.5rem] font-semibold leading-none transition-colors duration-300", on ? "text-gold-300" : "text-white/15")}>0{i + 1}</span>
            </div>
            <p className="relative mt-3 font-display text-[1rem] font-semibold text-fg">{s.title}</p>
            <p className="relative mt-1 flex-1 text-[0.8125rem] leading-snug text-fg-3">{s.text}</p>
            <p className="relative mt-3 flex items-center gap-1.5 border-t border-white/[0.06] pt-2.5 text-[0.75rem] text-fg-2">
              <Icon name="check" className="h-3.5 w-3.5 text-gold-300" strokeWidth={2.6} />
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
  );
}
