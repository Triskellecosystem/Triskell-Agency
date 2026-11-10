"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { Avatar } from "@/components/ui/Avatar";

const nf = (n: number) => n.toLocaleString("it-IT");
const BEAUTY = [
  { who: "Giulia R.", text: "Avete posto per una pulizia viso?" },
  { who: "Sara B.", text: "Quanto costa la laminazione ciglia?" },
  { who: "Elena M.", text: "Posso prenotare sabato mattina?" },
  { who: "Chiara P.", text: "Fate anche trattamenti corpo?" },
  { who: "Marta C.", text: "Ho visto la promo, è ancora valida?" },
  { who: "Anna D.", text: "Vorrei info sulla consulenza gratuita" },
];
const DENTAL = [
  { who: "Roberto F.", text: "Fate anche l'allineatore invisibile?" },
  { who: "Laura P.", text: "Posso prenotare una prima visita?" },
  { who: "Marco S.", text: "Quanto costa lo sbiancamento?" },
  { who: "Giada T.", text: "Avete posto venerdì pomeriggio?" },
  { who: "Simone V.", text: "Ho visto la promo, è ancora valida?" },
];
const MESSAGES = [
  { who: "Martina R.", text: "Ciao! Quando posso iniziare?" },
  { who: "Luca B.", text: "Quanto costa la prova?" },
  { who: "Sara M.", text: "Avete posto sabato mattina?" },
  { who: "Giorgio P.", text: "Vorrei info sui pacchetti" },
  { who: "Elena C.", text: "Posso prenotare per domani?" },
  { who: "Paolo D.", text: "Ho visto la pubblicità, mi richiamate?" },
  { who: "Chiara F.", text: "Fate anche personal training?" },
];

/**
 * Telefono grande e nitido con il profilo Vertis (esempio): il numero dei follower DENTRO lo schermo corre veloce.
 * A destra i nuovi messaggi escono dal telefono e si mettono in colonna (ognuno con la sua immagine profilo);
 * sotto, richieste e vendite chiuse che salgono e pulsano. Gira solo quando è visibile.
 */
const PROFILES = {
  vertis: { img: "/social-examples/hd/vertis.webp", base: 78500, name: "Prova gratuita · Vertis Fitness", top: "10.25%" },
  essentia: { img: "/social-examples/hd/essentia.webp", base: 52800, name: "Trattamento omaggio · Essentia", top: "10%" },
  lumina: { img: "/social-examples/hd/lumina.webp", base: 36400, name: "Prima visita gratuita · Lumina Dental", top: "10%" },
  lavie: { img: "/social-examples/hd/lavie.webp", base: 36900, name: "Consulenza gratuita · La Vie Beauty", top: "10%" },
} as const;

export function LivePhone({ className, compact, tabs, salesLabel = "Vendite chiuse", profile = "vertis" }: { className?: string; compact?: boolean; tabs?: boolean; salesLabel?: string; profile?: keyof typeof PROFILES }) {
  const P = PROFILES[profile];
  const LIST = profile === "vertis" ? MESSAGES : profile === "lumina" ? DENTAL : BEAUTY;
  const [tab, setTab] = useState<0 | 1>(0);
  const drag = useRef<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const [f, setF] = useState(0); // battiti veloci (follower)
  const [m, setM] = useState(0); // messaggi

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let a = 0;
    let b = 0;
    const io = new IntersectionObserver(([e]) => {
      window.clearInterval(a);
      window.clearInterval(b);
      if (e?.isIntersecting) {
        a = window.setInterval(() => setF((x) => x + 1), 650);
        b = window.setInterval(() => setM((x) => x + 1), 2400);
      }
    });
    io.observe(el);
    return () => {
      io.disconnect();
      window.clearInterval(a);
      window.clearInterval(b);
    };
  }, []);

  const followers = P.base + f;
  const today = 200 + f; // +200, +201, +202…
  const requests = 18 + Math.floor(f / 2.5);
  const campLeads = 18 + Math.floor(f / 2);
  const sales = 6 + Math.floor(f / 6);
  const msgs = Array.from({ length: compact ? 3 : 4 }, (_, k) => {
    const n = m - k;
    const i = ((n % LIST.length) + LIST.length) % LIST.length;
    return { n, i, msg: LIST[i]! };
  });

  return (
    <div ref={ref} aria-hidden={tabs ? undefined : true} className={cn("lp2 grid items-center gap-5 sm:grid-cols-[minmax(0,17.5rem)_minmax(0,1fr)]", className)}>
      {/* telefono */}
      <div className="relative mx-auto w-full max-w-[17.5rem]">
        <span aria-hidden="true" className="phone-glow" />
        {tabs && (
          <div role="tablist" aria-label="Schermata" className="pointer-events-auto mb-3 flex gap-1 rounded-full border border-white/15 bg-night/70 p-1">
            {(["Instagram", "Campagna"] as const).map((l, i) => (
              <button key={l} role="tab" aria-selected={tab === i} onClick={() => setTab(i as 0 | 1)} className={cn("flex-1 rounded-full py-1.5 text-[0.75rem] font-bold transition-colors", tab === i ? "bg-[image:var(--gradient-gold-btn)] text-night" : "text-fg-2 hover:text-fg")}>
                {l}
              </button>
            ))}
          </div>
        )}
        <div
          className={cn("lp2-phone relative overflow-hidden rounded-[2.2rem] border-[6px] border-[#1d2a3a] bg-white shadow-[0_50px_100px_-40px_rgb(0_0_0/0.95),0_0_0_1px_rgb(255_255_255/0.08)] [container-type:inline-size]", tabs && "pointer-events-auto cursor-grab touch-pan-y select-none")}
          onPointerDown={tabs ? (e) => (drag.current = e.clientX) : undefined}
          onPointerUp={tabs ? (e) => { if (drag.current !== null && Math.abs(e.clientX - drag.current) > 30) setTab((x) => (x ? 0 : 1)); drag.current = null; } : undefined}
        >
          {tabs && tab === 1 && (
            <div className="lp2-camp absolute inset-0 z-10 flex flex-col bg-[#0b1622] p-[5cqw] text-left">
              <p className="mt-[6cqw] flex items-center justify-between text-[3.4cqw] font-semibold uppercase tracking-wider text-fg-3">
                Gestione inserzioni
                <span className="inline-flex items-center gap-1 text-lime-300"><span className="agent-live h-1.5 w-1.5 rounded-full bg-lime-300" />Attiva</span>
              </p>
              <p className="mt-[1.5cqw] text-[4.6cqw] font-bold text-white">{P.name}</p>
              <div className="mt-[4cqw] rounded-xl bg-white/[0.05] p-[4cqw]">
                <p className="text-[3.4cqw] text-fg-3">Contatti oggi</p>
                <p key={campLeads} className="lp2-count font-display text-[13cqw] font-bold leading-none text-gold">{campLeads}</p>
                <div className="mt-[4cqw] flex h-[22cqw] items-end gap-1">
                  {[30, 42, 38, 55, 48, 62, 70, 66, 82, 94].map((h, k) => (
                    <span key={k} className="pp-bar flex-1 rounded-sm bg-gradient-to-t from-azure-400 to-gold-300" style={{ height: `${h}%`, animationDelay: `${k * 0.07}s` }} />
                  ))}
                </div>
              </div>
              <dl className="mt-[3cqw] grid grid-cols-2 gap-[2.5cqw]">
                {[["Costo/contatto", "2,10 €"], ["Persone raggiunte", nf(14200 + f * 23)], ["Click sul profilo", nf(1318 + f * 3)], ["Prove prenotate", String(sales)]].map(([k, v]) => (
                  <div key={k} className="rounded-lg bg-white/[0.05] p-[2.5cqw]">
                    <dt className="text-[3cqw] text-fg-3">{k}</dt>
                    <dd className="font-display text-[5cqw] font-bold text-white">{v}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-auto rounded-lg bg-lime-300/10 py-[2.5cqw] text-center text-[3.6cqw] font-semibold text-lime-300">▲ +38% contatti rispetto a ieri</p>
            </div>
          )}
          <Image src={P.img} alt="" width={852} height={1846} sizes="(min-width: 640px) 18rem, 80vw" priority className="block h-auto w-full" />
          {/* follower dentro lo schermo */}
          <span className="absolute grid place-items-center bg-white" style={{ left: "51%", top: P.top, width: "20.5%", height: "2.3%" }}>
            <span key={followers} className="lp2-in font-sans font-bold leading-none text-[#111]" style={{ fontSize: "4.1cqw" }}>
              {nf(followers)}
            </span>
          </span>
        </div>
        {/* +N follower: escono dallo schermo, grandi, e salgono piano */}
        <span aria-hidden="true" className={cn("pointer-events-none absolute -right-6 z-30 h-0 w-0 sm:-right-10", tabs ? "top-[17%]" : "top-[9%]")}>
          {[f, f - 1].filter((x) => x > 0).map((x) => (
            <span key={x} className="lp2-bubble absolute right-0 top-0 inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-[linear-gradient(135deg,#ff4f8b,#e1306c)] px-3.5 py-1.5 font-display text-[1.125rem] font-bold text-white shadow-[0_10px_30px_-8px_rgb(225_48_108/0.9)]">
              <span className="text-[0.9rem]">♥</span>+{x} follower
            </span>
          ))}
        </span>
        {tabs && <p className="mt-1 text-center text-[0.625rem] text-fg-3">Trascina il telefono per vedere la campagna</p>}
      </div>

      {/* messaggi + numeri, a lato */}
      <div className="flex flex-col gap-2.5">
        <div className="lp2-today relative overflow-hidden rounded-2xl border border-gold-300/50 bg-[linear-gradient(135deg,rgb(247_200_92/0.16),rgb(13_39_61/0.85))] px-4 py-3">
          <p className="text-[0.625rem] font-bold uppercase tracking-[0.16em] text-gold-200">Solo oggi</p>
          <p className="mt-0.5 flex items-baseline gap-2">
            <span key={today} className="lp2-tick font-display text-[2.25rem] font-bold leading-none tracking-[-0.04em] text-gold">+{nf(today)}</span>
            <span className="text-[0.8125rem] font-semibold text-fg-2">nuovi follower</span>
          </p>
        </div>
        <p className="mt-1 text-[0.625rem] font-bold uppercase tracking-[0.16em] text-fg-3">Nuovi messaggi</p>
        <ul className="flex flex-col gap-2">
          {msgs.map(({ n, i, msg }, k) => (
            <li key={n} className={cn("flex items-center gap-2.5 rounded-2xl rounded-tl-md border px-3 py-2.5 backdrop-blur-md", k === 0 ? "lp2-fly border-gold-300/50 bg-[rgb(13_39_61/0.9)] shadow-[0_0_30px_-10px_rgb(247_200_92/0.6)]" : "border-white/10 bg-[rgb(13_39_61/0.6)]")} style={{ opacity: 1 - k * 0.18 }}>
              <Avatar i={i} size={32} />
              <span className="min-w-0 leading-tight">
                <span className="block text-[0.6875rem] font-semibold text-fg-3">{msg.who}</span>
                <span className="block text-[0.8125rem] font-medium text-fg">{msg.text}</span>
              </span>
            </li>
          ))}
        </ul>
        <div className="mt-1 grid grid-cols-2 gap-2.5">
          <div className="lp2-stat rounded-2xl border border-azure-300/40 bg-azure-300/[0.08] p-3.5">
            <p className="text-[0.625rem] font-bold uppercase tracking-wider text-fg-2">Richieste</p>
            <p key={requests} className="lp2-count mt-1 font-display text-[2rem] font-bold leading-none tracking-[-0.04em] text-azure-300">{requests}</p>
          </div>
          <div className="lp2-stat lp2-stat--b rounded-2xl border border-lime-300/40 bg-lime-300/[0.07] p-3.5">
            <p className="text-[0.625rem] font-bold uppercase tracking-wider text-fg-2">{salesLabel}</p>
            <p key={sales} className="lp2-count mt-1 font-display text-[2rem] font-bold leading-none tracking-[-0.04em] text-lime-300">{sales}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
