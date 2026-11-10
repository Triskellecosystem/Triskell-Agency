"use client";

import { useEffect, useRef } from "react";

interface ParallaxProps {
  children: React.ReactNode;
  className?: string;
  /** "element": ±distance px mentre l'elemento attraversa il viewport. "page": scrollY × rate. */
  mode?: "element" | "page";
  /** Spostamento massimo in px (mode "element"). */
  distance?: number;
  /** Velocità relativa allo scroll (mode "page"), es. -0.1. */
  rate?: number;
}

/**
 * Parallax morbido. Solo transform; il listener si attiva solo quando l'elemento è vicino al viewport
 * e non viene registrato affatto con prefers-reduced-motion.
 */
export function Parallax({ children, className, mode = "element", distance = 48, rate = -0.1 }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    let active = false;

    const update = () => {
      raf = 0;
      if (mode === "page") {
        el.style.transform = `translate3d(0, ${Math.min(window.scrollY, 900) * rate}px, 0)`;
      } else {
        const r = el.getBoundingClientRect();
        const p = Math.min(1, Math.max(0, (window.innerHeight - r.top) / (window.innerHeight + r.height)));
        el.style.transform = `translate3d(0, ${(distance * (1 - 2 * p)).toFixed(1)}px, 0)`;
      }
    };
    const onScroll = () => {
      if (active && !raf) raf = requestAnimationFrame(update);
    };

    const io = new IntersectionObserver(([entry]) => {
      active = !!entry?.isIntersecting;
      if (active) onScroll();
    }, { rootMargin: "100px 0px" });
    io.observe(el);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, [mode, distance, rate]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
