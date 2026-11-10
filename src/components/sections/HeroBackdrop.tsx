"use client";

import { useEffect, useRef } from "react";
import { DigitalCursor } from "@/components/motion/DigitalCursor";

/**
 * Sfondo scenico della hero, tutto in blu trasparente:
 * · pavimento digitale in prospettiva che scorre verso chi guarda (CSS 3D, solo transform);
 * · lastre di vetro azzurro sospese e fasci di luce;
 * · al movimento del mouse nascono punti luce collegati da sottili linee (<DigitalCursor />).
 * Il mouse sposta anche la scena in parallasse. Su mobile / touch / reduced motion: scena statica.
 */
export function HeroBackdrop() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const host = root?.closest("section");
    if (!root || !host) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    let mx = 0;
    let my = 0;
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const r = root.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      if (x < 0 || y < 0 || x > r.width || y > r.height) return;
      mx = (x / r.width - 0.5) * 2;
      my = (y / r.height - 0.5) * 2;
      if (!raf) {
        raf = requestAnimationFrame(() => {
          raf = 0;
          root.style.setProperty("--mx", mx.toFixed(3));
          root.style.setProperty("--my", my.toFixed(3));
        });
      }
    };
    host.addEventListener("pointermove", onMove);
    return () => {
      host.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={rootRef} aria-hidden="true" className="hero-backdrop pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* alone dell'orizzonte */}
      <div className="hero-horizon" />

      {/* pavimento digitale in prospettiva */}
      <div className="hero-floor">
        <div className="hero-floor-plane">
          <div className="hero-floor-grid hero-anim" />
        </div>
      </div>

      {/* fasci di luce */}
      <div className="hero-beam hero-beam--a hero-anim" />
      <div className="hero-beam hero-beam--b hero-anim" />

      {/* lastre di vetro azzurro sospese */}
      <div className="hero-sheet hero-sheet--a">
        <div className="hero-anim hero-sheet-inner" />
      </div>
      <div className="hero-sheet hero-sheet--b">
        <div className="hero-anim hero-sheet-inner hero-sheet-inner--slow" />
      </div>
      <div className="hero-sheet hero-sheet--c">
        <div className="hero-anim hero-sheet-inner" />
      </div>

      {/* solo telefono: riquadri tech che fluttuano e aurora che si sposta (al posto del fascio a strisce) */}
      <div className="hero-m md:hidden">
        <span className="hero-m-aurora hero-m-aurora--a" />
        <span className="hero-m-aurora hero-m-aurora--b" />
        {[
          [8, 12, 34, 0], [78, 8, 22, 1], [88, 34, 40, 2], [16, 38, 18, 3], [62, 46, 28, 4], [4, 62, 30, 5], [48, 70, 20, 6], [84, 74, 34, 7], [30, 86, 24, 8], [68, 90, 18, 9],
        ].map(([x, y, s, i]) => (
          <span key={i} className="hero-m-sq" style={{ left: `${x}%`, top: `${y}%`, width: `${s}px`, height: `${s}px`, animationDelay: `${-(i ?? 0) * 1.3}s`, animationDuration: `${7 + ((i ?? 0) % 4) * 2}s` }} />
        ))}
      </div>

      {/* punti luce e linee al passaggio del mouse */}
      <DigitalCursor />
    </div>
  );
}
