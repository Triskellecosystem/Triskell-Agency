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
      x += (tx - x) * 0.06;
      y += (ty - y) * 0.06;
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
          <i className="hr3-beam" style={{ left: "18%", animationDelay: "-1s" }} />
          <i className="hr3-beam" style={{ left: "42%", animationDelay: "-3.4s" }} />
          <i className="hr3-beam hr3-beam--gold" style={{ left: "63%", animationDelay: "-2.2s" }} />
          <i className="hr3-beam" style={{ left: "84%", animationDelay: "-4.6s" }} />
        </div>
        <div className="hr3-face hr3-ceil" />
        <div className="hr3-face hr3-left">
          <i className="hr3-strip" style={{ top: "30%" }} />
          <i className="hr3-strip hr3-strip--gold" style={{ top: "62%", animationDelay: "-2.5s" }} />
        </div>
        <div className="hr3-face hr3-right">
          <i className="hr3-strip hr3-strip--gold" style={{ top: "36%", animationDelay: "-1.2s" }} />
          <i className="hr3-strip" style={{ top: "70%", animationDelay: "-3.6s" }} />
        </div>
        <div className="hr3-face hr3-back">
          <span className="hr3-portal"><span /><span /><span /></span>
        </div>
      </div>
      <span className="hr3-veil" />
    </div>
  );
}
