"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { SectionBg } from "@/components/ui/SectionBg";

const smooth = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

/**
 * Apertura: i due fondatori compaiono come su uno schermo che si accende, legato allo scroll. Prima una linea di luce
 * (oro) si allarga in orizzontale, poi la finestra si apre in verticale rivelando la foto, che arriva da uno zoom
 * più ampio mentre una luce la attraversa; infine entrano le etichette dei due, una da ciascun lato.
 * Reversibile, nessun blocco dello scroll (il blocco "appiccicato" dura solo l'animazione).
 * Con movimento ridotto la foto è semplicemente visibile (nessun pin, nessuna animazione).
 */
export function TeamIntro() {
  const t = site.about.intro;
  const track = useRef<HTMLDivElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const beam = useRef<HTMLSpanElement>(null);
  const sweep = useRef<HTMLSpanElement>(null);
  const labels = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tr = track.current;
    const fr = frame.current;
    if (!tr || !fr) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const img = fr.querySelector<HTMLElement>("[data-img]");
    const lb = Array.from(labels.current?.children ?? []) as HTMLElement[];
    let raf = 0;
    let near = false;
    const update = () => {
      raf = 0;
      const r = tr.getBoundingClientRect();
      const span = Math.max(1, r.height - window.innerHeight);
      const p = Math.min(1, Math.max(0, -r.top / span));
      const e1 = smooth(0.02, 0.3, p); // la linea si allarga
      const e2 = smooth(0.22, 0.62, p); // la finestra si apre
      const e3 = smooth(0.12, 0.9, p); // zoom/assestamento
      fr.style.clipPath = `circle(${(4 + e1 * 10 + e2 * 66).toFixed(2)}% at 50% 50%)`;
      fr.style.filter = `brightness(${(1 + (1 - e2) * 0.9).toFixed(2)})`;
      if (img) img.style.transform = `scale(${(1.35 - e3 * 0.35).toFixed(3)})`;
      if (beam.current) {
        beam.current.style.opacity = (e1 * (1 - e2)).toFixed(3);
        beam.current.style.transform = `translate(-50%, -50%) scale(${(0.18 + e1 * 0.22 + e2 * 1.3).toFixed(3)})`;
      }
      if (sweep.current) {
        const s = smooth(0.5, 0.88, p);
        sweep.current.style.transform = `translateX(${(-120 + s * 260).toFixed(1)}%) skewX(-18deg)`;
        sweep.current.style.opacity = (Math.sin(s * Math.PI) * 0.9).toFixed(3);
      }
      lb.forEach((el, i) => {
        const e = smooth(0.62 + i * 0.1, 0.84 + i * 0.1, p);
        el.style.opacity = e.toFixed(3);
        el.style.transform = `translate3d(${((1 - e) * (i === 0 ? -80 : 80)).toFixed(1)}px, ${((1 - e) * 14).toFixed(1)}px, 0)`;
      });
    };
    const onScroll = () => {
      if (near && !raf) raf = requestAnimationFrame(update);
    };
    const io = new IntersectionObserver(
      ([en]) => {
        near = !!en?.isIntersecting;
        if (near) onScroll();
      },
      { rootMargin: "20% 0px" },
    );
    io.observe(tr);
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <Section id="team" labelledBy="team-title" className="py-0 pt-[calc(var(--header-h)+0.5rem)]">
      <SectionBg kind="aurora" />
      <div ref={track} className="ti-track">
        <div className="ti-sticky">
          <header className="mx-auto max-w-2xl pb-4 text-center sm:pb-8">
            <p className="mb-3 inline-flex items-center gap-3 text-overline font-semibold uppercase tracking-[var(--text-overline--letter-spacing)] text-gold-400">
              <span aria-hidden="true" className="h-px w-8 bg-gold-400/70" />
              {t.overline}
            </p>
            <h1 id="team-title" className="font-display text-[clamp(2rem,1.4rem+2.6vw,3.5rem)] font-bold leading-[1.05] tracking-[-0.04em] text-fg">
              {t.title}
            </h1>
          </header>

          <div className="ti-wrap">
            <span ref={beam} aria-hidden="true" className="ti-beam" />
            <div ref={frame} className="ti-frame">
              <div data-img="" className="absolute inset-0 origin-[50%_40%] will-change-transform">
                <Image src="/team/duo.webp" alt="Tomaso Forno e William Argintieri alla scrivania, con il logo Triskell Ecosystem alle spalle" fill priority sizes="(min-width: 1024px) 64rem, 94vw" className="team-kenburns object-cover" />
              </div>
              <span aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-t from-night/80 via-transparent to-transparent" />
              <span ref={sweep} aria-hidden="true" className="ti-sweep" />
              <div ref={labels} className="ti-labels">
                {t.labels.map((l) => (
                  <div key={l.name} className={cn("ti-label", l.side === "left" ? "text-left" : "text-right")}>
                    <span className={cn("inline-block rounded-2xl border bg-night/75 px-3.5 py-2 backdrop-blur-md sm:px-5 sm:py-3", l.tone === "azure" ? "border-azure-300/60 shadow-[0_0_30px_-8px_rgb(42_144_195/0.7)]" : "border-ember-300/60 shadow-[0_0_30px_-8px_rgb(255_77_46/0.7)]")}>
                      <span className="block font-display text-[0.9375rem] font-bold leading-tight text-fg sm:text-[1.25rem]">{l.name}</span>
                      <span className={cn("block text-[0.6875rem] font-semibold uppercase tracking-[0.12em] sm:text-[0.75rem]", l.tone === "azure" ? "text-azure-300" : "text-ember-300")}>{l.role}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <p className="flex items-center justify-center gap-2.5 text-small font-medium text-fg-3">
            <Icon name="arrow-down" className="h-4 w-4 animate-bounce text-gold-300" />
            {t.hint}
          </p>
        </div>
      </div>
    </Section>
  );
}
