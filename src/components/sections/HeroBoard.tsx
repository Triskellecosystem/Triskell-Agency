"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/Icon";
import { CountUp } from "@/components/motion/CountUp";

/* Dati del grafico (contatti al mese, dimostrativi): crescita con piccole oscillazioni. */
const POINTS = [12, 16, 14, 22, 26, 24, 33, 38, 36, 47, 52, 61];
const W = 600;
const H = 150;
const max = Math.max(...POINTS) * 1.12;
const xy = POINTS.map((v, i) => [(i / (POINTS.length - 1)) * W, H - (v / max) * H] as const);
const line = xy.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");
const area = `${line} L${W} ${H} L0 ${H} Z`;
const months = ["G", "F", "M", "A", "M", "G", "L", "A", "S", "O", "N", "D"];

/**
 * La "dashboard" della hero: quattro numeri veri che crescono, un grafico che si disegna da sinistra a destra
 * con un punto che pulsa sull'ultimo valore, e a lato le notifiche dal vivo (lead, prenotazioni, follower) che
 * entrano una dopo l'altra. Le notifiche girano solo quando la dashboard è visibile.
 */
export function HeroBoard() {
  const { board, keyNumbers } = site.hero;
  const ref = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let timer = 0;
    const io = new IntersectionObserver(([e]) => {
      window.clearInterval(timer);
      if (e?.isIntersecting) timer = window.setInterval(() => setStep((s) => s + 1), 2200);
    });
    io.observe(el);
    return () => {
      io.disconnect();
      window.clearInterval(timer);
    };
  }, []);

  const feed = Array.from({ length: 4 }, (_, k) => {
    const n = step - k;
    return { n, item: board.feed[((n % board.feed.length) + board.feed.length) % board.feed.length]! };
  });
  const [lx, ly] = xy[xy.length - 1]!;

  return (
    <div ref={ref} className="hb relative overflow-hidden rounded-[1.25rem] border border-white/10 bg-[linear-gradient(180deg,rgb(13_39_61/0.75),rgb(5_20_34/0.9))] shadow-[0_40px_100px_-40px_rgb(0_0_0/0.9),0_0_0_1px_rgb(247_200_92/0.08)] backdrop-blur-md">
      {/* barra della finestra */}
      <div className="flex items-center gap-2 border-b border-white/[0.07] px-4 py-2.5">
        <i className="h-2 w-2 rounded-full bg-ember-400/70" />
        <i className="h-2 w-2 rounded-full bg-gold-300/70" />
        <i className="h-2 w-2 rounded-full bg-lime-300/70" />
        <p className="ml-2 text-[0.6875rem] font-medium text-fg-3">{board.title}</p>
        <span className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-lime-300/30 px-2 py-0.5 text-[0.625rem] font-semibold uppercase tracking-wider text-lime-300">
          <span className="agent-live h-1.5 w-1.5 rounded-full bg-lime-300" />
          {board.live}
        </span>
      </div>

      <div className="grid gap-px bg-white/[0.06] lg:grid-cols-[minmax(0,1fr)_15.5rem]">
        <div className="bg-[rgb(6_20_34/0.92)]">
          {/* numeri */}
          <dl className="grid grid-cols-2 gap-px bg-white/[0.06] sm:grid-cols-4">
            {keyNumbers.map((n) => (
              <div key={n.label} className="bg-[rgb(6_20_34/0.92)] px-4 py-3.5 text-left">
                <dt className="text-[0.6875rem] font-medium text-fg-3">{n.label}</dt>
                <dd className="mt-1 font-display text-[clamp(1.25rem,1rem+0.9vw,1.75rem)] font-bold leading-none tracking-[-0.03em]">
                  <CountUp {...n} className="text-gold" duration={2.2} />
                </dd>
              </div>
            ))}
          </dl>
          {/* grafico */}
          <div className="relative px-4 pb-3 pt-4">
            <p className="flex items-center justify-between text-[0.6875rem] text-fg-3">
              <span>{board.chartLabel}</span>
              <span className="font-semibold text-lime-300">▲ +408%</span>
            </p>
            <svg viewBox={`0 0 ${W} ${H + 24}`} className="mt-2 h-auto w-full" aria-hidden="true">
              <defs>
                <linearGradient id="hb-area" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="rgb(247 200 92 / 0.35)" />
                  <stop offset="100%" stopColor="rgb(247 200 92 / 0)" />
                </linearGradient>
                <linearGradient id="hb-line" x1="0" x2="1">
                  <stop offset="0%" stopColor="var(--color-azure-300)" />
                  <stop offset="100%" stopColor="var(--color-gold-300)" />
                </linearGradient>
              </defs>
              {[0.25, 0.5, 0.75].map((g) => (
                <line key={g} x1="0" x2={W} y1={H * g} y2={H * g} stroke="rgb(255 255 255 / 0.06)" strokeDasharray="3 6" />
              ))}
              <path d={area} fill="url(#hb-area)" className="hb-area" />
              <path d={line} fill="none" stroke="url(#hb-line)" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" pathLength={1} className="hb-line" />
              <circle cx={lx} cy={ly} r="5" fill="var(--color-gold-300)" className="hb-dot" />
              <circle cx={lx} cy={ly} r="5" fill="none" stroke="var(--color-gold-300)" className="hb-ping" />
              {months.map((m, i) => (
                <text key={i} x={(i / (months.length - 1)) * W} y={H + 18} textAnchor={i === 0 ? "start" : i === months.length - 1 ? "end" : "middle"} className="fill-[rgb(145_151_154)] text-[11px]">
                  {m}
                </text>
              ))}
            </svg>
          </div>
        </div>

        {/* notifiche dal vivo */}
        <ul className="hidden flex-col gap-2 bg-[rgb(6_20_34/0.92)] p-3 lg:flex" aria-hidden="true">
          {feed.map(({ n, item }, k) => (
            <li key={n} className={cn("flex items-center gap-2.5 rounded-xl border px-2.5 py-2", k === 0 ? "hb-new border-gold-300/40 bg-gold-300/[0.06]" : "border-white/[0.06] bg-white/[0.02]")} style={{ opacity: 1 - k * 0.2 }}>
              <span className={cn("grid h-7 w-7 shrink-0 place-items-center rounded-lg", k === 0 ? "bg-gold-300 text-night" : "bg-white/[0.06] text-fg-2")}>
                <Icon name={item.icon} className="h-3.5 w-3.5" strokeWidth={2} />
              </span>
              <span className="min-w-0 leading-tight">
                <span className="block truncate text-[0.8125rem] font-semibold text-fg">{item.text}</span>
                <span className="block truncate text-[0.6875rem] text-fg-3">{item.meta}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
