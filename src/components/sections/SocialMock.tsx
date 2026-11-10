"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";
import { Icon, type IconName } from "@/components/ui/Icon";


const nf = new Intl.NumberFormat("it-IT");
/** Incrementi dei follower a ogni battito: tanti piccoli (+1, +2, +3) e ogni tanto un salto grande (+100, +150). */
const SEQ = [1, 2, 1, 3, 2, 1, 100, 2, 1, 3, 1, 2, 150, 1, 2, 3];
const SUM = SEQ.reduce((a, b) => a + b, 0);
const PREFIX = SEQ.map((_, i) => SEQ.slice(0, i).reduce((a, b) => a + b, 0));
const gained = (t: number) => Math.floor(t / SEQ.length) * SUM + (PREFIX[t % SEQ.length] ?? 0);

/**
 * Mock di un profilo Instagram fatto bene (palestra) + schermata campagne Meta Ads, in un telefono.
 * · Il contatore dei follower è grande, cambia colore a ogni incremento e corre veloce, con "+N oggi" accanto.
 * · Si passa dal profilo alla campagna con i pulsanti, le frecce o scorrendo (si alterna anche da solo).
 * · Le richieste in arrivo stanno in un pannello separato sotto il telefono: non coprono mai il resto.
 * Il timer gira solo se il mock è visibile e senza reduced motion. I dati sono DIMOSTRATIVI (site.agencyPage.demo).
 */
export function SocialMock() {
  const d = site.agencyPage.demo;
  const rootRef = useRef<HTMLElement>(null);
  const drag = useRef<number | null>(null);
  const [tick, setTick] = useState(0);
  const [manual, setManual] = useState<number | null>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let timer = 0;
    const io = new IntersectionObserver(([en]) => {
      window.clearInterval(timer);
      if (en?.isIntersecting) timer = window.setInterval(() => setTick((t) => t + 1), 420);
    });
    io.observe(el);
    return () => {
      window.clearInterval(timer);
      io.disconnect();
    };
  }, []);

  // tick ogni 0,42 s → il cambio automatico di schermata avviene ogni ~12 s (e si ferma se scegli tu)
  const auto = Math.floor(tick / 28) % 2;
  const screen = manual ?? auto;
  const followers = d.followersStart + gained(tick);
  const gain = d.todayGain + gained(tick);
  const contacts = d.ads.todayValue + Math.floor(tick / 2);
  const booked = 6 + Math.floor(tick / 6);
  const n = Math.floor(tick / 4);
  const chat = [0, 1, 2].map((k) => ({ ...d.chat[(n + d.chat.length * 4 - k) % d.chat.length]!, key: n - k }));
  const requests = 9 + n;

  const go = (to: number) => setManual(((to % 2) + 2) % 2);
  const tabs: Array<{ label: string; icon: IconName }> = [
    { label: d.tabs.profile, icon: "smartphone" },
    { label: d.tabs.campaign, icon: "trending" },
  ];

  return (
    <figure ref={rootRef} className="relative mx-auto w-[19.5rem] sm:w-[21rem] min-[1400px]:mx-0" aria-label={`${d.note}: profilo Instagram di una palestra e campagna pubblicitaria con i contatti in arrivo`}>
      <div aria-hidden="true" className="absolute -inset-12 rounded-full bg-[radial-gradient(circle,rgb(42_144_195/0.4),transparent_65%)]" />

      {/* selettore ben visibile: Instagram | Campagne (si può anche scorrere il telefono) */}
      <div role="group" aria-label="Schermata" className="relative z-10 mx-auto mb-4 flex w-full items-center gap-1 rounded-full border border-line-strong bg-night/70 p-1 backdrop-blur">
        {tabs.map((t, i) => (
          <button
            key={t.label}
            type="button"
            onClick={() => go(i)}
            aria-pressed={screen === i}
            className={cn(
              "flex flex-1 items-center justify-center gap-2 rounded-full px-3 py-2.5 text-[0.875rem] font-semibold transition-[background-color,color,box-shadow] duration-[var(--dur-base)]",
              screen === i ? "bg-[image:var(--gradient-gold-btn)] text-night shadow-glow-gold" : "text-fg-2 hover:text-fg",
            )}
          >
            <Icon name={t.icon} className="h-4 w-4" />
            {t.label}
          </button>
        ))}
      </div>

      <div
        aria-hidden="true"
        className="relative aspect-[9/17.4] touch-pan-y select-none overflow-hidden rounded-[2.4rem] border-[6px] border-line-strong bg-night shadow-[0_40px_90px_-30px_rgb(0_0_0/0.9),0_0_0_1px_rgb(42_144_195/0.35)]"
        onPointerDown={(e) => {
          drag.current = e.clientX;
        }}
        onPointerUp={(e) => {
          if (drag.current !== null && Math.abs(e.clientX - drag.current) > 40) go(screen + (e.clientX < drag.current ? 1 : -1));
          drag.current = null;
        }}
      >
        <span className="absolute left-1/2 top-2 z-30 h-5 w-24 -translate-x-1/2 rounded-full bg-night-deep" />

        {/* ===== Schermata 1: profilo Instagram (schermata reale) con follower e messaggi che si aggiornano ===== */}
        <div className={cn("absolute inset-0 overflow-hidden bg-white pt-6 transition-[opacity,transform] duration-700 ease-out-expo", screen === 0 ? "opacity-100" : "pointer-events-none -translate-x-8 opacity-0")}>
          <div className="relative w-full [container-type:inline-size]">
            <Image src="/brand/instagram-eleva.webp" alt="" width={720} height={1500} sizes="21rem" priority className="block h-auto w-full" />

            {/* messaggi in alto a destra (al posto dei tre puntini): il badge cresce con le richieste */}
            <span className="absolute right-[2.5%] top-[0.9%] grid h-[2.6%] w-[8.5%] place-items-center bg-white">
              <span className="relative">
                <Icon name="messages" className="h-[5.5cqw] w-[5.5cqw] text-black" strokeWidth={2} />
                <span key={requests} className="grow-pill absolute -right-[2.2cqw] -top-[2.2cqw] grid h-[4.4cqw] min-w-[4.4cqw] place-items-center rounded-full bg-[#c1121f] px-[1cqw] text-[2.6cqw] font-bold tabular-nums text-white">{requests}</span>
              </span>
            </span>

            {/* follower: stesso punto e stesso stile dell'originale, ma il numero cresce e cambia colore */}
            <span className="absolute left-[52.6%] top-[5.9%] flex h-[5%] w-[19.5%] flex-col items-center justify-center bg-white text-black">
              <span key={followers} className="follower-live text-[4.5cqw] font-bold leading-none tabular-nums">
                {nf.format(followers)}
              </span>
              <span className="mt-[0.8cqw] text-[3.9cqw] leading-none">{d.followersLabel}</span>
            </span>

            {/* crescita di oggi */}
            <span key={gain} className="grow-pill absolute right-[3%] top-[13.6%] flex items-center gap-[1cqw] rounded-full bg-[#1d4ed8] px-[2.6cqw] py-[1.1cqw] text-[3.6cqw] font-bold tabular-nums text-white shadow-md">
              <Icon name="trending" className="h-[3.6cqw] w-[3.6cqw]" strokeWidth={2.8} />+{gain} {d.gainLabel}
            </span>
          </div>
        </div>

        {/* ===== Schermata 2: campagna pubblicitaria ===== */}
        <div className={cn("absolute inset-0 flex flex-col px-4 pb-4 pt-10 transition-[opacity,transform] duration-700 ease-out-expo", screen === 1 ? "opacity-100" : "pointer-events-none translate-x-8 opacity-0")}>
          <div className="flex items-center justify-between">
            <p className="font-display text-[0.9375rem] font-bold text-fg">{d.ads.title}</p>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-azure-300/50 bg-azure-400/15 px-2 py-0.5 text-[0.625rem] font-semibold text-azure-300">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-azure-300" />
              {d.ads.status}
            </span>
          </div>
          <p className="mt-0.5 text-[0.6875rem] text-fg-3">{d.ads.name}</p>

          <div className="relative mt-4 overflow-hidden rounded-2xl border border-gold-400/50 bg-[linear-gradient(160deg,var(--color-cobalt-600),var(--color-night-raised))] p-4 shadow-glow-gold">
            <p className="text-[0.75rem] font-medium text-fg-2">{d.ads.today}</p>
            <p className="mt-1 flex items-end gap-2">
              <span key={contacts} className="grow-pill text-gold font-display text-[3.75rem] font-bold leading-none tracking-[-0.05em] tabular-nums">
                {contacts}
              </span>
              <span className="mb-2 font-display text-[1.125rem] font-semibold text-fg">{d.ads.todayUnit}</span>
            </p>
            <span className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-gold-300 text-night">
              <Icon name="trending" className="h-4 w-4" strokeWidth={2.4} />
            </span>
          </div>

          <div className="mt-4 flex h-32 items-end gap-1.5 rounded-xl border border-line bg-night-raised/60 px-3 pb-3 pt-4">
            {d.ads.bars.map((b, i) => (
              <span
                key={i}
                style={{ height: `${b}%`, transitionDelay: `${0.35 + i * 0.07}s` }}
                className={cn("block flex-1 origin-bottom rounded-t-md bg-gradient-to-t from-azure-400 to-gold-300 transition-transform duration-700 ease-out-expo", screen === 1 ? "scale-y-100" : "scale-y-0")}
              />
            ))}
          </div>

          <dl className="mt-4 grid grid-cols-3 gap-2">
            {d.ads.kpis.map((k) => (
              <div key={k.label} className={cn("rounded-xl border px-2 py-2.5 text-center", "live" in k && k.live ? "kpi-blink border-gold-300 bg-gold-300/10" : "border-line bg-night-raised/60")}>
                <dd key={"live" in k && k.live ? booked : k.value} className={cn("font-display text-[1rem] font-bold leading-none", "live" in k && k.live ? "grow-pill text-gold-200" : "text-fg")}>{"live" in k && k.live ? booked : k.value}</dd>
                <dt className="mt-1.5 text-[0.5625rem] leading-tight text-fg-3">{k.label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* richieste: escono dalla chat (icona messaggi in alto a destra) e compaiono a lato del telefono, solo sul profilo */}
      <div
        aria-hidden="true"
        className={cn(
          "mt-4 transition-[opacity,transform] duration-500 ease-out-expo min-[1400px]:absolute min-[1400px]:left-full min-[1400px]:top-6 min-[1400px]:ml-3 min-[1400px]:mt-0 min-[1400px]:w-[12.5rem]",
          screen === 0 ? "opacity-100" : "pointer-events-none max-[1399px]:hidden min-[1400px]:translate-x-4 min-[1400px]:opacity-0",
        )}
      >
        <p className="mb-2 flex items-center gap-2 text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-fg-3">
          <Icon name="messages" className="h-3.5 w-3.5 text-gold-300" />
          {d.requestsLabel}
        </p>
        <ul className="flex flex-col gap-2">
          {chat.map((m, i) => (
            <li
              key={m.key}
              className={cn(
                "chat-out flex items-center gap-2.5 rounded-2xl border px-3 py-2.5 shadow-[0_10px_30px_-8px_rgb(0_0_0/0.7)] backdrop-blur",
                i === 0 ? "border-gold-300/70 bg-surface-2/95" : "border-line bg-surface/90 opacity-80",
              )}
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-azure-400/30 font-display text-[0.9375rem] font-bold text-azure-300">{m.who[0]}</span>
              <span className="min-w-0 text-[0.8125rem] leading-tight text-fg">
                <strong className="block text-[0.6875rem] font-semibold text-azure-300">{m.who}</strong>
                {m.text}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <figcaption className="mt-3 text-center text-small text-fg-3">{d.note}</figcaption>
    </figure>
  );
}
