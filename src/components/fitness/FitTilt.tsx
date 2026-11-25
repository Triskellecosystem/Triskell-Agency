"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

/**
 * Inclinazione 3D che segue il mouse o il dito: espone --rx/--ry (gradi) e --mx/--my (0–100%, per il riflesso).
 * Quando nessuno la tocca ondeggia piano da sola. I figli usano le variabili via CSS (classe .fit-tilt-*).
 */
export function FitTilt({ children, className, max = 12 }: { children: React.ReactNode; className?: string; max?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0, active = false, idleT = 0;
    let tx = 0, ty = 0, cx = 0, cy = 0;
    const set = (nx: number, ny: number) => { tx = nx; ty = ny; };
    const at = (x: number, y: number) => {
      const r = el.getBoundingClientRect();
      set(Math.max(-1, Math.min(1, ((x - r.left) / r.width - 0.5) * 2)), Math.max(-1, Math.min(1, ((y - r.top) / r.height - 0.5) * 2)));
      active = true;
      window.clearTimeout(idleT);
      idleT = window.setTimeout(() => { active = false; }, 1800);
    };
    const loop = (t: number) => {
      if (!active) set(Math.sin(t / 2600) * 0.35, Math.cos(t / 3100) * 0.25);
      cx += (tx - cx) * 0.09; cy += (ty - cy) * 0.09;
      el.style.setProperty("--ry", `${(cx * max).toFixed(2)}deg`);
      el.style.setProperty("--rx", `${(-cy * max * 0.8).toFixed(2)}deg`);
      el.style.setProperty("--mx", `${((cx + 1) * 50).toFixed(1)}%`);
      el.style.setProperty("--my", `${((cy + 1) * 50).toFixed(1)}%`);
      raf = requestAnimationFrame(loop);
    };
    if (reduced) return;
    const pm = (e: PointerEvent) => at(e.clientX, e.clientY);
    const tm = (e: TouchEvent) => { const t = e.touches[0]; if (t) at(t.clientX, t.clientY); };
    const leave = () => { active = false; };
    el.addEventListener("pointermove", pm);
    el.addEventListener("pointerdown", pm);
    el.addEventListener("pointerleave", leave);
    el.addEventListener("touchstart", tm, { passive: true });
    el.addEventListener("touchmove", tm, { passive: true });
    const io = new IntersectionObserver(([e]) => { cancelAnimationFrame(raf); if (e?.isIntersecting) raf = requestAnimationFrame(loop); });
    io.observe(el);
    return () => { cancelAnimationFrame(raf); io.disconnect(); window.clearTimeout(idleT); el.removeEventListener("pointermove", pm); el.removeEventListener("pointerdown", pm); el.removeEventListener("pointerleave", leave); el.removeEventListener("touchstart", tm); el.removeEventListener("touchmove", tm); };
  }, [max]);
  return <div ref={ref} className={cn("fit-tilt", className)}>{children}</div>;
}
