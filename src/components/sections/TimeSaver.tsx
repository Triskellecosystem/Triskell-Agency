"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/Icon";

/**
 * Mini gioco: "Quanto tempo ti restituisce Irelia?". Sposti lo slider dei messaggi al giorno e vedi le ore
 * risparmiate a settimana (circa 3 minuti a messaggio) e a cosa equivalgono, con un orologio che si riempie.
 */
export function TimeSaver() {
  const [msgs, setMsgs] = useState(20);
  const hours = Math.round((msgs * 3 * 6) / 60); // 3 min a messaggio, 6 giorni
  const pct = ((msgs - 5) / (80 - 5)) * 100;
  const days = (hours / 8).toFixed(1).replace(".", ",");
  return (
    <div className="ts relative overflow-hidden rounded-[1.25rem] border border-lime-300/35 bg-[linear-gradient(130deg,rgb(127_224_160/0.08),rgb(13_39_61/0.85)_55%)] p-5 sm:p-6">
      <div className="grid items-center gap-6 sm:grid-cols-[auto_minmax(0,1fr)]">
        <div className="relative mx-auto grid h-28 w-28 place-items-center">
          <svg viewBox="0 0 40 40" className="absolute inset-0 h-full w-full -rotate-90" aria-hidden="true">
            <circle cx="20" cy="20" r="17" fill="none" stroke="rgb(255 255 255 / 0.1)" strokeWidth="3" />
            <circle cx="20" cy="20" r="17" fill="none" stroke="var(--color-lime-300)" strokeWidth="3" strokeLinecap="round" strokeDasharray={`${Math.min(1, hours / 25) * 106.8} 106.8`} className="transition-[stroke-dasharray] duration-500" />
          </svg>
          <span className="text-center leading-none">
            <span className="block font-display text-[2rem] font-bold tracking-[-0.04em] text-lime-300 tabular-nums">{hours}h</span>
            <span className="mt-1 block text-[0.625rem] font-semibold uppercase tracking-wider text-fg-3">a settimana</span>
          </span>
        </div>
        <div>
          <p className="flex items-center gap-2 font-display text-[1.0625rem] font-bold text-fg">
            <Icon name="timer" className="h-4 w-4 text-lime-300" strokeWidth={2.2} />
            Quanto tempo ti restituisce Irelia?
          </p>
          <label className="mt-3 block">
            <span className="flex items-baseline justify-between text-[0.8125rem] text-fg-2">
              Messaggi che ricevi al giorno
              <span className="font-display text-[1.25rem] font-bold text-fg tabular-nums">{msgs}</span>
            </span>
            <input type="range" min={5} max={80} step={1} value={msgs} onChange={(e) => setMsgs(Number(e.target.value))} className="sim-range ts-range mt-2.5 w-full" style={{ "--p": `${pct}%` } as React.CSSProperties} aria-label="Messaggi ricevuti al giorno" />
          </label>
          <p className="mt-3 text-[0.875rem] text-fg-2">
            Sono circa <strong className="text-fg">{days} giornate di lavoro</strong> a settimana che puoi dedicare ai clienti, non alla chat.
          </p>
          <p className="mt-1 text-[0.6875rem] text-fg-3">Stima: circa 3 minuti per rispondere, qualificare e fissare ogni contatto.</p>
        </div>
      </div>
    </div>
  );
}
