"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

/**
 * Oggetto 3D comandabile, come il libro di Triskell Ecosystem:
 * - col mouse sopra segue il puntatore in modo morbido;
 * - si trascina col mouse o col dito (in orizzontale; in verticale la pagina scorre normalmente) e gira 1:1 con
 *   il dito, con inerzia quando lo lasci;
 * - poi torna piano verso il centro e ondeggia da solo.
 * Il transform è scritto direttamente sull'elemento a ogni frame (niente transizioni CSS che rallentano).
 */
export function FitTilt({ children, className, max = 12 }: { children: React.ReactNode; className?: string; max?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    const body = el?.querySelector<HTMLElement>(".fit-tilt-body");
    if (!el || !body) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const LIM = max * 3; // quanto si può girare trascinando
    let ry = 0, rx = 0, vy = 0, vx = 0, tRy = 0, tRx = 0;
    let hover = false, drag = false, lastX = 0, lastY = 0, raf = 0, visible = false;
    let idleSince = performance.now();
    const apply = () => {
      body.style.transform = `rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg)`;
      el.style.setProperty("--ry", `${ry.toFixed(2)}deg`);
      el.style.setProperty("--rx", `${rx.toFixed(2)}deg`);
      el.style.setProperty("--mx", `${(50 + (ry / LIM) * 50).toFixed(1)}%`);
      el.style.setProperty("--my", `${(50 - (rx / LIM) * 50).toFixed(1)}%`);
    };
    const loop = (t: number) => {
      raf = requestAnimationFrame(loop);
      if (!visible) return;
      if (drag) {
        // gestito in move
      } else if (hover) {
        ry += (tRy - ry) * 0.14; rx += (tRx - rx) * 0.14; vy = vx = 0; idleSince = t;
      } else if (Math.abs(vy) > 0.03 || Math.abs(vx) > 0.03) {
        ry = Math.max(-LIM, Math.min(LIM, ry + vy)); rx = Math.max(-LIM, Math.min(LIM, rx + vx));
        vy *= 0.94; vx *= 0.94; idleSince = t;
      } else {
        // ritorno morbido e ondeggiamento automatico
        const k = Math.min(1, (t - idleSince) / 1500);
        const sy = reduced ? 0 : Math.sin(t / 2200) * max * 0.45 * k;
        const sx = reduced ? 0 : Math.cos(t / 2800) * max * 0.25 * k;
        ry += (sy - ry) * 0.05; rx += (sx - rx) * 0.05;
      }
      apply();
    };
    const down = (e: PointerEvent) => {
      drag = true; lastX = e.clientX; lastY = e.clientY; vy = vx = 0;
      try { el.setPointerCapture(e.pointerId); } catch {}
    };
    const move = (e: PointerEvent) => {
      if (!drag) {
        if (e.pointerType === "mouse") {
          const r = el.getBoundingClientRect();
          hover = true;
          tRy = ((e.clientX - r.left) / r.width - 0.5) * 2 * max * 1.6;
          tRx = -((e.clientY - r.top) / r.height - 0.5) * 2 * max * 1.2;
        }
        return;
      }
      const dx = e.clientX - lastX, dy = e.clientY - lastY;
      lastX = e.clientX; lastY = e.clientY;
      ry = Math.max(-LIM, Math.min(LIM, ry + dx * 0.55));
      rx = Math.max(-LIM, Math.min(LIM, rx - dy * 0.4));
      vy = dx * 0.55; vx = -dy * 0.4;
    };
    const up = (e: PointerEvent) => {
      drag = false; idleSince = performance.now();
      try { if (el.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId); } catch {}
    };
    const leave = () => { hover = false; idleSince = performance.now(); };
    el.addEventListener("pointerdown", down);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerup", up);
    el.addEventListener("pointercancel", up);
    el.addEventListener("pointerleave", leave);
    const io = new IntersectionObserver(([en]) => { visible = !!en?.isIntersecting; });
    io.observe(el);
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf); io.disconnect();
      el.removeEventListener("pointerdown", down); el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerup", up); el.removeEventListener("pointercancel", up); el.removeEventListener("pointerleave", leave);
    };
  }, [max]);
  return <div ref={ref} className={cn("fit-tilt cursor-grab touch-pan-y select-none active:cursor-grabbing", className)}>{children}</div>;
}
