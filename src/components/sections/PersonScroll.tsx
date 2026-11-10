"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { CameraKey, Person, PersonPhase } from "@/content/site";
import { cn } from "@/lib/cn";
import { DigitalCursor } from "@/components/motion/DigitalCursor";
import { Reveal } from "@/components/motion/Reveal";

type CSSVars = React.CSSProperties & { [key: `--${string}`]: string | number };

const smooth = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

/** Interpolazione continua e reversibile tra i punti della camera. */
function cameraAt(keys: CameraKey[], t: number) {
  let i = 0;
  while (i < keys.length - 2 && t > keys[i + 1]!.at) i++;
  const a = keys[i]!;
  const b = keys[i + 1]!;
  const k = smooth(a.at, b.at, t);
  const m = (x: number, y: number) => x + (y - x) * k;
  return { u: m(a.u, b.u), v: m(a.v, b.v), tz: m(a.tz, b.tz), ry: m(a.ry, b.ry), rx: m(a.rx, b.rx), scene: m(a.scene, b.scene) };
}

/** Contenuto di una fase (stesso markup su desktop e telefono). */
function PhaseContent({ ph, tone, big }: { ph: PersonPhase; tone: Person["tone"]; big?: boolean }) {
  const accent = tone === "azure" ? "text-azure-300" : "text-ember-300";
  return (
    <>
      <p className="flex items-center gap-2.5 text-[0.75rem] font-semibold uppercase tracking-[0.2em] text-gold-300">
        <span aria-hidden="true" className="h-px w-7 bg-gold-300/70" />
        {ph.kicker}
      </p>
      <h3
        className={cn(
          "mt-3 font-display font-bold tracking-[-0.03em] text-fg [text-wrap:balance]",
          ph.quote ? "text-[clamp(1.5rem,1.1rem+1.6vw,2.375rem)] leading-[1.14]" : big ? "text-[clamp(2.25rem,1.4rem+3.2vw,4rem)] leading-[1.02]" : "text-[clamp(1.75rem,1.2rem+2vw,2.75rem)] leading-[1.06]",
        )}
      >
        {ph.title}
      </h3>
      {ph.text && <p className="mt-4 max-w-md text-[1.0625rem] leading-relaxed text-fg-2">{ph.text}</p>}
      {ph.stats && (
        <dl className="mt-6 flex gap-8 max-md:flex-wrap max-md:gap-x-6 max-md:gap-y-4">
          {ph.stats.map((st) => (
            <div key={st.label}>
              <dd className={cn("font-display text-[clamp(2.5rem,2rem+2vw,3.75rem)] max-md:text-[2.25rem] font-extrabold leading-none tracking-[-0.045em]", accent)}>{st.value}</dd>
              <dt className="mt-1.5 text-[0.8125rem] text-fg-2">{st.label}</dt>
            </div>
          ))}
        </dl>
      )}
      {ph.tags && (
        <ul className="mt-6 flex flex-wrap gap-2">
          {ph.tags.map((t) => (
            <li key={t} className={cn("rounded-full border px-3.5 py-1.5 text-[0.8125rem] font-semibold", tone === "azure" ? "border-azure-300/50 text-azure-200" : "border-ember-300/50 text-ember-200")}>
              {t}
            </li>
          ))}
        </ul>
      )}
      {ph.blocks && (
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {ph.blocks.map((b, bi) => (
            <li key={b.title} className={cn("rounded-2xl border p-4 backdrop-blur-sm", tone === "azure" ? "border-azure-300/35 bg-azure-400/[0.07]" : "border-ember-300/35 bg-ember-400/[0.07]")}>
              <p className="font-display text-[1.0625rem] font-semibold tracking-tight text-fg"><span className={cn("mr-2 text-[0.8125rem]", accent)}>{String(bi + 1).padStart(2, "0")}</span>{b.title}</p>
              <p className="mt-1 text-[0.875rem] leading-snug text-fg-2">{b.text}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

/**
 * Presentazione cinematografica di una persona, legata allo scroll (progressione continua e reversibile, nessun
 * blocco della rotellina). Tutto è configurato in `Person`: foto ritagliata (alpha), scena, punti della camera, fasi di testo.
 *
 * Desktop: la camera gira (orbita) attorno alla figura ritagliata, con dolly-in verso il volto e parallasse reale tra i
 * livelli (griglia, anelli, particelle, nome, figura, riflessi in primo piano), passa poi alla seconda fotografia
 * (la scena alla scrivania) con un "portale" e torna all'inquadratura ampia. I testi cambiano a ogni fase.
 * L'orbita è volutamente leggera (±12°) e lo zoom limitato: le foto sono frontali e a risoluzione finita, quindi
 * non si fingono rotazioni ampie né ingrandimenti che rivelerebbero artefatti.
 * Telefono / reduced motion / dispositivi poco potenti: sequenza semplice di sezioni, senza pin né scroll bloccato.
 */
export function PersonScroll({ person, index }: { person: Person; index: number }) {
  const track = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const world = useRef<HTMLDivElement>(null);
  const subject = useRef<HTMLDivElement>(null);
  const textHost = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);
  const root = useRef<HTMLElement>(null);
  const left = person.layout === "left";
  const tone = person.tone;

  useEffect(() => {
    const tr = track.current;
    const st = stage.current;
    const w = world.current;
    const sj = subject.current;
    const th = textHost.current;
    if (!tr || !st || !w || !sj || !th) return;
    // dispositivi poco potenti: niente scena 3D, solo la versione semplice
    const mem = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
    if ((mem && mem <= 2) || navigator.hardwareConcurrency <= 2) {
      root.current?.setAttribute("data-lite", "");
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // computer e telefono: scena cinematografica; il tablet (768–1023px) resta con la versione semplice
    if (!window.matchMedia("(min-width: 1024px)").matches && !window.matchMedia("(max-width: 767px)").matches) return;
    const phases = Array.from(th.children) as HTMLElement[];
    const dir = left ? 1 : -1;
    let raf = 0;
    let near = false;
    let cur = 0;
    let mx = 0;
    let my = 0;
    const update = () => {
      raf = 0;
      const r = tr.getBoundingClientRect();
      const span = Math.max(1, r.height - window.innerHeight);
      const t = Math.min(1, Math.max(0, -r.top / span));
      const c = cameraAt(person.camera, t);
      const fw = sj.offsetWidth;
      const fh = sj.offsetHeight;
      const px = (c.u - 0.5) * fw;
      const py = (c.v - 0.5) * fh;
      // camera: il punto inquadrato va al centro, si orbita attorno a lui, poi dolly (translateZ) verso lo spettatore
      w.style.transform = `translateZ(${c.tz.toFixed(1)}px) rotateY(${(c.ry + mx * 3).toFixed(2)}deg) rotateX(${(c.rx - my * 2).toFixed(2)}deg) translate3d(${(-px).toFixed(1)}px, ${(-py).toFixed(1)}px, 0)`;
      w.style.setProperty("--sc", c.scene.toFixed(3));
      w.style.setProperty("--tz", c.tz.toFixed(1));
      w.style.setProperty("--t", t.toFixed(4));
      let act = 0;
      let best = -1;
      person.phases.forEach((ph, i) => {
        const e = smooth(ph.from - 0.035, ph.from + 0.02, t);
        const x = smooth(ph.to - 0.025, ph.to + 0.03, t);
        const vis = e * (1 - x);
        const el = phases[i];
        if (el) {
          el.style.opacity = vis.toFixed(3);
          el.style.transform = `translate3d(${(((1 - e) * 46 - x * 46) * dir).toFixed(1)}px, 0, 0)`;
          el.style.filter = vis < 0.98 ? `blur(${((1 - vis) * 7).toFixed(1)}px)` : "none";
          el.style.pointerEvents = vis > 0.6 ? "auto" : "none";
          el.setAttribute("aria-hidden", vis > 0.5 ? "false" : "true");
        }
        if (vis > best) {
          best = vis;
          act = i;
        }
      });
      if (act !== cur) {
        cur = act;
        setStep(act);
      }
    };
    const onScroll = () => {
      if (near && !raf) raf = requestAnimationFrame(update);
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const r = st.getBoundingClientRect();
      mx = ((e.clientX - r.left) / r.width - 0.5) * 2;
      my = ((e.clientY - r.top) / r.height - 0.5) * 2;
      onScroll();
    };
    const io = new IntersectionObserver(
      ([en]) => {
        near = !!en?.isIntersecting;
        if (near) onScroll();
      },
      { rootMargin: "25% 0px" },
    );
    io.observe(tr);
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    st.addEventListener("pointermove", onMove);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      st.removeEventListener("pointermove", onMove);
    };
  }, [person, left]);

  const desktopCls = "ps-desktop hidden lg:block";
  const mobileCls = "ps-mobile-wrap lg:hidden";
  const cutoutSizes = "(min-width: 1024px) 40rem, 90vw";

  return (
    <section ref={root} aria-labelledby={`${person.id}-title`} className="ps relative isolate" data-tone={tone} data-layout={person.layout}>
      <h2 id={`${person.id}-title`} className="sr-only">
        {person.name}: {person.role}
      </h2>

      {/* ===== DESKTOP: scena 3D legata allo scroll ===== */}
      <div ref={track} className={cn("ps-track", desktopCls)}>
        <div className="ps-sticky">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
            <div className="ps-aura absolute top-1/2 h-[64rem] w-[64rem] -translate-y-1/2 rounded-full" style={{ left: left ? "30%" : "70%", translate: "-50% 0" }} />
            <div className="bg-grid absolute inset-0 opacity-30 [mask-image:radial-gradient(70%_70%_at_50%_50%,#000,transparent)]" />
            <DigitalCursor />
          </div>

          <div ref={stage} className="ps-stage">
            <div className="ps-anchor">
              <div ref={world} className="ps-world">
                {/* livelli, dal fondo al primo piano: ognuno ha la sua profondità, quindi la camera crea parallasse reale */}
                <div aria-hidden="true" className="ps-ground" />
                <span aria-hidden="true" className="ps-ring ps-ring--a" />
                <span aria-hidden="true" className="ps-ring ps-ring--b" />
                <p aria-hidden="true" className="ps-name">
                  {person.short}
                </p>
                <div aria-hidden="true" className="ps-rim ps-rim--blue" />
                <div aria-hidden="true" className="ps-rim ps-rim--gold" />
                {Array.from({ length: 22 }, (_, i) => (
                  <span
                    key={i}
                    aria-hidden="true"
                    className="ps-dot"
                    style={{ "--dx": `${Math.round(Math.sin(i * 7.31) * 31 * 100) / 100}rem`, "--dy": `${Math.round(Math.cos(i * 3.17) * 24 * 100) / 100}rem`, "--dz": `${-380 + ((i * 53) % 560)}px`, "--dd": `${(i % 7) * 0.6}s` } as CSSVars}
                  />
                ))}

                <div ref={subject} className="ps-subject">
                  <span aria-hidden="true" className="ps-shadow" />
                  <div className="ps-cut">
                    <Image src={person.cutout} alt={`${person.name}, fotografia a figura intera`} fill priority={index === 0} loading={index === 0 ? undefined : "eager"} sizes={cutoutSizes} className="object-contain" />
                    {/* riflesso di luce che scorre SOLO dentro la sagoma (maschera = la foto ritagliata) */}
                    <span aria-hidden="true" className="ps-sheen" style={{ maskImage: `url(${person.cutout})`, WebkitMaskImage: `url(${person.cutout})` }} />
                  </div>
                  <div className="ps-scene" aria-hidden="true">
                    <Image src={person.scene} alt="" fill sizes={cutoutSizes} className="object-cover" loading="eager" />
                    <span className="absolute inset-0 bg-gradient-to-t from-night/60 via-transparent to-transparent" />
                  </div>
                </div>

                <span aria-hidden="true" className="ps-streak ps-streak--a" />
                <span aria-hidden="true" className="ps-streak ps-streak--b" />
              </div>
            </div>
          </div>

          {/* testi: una fase alla volta, sincronizzata con la camera */}
          <div ref={textHost} className={cn("ps-text", left ? "ps-text--r" : "ps-text--l")}>
            {person.phases.map((ph, i) => (
              <div key={ph.id} className="ps-phase" style={{ opacity: i === 0 ? 1 : 0 }}>
                <PhaseContent ph={ph} tone={tone} big={i === 0} />
              </div>
            ))}
          </div>

          <div className={cn("absolute bottom-3 z-20 flex items-center gap-3 text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-fg-2", left ? "right-0" : "left-0")} aria-hidden="true">
            <span className="ps-dot-tone h-2 w-2 rounded-full" />
            {person.name}
            <span className="flex gap-1.5">
              {person.phases.map((ph, i) => (
                <span key={ph.id} className={cn("h-1 rounded-full transition-[width,background-color] duration-[var(--dur-base)]", i === step ? "w-7 bg-gold-300" : "w-2.5 bg-line-strong")} />
              ))}
            </span>
          </div>
        </div>
      </div>

      {/* ===== TELEFONO / movimento ridotto: sezioni semplici, nessun pin ===== */}
      <div className={cn("ps-mobile container-x py-10", mobileCls)}>
        <Reveal y={24} blur={0}>
          <div className="ps-m-card relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-3xl">
            <div aria-hidden="true" className="ps-aura absolute inset-0" />
            <Image src={person.cutout} alt={`${person.name}, fotografia a figura intera`} fill sizes="90vw" className="object-contain object-bottom px-6 pt-4" />
          </div>
        </Reveal>
        {person.phases.map((ph, i) => (
          <Reveal key={ph.id} y={22} blur={0} className="mx-auto mt-8 max-w-sm">
            {i === 1 && (
              <div className="ps-m-card relative mb-5 aspect-[4/3] overflow-hidden rounded-3xl">
                <div aria-hidden="true" className="ps-aura absolute inset-0" />
                <Image src={person.cutout} alt="" aria-hidden="true" fill sizes="90vw" className="object-cover" style={{ objectPosition: `${person.camera[3] ? person.camera[3].u * 100 : 50}% 4%`, transform: "scale(2.1)", transformOrigin: "50% 8%" }} />
              </div>
            )}
            <PhaseContent ph={ph} tone={tone} big={i === 0} />
          </Reveal>
        ))}
        {/* ultima immagine: il primo piano al computer */}
        <Reveal y={22} blur={0} className="mx-auto mt-8 max-w-sm">
          <div className="ps-m-card relative aspect-[1199/1312] overflow-hidden rounded-3xl">
            <Image src={person.scene} alt={`${person.name} al computer, in primo piano`} fill sizes="90vw" className="object-cover" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
