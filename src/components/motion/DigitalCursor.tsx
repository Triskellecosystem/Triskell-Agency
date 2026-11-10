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
    };
  }, []);

  return (
    <div ref={ref} aria-hidden="true" className={cn("dc pointer-events-none absolute inset-0 overflow-hidden", className)}>
      <span className="dc-glow" />
      <span className="dc-grid" />
    </div>
  );
}
