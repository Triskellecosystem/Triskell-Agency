"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

/**
 * Effetto al passaggio del mouse (Triskell Agency): una griglia di puntini dorati che si "accende" solo attorno al
 * cursore, come una lente, con un alone morbido che lo segue con un leggero ritardo. Nessun canvas: due livelli
 * CSS mossi con variabili (--cx, --cy). Si aggancia alla <section> più vicina. Spento su touch e con reduced motion.
 */
export function DigitalCursor({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const host = el?.closest("section");
    if (!el || !host) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const path = el.querySelector<SVGPathElement>("path");
    const pts: Array<{ x: number; y: number; t: number }> = [];
    let trailRaf = 0;
    const drawTrail = () => {
      const now = performance.now();
      while (pts.length && now - pts[0]!.t > 520) pts.shift();
      if (path) {
        if (pts.length < 2) path.setAttribute("d", "");
        else {
          let d = `M${pts[0]!.x.toFixed(1)} ${pts[0]!.y.toFixed(1)}`;
          for (let i = 1; i < pts.length - 1; i++) {
            const a = pts[i]!;
            const b = pts[i + 1]!;
            d += ` Q${a.x.toFixed(1)} ${a.y.toFixed(1)} ${((a.x + b.x) / 2).toFixed(1)} ${((a.y + b.y) / 2).toFixed(1)}`;
          }
          path.setAttribute("d", d);
        }
      }
      trailRaf = pts.length ? requestAnimationFrame(drawTrail) : 0;
    };
    let tx = 0;
    let ty = 0;
    let x = 0;
    let y = 0;
    let raf = 0;
    const tick = () => {
      x += (tx - x) * 0.16;
      y += (ty - y) * 0.16;
      el.style.setProperty("--cx", `${x.toFixed(1)}px`);
      el.style.setProperty("--cy", `${y.toFixed(1)}px`);
      raf = Math.abs(tx - x) + Math.abs(ty - y) > 0.5 ? requestAnimationFrame(tick) : 0;
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const r = el.getBoundingClientRect();
      tx = e.clientX - r.left;
      ty = e.clientY - r.top;
      // piccola onda che rende la scia un "ghirigoro" morbido
      const w = Math.sin(performance.now() / 90) * 6;
      pts.push({ x: tx + w, y: ty - w * 0.6, t: performance.now() });
      if (pts.length > 40) pts.shift();
      if (!trailRaf) trailRaf = requestAnimationFrame(drawTrail);
      if (!el.dataset.on) {
        x = tx;
        y = ty;
        el.dataset.on = "1";
      }
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const onLeave = () => {
      delete el.dataset.on;
    };
    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerleave", onLeave);
    return () => {
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
      cancelAnimationFrame(trailRaf);
    };
  }, []);

  return (
    <div ref={ref} aria-hidden="true" className={cn("dc pointer-events-none absolute inset-0 overflow-hidden", className)}>
      <span className="dc-glow" />
      <span className="dc-grid" />
      <svg className="dc-trail absolute inset-0 h-full w-full">
        <defs>
          <linearGradient id="dc-g" x1="0" x2="1">
            <stop offset="0%" stopColor="rgb(58 164 212 / 0)" />
            <stop offset="100%" stopColor="rgb(247 200 92 / 0.85)" />
          </linearGradient>
        </defs>
        <path fill="none" stroke="url(#dc-g)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}
