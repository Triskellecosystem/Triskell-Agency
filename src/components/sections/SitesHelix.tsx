"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/Icon";

/**
 * Tutti i siti su una spirale 3D guidata dallo scroll: la sezione resta ferma sullo schermo mentre scendi, la
 * spirale gira su se stessa e sale, portando davanti un sito alla volta (gli altri si vedono dietro, più piccoli e
 * scuri). In basso il nome del sito davanti, con il pulsante per aprirlo. Con movimento ridotto: griglia semplice.
 */
export function SitesHelix({ heading }: { heading?: React.ReactNode }) {
  const items = site.sitiWeb.items;
  const n = items.length;
  const box = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0); // 0 → n-1
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const id = requestAnimationFrame(() => setReduced(true));
      return () => cancelAnimationFrame(id);
    }
    let raf = 0;
    const apply = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const total = r.height - innerHeight;
      const k = Math.min(1, Math.max(0, -r.top / Math.max(1, total)));
      setP(k * (n - 1));
    };
    const req = () => {
      if (!raf) raf = requestAnimationFrame(apply);
    };
    window.addEventListener("scroll", req, { passive: true });
    window.addEventListener("resize", req);
    req();
    return () => {
      window.removeEventListener("scroll", req);
      window.removeEventListener("resize", req);
      cancelAnimationFrame(raf);
    };
  }, [n]);

  if (reduced) {
    return (
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((it) => (
          <li key={it.id} className="overflow-hidden rounded-xl border border-white/10">
            <a href={it.url} target={it.demo ? undefined : "_blank"} rel="noopener noreferrer" className="block">
              <span className="relative block aspect-[16/10]"><Image src={it.image} alt={`Sito ${it.name}`} fill sizes="24rem" className="object-cover object-top" /></span>
              <span className="block p-3 font-display text-[0.9375rem] font-semibold text-fg">{it.name}</span>
            </a>
          </li>
        ))}
      </ul>
    );
  }

  const front = Math.round(p);
  const cur = items[front]!;
  const STEP = 50; // gradi tra un sito e l'altro
  return (
    <div ref={box} className="relative" style={{ height: `${n * 55 + 60}vh` }}>
      <div className="sticky top-0 flex h-[100svh] flex-col items-center justify-center overflow-hidden pt-[var(--header-h)]">
        {heading && <div className="container-x relative z-10 shrink-0 pt-4">{heading}</div>}
        <div aria-hidden="true" className="hxb pointer-events-none absolute inset-0 -z-10" style={{ "--rot": `${p * 24}deg` } as React.CSSProperties}>
          <span className="hxb-glow" />
          <span className="hxb-beam" />
          <span className="hxb-floor">
            <i />
            <i />
            <i />
            <i />
          </span>
          <span className="hxb-top">
            <i />
            <i />
          </span>
          {Array.from({ length: 18 }, (_, k) => (
            <b key={k} className="hxb-spark" style={{ left: `${(k * 37) % 100}%`, animationDelay: `${-(k * 0.83) % 9}s`, animationDuration: `${7 + (k % 5)}s` }} />
          ))}
        </div>
        <div className={cn("hx relative w-full", heading ? "hx--compact mt-6 h-[44vh]" : "h-[62vh]")}>
          <span aria-hidden="true" className="hx-axis" />
          <div className="hx-stage absolute left-1/2 top-1/2">
            {items.map((it, i) => {
              const d = i - p; // distanza dal sito davanti
              const ang = d * STEP;
              const vis = Math.abs(d) < 2.6;
              const dim = Math.min(1, Math.abs(d) / 1.6);
              return (
                <a
                  key={it.id}
                  href={it.url}
                  target={it.demo ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  tabIndex={i === front ? 0 : -1}
                  aria-hidden={i !== front}
                  className={cn("hx-card absolute overflow-hidden rounded-xl border bg-night", i === front ? "border-gold-300/70" : "border-white/10")}
                  style={{
                    transform: `translate(-50%, -50%) translateY(${d * (heading ? 19 : 24)}vh) rotateY(${ang}deg) translateZ(var(--hx-r)) `,
                    opacity: vis ? 1 - dim * 0.6 : 0,
                    filter: `brightness(${1 - dim * 0.6})`,
                    zIndex: 100 - Math.round(Math.abs(d) * 10),
                    pointerEvents: i === front ? "auto" : "none",
                  }}
                >
                  <span className="flex items-center gap-1 border-b border-white/10 bg-surface-2 px-2 py-1">
                    <i className="h-1.5 w-1.5 rounded-full bg-ember-400/80" />
                    <i className="h-1.5 w-1.5 rounded-full bg-gold-300/80" />
                    <i className="h-1.5 w-1.5 rounded-full bg-lime-300/80" />
                    <span className="ml-1.5 truncate text-[0.5625rem] text-fg-3">{it.domain}</span>
                  </span>
                  <span className="relative block aspect-[16/10]">
                    <Image src={it.image} alt={i === front ? `Sito ${it.name}` : ""} fill sizes="(min-width: 1024px) 34rem, 80vw" className="object-cover object-top" />
                  </span>
                </a>
              );
            })}
          </div>
        </div>
        <div className="relative z-10 mt-4 flex flex-col items-center rounded-3xl bg-[radial-gradient(closest-side,rgb(2_18_33/0.85),transparent)] px-10 py-2 text-center">
          <p className="font-mono text-[0.6875rem] font-bold text-gold-300">
            {String(front + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
          </p>
          <p key={cur.id} className="hx-name mt-1 font-display text-[clamp(1.25rem,1rem+1vw,1.75rem)] font-semibold tracking-[-0.02em] text-fg">{cur.name}</p>
          <p className="text-[0.75rem] text-fg-3">{cur.category}</p>
          <a href={cur.url} target={cur.demo ? undefined : "_blank"} rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-gold-300/50 px-4 py-1.5 text-[0.75rem] font-semibold text-gold-200 transition-colors hover:bg-gold-300 hover:text-night">
            {cur.demo ? site.sitiWeb.visitDemo : site.sitiWeb.visit}
            <Icon name="arrow-up-right" className="h-3.5 w-3.5" strokeWidth={2.2} />
          </a>
          <span className="mt-4 h-1 w-40 overflow-hidden rounded-full bg-white/10">
            <span className="block h-full rounded-full bg-[image:var(--gradient-gold-btn)]" style={{ width: `${(p / (n - 1)) * 100}%` }} />
          </span>
          <p className="mt-2 flex items-center gap-1 text-[0.6875rem] text-fg-3">
            <Icon name="arrow-down" className="h-3 w-3 text-gold-300" strokeWidth={2.2} /> Scorri per far girare la spirale
          </p>
        </div>
      </div>
    </div>
  );
}
