"use client";

import { useEffect, useRef } from "react";

interface Spark { x: number; y: number; vx: number; vy: number; life: number; max: number; r: number; gold: boolean; square: boolean; rot: number; vr: number }
interface Pt { x: number; y: number; t: number }

/**
 * Effetto al movimento del mouse, riusabile in qualsiasi sezione: punti luce che si staccano dal cursore e
 * si collegano tra loro con sottili linee (come una rete), qualche quadratino che ruota e svanisce, e una scia
 * morbida. Si aggancia alla <section> più vicina. Canvas leggero, attivo solo mentre ci sono particelle e la
 * sezione è visibile. Disattivato su touch e con prefers-reduced-motion.
 */
export function DigitalCursor({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.closest("section");
    if (!canvas || !host) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const css = getComputedStyle(document.documentElement);
    const azure = css.getPropertyValue("--color-azure-300").trim() || "#3aa4d4";
        const gold = css.getPropertyValue("--color-gold-300").trim() || "#f7c85c";

    let w = 0;
    let h = 0;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const r = canvas.getBoundingClientRect();
      w = Math.max(1, Math.floor(r.width));
      h = Math.max(1, Math.floor(r.height));
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const sparks: Spark[] = [];
    const trail: Pt[] = [];
    let raf = 0;
    let running = false;
    let visible = false;
    let last = 0;
    let lastSpawn = { x: -999, y: -999 };
    const rnd = (a: number, b: number) => a + Math.random() * (b - a);

    const spawn = (x: number, y: number) => {
      const n = 2 + Math.floor(Math.random() * 2);
      for (let k = 0; k < n; k++) {
        const square = Math.random() < 0.22;
        sparks.push({
          x: x + rnd(-10, 10), y: y + rnd(-10, 10), vx: rnd(-0.35, 0.35), vy: rnd(-0.45, 0.25), life: 0, max: rnd(1.2, 2.2),
          r: square ? rnd(5, 9) : rnd(1.6, 3.4), gold: Math.random() < 0.3, square, rot: rnd(0, 6.28), vr: rnd(-1.2, 1.2),
        });
      }
      while (sparks.length > 70) sparks.shift();
    };

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      ctx.clearRect(0, 0, w, h);

      // scia morbida
      while (trail.length && now - trail[0]!.t > 420) trail.shift();
      if (trail.length > 1) {
        ctx.lineCap = "round";
        for (let i = 1; i < trail.length; i++) {
          const a = trail[i - 1]!;
          const b = trail[i]!;
          const age = Math.max(0, 1 - (now - b.t) / 420);
          ctx.strokeStyle = azure;
          ctx.globalAlpha = age * 0.35;
          ctx.lineWidth = 1 + age * 2;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
        const head = trail[trail.length - 1]!;
        const g = ctx.createRadialGradient(head.x, head.y, 0, head.x, head.y, 54);
        g.addColorStop(0, "rgba(58,164,212,0.32)");
        g.addColorStop(1, "rgba(58,164,212,0)");
        ctx.globalAlpha = Math.max(0, 1 - (now - head.t) / 420);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(head.x, head.y, 54, 0, 6.283);
        ctx.fill();
      }

      for (let i = sparks.length - 1; i >= 0; i--) {
        const p = sparks[i]!;
        p.life += dt;
        if (p.life >= p.max) { sparks.splice(i, 1); continue; }
        p.x += p.vx * 60 * dt;
        p.y += p.vy * 60 * dt;
        p.rot += p.vr * dt;
      }

      // linee sottili tra i punti vicini
      ctx.lineWidth = 1;
      for (let i = 0; i < sparks.length; i++) {
        const a = sparks[i]!;
        if (a.square) continue;
        for (let j = i + 1; j < sparks.length; j++) {
          const b = sparks[j]!;
          if (b.square) continue;
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d > 96) continue;
          const alpha = (1 - d / 96) * (1 - a.life / a.max) * (1 - b.life / b.max) * 0.75;
          ctx.globalAlpha = alpha;
          ctx.strokeStyle = azure;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      // punti luce e quadratini
      for (const p of sparks) {
        const k = p.life / p.max;
        const fade = k < 0.15 ? k / 0.15 : 1 - (k - 0.15) / 0.85;
        const col = p.gold ? gold : azure;
        if (p.square) {
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rot);
          ctx.globalAlpha = fade * 0.85;
          ctx.strokeStyle = col;
          ctx.lineWidth = 1.4;
          ctx.strokeRect(-p.r / 2, -p.r / 2, p.r, p.r);
          ctx.restore();
        } else {
          const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4);
          g.addColorStop(0, p.gold ? "rgba(247,200,92,0.85)" : "rgba(120,200,240,0.85)");
          g.addColorStop(1, "rgba(0,0,0,0)");
          ctx.globalAlpha = fade;
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r * 4, 0, 6.283);
          ctx.fill();
          ctx.globalAlpha = fade;
          ctx.fillStyle = "#fff";
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r * 0.6, 0, 6.283);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
      if (!sparks.length && !trail.length) {
        running = false;
        cancelAnimationFrame(raf);
        ctx.clearRect(0, 0, w, h);
      }
    };
    const kick = () => {
      if (running || !visible) return;
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    };
    const onMove = (e: Event) => {
      const ev = e as PointerEvent;
      if (ev.pointerType !== "mouse") return;
      const r = canvas.getBoundingClientRect();
      const x = ev.clientX - r.left;
      const y = ev.clientY - r.top;
      if (x < 0 || y < 0 || x > r.width || y > r.height) return;
      trail.push({ x, y, t: performance.now() });
      if (trail.length > 28) trail.shift();
      if (Math.hypot(x - lastSpawn.x, y - lastSpawn.y) > 16) {
        lastSpawn = { x, y };
        spawn(x, y);
      }
      kick();
    };
    const io = new IntersectionObserver(([en]) => {
      visible = !!en?.isIntersecting;
      if (!visible) { running = false; cancelAnimationFrame(raf); }
    });
    io.observe(canvas);
    host.addEventListener("pointermove", onMove);
    window.addEventListener("resize", resize);
    return () => {
      host.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", resize);
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className={className ?? "pointer-events-none absolute inset-0 h-full w-full"} />;
}
