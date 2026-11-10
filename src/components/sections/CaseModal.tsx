"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { site, type CaseStudy } from "@/content/site";
import type { CaseDetail } from "@/content/cases";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

/**
 * Scheda a tutto schermo di un cliente (dialog nativo: focus intrappolato, Esc per chiudere). Racconta: da dove siamo
 * partiti, cosa abbiamo fatto, il processo passo per passo, come è cambiato e i risultati in grande.
 * I dettagli si caricano solo all'apertura. Numeri e testi: dal sito originale; le note "indicativo" restano visibili.
 */
export function CaseModal({ item, onClose }: { item: CaseStudy; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const [d, setD] = useState<CaseDetail | null>(null);

  useEffect(() => {
    const dlg = ref.current;
    if (!dlg) return;
    if (!dlg.open) dlg.showModal();
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    let live = true;
    import("@/content/cases").then((m) => live && setD(m.caseDetails[item.id] ?? null));
    return () => {
      live = false;
    };
  }, [item.id]);

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => e.target === ref.current && onClose()}
      aria-labelledby={`case-${item.id}-title`}
      className="case-dialog m-auto w-[min(60rem,94vw)] max-w-none rounded-card border border-gold-400/40 bg-night p-0 text-fg shadow-[0_40px_120px_-20px_rgb(0_0_0/0.95),0_0_80px_-20px_rgb(247_200_92/0.35)]"
    >
      <div data-lenis-prevent="" className="max-h-[92svh] overflow-y-auto overscroll-contain">
        <div className="relative h-56 sm:h-72">
          <Image src={item.image} alt="" fill sizes="60rem" className="object-cover" />
          <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-night via-night/80 to-night/30" />
          <button type="button" onClick={onClose} aria-label="Chiudi" className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full border border-line-strong bg-night/80 text-fg backdrop-blur hover:border-gold-300 hover:text-gold-300">
            <Icon name="close" className="h-5 w-5" />
          </button>
          <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8">
            <p className="text-[0.75rem] font-semibold uppercase tracking-[0.16em] text-gold-300">
              {item.sector} · {item.place} · {item.tag}
            </p>
            <h2 id={`case-${item.id}-title`} className="mt-2 font-display text-[clamp(1.75rem,1.2rem+2.4vw,3rem)] font-bold leading-[1.04] tracking-[-0.035em] text-fg">
              {item.client}
            </h2>
            <p className="mt-2 max-w-2xl text-[1.0625rem] leading-snug text-fg-2">{d?.lead ?? item.text}</p>
          </div>
        </div>

        <div className="p-5 sm:p-8">
          {!d ? (
            <p className="py-10 text-center text-fg-2">Caricamento…</p>
          ) : (
            <>
              {/* risultati in grande */}
              <section aria-label="Risultati">
                <p className="text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-gold-400">I risultati</p>
                <ul className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-3">
                  {d.numbers.map((n) => (
                    <li key={n.label} className="rounded-2xl border border-gold-400/30 bg-[linear-gradient(160deg,var(--color-cobalt-700),var(--color-night-raised))] p-4">
                      <p className="text-gold font-display text-[clamp(1.5rem,1.1rem+1.6vw,2.375rem)] font-extrabold leading-none tracking-[-0.04em]">{n.value}</p>
                      <p className="mt-2 text-[0.8125rem] font-semibold leading-tight text-fg">{n.label}</p>
                      {n.note && <p className="mt-1 text-[0.6875rem] leading-snug text-fg-3">{n.note}</p>}
                    </li>
                  ))}
                </ul>
              </section>

              {/* da dove siamo partiti / cosa abbiamo fatto */}
              <div className="mt-10 grid gap-8 md:grid-cols-2">
                {d.blocks.map((b, i) => (
                  <section key={b.title}>
                    <h3 className="flex items-center gap-2.5 font-display text-[1.25rem] font-semibold text-fg">
                      <span className="grid h-7 w-7 place-items-center rounded-full border border-gold-400/50 bg-gold-300/10 text-[0.75rem] font-bold text-gold-300">{i + 1}</span>
                      {b.title}
                    </h3>
                    {b.paras.map((p) => (
                      <p key={p} className="mt-3 text-[0.9375rem] leading-relaxed text-fg-2">
                        {p}
                      </p>
                    ))}
                    <ul className="mt-3 space-y-2">
                      {b.bullets.map((x) => (
                        <li key={x} className="flex gap-2.5 text-[0.875rem] leading-snug text-fg">
                          <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-gold-300" strokeWidth={2.4} />
                          {x}
                        </li>
                      ))}
                    </ul>
                  </section>
                ))}
              </div>

              {d.sections.map((sec) => (
                <section key={sec.title} className="mt-10">
                  <h3 className="font-display text-[1.25rem] font-semibold text-fg">{sec.title}</h3>
                  {sec.paras?.map((p) => (
                    <p key={p} className="mt-3 text-[0.9375rem] leading-relaxed text-fg-2">
                      {p}
                    </p>
                  ))}
                  {sec.bullets && (
                    <ul className="mt-3 space-y-2">
                      {sec.bullets.map((x) => (
                        <li key={x} className="flex gap-2.5 text-[0.875rem] leading-snug text-fg">
                          <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-gold-300" strokeWidth={2.4} />
                          {x}
                        </li>
                      ))}
                    </ul>
                  )}
                  {sec.steps && (
                    <ol className="relative mt-5 grid gap-3 sm:grid-cols-2">
                      {sec.steps.map((st, k) => (
                        <li key={st.t} className="flex gap-3 rounded-xl border border-line bg-night-raised/60 p-3.5">
                          <span className="font-display text-[1.5rem] font-bold leading-none text-gold-400/70">{String(k + 1).padStart(2, "0")}</span>
                          <span className="text-[0.875rem] leading-snug text-fg-2">
                            <strong className="block font-display text-[0.9375rem] font-semibold text-fg">{st.t}</strong>
                            {st.d}
                          </span>
                        </li>
                      ))}
                    </ol>
                  )}
                  {sec.table && (
                    <ul className="mt-5 space-y-2">
                      {sec.table.map((r) => (
                        <li key={r.what} className="grid items-center gap-2 rounded-xl border border-line bg-night-raised/60 p-3.5 sm:grid-cols-[1.3fr_1fr_auto_1fr]">
                          <span className="text-[0.875rem] font-semibold text-fg">
                            {r.what}
                            {r.note && <small className="block text-[0.6875rem] font-normal text-fg-3">{r.note}</small>}
                          </span>
                          <span className="text-[0.8125rem] text-fg-3 line-through decoration-fg-3/50">{r.before}</span>
                          <Icon name="arrow-right" className="hidden h-4 w-4 text-gold-300 sm:block" />
                          <span className="text-gold font-display text-[0.9375rem] font-bold">{r.after}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}

              {d.quote && (
                <blockquote className="mt-10 rounded-2xl border border-gold-400/30 bg-gold-300/[0.06] p-5 sm:p-6">
                  <p className="font-display text-[1.125rem] font-medium leading-snug text-fg [text-wrap:balance]">{d.quote.text}</p>
                  {d.quote.by && <footer className="mt-3 text-[0.8125rem] font-semibold text-gold-300">{d.quote.by}</footer>}
                </blockquote>
              )}

              <ul className="mt-8 flex flex-wrap gap-2">
                {d.tags.map((t) => (
                  <li key={t} className="rounded-full border border-azure-300/40 px-3 py-1 text-[0.75rem] font-semibold text-azure-200">
                    {t}
                  </li>
                ))}
              </ul>

              <div className="mt-10 flex flex-col items-center gap-3 border-t border-line pt-8 text-center">
                <p className="font-display text-[1.375rem] font-bold text-fg">{site.cta.results.title}</p>
                <Button href={site.cta.href} size="lg" icon="calendar" iconPosition="start" pulse>
                  {site.cta.button}
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </dialog>
  );
}
