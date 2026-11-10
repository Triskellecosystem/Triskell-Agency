"use client";

import { useEffect } from "react";
import { setLenis } from "@/lib/lenis";

/** Smooth scroll con Lenis (disattivato con prefers-reduced-motion). Anchor links inclusi. */
export function SmoothScroll() {
  useEffect(() => {
    // niente Lenis con reduced motion né su dispositivi touch (scroll nativo, zero JS extra)
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    let cancelled = false;
    let destroy: (() => void) | undefined;

    import("lenis").then(({ default: Lenis }) => {
      if (cancelled) return;
      // "Zona morta": un tocco leggero o le dita appoggiate sul touchpad generano micro-movimenti che
      // facevano scivolare la pagina. Si scorre solo con un gesto deliberato: i micro-impulsi isolati
      // vengono ignorati finché il movimento cumulato (in ~150 ms) non supera la soglia.
      let acc = 0;
      let lastEvent = 0;
      const lenis = new Lenis({
        duration: 0.95,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        wheelMultiplier: 0.9,
        anchors: true,
        autoRaf: true,
        virtualScroll: ({ deltaY, event }) => {
          if (event.type !== "wheel" || (event as WheelEvent).ctrlKey) return true;
          const now = performance.now();
          if (now - lastEvent > 150) acc = 0;
          lastEvent = now;
          acc += Math.abs(deltaY);
          if (acc < 14) {
            event.preventDefault();
            return false;
          }
          return true;
        },
      });
      setLenis(lenis);
      destroy = () => {
        lenis.destroy();
        setLenis(null);
      };
    });

    return () => {
      cancelled = true;
      destroy?.();
    };
  }, []);

  return null;
}
