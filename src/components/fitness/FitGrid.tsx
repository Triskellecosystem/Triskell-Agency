"use client";

import { useEffect, useRef } from "react";

/**
 * Sfondo a "quadratoni" verde fluo: griglia sottile, quadrati che si accendono da soli qua e là e una scia di
 * quadrati accesi che segue il mouse (o il dito). Canvas, si ferma quando non è sullo schermo.
 */
export function FitGrid({ cell = 64, density = 0.035, className }: { cell?: number; density?: number; className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0, h = 0, cols = 0, rows = 0, dpr = 1, raf = 0, on = true, last = 0;
    let heat = new Float32Array(0);
    const size = () => {
      const r = cv.getBoundingClientRect();
      dpr = Math.min(2, window.devicePixelRatio || 1);
      w = r.width; h = r.height;
      cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr);
      const c = w < 640 ? cell * 0.75 : cell;
      cols = Math.ceil(w / c) + 1; rows = Math.ceil(h / c) + 1;
      heat = new Float32Array(cols * rows);
      return c;
    };
    let c = size();
    const light = (x: number, y: number, v = 1) => {
      const i = Math.floor(x / c), j = Math.floor(y / c);
      if (i < 0 || j < 0 || i >= cols || j >= rows) return;
      const k = j * cols + i;
      heat[k] = Math.max(heat[k]!, v);
    };
    const draw = (t: number) => {
      const dt = Math.min(64, t - last || 16); last = t;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      // quadrati accesi
      const mob = w < 640;
      if (!reduced && Math.random() < density * (dt / 16) * (mob ? 1.2 : 6)) {
        const k = Math.floor(Math.random() * heat.length);
        heat[k] = 0.55 + Math.random() * 0.45;
      }
      for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) {
        const k = j * cols + i, v = heat[k]!;
        if (v <= 0.01) continue;
        ctx.fillStyle = `rgba(166,255,0,${(v * (w < 640 ? 0.1 : 0.22)).toFixed(3)})`;
        ctx.fillRect(i * c + 1, j * c + 1, c - 2, c - 2);
        ctx.strokeStyle = `rgba(190,255,60,${(v * (w < 640 ? 0.35 : 0.7)).toFixed(3)})`;
        ctx.lineWidth = 1;
        ctx.strokeRect(i * c + 1.5, j * c + 1.5, c - 3, c - 3);
        heat[k] = v * Math.pow(w < 640 ? 0.985 : 0.965, dt / 16);
      }
      // griglia
      ctx.strokeStyle = w < 640 ? "rgba(166,255,0,0.035)" : "rgba(166,255,0,0.07)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let i = 0; i <= cols; i++) { ctx.moveTo(i * c + 0.5, 0); ctx.lineTo(i * c + 0.5, h); }
      for (let j = 0; j <= rows; j++) { ctx.moveTo(0, j * c + 0.5); ctx.lineTo(w, j * c + 0.5); }
      ctx.stroke();
      if (on && !reduced) raf = requestAnimationFrame(draw);
    };
    const move = (e: PointerEvent) => {
      const r = cv.getBoundingClientRect();
      const x = e.clientX - r.left, y = e.clientY - r.top;
      if (x < 0 || y < 0 || x > w || y > h) return;
      light(x, y, 1);
      light(x + c, y, 0.35); light(x - c, y, 0.35); light(x, y + c, 0.35); light(x, y - c, 0.35);
    };
    const io = new IntersectionObserver(([e]) => {
      const was = on; on = !!e?.isIntersecting;
      if (on && !was && !reduced) raf = requestAnimationFrame(draw);
    });
    io.observe(cv);
    const ro = new ResizeObserver(() => { c = size(); if (reduced) draw(0); });
    ro.observe(cv);
    window.addEventListener("pointermove", move, { passive: true });
    raf = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(raf); io.disconnect(); ro.disconnect(); window.removeEventListener("pointermove", move); };
  }, [cell, density]);
  return <canvas ref={ref} aria-hidden="true" className={className ?? "pointer-events-none absolute inset-0 h-full w-full"} />;
}
