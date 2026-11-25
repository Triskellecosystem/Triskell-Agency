"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/Icon";
import { fit } from "./data";

const N = fit.funnel.length;
const STEP_Y = 74; // distanza verticale tra i nodi
const R = 64; // raggio della spirale

/**
 * Da un contenuto a un nuovo iscritto: una piccola spirale 3D che scende in verticale e gira piano. Il passo
 * attivo si accende e a lato si legge la spiegazione di tutti i passi (quello attivo evidenziato).
 */
export function FitFunnel() {
  const wrap = useRef<HTMLDivElement>(null);
  const nodes = useRef<Array<HTMLSpanElement | null>>([]);
  const path = useRef<SVGPathElement>(null);
  const [cur, setCur] = useState(0);
  const [hold, setHold] = useState(false);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setSeen(!!e?.isIntersecting), { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!seen || hold || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setInterval(() => setCur((c) => (c + 1) % N), 1900);
    return () => window.clearInterval(t);
  }, [seen, hold]);

  // spirale che gira piano: posizione, profondità e scala di ogni nodo
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    const draw = (time: number) => {
      const rot = reduced ? 0 : time / 2600;
      const pts: Array<[number, number]> = [];
      for (let i = 0; i < N; i++) {
        const a = i * 1.05 + rot;
        const x = Math.sin(a) * R, z = Math.cos(a);
        const y = 30 + i * STEP_Y;
        const s = 0.78 + 0.22 * (z + 1) / 2;
        const el = nodes.current[i];
        if (el) {
          el.style.transform = `translate(${x.toFixed(1)}px, ${y}px) translate(-50%, -50%) scale(${s.toFixed(3)})`;
          el.style.zIndex = String(Math.round((z + 1) * 10));
          el.style.opacity = String(0.55 + 0.45 * (z + 1) / 2);
        }
        pts.push([90 + x, y]);
      }
      if (path.current) {
        let d = "";
        // curva liscia che passa per i nodi
        for (let i = 0; i < pts.length; i++) {
          const [x, y] = pts[i]!;
          if (i === 0) d += `M${x},${y}`;
          else {
            const [px, py] = pts[i - 1]!;
            d += ` C${px},${py + STEP_Y * 0.5} ${x},${y - STEP_Y * 0.5} ${x},${y}`;
          }
        }
        path.current.setAttribute("d", d);
      }
      if (!reduced) raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, []);

  const H = 30 * 2 + (N - 1) * STEP_Y;
  return (
    <div ref={wrap} onMouseLeave={() => setHold(false)} className="grid items-center gap-8 md:grid-cols-[11.5rem_1fr] md:gap-12">
      <div className="fit-spiral3d relative mx-auto w-[11.5rem]" style={{ height: H }}>
        <svg aria-hidden="true" className="absolute inset-0 h-full w-full overflow-visible" viewBox={`0 0 180 ${H}`} preserveAspectRatio="none">
          <path ref={path} className="fit-spiral-path" fill="none" />
        </svg>
        {fit.funnel.map((s, i) => (
          <span
            key={s.title}
            ref={(el) => { nodes.current[i] = el; }}
            className="absolute left-1/2 top-0"
          >
            <button
              type="button"
              onMouseEnter={() => { setHold(true); setCur(i); }}
              onClick={() => { setHold(true); setCur(i); }}
              aria-pressed={cur === i}
              aria-label={s.title}
              className={cn("fit-node grid h-14 w-14 place-items-center rounded-xl", i < cur && "fit-node--done", cur === i && "fit-node--on")}
            >
              <Icon name={s.icon} className="h-6 w-6" strokeWidth={1.9} />
            </button>
          </span>
        ))}
      </div>
      <ol className="space-y-1.5">
        {fit.funnel.map((s, i) => (
          <li key={s.title}>
            <button
              type="button"
              onMouseEnter={() => { setHold(true); setCur(i); }}
              onClick={() => { setHold(true); setCur(i); }}
              className={cn("fit-fstep flex w-full items-start gap-3 rounded-xl px-4 py-2.5 text-left", cur === i && "fit-fstep--on")}
            >
              <span className="fit-h mt-0.5 w-7 shrink-0 text-[0.875rem] text-fit-300">0{i + 1}</span>
              <span>
                <span className="fit-h block text-[1rem] text-white">{s.title}</span>
                <span className="mt-0.5 block text-[0.875rem] leading-snug text-white/65">{s.text}</span>
              </span>
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}
