"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

/**
 * Scena in prospettiva per gli sfondi "luxury": una stanza 3D (pavimento a griglia che scorre, parete di fondo
 * con alone, colonne di luce che si accendono piano, polvere dorata che galleggia). Segue il mouse e lo scroll
 * con una leggera parallasse. Tutto dietro il contenuto, aria-hidden. Statica con reduced motion.
 */
const DUST = Array.from({ length: 26 }, (_, i) => {
  const r = (n: number) => {
    const x = Math.sin(i * 91.7 + n * 37.1) * 43758.5453;
    return x - Math.floor(x);
  };
  return { x: Math.round(r(1) * 100), y: Math.round(r(2) * 100), d: (r(3) * 8).toFixed(2), s: 2 + Math.floor(r(4) * 3), z: Math.round(r(5) * 3) };
});

export function Stage3D({ className, tone = "mixed" }: { className?: string; tone?: "mixed" | "gold" | "azure" }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    const host = el?.closest("section");
    if (!el || !host || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    let mx = 0;
    let my = 0;
    const apply = () => {
      raf = 0;
      const r = host.getBoundingClientRect();
      const sy = Math.max(-1, Math.min(1, (r.top + r.height / 2 - innerHeight / 2) / innerHeight));
      el.style.setProperty("--mx", mx.toFixed(3));
      el.style.setProperty("--my", my.toFixed(3));
      el.style.setProperty("--sy", sy.toFixed(3));
    };
    const req = () => {
      if (!raf) raf = requestAnimationFrame(apply);
    };
    const onMove = (e: PointerEvent) => {
      const r = host.getBoundingClientRect();
      mx = ((e.clientX - r.left) / r.width - 0.5) * 2;
      my = ((e.clientY - r.top) / r.height - 0.5) * 2;
      req();
    };
    host.addEventListener("pointermove", onMove);
    window.addEventListener("scroll", req, { passive: true });
    req();
    return () => {
      host.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", req);
      cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <div ref={ref} aria-hidden="true" className={cn("st3 pointer-events-none absolute inset-0 -z-10 overflow-hidden", `st3--${tone}`, className)}>
      <div className="st3-room">
        <span className="st3-wall" />
        <span className="st3-floor"><i /></span>
        <span className="st3-ceil"><i /></span>
        <span className="st3-beam st3-beam--a" />
        <span className="st3-beam st3-beam--b" />
        <span className="st3-beam st3-beam--c" />
      </div>
      <div className="st3-dust">
        {DUST.map((d, i) => (
          <i key={i} style={{ left: `${d.x}%`, top: `${d.y}%`, width: d.s, height: d.s, animationDelay: `-${d.d}s`, "--z": d.z } as React.CSSProperties} />
        ))}
      </div>
      <span className="st3-vignette" />
    </div>
  );
}
