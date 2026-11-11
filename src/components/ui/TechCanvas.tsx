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
export type TechKind = "globe" | "terrain" | "net" | "waves" | "circuit" | "blocks" | "pixels" | "tunnel" | "matrix" | "bars" | "scan" | "isogrid" | "hud" | "soft";

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

      if (kind === "blocks") {
        // città di cubi isometrici: alcune colonne salgono e scendono piano
        const small = W < 1024, s = small ? 22 : 34, N = 20;
        const cx = W * (small ? 0.5 : focusX), cy = H * (small ? 0.48 : focusY) - N * s * 0.25;
        const c30 = Math.cos(Math.PI / 6), s30 = 0.5;
        const P2 = (x: number, z: number, y: number) => [cx + (x - z) * c30 * s, cy + (x + z) * s30 * s - y * s] as const;
        for (let d = 0; d <= 2 * (N - 1); d++) {
          for (let i = 0; i < N; i++) {
            const j = d - i; if (j < 0 || j >= N) continue;
            const x = i - N / 2, z = j - N / 2;
            const seed = Math.sin(i * 12.9898 + j * 78.233) * 43758.5453, r = seed - Math.floor(seed);
            const edge = Math.max(Math.abs(x + 0.5), Math.abs(z + 0.5)) / (N / 2);
            const fade = Math.max(0, 1 - edge * edge) * 0.72;
            let h = 0;
            if (r > 0.62) h = (0.4 + 2.6 * r) * (0.55 + 0.45 * Math.sin(t * 0.45 + r * 20));
            const a = P2(x, z, 0), b = P2(x + 1, z, 0), c = P2(x + 1, z + 1, 0), e = P2(x, z + 1, 0);
            ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.lineTo(c[0], c[1]); ctx.lineTo(e[0], e[1]); ctx.closePath();
            ctx.strokeStyle = rgba(AZ, 0.12 * fade); ctx.lineWidth = 1; ctx.stroke();
            if (h > 0.05) {
              const gold = r > 0.93;
              const A = P2(x, z, h), B = P2(x + 1, z, h), C = P2(x + 1, z + 1, h), E = P2(x, z + 1, h);
              // facce laterali
              ctx.beginPath(); ctx.moveTo(e[0], e[1]); ctx.lineTo(c[0], c[1]); ctx.lineTo(C[0], C[1]); ctx.lineTo(E[0], E[1]); ctx.closePath();
              ctx.fillStyle = `rgba(6,30,52,${(0.85 * fade).toFixed(3)})`; ctx.fill(); ctx.strokeStyle = rgba(gold ? GD : AZ, 0.35 * fade); ctx.stroke();
              ctx.beginPath(); ctx.moveTo(b[0], b[1]); ctx.lineTo(c[0], c[1]); ctx.lineTo(C[0], C[1]); ctx.lineTo(B[0], B[1]); ctx.closePath();
              ctx.fillStyle = `rgba(10,44,72,${(0.85 * fade).toFixed(3)})`; ctx.fill(); ctx.stroke();
              // faccia sopra
              ctx.beginPath(); ctx.moveTo(A[0], A[1]); ctx.lineTo(B[0], B[1]); ctx.lineTo(C[0], C[1]); ctx.lineTo(E[0], E[1]); ctx.closePath();
              ctx.fillStyle = rgba(gold ? GD : AZ, (gold ? 0.32 : 0.14) * fade); ctx.fill();
              ctx.strokeStyle = rgba(gold ? GD : AZ, 0.75 * fade); ctx.stroke();
            }
          }
        }
      }

      if (kind === "soft") {
        // griglia finissima e ferma, poche celle che si accendono piano e una linea di luce lentissima
        const g = 56, ox = (W % g) / 2;
        ctx.lineWidth = 1;
        ctx.strokeStyle = rgba(AZ, 0.06);
        ctx.beginPath();
        for (let x = ox; x <= W; x += g) { ctx.moveTo(Math.round(x) + 0.5, 0); ctx.lineTo(Math.round(x) + 0.5, H); }
        for (let y = 0; y <= H; y += g) { ctx.moveTo(0, Math.round(y) + 0.5); ctx.lineTo(W, Math.round(y) + 0.5); }
        ctx.stroke();
        const cols = Math.ceil(W / g), rows = Math.ceil(H / g);
        for (let k = 0; k < 14; k++) {
          const sd = Math.sin(k * 127.1) * 43758.5, fr = sd - Math.floor(sd);
          const ph = (t * 0.12 + fr) % 1, a = Math.sin(ph * Math.PI) ** 2;
          const cyc = Math.floor(t * 0.12 + fr);
          const r2 = Math.sin((k + 1) * 311.7 + cyc * 74.7) * 43758.5, f2 = r2 - Math.floor(r2);
          const r3 = Math.sin((k + 1) * 183.3 + cyc * 41.1) * 43758.5, f3 = r3 - Math.floor(r3);
          const cx = Math.floor(f2 * cols), cy = Math.floor(f3 * rows);
          ctx.fillStyle = rgba(k % 5 === 0 ? GD : AZ, 0.07 * a);
          ctx.fillRect(ox + cx * g + 1, cy * g + 1, g - 1, g - 1);
          ctx.strokeStyle = rgba(k % 5 === 0 ? GD : AZ, 0.22 * a);
          ctx.strokeRect(ox + cx * g + 0.5, cy * g + 0.5, g, g);
        }
        const ly = ((t * 22) % (H + 300)) - 150;
        const lg = ctx.createLinearGradient(0, 0, W, 0);
        lg.addColorStop(0, rgba(AZ, 0)); lg.addColorStop(0.5, rgba(AZ, 0.16)); lg.addColorStop(1, rgba(AZ, 0));
        ctx.fillStyle = lg; ctx.fillRect(0, Math.round(ly), W, 1);
      }

      if (kind === "pixels") {
        const g = 22, sz = 6;
        for (let y = g / 2; y < H; y += g) for (let x = g / 2; x < W; x += g) {
          const n = Math.sin(x * 0.013 + t * 0.5) * Math.cos(y * 0.017 - t * 0.35) + Math.sin((x + y) * 0.004 + t * 0.2);
          const a = Math.max(0, n - 0.9) * 0.55;
          ctx.fillStyle = rgba(n > 1.55 ? GD : AZ, 0.04 + a);
          ctx.fillRect(x - sz / 2, y - sz / 2, sz, sz);
        }
      }

      if (kind === "tunnel") {
        const cx = W / 2, cy = H / 2, n = 16, sp = 0.18;
        const k = (t * sp) % 1;
        for (let i = n; i >= 0; i--) {
          const z = i - k + 1, f = 1 / z, w = W * 0.55 * f, h = H * 0.55 * f;
          const a = Math.min(1, f * 1.5) * 0.3 * Math.min(1, (n - i + k) / 3);
          ctx.strokeStyle = rgba(i % 4 === 0 ? GD : AZ, a); ctx.lineWidth = 1; ctx.strokeRect(cx - w, cy - h, w * 2, h * 2);
        }
        ctx.strokeStyle = rgba(AZ, 0.12);
        for (const [sx, sy] of [[-1, -1], [1, -1], [1, 1], [-1, 1]] as const) { ctx.beginPath(); ctx.moveTo(cx + sx * W * 0.02, cy + sy * H * 0.02); ctx.lineTo(cx + sx * W * 0.6, cy + sy * H * 0.6); ctx.stroke(); }
      }

      if (kind === "matrix") {
        const g = 24, sz = 4;
        for (let ci = 0, x = g / 2; x < W; x += g, ci++) {
          const r = Math.sin(ci * 91.3) * 43758.5; const fr = r - Math.floor(r);
          const speed = 18 + fr * 26, len = 6 + Math.floor(fr * 10), head = ((t * speed + fr * H * 2) % (H + len * g)) - len * g * 0.2;
          for (let k = 0; k < len; k++) {
            const y = head - k * 12; if (y < 0 || y > H) continue;
            ctx.fillStyle = rgba(k === 0 ? GD : AZ, k === 0 ? 0.7 : 0.32 * (1 - k / len));
            ctx.fillRect(x - sz / 2, y, sz, sz);
          }
        }
      }

      if (kind === "bars") {
        const n = 64, bw = W / n;
        for (let i = 0; i < n; i++) {
          const v = 0.5 + 0.5 * Math.sin(i * 0.35 + t * 0.7) * Math.cos(i * 0.11 - t * 0.4);
          const h = H * (0.08 + v * 0.42), x = i * bw + bw * 0.3;
          const g = ctx.createLinearGradient(0, H, 0, H - h);
          g.addColorStop(0, rgba(i % 9 === 0 ? GD : AZ, 0.32)); g.addColorStop(1, rgba(AZ, 0));
          ctx.fillStyle = g; ctx.fillRect(x, H - h, bw * 0.4, h);
          ctx.fillStyle = rgba(i % 9 === 0 ? GD : AZ, 0.6); ctx.fillRect(x, H - h - 4, bw * 0.4, 2);
        }
      }

      if (kind === "scan") {
        const g = 34;
        ctx.lineWidth = 1;
        for (let y = g; y < H; y += g) { ctx.strokeStyle = rgba(AZ, 0.07); ctx.beginPath(); ctx.moveTo(0, y + 0.5); ctx.lineTo(W, y + 0.5); ctx.stroke(); }
        const by = ((t * 40) % (H + 200)) - 100, band = ctx.createLinearGradient(0, by - 90, 0, by + 10);
        band.addColorStop(0, rgba(AZ, 0)); band.addColorStop(1, rgba(AZ, 0.1)); ctx.fillStyle = band; ctx.fillRect(0, by - 90, W, 100);
        ctx.fillStyle = rgba(GD, 0.8); ctx.fillRect(0, by + 10, W, 1);
        for (let y = g, row = 0; y < H; y += g, row++) {
          const x = ((t * (30 + (row % 5) * 12) + row * 173) % (W + 120)) - 60;
          ctx.fillStyle = rgba(row % 4 ? AZ : GD, 0.55); ctx.fillRect(x, y - 2, 28, 3);
        }
      }

      if (kind === "isogrid") {
        const s = 44, c30 = Math.cos(Math.PI / 6);
        ctx.lineWidth = 1; ctx.strokeStyle = rgba(AZ, 0.08);
        for (let k = -H; k < W + H; k += s * 2 * c30) {
          ctx.beginPath(); ctx.moveTo(k, 0); ctx.lineTo(k + H / Math.tan(Math.PI / 6) , H); ctx.stroke();
          ctx.beginPath(); ctx.moveTo(k, 0); ctx.lineTo(k - H / Math.tan(Math.PI / 6), H); ctx.stroke();
        }
        for (let i = 0; i < 9; i++) {
          const ph = (t * 0.25 + i * 0.37) % 1, a = Math.sin(ph * Math.PI);
          const cx = ((Math.sin(i * 7.1) * 0.5 + 0.5) * W), cy = ((Math.cos(i * 3.3) * 0.5 + 0.5) * H), r = s * 0.9;
          ctx.beginPath(); ctx.moveTo(cx, cy - r * 0.58); ctx.lineTo(cx + r, cy); ctx.lineTo(cx, cy + r * 0.58); ctx.lineTo(cx - r, cy); ctx.closePath();
          ctx.fillStyle = rgba(i % 3 ? AZ : GD, a * 0.14); ctx.fill(); ctx.strokeStyle = rgba(i % 3 ? AZ : GD, a * 0.5); ctx.stroke();
        }
      }

      if (kind === "hud") {
        ctx.lineWidth = 1;
        const m = 40;
        // cornici squadrate concentriche con tacche di misura
        for (let k = 0; k < 3; k++) {
          const ix = m + k * 70, iy = m + k * 50; ctx.strokeStyle = rgba(AZ, 0.1 - k * 0.025); ctx.strokeRect(ix, iy, W - ix * 2, H - iy * 2);
        }
        ctx.strokeStyle = rgba(AZ, 0.25);
        for (let x = m; x < W - m; x += 24) { const L = (x - m) % 120 === 0 ? 10 : 5; ctx.beginPath(); ctx.moveTo(x, m); ctx.lineTo(x, m + L); ctx.stroke(); ctx.beginPath(); ctx.moveTo(x, H - m); ctx.lineTo(x, H - m - L); ctx.stroke(); }
        // mirini che si spostano piano
        for (let i = 0; i < 3; i++) {
          const x = W * (0.2 + 0.6 * (0.5 + 0.5 * Math.sin(t * 0.12 + i * 2.1))), y = H * (0.25 + 0.5 * (0.5 + 0.5 * Math.cos(t * 0.09 + i * 1.7)));
          const c = i === 0 ? GD : AZ, r = 26;
          ctx.strokeStyle = rgba(c, 0.5);
          for (const [dx, dy] of [[-1, -1], [1, -1], [1, 1], [-1, 1]] as const) { ctx.beginPath(); ctx.moveTo(x + dx * r, y + dy * (r - 9)); ctx.lineTo(x + dx * r, y + dy * r); ctx.lineTo(x + dx * (r - 9), y + dy * r); ctx.stroke(); }
          ctx.strokeStyle = rgba(c, 0.14); ctx.beginPath(); ctx.moveTo(x, m); ctx.lineTo(x, H - m); ctx.moveTo(m, y); ctx.lineTo(W - m, y); ctx.stroke();
          ctx.fillStyle = rgba(c, 0.8); ctx.fillRect(x - 2, y - 2, 4, 4);
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
