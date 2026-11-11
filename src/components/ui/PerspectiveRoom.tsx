"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

export type RoomMode = "full" | "floor" | "corridor" | "box";

/**
 * Stanza 3D fatta di quadrati, ferma: pavimento, soffitto, pareti e fondo a griglia in prospettiva.
 * Varianti: punto di fuga (x, y), grandezza dei quadrati (q), forma (stanza intera, solo pavimento, corridoio senza
 * soffitto, scatola con il fondo in evidenza), filo d'oro sul pavimento. Il punto di fuga segue appena il mouse.
 */
export function PerspectiveRoom({ className, x = 62, y = 42, q = 150, mode = "full", gold = false, strong = false }: { className?: string; x?: number; y?: number; q?: number; mode?: RoomMode; gold?: boolean; strong?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    const host = el?.closest("section");
    if (!el || !host || window.matchMedia("(prefers-reduced-motion: reduce)").matches || window.matchMedia("(pointer: coarse)").matches) return;
    let raf = 0, tx = 0, ty = 0, cx = 0, cy = 0;
    const tick = () => {
      cx += (tx - cx) * 0.03; cy += (ty - cy) * 0.03;
      el.style.setProperty("--px", cx.toFixed(4)); el.style.setProperty("--py", cy.toFixed(4));
      raf = Math.abs(tx - cx) + Math.abs(ty - cy) > 0.0005 ? requestAnimationFrame(tick) : 0;
    };
    const onMove = (e: PointerEvent) => {
      const r = host.getBoundingClientRect();
      tx = (e.clientX - r.left) / r.width - 0.5; ty = (e.clientY - r.top) / r.height - 0.5;
      if (!raf) raf = requestAnimationFrame(tick);
    };
    host.addEventListener("pointermove", onMove);
    return () => { host.removeEventListener("pointermove", onMove); cancelAnimationFrame(raf); };
  }, []);
  return (
    <div ref={ref} aria-hidden="true" className={cn("prm pointer-events-none absolute inset-0 -z-10 overflow-hidden", `prm--${mode}`, gold && "prm--gold", strong && "prm--strong", className)} style={{ "--vx": `${x}%`, "--vy": `${y}%`, "--q": `${q}px` } as React.CSSProperties}>
      <div className="prm-box">
        <i className="prm-f prm-floor" />
        <i className="prm-f prm-ceil" />
        <i className="prm-f prm-left" />
        <i className="prm-f prm-right" />
        <i className="prm-f prm-back" />
      </div>
      <span className="prm-shade" />
    </div>
  );
}
