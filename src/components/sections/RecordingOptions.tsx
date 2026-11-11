"use client";

import { useState } from "react";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Section, SectionHeading } from "@/components/ui/Section";
import { SceneVideo } from "@/components/ui/SceneVideo";
import { Reveal } from "@/components/motion/Reveal";
import { Teleprompter } from "./Teleprompter";
import { SectionBg } from "@/components/ui/SectionBg";

/**
 * "Come vuoi registrare?": un interruttore grande (Veniamo noi / Registri tu) che cambia la scheda con i punti
 * e il video accanto. Sotto, in piccolo, la collaborazione minima.
 */
export function RecordingOptions() {
  const r = site.social.recording;
  const [sel, setSel] = useState(0);
  const o = r.options[sel]!;
  const videos = [
    { src: "/video/riprese-1.mp4", poster: "/video/riprese-1.jpg" },
    { src: "/video/riprese-2.mp4", poster: "/video/riprese-2.jpg" },
  ];
  return (
    <Section id="riprese" labelledBy="riprese-title" className="overflow-hidden">
      <SectionBg kind="c-rings" />
      <SectionHeading id="riprese-title" overline={r.overline} title="Come vuoi [registrare?]" line="Scegli: la qualità resta la stessa, cambia solo quanto tempo ci metti tu." align="center" />

      <Reveal y={14} blur={0} className="mx-auto mt-8 flex w-fit">
        <div role="tablist" aria-label="Modalità di ripresa" className="relative grid grid-cols-2 rounded-full border border-white/15 bg-night/70 p-1.5 backdrop-blur">
          <span aria-hidden="true" className="rec-pill absolute bottom-1.5 top-1.5 w-[calc(50%-0.375rem)] rounded-full bg-[image:var(--gradient-gold-btn)] shadow-glow-gold" style={{ left: sel ? "50%" : "0.375rem" }} />
          {r.options.map((op, i) => (
            <button key={op.id} role="tab" aria-selected={sel === i} onClick={() => setSel(i)} className={cn("relative z-[1] inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 font-display text-[0.9375rem] font-bold transition-colors sm:px-8", sel === i ? "text-night" : "text-fg-2 hover:text-fg")}>
              <Icon name={op.icon} className="h-4 w-4" strokeWidth={2} />
              {op.title.replace("Veniamo noi sul posto", "Veniamo noi").replace("Registri in autonomia", "Registri tu")}
            </button>
          ))}
        </div>
      </Reveal>

      <div className="mt-9 grid items-center gap-x-10 gap-y-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
        <div key={o.id} className="rec-card relative overflow-hidden rounded-[1.5rem] border border-gold-300/40 bg-[linear-gradient(150deg,rgb(13_39_61/0.92),rgb(4_33_58/0.85))] p-6 backdrop-blur sm:p-7">
          <div className="flex items-center justify-between gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[image:var(--gradient-gold-btn)] text-night">
              <Icon name={o.icon} className="h-6 w-6" strokeWidth={1.8} />
            </span>
            <span className={cn("rounded-full px-3 py-1 text-[0.6875rem] font-bold uppercase tracking-wider", sel ? "border border-lime-300/60 text-lime-300" : "border border-gold-300/60 text-gold-200")}>{o.tag}</span>
          </div>
          <h3 className="mt-5 font-display text-[1.5rem] font-bold leading-tight text-fg">{o.title}</h3>
          <p className="mt-1.5 text-[0.9375rem] text-fg-2">{o.text}</p>
          <ul className="mt-5 space-y-2.5 border-t border-white/10 pt-5">
            {o.points.map((p, i) => (
              <li key={p} className="rec-li flex items-start gap-3 text-[0.9375rem] leading-snug text-fg" style={{ animationDelay: `${0.1 + i * 0.08}s` }}>
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-gold-300 text-night">
                  <Icon name="check" className="h-3 w-3" strokeWidth={3} />
                </span>
                {p}
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <Button href="/contatti" size="md" icon="calendar" iconPosition="start" pulse>
              Prenota la call gratuita
            </Button>
          </div>
        </div>
        <Reveal y={0} blur={0} className="scv-reveal">
          <div key={sel} className="rec-video">
            {sel === 0 ? <SceneVideo src={videos[0]!.src} poster={videos[0]!.poster} label={o.title} /> : <Teleprompter />}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
