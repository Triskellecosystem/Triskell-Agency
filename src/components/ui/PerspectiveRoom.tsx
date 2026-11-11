"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

/**
 * Stanza in prospettiva per le aperture delle pagine: pavimento, soffitto, pareti e fondo fatti di quadratoni sottili,
 * ferma (niente linee che scorrono). Il punto di fuga si sposta appena col mouse, molto piano. Tenue: si vede, non disturba.
 */
export function PerspectiveRoom({ className, x = 62, y = 42 }: { className?: string; x?: number; y?: number }) {
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
    <div ref={ref} aria-hidden="true" className={cn("prm pointer-events-none absolute inset-0 -z-10 overflow-hidden", className)} style={{ "--vx": `${x}%`, "--vy": `${y}%` } as React.CSSProperties}>
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
