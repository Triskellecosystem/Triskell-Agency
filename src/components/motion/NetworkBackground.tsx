"use client";

import { useEffect, useRef } from "react";

interface Node {
  a: number; // angolo
  w: number; // velocità angolare (rad/s)
  r0: number; // raggio base (0..1)
  amp: number; // ampiezza oscillazione radiale
  ph: number;
  sp: number;
  s: number; // dimensione
  gold: boolean;
}

interface Pulse {
  i: number;
  j: number;
  t: number;
  v: number;
}

/**
 * "Ecosistema vivo": nodi che orbitano lentamente attorno al logo, si collegano quando sono vicini
 * e si scambiano impulsi luminosi. Canvas leggero: DPR ≤ 1.5, ~30 fps, in pausa fuori viewport e con
 * tab nascosta; solo da 768px in su; con reduced motion disegna un solo fotogramma statico.
 * (Un canvas non è candidato LCP: non pesa sul caricamento.)
 */
export function NetworkBackground({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas || window.matchMedia("(max-width: 767px)").matches) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const css = getComputedStyle(document.documentElement);
    const azure = css.getPropertyValue("--color-azure-300").trim() || "#3aa4d4";
    const gold = css.getPropertyValue("--color-gold-300").trim() || "#f7c85c";
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const N = 54;
    const rnd = (a: number, b: number) => a + Math.random() * (b - a);
    const nodes: Node[] = Array.from({ length: N }, (_, k) => ({
      a: rnd(0, Math.PI * 2),
      w: (Math.random() > 0.5 ? 1 : -1) * rnd(0.015, 0.07),
      r0: rnd(0.36, 0.98),
      amp: rnd(0.01, 0.045),
      ph: rnd(0, 6.28),
      sp: rnd(0.2, 0.7),
      s: rnd(1.3, 2.7),
      gold: k % 7 === 0,
    }));
    const pulses: Pulse[] = [];

    let size = 0;
    let dpr = 1;
    let raf = 0;
    let last = 0;
    let t = 0;
    let running = false;
    let visible = true;
    const pos = nodes.map(() => [0, 0] as [number, number]);

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const rect = canvas.getBoundingClientRect();
      size = Math.max(1, Math.floor(rect.width));
      canvas.width = Math.floor(size * dpr);
      canvas.height = Math.floor(size * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const place = () => {
      const c = size / 2;
      nodes.forEach((n, k) => {
        const r = (n.r0 + Math.sin(t * n.sp + n.ph) * n.amp) * c;
        pos[k]![0] = c + Math.cos(n.a) * r;
        pos[k]![1] = c + Math.sin(n.a) * r;
      });
    };

    const draw = () => {
      ctx.clearRect(0, 0, size, size);
      const dmax = size * 0.24;
      // collegamenti
      ctx.lineWidth = 1;
      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          const dx = pos[i]![0] - pos[j]![0];
          const dy = pos[i]![1] - pos[j]![1];
          const d = Math.hypot(dx, dy);
          if (d < dmax) {
            ctx.strokeStyle = azure;
            ctx.globalAlpha = (1 - d / dmax) * 0.38;
            ctx.beginPath();
            ctx.moveTo(pos[i]![0], pos[i]![1]);
            ctx.lineTo(pos[j]![0], pos[j]![1]);
            ctx.stroke();
          }
        }
      }
      // impulsi che viaggiano lungo i collegamenti
      for (const p of pulses) {
        const x = pos[p.i]![0] + (pos[p.j]![0] - pos[p.i]![0]) * p.t;
        const y = pos[p.i]![1] + (pos[p.j]![1] - pos[p.i]![1]) * p.t;
        ctx.fillStyle = gold;
        ctx.globalAlpha = 0.2;
        ctx.beginPath();
        ctx.arc(x, y, 5.5, 0, 6.283);
        ctx.fill();
        ctx.globalAlpha = 0.95;
        ctx.beginPath();
        ctx.arc(x, y, 1.9, 0, 6.283);
        ctx.fill();
      }
      // nodi
      for (let k = 0; k < N; k++) {
        const n = nodes[k]!;
        ctx.fillStyle = n.gold ? gold : azure;
        ctx.globalAlpha = n.gold ? 0.95 : 0.8;
        ctx.beginPath();
        ctx.arc(pos[k]![0], pos[k]![1], n.s, 0, 6.283);
        ctx.fill();
        if (n.gold) {
          ctx.globalAlpha = 0.18;
          ctx.beginPath();
          ctx.arc(pos[k]![0], pos[k]![1], n.s * 3.2, 0, 6.283);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
    };

    const spawnPulse = () => {
      const dmax = size * 0.24;
      for (let tries = 0; tries < 12; tries++) {
        const i = Math.floor(Math.random() * N);
        const j = Math.floor(Math.random() * N);
        if (i === j) continue;
        if (Math.hypot(pos[i]![0] - pos[j]![0], pos[i]![1] - pos[j]![1]) < dmax) {
          pulses.push({ i, j, t: 0, v: rnd(0.35, 0.8) });
          return;
        }
      }
    };

    const step = (now: number) => {
      raf = requestAnimationFrame(step);
      if (now - last < 33) return;
      const dt = Math.min((now - last) / 1000, 0.1);
      last = now;
      t += dt;
      nodes.forEach((n) => (n.a += n.w * dt));
      place();
      if (pulses.length < 9 && Math.random() < 0.12) spawnPulse();
      for (let k = pulses.length - 1; k >= 0; k--) {
        const p = pulses[k]!;
        p.t += p.v * dt;
        if (p.t >= 1) pulses.splice(k, 1);
      }
      draw();
    };

    const start = () => {
      if (running || reduced || !visible || document.hidden) return;
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(step);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    resize();
    place();
    draw();
    if (!reduced) start();

    const io = new IntersectionObserver(([e]) => {
      visible = !!e?.isIntersecting;
      if (visible) start();
      else stop();
    });
    io.observe(canvas);
    const onVis = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVis);
    let rt = 0;
    const onResize = () => {
      window.clearTimeout(rt);
      rt = window.setTimeout(() => {
        resize();
        place();
        draw();
      }, 150);
    };
    window.addEventListener("resize", onResize);

    return () => {
      stop();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("resize", onResize);
      window.clearTimeout(rt);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className={className} />;
}
