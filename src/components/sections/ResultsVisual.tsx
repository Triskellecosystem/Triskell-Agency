"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";

const nf = (n: number) => n.toLocaleString("it-IT");
const W = 480;
const H = 170;
const P = [8, 12, 11, 18, 22, 21, 30, 36, 34, 46, 55, 68];
const mx = Math.max(...P) * 1.1;
const pts = P.map((v, i) => [(i / (P.length - 1)) * W, H - (v / mx) * H] as const);
const line = pts.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");

/**
 * Visual a destra dell'intestazione Risultati: un contatore di lead generati che corre veloce, un grafico che si
 * disegna e, attorno, i risultati veri dei clienti che compaiono a turno come badge.
 */
export function ResultsVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const [n, setN] = useState(100000);
  const [k, setK] = useState(0);
  const cases = site.results.items;

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    let a = 0;
    let b = 0;
    const io = new IntersectionObserver(([e]) => {
      window.clearInterval(a);
      window.clearInterval(b);
      if (e?.isIntersecting) {
        a = window.setInterval(() => setN((x) => (x > 104800 ? 100000 : x + 7 + Math.floor(Math.random() * 25))), 60);
        b = window.setInterval(() => setK((x) => x + 1), 1800);
      }
    });
    io.observe(el);
    return () => {
      io.disconnect();
      window.clearInterval(a);
      window.clearInterval(b);
    };
  }, []);

  const shown = [0, 1, 2].map((d) => cases[(k + d) % cases.length]!);
  const [lx, ly] = pts[pts.length - 1]!;

  return (
    <div ref={ref} aria-hidden="true" className="relative mx-auto w-full max-w-md">
      <span className="pointer-events-none absolute -inset-10 -z-10 rounded-full bg-[radial-gradient(circle,rgb(247_200_92/0.22),rgb(58_164_212/0.15)_45%,transparent_70%)] blur-2xl" />
      <div className="rv-card overflow-hidden rounded-[1.5rem] border border-gold-300/40 bg-[linear-gradient(160deg,rgb(13_39_61/0.92),rgb(4_33_58/0.92))] p-5 shadow-[0_40px_80px_-30px_rgb(0_0_0/0.9)]">
        <p className="flex items-center justify-between text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-fg-3">
          Lead generati per i clienti
          <span className="inline-flex items-center gap-1 text-lime-300"><span className="agent-live h-1.5 w-1.5 rounded-full bg-lime-300" />live</span>
        </p>
        <p className="mt-2 font-display text-[clamp(2.5rem,2rem+2vw,3.5rem)] font-bold leading-none tracking-[-0.05em] text-gold tabular-nums">{nf(n)}+</p>
        <svg viewBox={`0 0 ${W} ${H + 6}`} className="mt-4 h-auto w-full">
          <defs>
            <linearGradient id="rv-a" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="rgb(247 200 92 / 0.35)" /><stop offset="100%" stopColor="rgb(247 200 92 / 0)" /></linearGradient>
            <linearGradient id="rv-l" x1="0" x2="1"><stop offset="0%" stopColor="var(--color-azure-300)" /><stop offset="100%" stopColor="var(--color-gold-300)" /></linearGradient>
          </defs>
          <path d={`${line} L${W} ${H} L0 ${H} Z`} fill="url(#rv-a)" className="hb-area" />
          <path d={line} fill="none" stroke="url(#rv-l)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" pathLength={1} className="hb-line" />
          <circle cx={lx} cy={ly} r="6" fill="var(--color-gold-300)" className="hb-dot" />
          <circle cx={lx} cy={ly} r="6" fill="none" stroke="var(--color-gold-300)" className="hb-ping" />
        </svg>
      </div>
      <ul className="mt-3 space-y-2">
        {shown.map((c, d) => (
          <li key={`${c.id}-${k + d}`} className={cn("flex items-center justify-between gap-3 rounded-2xl border px-4 py-2.5", d === 0 ? "lp2-fly border-gold-300/50 bg-[rgb(13_39_61/0.9)]" : "border-white/10 bg-[rgb(13_39_61/0.55)]")} style={{ opacity: 1 - d * 0.22 }}>
            <span className="min-w-0 leading-tight">
              <span className="block truncate font-display text-[0.875rem] font-bold text-fg">{c.client}</span>
              <span className="block truncate text-[0.6875rem] text-fg-3">{c.place} · {c.tag}</span>
            </span>
            <span className="shrink-0 text-right leading-tight">
              <span className="block font-display text-[1.125rem] font-bold text-gold">{c.stats[0].value}</span>
              <span className="block text-[0.5625rem] font-semibold uppercase tracking-wider text-fg-3">{c.stats[0].label}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
