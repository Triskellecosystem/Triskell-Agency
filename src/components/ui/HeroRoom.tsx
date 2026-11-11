"use client";

import { useEffect, useRef } from "react";

/**
 * Stanza tech dell'apertura: un vero corridoio in 3D (pavimento, soffitto, due pareti e parete di fondo) fatto di linee
 * sottili, con scie di luce che corrono verso chi guarda e un portale che respira in fondo. Il punto di fuga segue
 * piano il mouse, così la stanza "si muove" con te. Solo CSS + una variabile; ferma con reduced motion.
 */
export function HeroRoom() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    const host = el?.closest("section");
    if (!el || !host || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    let tx = 0;
    let ty = 0;
    let x = 0;
    let y = 0;
    const tick = () => {
      x += (tx - x) * 0.04;
      y += (ty - y) * 0.04;
      el.style.setProperty("--px", x.toFixed(4));
      el.style.setProperty("--py", y.toFixed(4));
      raf = Math.abs(tx - x) + Math.abs(ty - y) > 0.001 ? requestAnimationFrame(tick) : 0;
    };
    const onMove = (e: PointerEvent) => {
      const r = host.getBoundingClientRect();
      tx = (e.clientX - r.left) / r.width - 0.5;
      ty = (e.clientY - r.top) / r.height - 0.5;
      if (!raf) raf = requestAnimationFrame(tick);
    };
    host.addEventListener("pointermove", onMove);
    return () => {
      host.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <div ref={ref} aria-hidden="true" className="hr3 pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="hr3-box">
        <div className="hr3-face hr3-floor">
          <i className="hr3-sweep" />
        </div>
        <div className="hr3-face hr3-ceil" />
        <div className="hr3-face hr3-left" />
        <div className="hr3-face hr3-right" />
        <div className="hr3-face hr3-back">
          <span className="hr3-portal"><span /><span /><span /><span /></span>
        </div>
      </div>
      <span className="hr3-rays" />
      <span className="hr3-pool" />
      <span className="hr3-veil" />
    </div>
  );
}
