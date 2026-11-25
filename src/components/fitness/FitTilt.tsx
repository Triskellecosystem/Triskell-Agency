"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

/**
 * Inclinazione 3D fluida che segue mouse o dito. Usa una "molla" (posizione + velocità) aggiornata a ogni frame
 * in base al tempo trascorso, così il movimento è morbido a qualunque frequenza di schermo. Il mouse viene seguito
 * anche un po' fuori dall'elemento (area allargata), senza scatti quando entra o esce. Quando nessuno lo tocca
 * ondeggia piano da solo. Espone --rx/--ry (gradi) e --mx/--my (riflesso) ai figli.
 */
export function FitTilt({ children, className, max = 12 }: { children: React.ReactNode; className?: string; max?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0, last = 0, lastInput = -1e9, visible = false;
    let tx = 0, ty = 0; // obiettivo (-1..1)
    let x = 0, y = 0, vx = 0, vy = 0; // stato della molla
    const K = 38, D = 11; // rigidità e smorzamento
    const PAD = 160; // area allargata intorno all'elemento
    const input = (cx: number, cy: number) => {
      const r = el.getBoundingClientRect();
      if (cx < r.left - PAD || cx > r.right + PAD || cy < r.top - PAD || cy > r.bottom + PAD) return;
      tx = Math.max(-1, Math.min(1, ((cx - r.left) / r.width - 0.5) * 2));
      ty = Math.max(-1, Math.min(1, ((cy - r.top) / r.height - 0.5) * 2));
      lastInput = performance.now();
    };
    const loop = (t: number) => {
      const dt = Math.min(0.05, (t - (last || t)) / 1000); last = t;
      // dopo 1,5 s senza input torna piano all'ondeggiamento automatico
      const idle = Math.min(1, Math.max(0, (t - lastInput - 1500) / 1200));
      const ix = Math.sin(t / 2300) * 0.38, iy = Math.cos(t / 2900) * 0.26;
      const gx = tx * (1 - idle) + ix * idle, gy = ty * (1 - idle) + iy * idle;
      vx += (K * (gx - x) - D * vx) * dt; vy += (K * (gy - y) - D * vy) * dt;
      x += vx * dt; y += vy * dt;
      el.style.setProperty("--ry", `${(x * max).toFixed(3)}deg`);
      el.style.setProperty("--rx", `${(-y * max * 0.8).toFixed(3)}deg`);
      el.style.setProperty("--mx", `${((x + 1) * 50).toFixed(2)}%`);
      el.style.setProperty("--my", `${((y + 1) * 50).toFixed(2)}%`);
      if (visible) raf = requestAnimationFrame(loop);
    };
    const pm = (e: PointerEvent) => input(e.clientX, e.clientY);
    const tm = (e: TouchEvent) => { const p = e.touches[0]; if (p) input(p.clientX, p.clientY); };
    window.addEventListener("pointermove", pm, { passive: true });
    el.addEventListener("touchstart", tm, { passive: true });
    el.addEventListener("touchmove", tm, { passive: true });
    const io = new IntersectionObserver(([e]) => {
      const was = visible; visible = !!e?.isIntersecting;
      if (visible && !was) { last = 0; raf = requestAnimationFrame(loop); }
      if (!visible) cancelAnimationFrame(raf);
    });
    io.observe(el);
    return () => { cancelAnimationFrame(raf); io.disconnect(); window.removeEventListener("pointermove", pm); el.removeEventListener("touchstart", tm); el.removeEventListener("touchmove", tm); };
  }, [max]);
  return <div ref={ref} className={cn("fit-tilt", className)}>{children}</div>;
}
