"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";
import { Icon } from "@/components/ui/Icon";

/**
 * Tutti i siti realizzati su un anello 3D che gira piano (come una giostra): quello davanti è grande e nitido,
 * gli altri ruotano dietro. Si gira trascinando col mouse/dito o con la rotella orizzontale; un clic sul sito
 * davanti lo apre. Sotto, il nome del sito in primo piano.
 */
export function SitesRing() {
  const items = site.sitiWeb.items;
  const N = items.length;
  const step = 360 / N;
  const ring = useRef<HTMLDivElement>(null);
  const angle = useRef(0);
  const vel = useRef(-0.08);
  const [front, setFront] = useState(0);

  useEffect(() => {
    const el = ring.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let drag: number | null = null;
    let hover = false;
    const frame = () => {
      if (drag === null) {
        const auto = hover || reduced ? 0 : -0.06;
        vel.current += (auto - vel.current) * 0.03;
        angle.current += vel.current;
      }
      el.style.transform = `translateZ(calc(var(--r) * -1)) rotateY(${angle.current.toFixed(2)}deg)`;
      const f = ((Math.round(-angle.current / step) % N) + N) % N;
      setFront((p) => (p === f ? p : f));
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    const host = el.parentElement!;
    const down = (e: PointerEvent) => {
      drag = e.clientX;
      host.setPointerCapture(e.pointerId);
    };
    const move = (e: PointerEvent) => {
      if (drag === null) return;
      const dx = e.clientX - drag;
      angle.current += dx * 0.25;
      vel.current = dx * 0.25;
      drag = e.clientX;
    };
    const up = () => (drag = null);
    const wheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
      e.preventDefault();
      angle.current -= e.deltaX * 0.15;
    };
    const enter = () => (hover = true);
    const leave = () => {
      hover = false;
      drag = null;
    };
    host.addEventListener("pointerdown", down);
    host.addEventListener("pointermove", move);
    host.addEventListener("pointerup", up);
    host.addEventListener("pointerenter", enter);
    host.addEventListener("pointerleave", leave);
    host.addEventListener("wheel", wheel, { passive: false });
    return () => {
      cancelAnimationFrame(raf);
      host.removeEventListener("pointerdown", down);
      host.removeEventListener("pointermove", move);
      host.removeEventListener("pointerup", up);
      host.removeEventListener("pointerenter", enter);
      host.removeEventListener("pointerleave", leave);
      host.removeEventListener("wheel", wheel);
    };
  }, [N, step]);

  const go = (d: number) => {
    angle.current = -Math.round(-angle.current / step) * step - d * step;
    vel.current = 0;
  };
  const f = items[front]!;

  return (
    <div className="relative">
      <span aria-hidden="true" className="phone-glow !top-[45%] !w-[60%]" />
      <div className="sr3 relative h-[24rem] cursor-grab touch-pan-y select-none active:cursor-grabbing sm:h-[30rem]" aria-label="Siti web realizzati: trascina per girare">
        <div ref={ring} className="sr3-ring absolute left-1/2 top-1/2">
          {items.map((it, i) => (
            <a
              key={it.id}
              href={it.url}
              target={it.demo ? undefined : "_blank"}
              rel="noopener noreferrer"
              draggable={false}
              tabIndex={i === front ? 0 : -1}
              className="sr3-card absolute overflow-hidden rounded-xl border border-white/15 bg-night shadow-[0_30px_60px_-24px_rgb(0_0_0/0.9)]"
              style={{ transform: `rotateY(${i * step}deg) translateZ(var(--r))`, opacity: i === front ? 1 : 0.55 }}
              onClick={(e) => i !== front && e.preventDefault()}
            >
              <span className="flex items-center gap-1 border-b border-white/10 bg-surface-2 px-2.5 py-1.5">
                <i className="h-1.5 w-1.5 rounded-full bg-ember-400/80" />
                <i className="h-1.5 w-1.5 rounded-full bg-gold-300/80" />
                <i className="h-1.5 w-1.5 rounded-full bg-lime-300/80" />
                <span className="ml-2 truncate text-[0.625rem] text-fg-3">{it.domain}</span>
              </span>
              <span className="relative block aspect-[16/10]">
                <Image src={it.image} alt={`Sito ${it.name}`} fill sizes="26rem" draggable={false} className="object-cover object-top" />
              </span>
            </a>
          ))}
        </div>
      </div>
      <div className="mt-4 flex items-center justify-center gap-4">
        <button type="button" aria-label="Sito precedente" onClick={() => go(-1)} className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-fg-2 transition-colors hover:border-gold-300 hover:text-gold-300">
          <Icon name="chevron-left" className="h-5 w-5" strokeWidth={2.2} />
        </button>
        <div key={f.id} className="sr3-name min-w-[14rem] text-center">
          <p className="font-display text-[1.25rem] font-bold text-fg">{f.name}</p>
          <p className="text-[0.75rem] font-semibold uppercase tracking-wider text-gold-300">{f.category}</p>
        </div>
        <button type="button" aria-label="Sito successivo" onClick={() => go(1)} className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-fg-2 transition-colors hover:border-gold-300 hover:text-gold-300">
          <Icon name="chevron-right" className="h-5 w-5" strokeWidth={2.2} />
        </button>
      </div>
      <p className="mt-2 text-center text-[0.6875rem] text-fg-3">Trascina per girare · clicca il sito davanti per aprirlo</p>
    </div>
  );
}
