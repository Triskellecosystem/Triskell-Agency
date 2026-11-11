"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

/**
 * Sfondi tech disegnati su canvas, sottili e lenti (niente sfarfallio: nessuna griglia che scorre):
 * globe   = globo di puntini che ruota con archi di dati d'oro (apertura home)
 * terrain = terreno a rete ondulato in prospettiva
 * net     = rete di nodi collegati che si muovono piano (segue il mouse)
 * waves   = fasci di onde sottili che si piegano vicino al mouse
 * circuit = piste di circuito con impulsi di luce che le percorrono
 * Si ferma fuori schermo; con reduced motion disegna un solo fotogramma.
 */
export type TechKind = "globe" | "terrain" | "net" | "waves" | "circuit";

const AZ = [110, 200, 240];
const GD = [253, 214, 120];
const rgba = (c: number[], a: number) => `rgba(${c[0]},${c[1]},${c[2]},${a.toFixed(3)})`;

function rand(seed: number) {
  let s = seed;
  return () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646;
}

export function TechCanvas({ kind, className, focusX = 0.5, focusY = 0.5 }: { kind: TechKind; className?: string; focusX?: number; focusY?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const cv = ref.current;
    const host = cv?.parentElement;
    if (!cv || !host) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(1.5, window.devicePixelRatio || 1);
    let W = 0, H = 0, raf = 0, visible = false;
    const t0 = performance.now();
    const mouse = { x: -9999, y: -9999, sx: -9999, sy: -9999 };
    const R = rand(kind.length * 977 + 13);

    // --- dati per tipo ---
    const pts: Array<[number, number, number]> = [];
    if (kind === "globe") {
      const n = 900, g = Math.PI * (3 - Math.sqrt(5));
      for (let i = 0; i < n; i++) {
        const y = 1 - (i / (n - 1)) * 2, r = Math.sqrt(1 - y * y), th = g * i;
        pts.push([Math.cos(th) * r, y, Math.sin(th) * r]);
      }
    }
    const arcs: Array<{ a: number; b: number; t: number; d: number }> = [];
    const nodes: Array<{ x: number; y: number; vx: number; vy: number }> = [];
    let traces: Array<Array<[number, number]>> = [];
    const pulses: Array<{ tr: number; p: number; v: number }> = [];

    const resize = () => {
      const r = host.getBoundingClientRect();
      W = Math.max(1, r.width); H = Math.max(1, r.height);
      cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
      cv.style.width = `${W}px`; cv.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (kind === "net" && nodes.length === 0) {
        const n = Math.round(Math.min(90, (W * H) / 16000));
        for (let i = 0; i < n; i++) nodes.push({ x: R() * W, y: R() * H, vx: (R() - 0.5) * 0.18, vy: (R() - 0.5) * 0.18 });
      }
      if (kind === "circuit") {
        traces = [];
        const step = 28, n = Math.round(Math.min(46, W / 34));
        for (let i = 0; i < n; i++) {
          let x = Math.round((R() * W) / step) * step, y = Math.round((R() * H) / step) * step;
          const tr: Array<[number, number]> = [[x, y]];
          let dir = Math.floor(R() * 4);
          for (let k = 0; k < 6 + Math.floor(R() * 8); k++) {
            const len = (2 + Math.floor(R() * 5)) * step;
            const dx = [1, 0, -1, 0][dir]!, dy = [0, 1, 0, -1][dir]!;
            x += dx * len; y += dy * len; tr.push([x, y]);
            dir = (dir + (R() < 0.5 ? 1 : 3)) % 4;
          }
          traces.push(tr);
        }
        pulses.length = 0;
        for (let i = 0; i < Math.min(18, traces.length); i++) pulses.push({ tr: Math.floor(R() * traces.length), p: R(), v: 0.04 + R() * 0.05 });
      }
    };

    const draw = (now: number) => {
      const t = (now - t0) / 1000;
      ctx.clearRect(0, 0, W, H);
      mouse.sx += (mouse.x - mouse.sx) * 0.06; mouse.sy += (mouse.y - mouse.sy) * 0.06;

      if (kind === "globe") {
        const small = W < 1024;
        const cx = W * (small ? 0.5 : focusX), cy = H * (small ? 0.42 : focusY);
        const Rg = Math.min(W, H) * (small ? 0.62 : 0.56);
        const rot = t * 0.07, tilt = 0.38, cr = Math.cos(rot), sr = Math.sin(rot), ct = Math.cos(tilt), st = Math.sin(tilt);
        const proj = (p: [number, number, number]) => {
          const x = p[0] * cr - p[2] * sr, z0 = p[0] * sr + p[2] * cr;
          const y = p[1] * ct - z0 * st, z = p[1] * st + z0 * ct;
          const f = 2.8 / (2.8 - z);
          return [cx + x * Rg * f, cy + y * Rg * f, z] as const;
        };
        // anelli orbitali sottili
        for (let k = 0; k < 2; k++) {
          ctx.beginPath();
          for (let i = 0; i <= 120; i++) {
            const a = (i / 120) * Math.PI * 2, rr = 1.28 + k * 0.22;
            const p = proj([Math.cos(a) * rr, Math.sin(a) * rr * 0.08 * (k ? -1 : 1), Math.sin(a) * rr]);
            if (i === 0) ctx.moveTo(p[0], p[1]); else ctx.lineTo(p[0], p[1]);
          }
          ctx.strokeStyle = rgba(k ? GD : AZ, 0.16); ctx.lineWidth = 1; ctx.stroke();
          const a = t * (0.35 - k * 0.12) + k * 2, rr = 1.28 + k * 0.22;
          const p = proj([Math.cos(a) * rr, Math.sin(a) * rr * 0.08 * (k ? -1 : 1), Math.sin(a) * rr]);
          ctx.fillStyle = rgba(GD, p[2] > 0 ? 0.9 : 0.35); ctx.beginPath(); ctx.arc(p[0], p[1], 2.4, 0, 7); ctx.fill();
        }
        // reticolo: paralleli e meridiani sottili (solo lato frontale più marcato)
        ctx.lineWidth = 1;
        for (let la = -2; la <= 2; la++) {
          const yy = la * 0.33, rr = Math.sqrt(1 - yy * yy);
          ctx.beginPath();
          for (let i = 0; i <= 90; i++) { const a = (i / 90) * Math.PI * 2; const q = proj([Math.cos(a) * rr, yy, Math.sin(a) * rr]); if (i) ctx.lineTo(q[0], q[1]); else ctx.moveTo(q[0], q[1]); }
          ctx.strokeStyle = rgba(AZ, la === 0 ? 0.22 : 0.1); ctx.stroke();
        }
        for (let mi = 0; mi < 8; mi++) {
          const b = (mi / 8) * Math.PI;
          ctx.beginPath();
          for (let i = 0; i <= 90; i++) { const a = (i / 90) * Math.PI * 2; const q = proj([Math.cos(a) * Math.cos(b), Math.sin(a), Math.cos(a) * Math.sin(b)]); if (i) ctx.lineTo(q[0], q[1]); else ctx.moveTo(q[0], q[1]); }
          ctx.strokeStyle = rgba(AZ, 0.08); ctx.stroke();
        }
        // puntini
        for (const p of pts) {
          const q = proj(p), front = (q[2] + 1) / 2;
          ctx.fillStyle = rgba(front > 0.8 && (p[0] * 7 + p[1] * 13) % 1 > 0.92 ? GD : AZ, 0.14 + front * 0.75);
          const s = 0.9 + front * 1.7;
          ctx.fillRect(q[0] - s / 2, q[1] - s / 2, s, s);
        }
        // archi di dati
        if (arcs.length < 7 && R() < 0.03) arcs.push({ a: Math.floor(R() * pts.length), b: Math.floor(R() * pts.length), t: 0, d: 2.2 + R() * 1.5 });
        for (let i = arcs.length - 1; i >= 0; i--) {
          const A = arcs[i]!; A.t += 1 / 60 / A.d;
          if (A.t >= 1.6) { arcs.splice(i, 1); continue; }
          const pa = pts[A.a]!, pb = pts[A.b]!;
          const mid: [number, number, number] = [(pa[0] + pb[0]) * 0.8, (pa[1] + pb[1]) * 0.8, (pa[2] + pb[2]) * 0.8];
          const ml = Math.hypot(...mid) || 1, lift = 1.35;
          const m: [number, number, number] = [(mid[0] / ml) * lift, (mid[1] / ml) * lift, (mid[2] / ml) * lift];
          const head = Math.min(1, A.t), tail = Math.max(0, A.t - 0.6);
          ctx.beginPath();
          for (let s = 0; s <= 30; s++) {
            const u = tail + (head - tail) * (s / 30), v = 1 - u;
            const p: [number, number, number] = [v * v * pa[0] + 2 * v * u * m[0] + u * u * pb[0], v * v * pa[1] + 2 * v * u * m[1] + u * u * pb[1], v * v * pa[2] + 2 * v * u * m[2] + u * u * pb[2]];
            const q = proj(p);
            if (s === 0) ctx.moveTo(q[0], q[1]); else ctx.lineTo(q[0], q[1]);
          }
          ctx.strokeStyle = rgba(GD, 0.75 * (1 - Math.max(0, A.t - 1) / 0.6)); ctx.lineWidth = 1.4; ctx.stroke();
        }
      }

      if (kind === "terrain") {
        const cols = 44, rows = 26, horizon = H * 0.18, fov = H * 0.9;
        for (let r = 0; r < rows; r++) {
          const z = 1 + r * 0.55;
          ctx.beginPath();
          for (let c = 0; c <= cols; c++) {
            const xw = (c / cols - 0.5) * 14;
            const yw = Math.sin(xw * 0.6 + t * 0.5) * 0.35 + Math.cos(z * 0.5 - t * 0.35 + xw * 0.25) * 0.35;
            const sx = W / 2 + (xw / z) * fov * 0.55, sy = horizon + ((2.2 - yw) / z) * fov * 0.42;
            if (c === 0) ctx.moveTo(sx, sy); else ctx.lineTo(sx, sy);
          }
          const a = Math.max(0, 0.32 - r * 0.011);
          ctx.strokeStyle = rgba(r % 5 === 0 ? GD : AZ, a); ctx.lineWidth = 1; ctx.stroke();
        }
      }

      if (kind === "net") {
        for (const n of nodes) {
          n.x += n.vx; n.y += n.vy;
          if (n.x < 0 || n.x > W) n.vx *= -1;
          if (n.y < 0 || n.y > H) n.vy *= -1;
        }
        const maxD = 150;
        for (let i = 0; i < nodes.length; i++) {
          const a = nodes[i]!;
          for (let j = i + 1; j < nodes.length; j++) {
            const b = nodes[j]!, d = Math.hypot(a.x - b.x, a.y - b.y);
            if (d < maxD) {
              const near = Math.max(0, 1 - Math.hypot((a.x + b.x) / 2 - mouse.sx, (a.y + b.y) / 2 - mouse.sy) / 220);
              ctx.strokeStyle = rgba(near > 0.1 ? GD : AZ, (1 - d / maxD) * (0.18 + near * 0.5));
              ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
            }
          }
          ctx.fillStyle = rgba(AZ, 0.55); ctx.beginPath(); ctx.arc(a.x, a.y, 1.5, 0, 7); ctx.fill();
        }
      }

      if (kind === "waves") {
        const n = 22;
        for (let i = 0; i < n; i++) {
          const base = H * (0.18 + (i / n) * 0.7);
          ctx.beginPath();
          for (let x = -10; x <= W + 10; x += 10) {
            const bump = Math.exp(-((x - mouse.sx) ** 2) / (2 * 140 * 140)) * Math.exp(-((base - mouse.sy) ** 2) / (2 * 220 * 220)) * 46;
            const y = base + Math.sin(x * 0.006 + t * 0.6 + i * 0.35) * 22 + Math.sin(x * 0.013 - t * 0.4 + i) * 8 - bump;
            if (x === -10) ctx.moveTo(x, y); else ctx.lineTo(x, y);
          }
          ctx.strokeStyle = rgba(i % 6 === 0 ? GD : AZ, i % 6 === 0 ? 0.28 : 0.15); ctx.lineWidth = 1; ctx.stroke();
        }
      }

      if (kind === "circuit") {
        ctx.lineWidth = 1;
        for (const tr of traces) {
          ctx.beginPath(); tr.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
          ctx.strokeStyle = rgba(AZ, 0.12); ctx.stroke();
          const [ex, ey] = tr[tr.length - 1]!; ctx.strokeStyle = rgba(AZ, 0.3); ctx.beginPath(); ctx.arc(ex, ey, 2.5, 0, 7); ctx.stroke();
        }
        for (const p of pulses) {
          p.p += p.v / 60; if (p.p > 1) { p.p = 0; p.tr = Math.floor(R() * traces.length); }
          const tr = traces[p.tr]!; const segs: number[] = []; let L = 0;
          for (let i = 1; i < tr.length; i++) { const s = Math.abs(tr[i]![0] - tr[i - 1]![0]) + Math.abs(tr[i]![1] - tr[i - 1]![1]); segs.push(s); L += s; }
          const at = (d: number) => { let acc = 0; for (let i = 0; i < segs.length; i++) { if (acc + segs[i]! >= d) { const u = (d - acc) / (segs[i]! || 1); return [tr[i]![0] + (tr[i + 1]![0] - tr[i]![0]) * u, tr[i]![1] + (tr[i + 1]![1] - tr[i]![1]) * u]; } acc += segs[i]!; } return tr[tr.length - 1]!; };
          const head = p.p * L, len = 70;
          ctx.beginPath();
          for (let s = 0; s <= 10; s++) { const q = at(Math.max(0, head - len + (len * s) / 10)); if (s) ctx.lineTo(q[0]!, q[1]!); else ctx.moveTo(q[0]!, q[1]!); }
          const grad = ctx.createLinearGradient(...(at(Math.max(0, head - len)) as [number, number]), ...(at(head) as [number, number]));
          grad.addColorStop(0, rgba(GD, 0)); grad.addColorStop(1, rgba(GD, 0.85));
          ctx.strokeStyle = grad; ctx.lineWidth = 1.6; ctx.stroke(); ctx.lineWidth = 1;
        }
      }
    };

    const loop = (now: number) => {
      draw(now);
      raf = visible && !reduced ? requestAnimationFrame(loop) : 0;
    };
    resize();
    const ro = new ResizeObserver(() => { resize(); if (!raf) draw(performance.now()); });
    ro.observe(host);
    const io = new IntersectionObserver(([e]) => {
      visible = !!e?.isIntersecting;
      if (visible && !raf) raf = requestAnimationFrame(loop);
    }, { rootMargin: "100px" });
    io.observe(host);
    const onMove = (e: PointerEvent) => { const r = host.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; };
    const onLeave = () => { mouse.x = -9999; mouse.y = -9999; };
    const sec = host.closest("section") ?? host;
    sec.addEventListener("pointermove", onMove as EventListener);
    sec.addEventListener("pointerleave", onLeave);
    draw(performance.now());
    return () => {
      cancelAnimationFrame(raf); ro.disconnect(); io.disconnect();
      sec.removeEventListener("pointermove", onMove as EventListener); sec.removeEventListener("pointerleave", onLeave);
    };
  }, [kind, focusX, focusY]);
  return (
    <div aria-hidden="true" className={cn("tc pointer-events-none absolute inset-0 -z-10 overflow-hidden", `tc--${kind}`, className)}>
      <canvas ref={ref} className="absolute inset-0" />
    </div>
  );
}
