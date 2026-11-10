"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/ui/Icon";

/**
 * "Registri tu": un telefono in modalità ripresa con il video di un imprenditore che parla alla camera, come
 * farebbe il cliente seguendo il nostro script. REC con il tempo che scorre, griglia dei terzi, pulsante audio.
 * Parte senza audio quando è visibile e si ferma fuori schermo.
 */
export function Teleprompter() {
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
  return (
    <div className="relative mx-auto w-full max-w-[18rem]">
      <span aria-hidden="true" className="phone-glow" />
      <div className="relative aspect-[9/16] overflow-hidden rounded-[2.2rem] border-[6px] border-[#1d2a3a] bg-black shadow-[0_50px_100px_-40px_rgb(0_0_0/0.95)]">
        <video ref={v} src="/video/registri-tu.mp4" poster="/video/registri-tu.jpg" muted loop playsInline preload="metadata" aria-label="Un imprenditore registra da solo un video per i social" className="absolute inset-0 h-full w-full object-cover" />
        <span aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,rgb(0_0_0/0.4),transparent_22%,transparent_75%,rgb(0_0_0/0.5))]" />
        {/* griglia dei terzi */}
        <span aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(90deg,transparent_33%,rgb(255_255_255/0.18)_33%,rgb(255_255_255/0.18)_33.4%,transparent_33.4%,transparent_66.6%,rgb(255_255_255/0.18)_66.6%,rgb(255_255_255/0.18)_67%,transparent_67%),linear-gradient(transparent_33%,rgb(255_255_255/0.18)_33%,rgb(255_255_255/0.18)_33.3%,transparent_33.3%,transparent_66.6%,rgb(255_255_255/0.18)_66.6%,rgb(255_255_255/0.18)_66.9%,transparent_66.9%)]" />
        <span aria-hidden="true" className="absolute left-3 top-4 inline-flex items-center gap-1.5 rounded-full bg-black/55 px-2 py-0.5 font-mono text-[0.625rem] font-bold text-white">
          <i className="scv-rec h-2 w-2 rounded-full bg-[#ff3b30]" />
          REC 00:{String(time).padStart(2, "0")}
        </span>
        <span aria-hidden="true" className="absolute right-3 top-4 rounded-full bg-black/55 px-2 py-0.5 text-[0.625rem] font-bold text-gold-200">Script Triskell</span>
        <button type="button" onClick={toggle} aria-label={muted ? "Attiva l'audio" : "Disattiva l'audio"} className="absolute bottom-4 left-1/2 inline-flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/25 bg-black/55 px-3.5 py-2 text-[0.75rem] font-semibold text-white backdrop-blur-md transition-colors hover:border-gold-300 hover:text-gold-200">
          <Icon name={muted ? "volume-off" : "volume"} className="h-4 w-4" strokeWidth={2} />
          {muted ? "Attiva audio" : "Audio attivo"}
        </button>
      </div>
      <p className="mt-3 text-center text-[0.75rem] text-fg-3">Registri tu col telefono: lo script e le inquadrature li prepariamo noi</p>
    </div>
  );
}
