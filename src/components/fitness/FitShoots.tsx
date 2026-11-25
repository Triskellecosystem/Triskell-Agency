"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { Icon, type IconName } from "@/components/ui/Icon";

type Clip = { src: string; poster: string; tag: string; wide: boolean };
const MODES: Array<{ id: string; icon: IconName; label: string; title: string; points: string[]; clips: Clip[] }> = [
  { id: "noi", icon: "camera", label: "Veniamo noi in palestra", title: "Giriamo noi, tu alleni", points: ["Riprese professionali in palestra", "Coach, attrezzi e clienti veri", "Montaggio e pubblicazione inclusi"], clips: [{ src: "/video/riprese-1.mp4", poster: "/video/riprese-1.jpg", tag: "Dietro le quinte", wide: true }, { src: "/video/riprese-2.mp4", poster: "/video/riprese-2.jpg", tag: "Sul set", wide: true }] },
  { id: "tu", icon: "smartphone", label: "Registri tu", title: "Registri tu, al resto pensiamo noi", points: ["Script pronti da leggere", "Indicazioni su luce e inquadrature", "Editing professionale fatto da noi"], clips: [{ src: "/video/fit-raw.mp4", poster: "/video/fit-raw.jpg", tag: "Girato da te", wide: false }, { src: "/video/fit-edited.mp4", poster: "/video/fit-edited.jpg", tag: "Editato da noi", wide: false }] },
];

/** Un video nel suo formato originale, senza audio all'inizio e con il pulsante per attivarlo. */
function Clip({ c, sound, onSound }: { c: Clip; sound: boolean; onSound: () => void }) {
  const v = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const el = v.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => (e?.isIntersecting ? el.play().catch(() => {}) : el.pause()), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, [c.src]);
  useEffect(() => {
    const el = v.current;
    if (!el) return;
    el.muted = !sound;
    if (sound) el.play().catch(() => {});
  }, [sound]);
  return (
    <figure className={cn("fit-phone relative w-full overflow-hidden rounded-[1.25rem]", c.wide ? "aspect-video" : "aspect-[9/16]")}>
      <video ref={v} key={c.src} src={c.src} poster={c.poster} muted loop playsInline preload="metadata" className="absolute inset-0 h-full w-full object-contain" />
      <figcaption className="fit-h absolute right-3 top-3 rounded-md bg-black/70 px-2 py-1 text-[0.625rem] text-fit-300 backdrop-blur">{c.tag}</figcaption>
      <button type="button" onClick={onSound} aria-label={sound ? "Disattiva l'audio" : "Attiva l'audio"} className={cn("absolute bottom-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full border px-3 py-1.5 text-[0.75rem] font-bold backdrop-blur-md transition-colors", sound ? "border-fit-300 bg-fit-300 text-black" : "border-white/30 bg-black/60 text-white hover:border-fit-300")}>
        <Icon name={sound ? "volume" : "volume-off"} className="h-4 w-4" strokeWidth={2} />
        {sound ? "Audio attivo" : "Attiva audio"}
      </button>
    </figure>
  );
}

/** Riprese: veniamo noi in palestra oppure registri tu. Interruttore con i video veri, nel loro formato e con audio. */
export function FitShoots() {
  const [m, setM] = useState(0);
  const [sound, setSound] = useState<number | null>(null);
  const mode = MODES[m]!;
  return (
    <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
      <div>
        <div className="grid gap-2 sm:grid-cols-2">
          {MODES.map((x, i) => (
            <button key={x.id} type="button" onClick={() => { setM(i); setSound(null); }} aria-pressed={m === i} className={cn("fit-tab flex items-center gap-3 rounded-xl px-4 py-3 text-left", m === i && "fit-tab--on")}>
              <Icon name={x.icon} className="h-5 w-5 shrink-0" strokeWidth={2} />
              <span className="text-[0.9375rem] font-bold">{x.label}</span>
            </button>
          ))}
        </div>
        <div key={mode.id} className="fit-fade mt-5">
          <h3 className="fit-h text-[clamp(1.3rem,1.1rem+0.9vw,1.85rem)] leading-[1.05] text-white">{mode.title}</h3>
          <ul className="mt-4 space-y-2.5">
            {mode.points.map((p) => (
              <li key={p} className="flex items-center gap-3 text-[1rem] text-white/80">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-md bg-fit-300/15 text-fit-300"><Icon name="check" className="h-4 w-4" strokeWidth={3} /></span>
                {p}
              </li>
            ))}
          </ul>
          <p className="mt-5 text-[0.875rem] text-white/50">In entrambi i casi la qualità resta la stessa: cambia solo quanto tempo ci metti tu.</p>
          <Link href="#contatti" className="fit-btn fit-btn--pulse mt-6">
            <Icon name="calendar" className="h-5 w-5" strokeWidth={2.2} /> Prenota la call gratuita
          </Link>
        </div>
      </div>
      <div key={mode.id + "v"} className={cn("fit-fade mx-auto grid w-full gap-4", mode.clips[0]!.wide ? "max-w-[min(30rem,100%)]" : "w-fit grid-cols-2 justify-center gap-5")}>
        {mode.clips.map((c, i) => (
          <div key={c.src} className={cn(mode.clips[0]!.wide ? (i ? "ml-[12%]" : "mr-[12%]") : i ? "translate-y-6" : "")}>
            <Clip c={c} sound={sound === i} onSound={() => setSound((s) => (s === i ? null : i))} />
          </div>
        ))}
      </div>
    </div>
  );
}
