"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/Icon";

const fmt = (n: number) => n.toLocaleString("it-IT");

const MESSAGES = [
  { who: "Martina", text: "Ciao! Quando posso iniziare?" },
  { who: "Luca", text: "Quanto costa la prova?" },
  { who: "Sara", text: "Avete posto sabato mattina?" },
  { who: "Giorgio", text: "Vorrei info sui pacchetti 😊" },
  { who: "Elena", text: "Posso prenotare per domani?" },
  { who: "Paolo", text: "Ho visto la pubblicità, mi richiamate?" },
];
const COLORS = ["#e1306c", "#3aa4d4", "#7fe0a0", "#f7c85c", "#c98a6b", "#833ab4"];

/**
 * Colonna destra della hero: a sinistra tre telefoni con profili Instagram di esempio (si separano al passaggio del
 * mouse), a destra — senza sovrapporsi — i numeri che salgono (follower oggi, richieste, vendite chiuse) e i
 * messaggi dei potenziali clienti che arrivano uno dopo l'altro. Anima solo quando è visibile.
 */
export function HeroCollage() {
  const ref = useRef<HTMLDivElement>(null);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let timer = 0;
    const io = new IntersectionObserver(([e]) => {
      window.clearInterval(timer);
      if (e?.isIntersecting) timer = window.setInterval(() => setTick((t) => t + 1), 1600);
    });
    io.observe(el);
    return () => {
      io.disconnect();
      window.clearInterval(timer);
    };
  }, []);

  const followers = 186 + tick * 3;
  const requests = 17 + Math.floor(tick / 2);
  const sales = 6 + Math.floor(tick / 5);
  const msgs = Array.from({ length: 3 }, (_, k) => {
    const n = tick - k;
    const i = ((n % MESSAGES.length) + MESSAGES.length) % MESSAGES.length;
    return { n, m: MESSAGES[i]!, c: COLORS[i]! };
  });

  const phone = (id: string, cls: string, priority = false) => (
    <div className={cn("hc-phone absolute w-[10.5rem] overflow-hidden rounded-[1.5rem] border-[4px] border-[#1d2a3a] bg-black shadow-[0_30px_60px_-24px_rgb(0_0_0/0.95)] xl:w-[11.5rem]", cls)}>
      <Image src={`/social-examples/${id}.webp`} alt="" width={520} height={1126} sizes="12rem" priority={priority} className="block h-auto w-full" />
    </div>
  );

  return (
    <div ref={ref} aria-hidden="true" className="hc relative grid h-[30rem] grid-cols-[1fr_15rem] items-center gap-5 xl:h-[32rem]">
      {/* telefoni */}
      <div className="hc-phones relative h-full">
        {phone("essentia", "hc-p hc-p--b left-0 top-12")}
        {phone("lumina", "hc-p hc-p--c right-0 top-16")}
        {phone("vertis", "hc-p hc-p--a left-1/2 top-2 z-10 -translate-x-1/2", true)}
      </div>

      {/* numeri e messaggi, a lato */}
      <div className="flex flex-col gap-2.5">
        <div className="rounded-2xl border border-white/10 bg-[rgb(6_20_34/0.85)] p-3.5 backdrop-blur-md">
          <p className="flex items-center justify-between text-[0.625rem] font-semibold uppercase tracking-wider text-fg-3">
            Follower oggi
            <span className="inline-flex items-center gap-1 text-lime-300">
              <span className="agent-live h-1.5 w-1.5 rounded-full bg-lime-300" />
              live
            </span>
          </p>
          <p key={followers} className="hc-pop mt-1 font-display text-[2rem] font-bold leading-none tracking-[-0.04em] text-gold">+{fmt(followers)}</p>
          <div className="mt-2.5 flex h-7 items-end gap-1">
            {[28, 36, 32, 48, 55, 52, 66, 80, 92].map((h, i) => (
              <span key={i} className="pp-bar flex-1 rounded-sm bg-gradient-to-t from-azure-400 to-gold-300" style={{ height: `${h}%`, animationDelay: `${i * 0.08}s` }} />
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2.5">
          <div className="rounded-2xl border border-white/10 bg-[rgb(6_20_34/0.85)] p-3 backdrop-blur-md">
            <p className="text-[0.5625rem] font-semibold uppercase tracking-wider text-fg-3">Richieste</p>
            <p key={`r${requests}`} className="hc-pop mt-1 font-display text-[1.375rem] font-bold leading-none text-azure-300">{requests}</p>
          </div>
          <div className="rounded-2xl border border-lime-300/30 bg-[rgb(6_20_34/0.85)] p-3 backdrop-blur-md">
            <p className="text-[0.5625rem] font-semibold uppercase tracking-wider text-fg-3">Vendite chiuse</p>
            <p key={`s${sales}`} className="hc-pop mt-1 font-display text-[1.375rem] font-bold leading-none text-lime-300">{sales}</p>
          </div>
        </div>
        <p className="mt-1 flex items-center gap-1.5 text-[0.625rem] font-semibold uppercase tracking-wider text-fg-3">
          <Icon name="messages" className="h-3 w-3" strokeWidth={2.2} />
          Nuovi messaggi
        </p>
        <ul className="flex flex-col gap-2">
          {msgs.map(({ n, m, c }, k) => (
            <li key={n} className={cn("flex items-start gap-2 rounded-2xl rounded-tl-md border px-3 py-2", k === 0 ? "hc-new border-gold-300/40 bg-white/[0.07]" : "border-white/[0.06] bg-white/[0.03]")} style={{ opacity: 1 - k * 0.25 }}>
              <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full text-[0.625rem] font-bold text-white" style={{ background: c }}>
                {m.who[0]}
              </span>
              <span className="min-w-0 leading-tight">
                <span className="block text-[0.625rem] font-semibold text-fg-3">{m.who}</span>
                <span className="block text-[0.75rem] font-medium text-fg">{m.text}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
