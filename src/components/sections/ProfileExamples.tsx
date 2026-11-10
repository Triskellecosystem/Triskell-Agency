"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { Icon } from "@/components/ui/Icon";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";

const profiles = [
  { id: "vertis", label: "Palestra" },
  { id: "essentia", label: "Centro benessere" },
  { id: "bianchi", label: "Osteopata" },
  { id: "nocciolo", label: "Ristorante" },
  { id: "lavie", label: "Centro estetico" },
  { id: "lumina", label: "Studio dentistico" },
  { id: "donnamaria", label: "Pizzeria" },
  { id: "dubai", label: "Immobiliare" },
  { id: "eleva", label: "Fitness club" },
];

/**
 * Esempi di profili Instagram in un nastro che scorre da solo; si trascina col mouse (o col dito) in modo fluido,
 * con inerzia, senza frecce. Al passaggio del mouse il telefono si ingrandisce. Il nastro è ripetuto per girare senza fine.
 */
export function ProfileExamples() {
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let x = 0;
    let v = reduced ? 0 : -0.45; // velocità automatica (px/frame)
    let dragging = false;
    let lastX = 0;
    let lastT = 0;
    let hover = false;
    let raf = 0;
    const half = () => el.scrollWidth / 2;
    const frame = () => {
      if (!dragging) {
        const target = hover || reduced ? 0 : -0.45;
        v += (target - v) * 0.04;
        x += v;
      }
      const h = half();
      if (h > 0) {
        if (x <= -h) x += h;
        if (x > 0) x -= h;
      }
      el.style.transform = `translate3d(${x.toFixed(2)}px,0,0)`;
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    const down = (e: PointerEvent) => {
      dragging = true;
      lastX = e.clientX;
      lastT = performance.now();
      el.setPointerCapture(e.pointerId);
      el.style.cursor = "grabbing";
    };
    const move = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - lastX;
      const now = performance.now();
      x += dx;
      v = (dx / Math.max(1, now - lastT)) * 16;
      lastX = e.clientX;
      lastT = now;
    };
    const up = () => {
      dragging = false;
      el.style.cursor = "";
    };
    const enter = () => (hover = true);
    const leave = () => (hover = false);
    el.addEventListener("pointerdown", down);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerup", up);
    el.addEventListener("pointercancel", up);
    el.addEventListener("pointerenter", enter);
    el.addEventListener("pointerleave", leave);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointerdown", down);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerup", up);
      el.removeEventListener("pointercancel", up);
      el.removeEventListener("pointerenter", enter);
      el.removeEventListener("pointerleave", leave);
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
      <Reveal y={20} blur={0} className="mt-9">
        <div className="pe relative [mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)]">
          <div ref={track} className="flex w-max cursor-grab touch-pan-y select-none will-change-transform">
            <ul className="flex gap-5 py-5 pr-5">{profiles.map((p) => phone(p, false))}</ul>
            <ul className="flex gap-5 py-5 pr-5">{profiles.map((p) => phone(p, true))}</ul>
          </div>
        </div>
      </Reveal>
      <p className="mt-4 flex items-center justify-center gap-1.5 text-center text-[0.6875rem] text-fg-3">
        <Icon name="arrow-right" className="h-3 w-3 text-gold-300" strokeWidth={2} />
        Trascina per scorrere · esempi dimostrativi di profili che possiamo creare
      </p>
    </Section>
  );
}
