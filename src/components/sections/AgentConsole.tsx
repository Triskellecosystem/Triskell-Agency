"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/Icon";

const VISIBLE = 5;

/**
 * Console dell'agente AI: le attività compaiono una dopo l'altra (l'ultima in alto, con il segno di spunta che
 * scatta), il contatore delle attività completate e quello dei minuti restituiti salgono, la riga "sta scrivendo"
 * lampeggia. Gira solo quando è visibile; con reduced motion mostra l'elenco fermo.
 */
export function AgentConsole() {
  const c = site.ai.console;
  const tasks = c.tasks;
  const rootRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(VISIBLE);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let timer = 0;
    let visible = false;
    const start = () => {
      if (timer) return;
      timer = window.setInterval(() => setStep((s) => s + 1), 1900);
    };
    const stop = () => {
      window.clearInterval(timer);
      timer = 0;
    };
    const io = new IntersectionObserver(([e]) => {
      visible = !!e?.isIntersecting;
      if (visible && !document.hidden) start();
      else stop();
    });
    const onVis = () => (document.hidden ? stop() : visible && start());
    io.observe(el);
    document.addEventListener("visibilitychange", onVis);
    return () => {
      stop();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  // ultime VISIBLE attività, la più recente in alto
  const rows = Array.from({ length: VISIBLE }, (_, k) => {
    const n = step - k;
    return { n, task: tasks[((n % tasks.length) + tasks.length) % tasks.length]! };
  });
  const done = 1240 + step * 3;
  const minutes = 380 + step * 7;

  return (
    <div ref={rootRef} className="agent-console relative overflow-hidden rounded-[1.75rem] border border-azure-300/40 bg-[linear-gradient(165deg,#0b2236,#071423_60%,#0a1a2c)] shadow-[0_30px_80px_-30px_rgb(0_0_0/0.8),0_0_60px_-20px_rgb(42_144_195/0.45)]">
      <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0 opacity-30 [mask-image:radial-gradient(80%_70%_at_50%_20%,#000,transparent)]" />
      <span aria-hidden="true" className="agent-scan pointer-events-none absolute inset-x-0 top-0 h-24" />

      {/* intestazione */}
      <div className="relative flex items-center justify-between gap-3 border-b border-line px-5 py-4 sm:px-6">
        <div className="flex items-center gap-3">
          <span className="agent-orb relative grid h-11 w-11 place-items-center rounded-2xl bg-[image:var(--gradient-gold-btn)] text-night">
            <Icon name="bot" className="h-6 w-6" strokeWidth={1.8} />
          </span>
          <div className="leading-tight">
            <p className="font-display text-[1.0625rem] font-bold text-fg">{c.title}</p>
            <p className="flex items-center gap-1.5 text-[0.75rem] font-semibold uppercase tracking-wider text-lime-300">
              <span className="agent-live h-2 w-2 rounded-full bg-lime-300" />
              {c.status}
            </p>
          </div>
        </div>
        <div className="text-right leading-tight">
          <p className="font-display text-[1.375rem] font-bold tabular-nums text-gold">{done.toLocaleString("it-IT")}</p>
          <p className="text-[0.6875rem] font-semibold uppercase tracking-wider text-fg-3">attività completate</p>
        </div>
      </div>

      {/* attività */}
      <ul className="relative space-y-2 px-4 py-4 sm:px-5" aria-live="off">
        {rows.map(({ n, task }, k) => (
          <li
            key={n}
            className={cn(
              "agent-row flex items-center gap-3 rounded-2xl border px-3.5 py-3",
              k === 0 ? "agent-row--new border-gold-300/60 bg-gold-300/[0.07]" : "border-line bg-night/40",
            )}
            style={{ opacity: 1 - k * 0.14 }}
          >
            <span className={cn("grid h-9 w-9 shrink-0 place-items-center rounded-xl border", k === 0 ? "border-gold-300/60 text-gold-300" : "border-azure-300/40 text-azure-300")}>
              <Icon name={task.icon} className="h-[1.05rem] w-[1.05rem]" strokeWidth={1.8} />
            </span>
            <span className="min-w-0 flex-1 truncate text-[0.9375rem] font-medium text-fg">{task.text}</span>
            <span className="shrink-0 text-[0.75rem] tabular-nums text-fg-3">{task.time}</span>
            <span className={cn("agent-check grid h-6 w-6 shrink-0 place-items-center rounded-full bg-lime-300 text-night", k === 0 && "agent-check--pop")}>
              <Icon name="check" className="h-3.5 w-3.5" strokeWidth={3} />
            </span>
          </li>
        ))}
        <li aria-hidden="true" className="flex items-center gap-2 px-2 pt-1 text-[0.8125rem] text-fg-3">
          <span className="agent-typing flex gap-1">
            <i />
            <i />
            <i />
          </span>
          L&apos;agente sta lavorando alla prossima attività…
        </li>
      </ul>

      {/* tempo restituito */}
      <div className="relative border-t border-line px-5 py-4 sm:px-6">
        <div className="flex items-baseline justify-between gap-3">
          <p className="text-[0.75rem] font-semibold uppercase tracking-wider text-fg-2">{c.hours}</p>
          <p className="font-display text-[1.25rem] font-bold tabular-nums text-fg">
            {Math.floor(minutes / 60)}h {String(minutes % 60).padStart(2, "0")}m
          </p>
        </div>
        <span aria-hidden="true" className="mt-2.5 block h-1.5 overflow-hidden rounded-full bg-line">
          <span className="block h-full rounded-full bg-gradient-to-r from-azure-400 via-azure-300 to-gold-300 transition-[width] duration-700 ease-out-expo" style={{ width: `${30 + ((step * 9) % 70)}%` }} />
        </span>
      </div>
    </div>
  );
}
