"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/Icon";
import { fit } from "./data";

const N = fit.funnel.length;

/**
 * Da un contenuto a un nuovo iscritto, come la spirale dei siti dell'agency: la sezione resta ferma mentre scorri,
 * la spirale gira e scende portando davanti un passo alla volta. A lato l'elenco dei passi segue l'avanzamento.
 */
/** Su telefono: timeline verticale semplice, i passi si accendono man mano che scorri. */
function FitFunnelMobile() {
  const ref = useRef<HTMLOListElement>(null);
  const [lit, setLit] = useState(-1);
  useEffect(() => {
    const ol = ref.current;
    if (!ol) return;
    let raf = 0;
    const check = () => {
      raf = 0;
      let n = -1;
      [...ol.children].forEach((li, i) => { if (li.getBoundingClientRect().top < innerHeight * 0.7) n = i; });
      setLit(n);
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(check); };
    window.addEventListener("scroll", on, { passive: true });
    check();
    return () => { window.removeEventListener("scroll", on); cancelAnimationFrame(raf); };
  }, []);
  return (
    <div className="container-x py-12">
      <p className="fit-kicker inline-flex items-center gap-2 rounded-md px-2.5 py-1 text-[0.625rem] font-bold uppercase tracking-[0.2em]"><span className="h-1.5 w-1.5 rounded-sm bg-fit-300" />Il percorso</p>
      <h2 id="fit-path" className="fit-h mt-3 text-[1.6rem] leading-[1] text-white">Da un contenuto a un <span className="fit-glow">nuovo iscritto</span>.</h2>
      <ol ref={ref} className="relative mt-6 space-y-2.5">
        <span aria-hidden="true" className="absolute bottom-5 left-[1.15rem] top-5 w-0.5 bg-fit-300/20" />
        <span aria-hidden="true" className="absolute left-[1.15rem] top-5 w-0.5 bg-fit-300 shadow-[0_0_8px_#a6ff00] transition-[height] duration-500" style={{ height: `${Math.max(0, lit) / (N - 1) * 100}%`, maxHeight: "calc(100% - 2.5rem)" }} />
        {fit.funnel.map((s, i) => (
          <li key={s.title} className="relative flex items-center gap-3">
            <span className={cn("fit-node relative z-[1] grid h-[2.3rem] w-[2.3rem] shrink-0 place-items-center rounded-lg", i < lit && "fit-node--done", i === lit && "fit-node--on")}>
              <Icon name={s.icon} className="h-4 w-4" strokeWidth={2} />
            </span>
            <span className="min-w-0">
              <span className={cn("fit-h block text-[0.875rem]", i <= lit ? "text-white" : "text-white/45")}>0{i + 1} · {s.title}</span>
              <span className={cn("block text-[0.75rem] leading-snug transition-colors", i <= lit ? "text-white/65" : "text-white/30")}>{s.text}</span>
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function FitFunnel() {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const f = () => setMobile(mq.matches);
    f(); mq.addEventListener("change", f);
    return () => mq.removeEventListener("change", f);
  }, []);
  return mobile ? <FitFunnelMobile /> : <FitFunnelDesktop />;
}

function FitFunnelDesktop() {
  const box = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0);
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    let raf = 0;
    const apply = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const total = r.height - innerHeight;
      setP(Math.min(1, Math.max(0, -r.top / Math.max(1, total))) * (N - 1));
    };
    const req = () => { if (!raf) raf = requestAnimationFrame(apply); };
    window.addEventListener("scroll", req, { passive: true });
    window.addEventListener("resize", req);
    req();
    return () => { window.removeEventListener("scroll", req); window.removeEventListener("resize", req); cancelAnimationFrame(raf); };
  }, []);
  const front = Math.round(p);
  const go = (i: number) => {
    const el = box.current;
    if (!el) return;
    const total = el.getBoundingClientRect().height - innerHeight;
    window.scrollTo({ top: el.offsetTop + (i / (N - 1)) * total + 2, behavior: "smooth" });
  };
  return (
    <div ref={box} className="relative" style={{ height: `${N * 42 + 70}vh` }}>
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden pt-16">
        <div className="container-x relative grid items-center gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
          {/* titolo + elenco passi */}
          <div className="relative z-10">
            <p className="fit-kicker inline-flex items-center gap-2 rounded-md px-2.5 py-1 text-[0.6875rem] font-bold uppercase tracking-[0.2em]"><span className="h-1.5 w-1.5 rounded-sm bg-fit-300 shadow-[0_0_8px_#a6ff00]" />Il percorso</p>
            <h2 id="fit-path" className="fit-h mt-3 text-[clamp(1.75rem,1.2rem+2.2vw,3rem)] leading-[0.98] text-white">Da un contenuto a un <span className="fit-glow">nuovo iscritto</span>.</h2>
            <ol className="mt-5 hidden space-y-1 lg:block">
              {fit.funnel.map((s, i) => (
                <li key={s.title}>
                  <button type="button" onClick={() => go(i)} className={cn("fit-fstep flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left", front === i && "fit-fstep--on")}>
                    <span className={cn("fit-fdot grid h-7 w-7 shrink-0 place-items-center rounded-md font-mono text-[0.6875rem] font-bold", i < front && "fit-fdot--done", i === front && "fit-fdot--on")}>{i < front ? <Icon name="check" className="h-3.5 w-3.5" strokeWidth={3} /> : `0${i + 1}`}</span>
                    <span className="fit-h text-[0.9375rem] text-white">{s.title}</span>
                  </button>
                </li>
              ))}
            </ol>
            <span className="mt-4 hidden h-1 w-48 overflow-hidden rounded-full bg-white/10 lg:block">
              <span className="block h-full rounded-full bg-fit-300 shadow-[0_0_10px_#a6ff00]" style={{ width: `${(p / (N - 1)) * 100}%` }} />
            </span>
          </div>

          {/* spirale */}
          <div className="fit-hx relative h-[52svh] lg:h-[70svh]">
            <span aria-hidden="true" className="fit-hx-axis" />
            <div className="fit-hx-stage absolute left-1/2 top-1/2">
              {fit.funnel.map((s, i) => {
                const d = i - p;
                const vis = Math.abs(d) < 2.4;
                const dim = Math.min(1, Math.abs(d) / 1.5);
                return (
                  <div
                    key={s.title}
                    aria-hidden={i !== front}
                    className={cn("fit-hx-card absolute rounded-2xl p-5", i === front && "fit-hx-card--on")}
                    style={{
                      transform: `translate(-50%, -50%) translateY(${d * 15}svh) rotateY(calc(${d} * var(--fhx-step))) translateZ(var(--fhx-r))`,
                      opacity: vis ? 1 - dim * 0.65 : 0,
                      filter: `brightness(${1 - dim * 0.55})`,
                      zIndex: 100 - Math.round(Math.abs(d) * 10),
                    }}
                  >
                    <span className="flex items-center justify-between">
                      <span className="fit-hx-ico grid h-12 w-12 place-items-center rounded-xl"><Icon name={s.icon} className="h-6 w-6" strokeWidth={2} /></span>
                      <span className="fit-h text-[2rem] leading-none text-fit-300/80">0{i + 1}</span>
                    </span>
                    <span className="fit-h mt-4 block text-[1.375rem] leading-tight text-white">{s.title}</span>
                    <span className="mt-1.5 block text-[0.9375rem] leading-snug text-white/70">{s.text}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <p className="relative z-10 mt-2 flex items-center justify-center gap-1.5 text-[0.75rem] text-white/50">
          <Icon name="arrow-down" className="h-3.5 w-3.5 text-fit-300" strokeWidth={2.4} /> Scorri: la spirale gira e ti porta passo dopo passo
        </p>
      </div>
    </div>
  );
}
