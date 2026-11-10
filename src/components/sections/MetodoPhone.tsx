"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/Icon";
import { Tilt } from "@/components/ui/Tilt";

const nf = (n: number) => n.toLocaleString("it-IT");
/** Follower guadagnati a ogni battito: tanti piccoli e ogni tanto un salto (come quando parte una campagna). */
const SEQ = [2, 1, 3, 2, 4, 1, 38, 2, 3, 1, 2, 51];
const gained = (t: number) => {
  const sum = SEQ.reduce((a, b) => a + b, 0);
  return Math.floor(t / SEQ.length) * sum + SEQ.slice(0, t % SEQ.length).reduce((a, b) => a + b, 0);
};
const REQUESTS = [
  { who: "Giulia", text: "Posso prenotare la prova gratuita?" },
  { who: "Marco", text: "Che orari avete la sera?" },
  { who: "Sara", text: "Quanto costa l'abbonamento?" },
  { who: "Luca", text: "Fate anche personal training?" },
  { who: "Elisa", text: "Posso venire sabato?" },
];

/**
 * Telefono del Metodo Triskell: due schermate selezionabili (Instagram con il profilo di esempio, Campagna Meta Ads),
 * si cambia anche trascinando il telefono. Il telefono si inclina seguendo il mouse. A lato — mai sopra —
 * i follower che salgono (+N oggi), il totale e le richieste che arrivano.
 */
export function MetodoPhone() {
  const ref = useRef<HTMLDivElement>(null);
  const drag = useRef<number | null>(null);
  const [tick, setTick] = useState(0);
  const [tab, setTab] = useState<0 | 1>(0);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let timer = 0;
    const io = new IntersectionObserver(([e]) => {
      window.clearInterval(timer);
      if (e?.isIntersecting) timer = window.setInterval(() => setTick((t) => t + 1), 700);
    });
    io.observe(el);
    return () => {
      io.disconnect();
      window.clearInterval(timer);
    };
  }, []);

  const g = gained(tick);
  const today = 200 + g;
  const total = 78500 + g;
  const leads = 18 + Math.floor(tick / 3);
  const booked = 6 + Math.floor(tick / 7);
  const reqs = Array.from({ length: 3 }, (_, k) => {
    const n = Math.floor(tick / 3) - k;
    return { n, r: REQUESTS[((n % REQUESTS.length) + REQUESTS.length) % REQUESTS.length]! };
  });

  return (
    <div ref={ref} className="mp grid items-center gap-5 sm:grid-cols-[15.5rem_minmax(0,1fr)]">
      <div className="mx-auto w-[15.5rem]">
        <div role="tablist" aria-label="Schermata" className="mb-3 flex gap-1 rounded-full border border-white/15 bg-night/70 p-1">
          {(["Instagram", "Campagna"] as const).map((l, i) => (
            <button key={l} role="tab" aria-selected={tab === i} onClick={() => setTab(i as 0 | 1)} className={cn("flex flex-1 items-center justify-center gap-1.5 rounded-full py-1.5 text-[0.75rem] font-bold transition-colors", tab === i ? "bg-[image:var(--gradient-gold-btn)] text-night" : "text-fg-2 hover:text-fg")}>
              <Icon name={i ? "trending" : "smartphone"} className="h-3.5 w-3.5" strokeWidth={2.2} />
              {l}
            </button>
          ))}
        </div>
        <Tilt max={10}>
          <div
            className="relative cursor-grab touch-pan-y select-none overflow-hidden rounded-[2rem] border-[5px] border-[#1d2a3a] bg-black shadow-[0_40px_80px_-30px_rgb(0_0_0/0.95),0_0_50px_-20px_rgb(247_200_92/0.45)] active:cursor-grabbing"
            onPointerDown={(e) => (drag.current = e.clientX)}
            onPointerUp={(e) => {
              if (drag.current !== null && Math.abs(e.clientX - drag.current) > 30) setTab((t) => (t ? 0 : 1));
              drag.current = null;
            }}
          >
            <div className="flex transition-transform duration-500 ease-out-expo" style={{ transform: `translateX(${-tab * 100}%)` }}>
              {/* Instagram */}
              <div className="w-full shrink-0">
                <Image src="/social-examples/vertis.webp" alt="Profilo Instagram di esempio: palestra" width={520} height={1126} sizes="15rem" draggable={false} className="block h-auto w-full" />
              </div>
              {/* Campagna */}
              <div className="flex w-full shrink-0 flex-col bg-[#0b1622] p-3.5 text-left">
                <p className="mt-5 flex items-center justify-between text-[0.625rem] font-semibold uppercase tracking-wider text-fg-3">
                  Gestione inserzioni
                  <span className="inline-flex items-center gap-1 text-lime-300">
                    <span className="agent-live h-1.5 w-1.5 rounded-full bg-lime-300" />
                    Attiva
                  </span>
                </p>
                <p className="mt-1 text-[0.8125rem] font-bold text-white">Prova gratuita · Vertis Fitness</p>
                <div className="mt-3 rounded-xl bg-white/[0.04] p-3">
                  <p className="text-[0.625rem] text-fg-3">Contatti oggi</p>
                  <p key={leads} className="hc-pop font-display text-[2.25rem] font-bold leading-none text-gold">{leads}</p>
                  <div className="mt-3 flex h-16 items-end gap-1">
                    {[30, 42, 38, 55, 48, 62, 70, 66, 82, 94].map((h, i) => (
                      <span key={i} className="pp-bar flex-1 rounded-sm bg-gradient-to-t from-azure-400 to-gold-300" style={{ height: `${h}%`, animationDelay: `${i * 0.07}s` }} />
                    ))}
                  </div>
                </div>
                <dl className="mt-2 grid grid-cols-2 gap-2">
                  {[
                    ["Costo/contatto", "2,10 €"],
                    ["Persone raggiunte", "14,2K"],
                    ["Click sul profilo", "1.318"],
                    ["Prove prenotate", String(booked)],
                  ].map(([k, v]) => (
                    <div key={k} className="rounded-lg bg-white/[0.04] p-2">
                      <dt className="text-[0.5625rem] text-fg-3">{k}</dt>
                      <dd className="font-display text-[0.9375rem] font-bold text-white">{v}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-auto rounded-lg bg-lime-300/10 py-2 text-center text-[0.6875rem] font-semibold text-lime-300">▲ +38% contatti rispetto a ieri</p>
              </div>
            </div>
          </div>
        </Tilt>
        <p className="mt-2 text-center text-[0.625rem] text-fg-3">Trascina il telefono per cambiare schermata</p>
      </div>

      {/* pannello a lato */}
      <div className="flex flex-col gap-2.5">
        <div className="rounded-2xl border border-gold-300/40 bg-[linear-gradient(150deg,#3a2c08,rgb(6_20_34/0.9))] p-4">
          <p className="text-[0.625rem] font-bold uppercase tracking-wider text-gold-300">Nuovi follower oggi</p>
          <p key={today} className="hc-pop mt-1 font-display text-[2.75rem] font-bold leading-none tracking-[-0.05em] text-gold">+{nf(today)}</p>
          <p className="mt-2 text-[0.75rem] text-fg-2">
            Totale <span key={total} className="hc-pop font-bold text-fg">{nf(total)}</span> follower
          </p>
        </div>
        <div className="grid grid-cols-2 gap-2.5">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
            <p className="text-[0.5625rem] font-semibold uppercase tracking-wider text-fg-3">Richieste</p>
            <p key={leads} className="hc-pop font-display text-[1.5rem] font-bold text-azure-300">{leads}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
            <p className="text-[0.5625rem] font-semibold uppercase tracking-wider text-fg-3">Prove fissate</p>
            <p key={booked} className="hc-pop font-display text-[1.5rem] font-bold text-lime-300">{booked}</p>
          </div>
        </div>
        <ul className="flex flex-col gap-2">
          {reqs.map(({ n, r }, k) => (
            <li key={n} className={cn("flex items-start gap-2 rounded-2xl rounded-tl-md border px-3 py-2", k === 0 ? "hc-new border-gold-300/40 bg-white/[0.07]" : "border-white/[0.06] bg-white/[0.03]")} style={{ opacity: 1 - k * 0.25 }}>
              <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#e1306c] text-[0.625rem] font-bold text-white">{r.who[0]}</span>
              <span className="leading-tight">
                <span className="block text-[0.625rem] font-semibold text-fg-3">{r.who}</span>
                <span className="block text-[0.75rem] font-medium text-fg">{r.text}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
