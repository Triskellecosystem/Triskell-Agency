"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/Icon";

/**
 * Video verticale dentro un telefono. "raw": ripresa grezza (REC, griglia dei terzi). "edited": il video finito,
 * con l'etichetta "Editato da Triskell". Parte senza audio quando è visibile e si ferma fuori schermo.
 */
export function PhoneVideo({ src, poster, label, kind }: { src: string; poster: string; label: string; kind: "raw" | "edited" }) {
  const v = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [time, setTime] = useState(0);
  useEffect(() => {
    const el = v.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const io = new IntersectionObserver(([e]) => {
      if (e?.isIntersecting && !reduced) el.play().catch(() => {});
      else el.pause();
    }, { threshold: 0.35 });
    io.observe(el);
    const onT = () => setTime(Math.floor(el.currentTime));
    el.addEventListener("timeupdate", onT);
    return () => {
      io.disconnect();
      el.removeEventListener("timeupdate", onT);
    };
  }, []);
  const toggle = () => {
    const el = v.current;
    if (!el) return;
    el.muted = !el.muted;
    setMuted(el.muted);
    if (el.paused) el.play().catch(() => {});
  };
  const edited = kind === "edited";
  return (
    <div className={cn("relative aspect-[9/16] overflow-hidden rounded-[1.75rem] border-[5px] bg-black shadow-[0_40px_80px_-36px_rgb(0_0_0/0.95)]", edited ? "border-gold-300/80 shadow-[0_0_50px_-14px_rgb(247_200_92/0.55)]" : "border-[#1d2a3a]")}>
      <video ref={v} src={src} poster={poster} muted loop playsInline preload="metadata" aria-label={label} className="absolute inset-0 h-full w-full object-cover" />
      {!edited && (
        <>
          <span aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(90deg,transparent_33%,rgb(255_255_255/0.18)_33%,rgb(255_255_255/0.18)_33.4%,transparent_33.4%,transparent_66.6%,rgb(255_255_255/0.18)_66.6%,rgb(255_255_255/0.18)_67%,transparent_67%),linear-gradient(transparent_33%,rgb(255_255_255/0.18)_33%,rgb(255_255_255/0.18)_33.3%,transparent_33.3%,transparent_66.6%,rgb(255_255_255/0.18)_66.6%,rgb(255_255_255/0.18)_66.9%,transparent_66.9%)]" />
          <span aria-hidden="true" className="absolute left-2.5 top-3 inline-flex items-center gap-1.5 rounded-full bg-black/55 px-2 py-0.5 font-mono text-[0.5625rem] font-bold text-white">
            <i className="scv-rec h-1.5 w-1.5 rounded-full bg-[#ff3b30]" />
            REC 00:{String(time).padStart(2, "0")}
          </span>
        </>
      )}
      <button type="button" onClick={toggle} aria-label={muted ? "Attiva l'audio" : "Disattiva l'audio"} className="absolute right-2.5 top-2.5 grid h-8 w-8 place-items-center rounded-full border border-white/25 bg-black/55 text-white backdrop-blur-md transition-colors hover:border-gold-300 hover:text-gold-200">
        <Icon name={muted ? "volume-off" : "volume"} className="h-4 w-4" strokeWidth={2} />
      </button>
    </div>
  );
}

/**
 * "Registri tu": a sinistra la ripresa grezza fatta col telefono, una freccia, a destra lo stesso video editato da
 * noi (grafiche, icone, musica). Fa capire subito il passaggio: tu registri, noi lo rendiamo professionale.
 */
export function Teleprompter() {
  return (
    <div>
      <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-start gap-2.5 sm:gap-4">
        <figure className="min-w-0">
          <figcaption className="mb-2.5 text-center text-[0.6875rem] font-bold uppercase tracking-[0.14em] text-fg-3">1 · Registri tu</figcaption>
          <PhoneVideo kind="raw" src="/video/registri-tu.mp4" poster="/video/registri-tu.jpg" label="La ripresa grezza fatta col telefono, senza montaggio" />
        </figure>
        <div aria-hidden="true" className="flex flex-col items-center gap-2 self-center pb-10">
          <span className="ba-arrow grid h-11 w-11 place-items-center rounded-full bg-[image:var(--gradient-gold-btn)] text-night shadow-[0_0_30px_-6px_rgb(247_200_92/0.7)] sm:h-12 sm:w-12">
            <Icon name="arrow-right" className="h-5 w-5" strokeWidth={2.4} />
          </span>
          <span className="hidden max-w-[5.5rem] text-center text-[0.625rem] font-semibold leading-tight text-gold-200 sm:block">Te lo editiamo noi</span>
        </div>
        <figure className="min-w-0">
          <figcaption className="mb-2.5 text-center text-[0.6875rem] font-bold uppercase tracking-[0.14em] text-gold-200">2 · Lo editiamo noi</figcaption>
          <PhoneVideo kind="edited" src="/video/editato-v2.mp4" poster="/video/editato-v2.jpg" label="Lo stesso video editato da Triskell, con grafiche, icone e musica" />
          <ul aria-hidden="true" className="tp-adds mt-2.5 grid grid-cols-2 gap-1.5">
            {([["play", "Sottotitoli"], ["pen", "Grafica e testi"], ["music", "Musica"], ["layers", "Stile pro"]] as const).map(([ic, l], k) => (
              <li key={l} className="flex items-center gap-1.5 rounded-lg border border-gold-300/30 bg-night/70 px-2 py-1 text-[0.625rem] font-medium text-fg" style={{ animationDelay: `${0.4 + k * 0.2}s` }}>
                <Icon name={ic} className="h-3 w-3 shrink-0 text-gold-300" strokeWidth={2} />
                {l}
              </li>
            ))}
          </ul>
        </figure>
      </div>
      <p className="mt-4 text-center text-[0.8125rem] text-fg-2">
        Tu registri col telefono seguendo il nostro script. <strong className="font-semibold text-gold-200">Poi te lo editiamo noi</strong>: grafiche, icone, musica e sottotitoli.
      </p>
    </div>
  );
}
