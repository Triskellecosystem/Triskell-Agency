"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { Icon } from "@/components/ui/Icon";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";

const profiles = [
  { id: "naturae", label: "Cosmetica naturale" },
  { id: "vertis", label: "Palestra" },
  { id: "borgo", label: "Osteria" },
  { id: "essentia", label: "Centro benessere" },
  { id: "viaggiare", label: "Agenzia viaggi" },
  { id: "bianchi", label: "Osteopata" },
  { id: "clubdonne", label: "Palestra femminile" },
  { id: "nocciolo", label: "Ristorante" },
  { id: "lunaria", label: "Benessere olistico" },
  { id: "lavie", label: "Centro estetico" },
  { id: "elevare", label: "Immobiliare" },
  { id: "lumina", label: "Studio dentistico" },
  { id: "terraviva", label: "Agriturismo e retreat" },
  { id: "donnamaria", label: "Pizzeria" },
];

/**
 * Esempi di profili Instagram in un nastro che scorre da solo; passando il mouse (senza cliccare) il nastro segue
 * il cursore in modo fluido; sul telefono si scorre col dito. Al passaggio del mouse il telefono si ingrandisce. Il nastro è ripetuto per girare senza fine.
 */
export function ProfileExamples() {
  const track = useRef<HTMLDivElement>(null);

  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = track.current;
    const box = wrap.current;
    if (!el || !box) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let x = 0;
    let target = 0;
    let hover = false;
    let dir = -1;
    let raf = 0;
    const max = () => Math.max(0, el.scrollWidth - box.clientWidth);
    const frame = () => {
      const m = max();
      if (!hover && !reduced) {
        // scorrimento automatico lento, avanti e indietro
        target += dir * 0.5;
        if (target <= -m) dir = 1;
        if (target >= 0) dir = -1;
      }
      target = Math.min(0, Math.max(-m, target));
      x += (target - x) * 0.08;
      el.style.transform = `translate3d(${x.toFixed(2)}px,0,0)`;
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    // basta muovere il mouse sopra (senza cliccare): la posizione del cursore decide quale profilo è in vista
    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const r = box.getBoundingClientRect();
      const k = Math.min(1, Math.max(0, (e.clientX - r.left - r.width * 0.1) / (r.width * 0.8)));
      target = -k * max();
    };
    const enter = (e: PointerEvent) => {
      if (e.pointerType === "mouse") hover = true;
    };
    const leave = () => {
      hover = false;
    };
    // su telefono: si scorre col dito
    let tx: number | null = null;
    const tstart = (e: TouchEvent) => (tx = e.touches[0]?.clientX ?? null);
    const tmove = (e: TouchEvent) => {
      const cx = e.touches[0]?.clientX;
      if (tx === null || cx === undefined) return;
      target += (cx - tx) * 1.4;
      tx = cx;
      hover = true;
    };
    const tend = () => {
      tx = null;
      window.setTimeout(() => (hover = false), 2500);
    };
    // due dita sul touchpad (scorrimento orizzontale) o Shift + rotella
    const wheel = (e: WheelEvent) => {
      const dx = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.shiftKey ? e.deltaY : 0;
      if (!dx) return;
      e.preventDefault();
      hover = true;
      target -= dx;
    };
    box.addEventListener("wheel", wheel, { passive: false });
    box.addEventListener("pointermove", move);
    box.addEventListener("pointerenter", enter);
    box.addEventListener("pointerleave", leave);
    box.addEventListener("touchstart", tstart, { passive: true });
    box.addEventListener("touchmove", tmove, { passive: true });
    box.addEventListener("touchend", tend);
    return () => {
      cancelAnimationFrame(raf);
      box.removeEventListener("wheel", wheel);
      box.removeEventListener("pointermove", move);
      box.removeEventListener("pointerenter", enter);
      box.removeEventListener("pointerleave", leave);
      box.removeEventListener("touchstart", tstart);
      box.removeEventListener("touchmove", tmove);
      box.removeEventListener("touchend", tend);
    };
  }, []);

  const phone = (p: (typeof profiles)[number], hidden: boolean) => (
    <li key={`${p.id}-${hidden}`} className="pe-item shrink-0" aria-hidden={hidden || undefined}>
      <div className="pe-phone relative w-[12rem] overflow-hidden rounded-[1.6rem] border-[4px] border-[#1d2a3a] bg-black shadow-[0_24px_50px_-24px_rgb(0_0_0/0.9)] sm:w-[14rem]">
        <Image src={`/social-examples/${p.id}.webp`} alt={hidden ? "" : `Esempio di profilo Instagram: ${p.label}`} width={520} height={1126} sizes="14rem" draggable={false} className="pointer-events-none block h-auto w-full select-none" />
      </div>
      <p className="mt-2.5 text-center text-[0.6875rem] font-semibold uppercase tracking-wider text-fg-3">{p.label}</p>
    </li>
  );

  return (
    <Section id="esempi" labelledBy="esempi-title" className="pe-band overflow-hidden">
      <SectionHeading id="esempi-title" overline="Esempi" title="Questo potrebbe essere il profilo della tua attività [tra qualche mese]" align="center" className="max-w-3xl" />
      <Reveal y={20} blur={0} className="relative mt-9">
        <span aria-hidden="true" className="pe-gold pointer-events-none absolute inset-x-0 -bottom-10 -top-10 -z-10"><span /></span>
        <div ref={wrap} className="pe relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_5%,#000_95%,transparent)]">
          <div ref={track} className="flex w-max touch-pan-y select-none will-change-transform">
            <ul className="flex gap-5 px-[6vw] py-5">{profiles.map((p) => phone(p, false))}</ul>
          </div>
        </div>
      </Reveal>
      <p className="mt-4 flex items-center justify-center gap-1.5 text-center text-[0.6875rem] text-fg-3">
        <Icon name="arrow-right" className="h-3 w-3 text-gold-300" strokeWidth={2} />
        Muovi il mouse o scorri con due dita · esempi dimostrativi di profili che possiamo creare
      </p>
    </Section>
  );
}
