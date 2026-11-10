"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/Icon";

/**
 * Video "da set": cornice d'oro che gira, alone dietro, etichetta REC con il tempo che scorre, bordi del mirino.
 * Parte in automatico senza audio quando è visibile (si ferma fuori schermo); il pulsante audio lo attiva/disattiva.
 * Leggera inclinazione 3D che segue il mouse.
 */
export function SceneVideo({ src, poster, label, className, tag = "Dietro le quinte · Triskell" }: { src: string; poster: string; label: string; className?: string; tag?: string }) {
  const v = useRef<HTMLVideoElement>(null);
  const box = useRef<HTMLDivElement>(null);
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

  const onMove = (e: React.PointerEvent) => {
    const el = box.current;
    if (!el || e.pointerType !== "mouse") return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--tx", `${(((e.clientX - r.left) / r.width - 0.5) * 6).toFixed(2)}deg`);
    el.style.setProperty("--ty", `${(-((e.clientY - r.top) / r.height - 0.5) * 5).toFixed(2)}deg`);
  };

  return (
    <div ref={box} onPointerMove={onMove} onPointerLeave={() => { box.current?.style.setProperty("--tx", "0deg"); box.current?.style.setProperty("--ty", "0deg"); }} className={cn("scv relative isolate [perspective:1400px]", className)}>
      <span aria-hidden="true" className="scv-glow" />
      <span aria-hidden="true" className="scv-bar scv-bar--t" />
      <span aria-hidden="true" className="scv-bar scv-bar--b" />
      <div className="scv-frame relative rounded-[1.5rem] p-[2px]">
        <span aria-hidden="true" className="scv-ring absolute inset-0 rounded-[inherit]" />
        <div className="relative overflow-hidden rounded-[calc(1.5rem-2px)] bg-black">
          <video ref={v} src={src} poster={poster} muted loop playsInline preload="metadata" aria-label={label} className="block aspect-video w-full object-cover" />
          <span aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgb(0_0_0/0.35),transparent_25%,transparent_70%,rgb(0_0_0/0.55))]" />
          <span aria-hidden="true" className="scv-c scv-c--a" />
          <span aria-hidden="true" className="scv-c scv-c--b" />
          <span aria-hidden="true" className="scv-c scv-c--c" />
          <span aria-hidden="true" className="scv-c scv-c--d" />
          <span aria-hidden="true" className="absolute left-4 top-3.5 inline-flex items-center gap-1.5 font-mono text-[0.6875rem] font-bold tracking-wider text-white">
            <i className="scv-rec h-2 w-2 rounded-full bg-[#ff3b30]" />
            REC 00:{String(time).padStart(2, "0")}
          </span>
          <span aria-hidden="true" className="absolute right-4 top-3.5 font-mono text-[0.6875rem] font-bold tracking-wider text-white/80">{tag}</span>
          <button type="button" onClick={toggle} aria-label={muted ? "Attiva l'audio" : "Disattiva l'audio"} className="absolute bottom-3.5 right-3.5 inline-flex items-center gap-2 rounded-full border border-white/25 bg-black/55 px-3.5 py-2 text-[0.75rem] font-semibold text-white backdrop-blur-md transition-colors hover:border-gold-300 hover:text-gold-200">
            <Icon name={muted ? "volume-off" : "volume"} className="h-4 w-4" strokeWidth={2} />
            {muted ? "Attiva audio" : "Audio attivo"}
          </button>
        </div>
      </div>
    </div>
  );
}
