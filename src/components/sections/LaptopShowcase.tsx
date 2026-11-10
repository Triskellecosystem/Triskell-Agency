"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { site } from "@/content/site";

type CSSVars = React.CSSProperties & { [key: `--${string}`]: string | number };
const pop = (d: number) => ({ "--d": d }) as CSSVars;

/**
 * Un portatile in 3D che si apre quando entra nello schermo. Sul display ci sono i siti veri, tutti e nove, in una
 * galleria che scorre; poi il cursore si muove da solo, clicca Sfizi Partenopei, lo porta in primo piano e lo fa
 * scorrere per intero, quindi torna alla galleria. Tutto HTML/CSS in unità del contenitore (cqw).
 * Il mouse inclina il portatile. Con reduced motion: aperto e fermo sulla galleria.
 */
export function LaptopShowcase() {
  const rootRef = useRef<HTMLDivElement>(null);
  const items = site.sitiWeb.items;
  const featured = items.find((i) => i.tall && !i.demo) ?? items[0]!;

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const nx = Math.max(-1, Math.min(1, ((e.clientX - r.left) / r.width - 0.5) * 2));
      const ny = Math.max(-1, Math.min(1, ((e.clientY - r.top) / r.height - 0.5) * 2));
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.setProperty("--ry", `${(nx * 12).toFixed(2)}deg`);
        el.style.setProperty("--rx", `${(-ny * 5).toFixed(2)}deg`);
      });
    };
    const reset = () => {
      el.style.setProperty("--ry", "0deg");
      el.style.setProperty("--rx", "0deg");
    };
    const host = el.closest("section") ?? el;
    host.addEventListener("pointermove", onMove as EventListener);
    host.addEventListener("pointerleave", reset);
    return () => {
      host.removeEventListener("pointermove", onMove as EventListener);
      host.removeEventListener("pointerleave", reset);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={rootRef} data-reveal="" style={{ "--reveal-y": "40px", "--reveal-blur": "0px" } as CSSVars} className="lp" role="img" aria-label="Un portatile che si apre e mostra i siti realizzati: uno viene aperto e scorre per intero">
      <div aria-hidden="true" className="absolute -inset-x-10 bottom-0 top-1/4 rounded-full bg-[radial-gradient(ellipse,rgb(42_144_195/0.4),transparent_65%)]" />
      <div className="lp-stage" aria-hidden="true">
        <div className="lp-laptop">
          {/* coperchio: fuori (logo) e dentro (schermo) */}
          <div className="lp-lid">
            <div className="lp-back">
              <Image src="/brand/triskell-medallion.png" alt="" width={160} height={160} sizes="10rem" className="h-[24%] w-auto opacity-90 drop-shadow-[0_0_14px_rgb(247_200_92/0.5)]" />
            </div>
            <div className="lp-screen">
              <div className="lp-frame">
                <div className="lp-view">
                  <div className="lp-bar">
                    <i />
                    <i />
                    <i />
                    <span className="lp-url">
                      <span className="lp-url-a">triskell-ecosystem · i nostri siti</span>
                      <span className="lp-url-b">{featured.domain}</span>
                    </span>
                  </div>

                  <div className="lp-gal">
                    <h5>
                      I siti che <b>abbiamo costruito</b>
                    </h5>
                    <div className="lp-grid">
                      {items.map((it, i) => (
                        <figure key={it.id} className={`lp-site lp-pop${it.id === featured.id ? " lp-hot" : ""}`} style={pop(0.1 + i * 0.12)}>
                          <div data-d={it.domain}>
                            <i />
                            <i />
                            <i />
                          </div>
                          <Image src={it.image} alt="" width={640} height={400} sizes="22rem" loading="lazy" />
                          <p>{it.name}</p>
                        </figure>
                      ))}
                    </div>
                  </div>

                  {featured.tall && (
                    <div className="lp-open">
                      <Image src={featured.tall} alt="" width={1280} height={1560} sizes="50rem" loading="lazy" className="lp-tall" />
                    </div>
                  )}

                  <svg className="lp-cursor" viewBox="0 0 24 24" fill="none">
                    <path d="M4 2l15 9-6.5 1.6L9 19 4 2z" fill="#fff" stroke="#011a30" strokeWidth="1.4" strokeLinejoin="round" />
                  </svg>
                  <span className="lp-click" />
                </div>
              </div>
              <span className="lp-cam" />
            </div>
          </div>
          {/* base con tastiera e trackpad */}
          <div className="lp-base">
            <span className="lp-keys" />
            <span className="lp-pad" />
          </div>
        </div>
      </div>
    </div>
  );
}
