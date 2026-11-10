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
      const t0 = performance.now() + 500;
      const step = (now: number) => {
        const x = Math.min(1, Math.max(0, (now - t0) / 2200));
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
  }, []);
  return (
    <dl ref={ref} className="mt-10 grid max-w-xl grid-cols-4 divide-x divide-white/10 border-t border-white/10 pt-5">
      {items.map((n) => (
        <div key={n.label} className="flex flex-col px-3 first:pl-0">
          <dd className="hero-num font-display text-[clamp(1.25rem,1rem+1vw,1.75rem)] font-bold leading-none tracking-[-0.03em] text-gold tabular-nums">
            {n.prefix}
            {fmt(Math.round(n.value * k))}
            {n.suffix}
          </dd>
          <dt className="mt-1.5 text-[0.6875rem] leading-snug text-fg-3">{n.label}</dt>
        </div>
      ))}
    </dl>
  );
}
