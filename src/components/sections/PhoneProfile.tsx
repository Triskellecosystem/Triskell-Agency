"use client";

import { useEffect, useRef, useState } from "react";
import type { DemoProfile } from "@/content/demo-profiles";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/Icon";

const fmt = (n: number) => n.toLocaleString("it-IT");

/**
 * Telefono con un profilo Instagram "fatto e finito" (attività inventata): intestazione, numeri, bio, storie in
 * evidenza e griglia di post grafici. I follower crescono dal vivo; con `campaign` compare sopra il riquadro della
 * campagna Meta Ads attiva, con le richieste di oggi e le barre che salgono. Anima solo quando è visibile.
 */
export function PhoneProfile({ profile, campaign = false, rows = 3, className }: { profile: DemoProfile; campaign?: boolean; rows?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [gain, setGain] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let timer = 0;
    const io = new IntersectionObserver(([e]) => {
      window.clearInterval(timer);
      if (e?.isIntersecting) timer = window.setInterval(() => setGain((g) => g + 1 + Math.floor(Math.random() * 3)), 900);
    });
    io.observe(el);
    return () => {
      io.disconnect();
      window.clearInterval(timer);
    };
  }, []);

  const p = profile;
  const tiles = p.grid.slice(0, rows * 3);

  return (
    <div ref={ref} aria-hidden="true" className={cn("pp relative mx-auto w-[16.5rem]", className)}>
      <div className="relative overflow-hidden rounded-[2.4rem] border-[5px] border-[#1d2a3a] bg-white shadow-[0_40px_80px_-30px_rgb(0_0_0/0.9),0_0_0_1px_rgb(255_255_255/0.06)]">
        <span className="absolute left-1/2 top-1.5 z-10 h-4 w-20 -translate-x-1/2 rounded-full bg-black" />
        <div className="pp-screen bg-white pt-7 text-[#111]">
          {/* intestazione */}
          <div className="flex items-center justify-between px-3 text-[0.75rem] font-bold">
            <span className="flex items-center gap-1">
              {p.handle}
              <span className="grid h-3 w-3 place-items-center rounded-full bg-[#3897f0] text-[7px] text-white">✓</span>
            </span>
            <span className="flex gap-2 text-[#111]">
              <Icon name="plus" className="h-3.5 w-3.5" strokeWidth={2.4} />
              <Icon name="menu" className="h-3.5 w-3.5" strokeWidth={2.4} />
            </span>
          </div>
          <div className="mt-2.5 flex items-center gap-3 px-3">
            <span className="relative grid h-14 w-14 shrink-0 place-items-center rounded-full p-[2px]" style={{ background: "conic-gradient(#f7c85c,#e1306c,#833ab4,#f7c85c)" }}>
              <span className="grid h-full w-full place-items-center rounded-full border-2 border-white font-display text-[1.25rem] font-bold text-white" style={{ background: p.avatar.bg }}>
                {p.avatar.letter}
              </span>
            </span>
            <dl className="grid flex-1 grid-cols-3 text-center leading-tight">
              <div>
                <dd className="text-[0.8125rem] font-bold">{p.posts}</dd>
                <dt className="text-[0.5625rem] text-[#555]">post</dt>
              </div>
              <div>
                <dd key={gain} className="pp-count text-[0.8125rem] font-bold">{fmt(p.followers + gain)}</dd>
                <dt className="text-[0.5625rem] text-[#555]">follower</dt>
              </div>
              <div>
                <dd className="text-[0.8125rem] font-bold">{p.following}</dd>
                <dt className="text-[0.5625rem] text-[#555]">seguiti</dt>
              </div>
            </dl>
          </div>
          <div className="mt-2 px-3 text-[0.625rem] leading-snug">
            <p className="font-bold">{p.name}</p>
            <p className="text-[#777]">{p.category}</p>
            {p.bio.map((b) => (
              <p key={b}>{b}</p>
            ))}
          </div>
          <div className="mt-2 grid grid-cols-2 gap-1 px-3">
            <span className="rounded-md bg-[#0095f6] py-1 text-center text-[0.625rem] font-semibold text-white">Segui</span>
            <span className="rounded-md bg-[#efefef] py-1 text-center text-[0.625rem] font-semibold">Messaggio</span>
          </div>
          <ul className="mt-2.5 flex gap-2.5 overflow-hidden px-3">
            {p.highlights.map((h) => (
              <li key={h.label} className="flex w-11 shrink-0 flex-col items-center gap-0.5">
                <span className="h-10 w-10 rounded-full border border-[#ddd] p-[2px]">
                  <span className="block h-full w-full rounded-full" style={{ background: h.bg }} />
                </span>
                <span className="w-full truncate text-center text-[0.5rem]">{h.label}</span>
              </li>
            ))}
          </ul>
          <div className="mt-2 flex justify-around border-t border-[#eee] py-1.5 text-[#111]">
            <Icon name="grid" className="h-3.5 w-3.5" strokeWidth={2} />
            <Icon name="film" className="h-3.5 w-3.5 text-[#999]" strokeWidth={2} />
            <Icon name="user" className="h-3.5 w-3.5 text-[#999]" strokeWidth={2} />
          </div>
          {/* griglia di post grafici */}
          <div className="grid grid-cols-3 gap-[2px]">
            {tiles.map((t, i) => (
              <div key={i} className="pp-tile relative flex aspect-[4/5] flex-col justify-end overflow-hidden p-1.5" style={{ background: t.bg, animationDelay: `${i * 0.08}s` }}>
                {t.kind && (
                  <Icon name={t.kind === "reel" ? "film" : "layers"} className={cn("absolute right-1 top-1 h-2.5 w-2.5", t.dark ? "text-white" : "text-[#111]")} strokeWidth={2.4} />
                )}
                <p className={cn("font-display text-[0.6875rem] font-bold leading-[1.05]", t.dark ? "text-white" : "text-[#1b1b1b]")}>{t.title}</p>
                {t.sub && <p className={cn("mt-0.5 text-[0.4375rem] leading-tight", t.dark ? "text-white/80" : "text-[#333]")}>{t.sub}</p>}
              </div>
            ))}
          </div>
        </div>
      </div>

      {campaign && (
        <div className="pp-ad absolute -right-16 top-[38%] z-20 w-[12.5rem] rounded-2xl border border-gold-300/50 bg-[rgb(5_20_34/0.92)] p-3 text-left shadow-[0_24px_50px_-20px_rgb(0_0_0/0.9),0_0_30px_-10px_rgb(247_200_92/0.5)] backdrop-blur-md max-sm:-right-4">
          <p className="flex items-center justify-between text-[0.5625rem] font-semibold uppercase tracking-wider text-fg-3">
            Meta Ads
            <span className="inline-flex items-center gap-1 text-lime-300">
              <span className="agent-live h-1.5 w-1.5 rounded-full bg-lime-300" />
              Attiva
            </span>
          </p>
          <p className="mt-1 truncate text-[0.6875rem] font-semibold text-fg">{p.campaign.name}</p>
          <p className="mt-2 flex items-baseline gap-1.5">
            <span className="font-display text-[1.5rem] font-bold leading-none text-gold">{p.campaign.today + Math.floor(gain / 6)}</span>
            <span className="text-[0.625rem] text-fg-2">{p.campaign.unit}</span>
          </p>
          <div className="mt-2 flex h-8 items-end gap-1">
            {[30, 42, 38, 55, 62, 58, 74, 90].map((h, i) => (
              <span key={i} className="pp-bar flex-1 rounded-sm bg-gradient-to-t from-azure-400 to-gold-300" style={{ height: `${h}%`, animationDelay: `${i * 0.08}s` }} />
            ))}
          </div>
          <p className="mt-2 text-[0.625rem] font-semibold text-lime-300">{p.campaign.gain}</p>
        </div>
      )}

      {campaign && (
        <span key={gain} className="pp-plus absolute -left-6 top-[16%] z-20 rounded-full bg-[#e1306c] px-2 py-0.5 text-[0.625rem] font-bold text-white shadow-lg">
          +{1 + (gain % 3)} follower
        </span>
      )}
    </div>
  );
}
