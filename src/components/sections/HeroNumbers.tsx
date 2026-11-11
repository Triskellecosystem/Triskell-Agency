"use client";

import { useEffect, useRef, useState } from "react";
import type { Metric } from "@/content/site";

const fmt = (n: number) => n.toLocaleString("it-IT");

/**
 * I numeri chiave della hero: partono da zero e salgono fino al loro valore (dopo la schermata di caricamento),
 * poi restano con un leggero bagliore che pulsa.
 */
export function HeroNumbers({ items }: { items: Metric[] }) {
  const ref = useRef<HTMLDListElement>(null);
  const [k, setK] = useState(0);
  const [run, setRun] = useState(0); // passando il mouse sopra i numeri ripartono
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const id = requestAnimationFrame(() => setK(1));
      return () => cancelAnimationFrame(id);
    }
    let raf = 0;
    let started = false;
    const go = () => {
      if (started) return;
      started = true;
      const t0 = performance.now() + (run ? 0 : 400);
      const step = (now: number) => {
        const x = Math.min(1, Math.max(0, (now - t0) / 1600));
        setK(1 - Math.pow(1 - x, 3));
        if (x < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    };
    // aspetta che la schermata di caricamento sia sparita
    const wait = () => (document.documentElement.hasAttribute("data-loading") ? window.setTimeout(wait, 150) : go());
    const io = new IntersectionObserver(([e]) => e?.isIntersecting && wait());
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [run]);
  return (
    <dl ref={ref} onMouseEnter={() => k >= 1 && setRun((r) => r + 1)} className="mt-10 inline-flex max-w-full cursor-default divide-x divide-white/10 border-t border-white/10 pt-5">
      {items.map((n) => (
        <div key={n.label} className="flex flex-col px-4 first:pl-0 last:pr-0 sm:px-6">
          <dd key={`${n.label}-${k >= 1}`} className="hero-num hero-num-done relative font-display text-[clamp(1.25rem,1rem+1vw,1.75rem)] font-bold leading-none tracking-[-0.03em] tabular-nums">
            {/* il valore finale invisibile tiene ferma la larghezza mentre il numero sale */}
            <span className="invisible">
              {n.prefix}
              {n.value < 20 ? n.value.toLocaleString("it-IT", { minimumFractionDigits: 1, maximumFractionDigits: 1 }) : fmt(n.value)}
              {n.suffix}
            </span>
            <span className="text-gold absolute left-0 top-0">
              {n.prefix}
              {k < 1 && n.value < 20 ? (n.value * k).toLocaleString("it-IT", { minimumFractionDigits: 1, maximumFractionDigits: 1 }) : fmt(Math.round(n.value * k))}
              {n.suffix}
            </span>
          </dd>
          <dt className="mt-1.5 text-[0.6875rem] leading-snug text-fg-3">{n.label}</dt>
        </div>
      ))}
    </dl>
  );
}
