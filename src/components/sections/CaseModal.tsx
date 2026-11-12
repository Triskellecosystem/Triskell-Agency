"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { site, type CaseStudy } from "@/content/site";
import type { CaseDetail } from "@/content/cases";
import { Button } from "@/components/ui/Button";
import { Icon, type IconName } from "@/components/ui/Icon";
import { LogoMark } from "@/components/brand/LogoMark";

/**
 * Scheda di un cliente (dialog nativo: focus intrappolato, Esc per chiudere), compatta: intestazione con video (solo
 * dove c'è) o immagine, quattro risultati, la sfida e la soluzione, il processo in linea, la frase finale e la call.
 * Il resto della storia si apre con "Leggi tutta la storia". I dettagli si caricano solo all'apertura.
 */

/** Video dei case study (formato reel): solo per i clienti che ce l'hanno dato. */
const VIDEOS: Record<string, { src: string; poster: string }> = {
  "gabriele-gatti": { src: "/video/case-gatti.mp4", poster: "/video/case-gatti.jpg" },
  "forme-fitness": { src: "/video/case-forme.mp4", poster: "/video/case-forme.jpg" },
  "mela-med": { src: "/video/case-mela.mp4", poster: "/video/case-mela.jpg" },
  "urban-fitness": { src: "/video/case-urban.mp4", poster: "/video/case-urban.jpg" },
};
const STAT_ICONS: IconName[] = ["calendar", "users", "chart", "zap", "target", "trending"];
const STEP_ICONS: IconName[] = ["search", "monitor", "megaphone", "chart", "bot", "rocket", "target", "layers"];
const firstSentence = (s: string) => {
  const f = (s.split(/(?<=[a-zà-ù0-9)]{3}[.!?])\s+(?=[A-ZÀ-Ú«])/)[0] ?? s).trim();
  return f.length > 200 ? f.slice(0, f.lastIndexOf(" ", 190)).replace(/[,;:]$/, "") + "…" : f;
};

export function CaseModal({ item, onClose }: { item: CaseStudy; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const [d, setD] = useState<CaseDetail | null>(null);
  const [more, setMore] = useState(false);

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

  const video = VIDEOS[item.id];
  const stats = d ? (d.numbers.filter((n) => /\d/.test(n.value) && !/^Fine|^Da \d{4}/.test(n.value)).concat(d.numbers.filter((n) => !/\d/.test(n.value)))).slice(0, 4) : [];
  const process = d?.sections.find((s) => s.steps?.length);
  const rest = d ? d.sections.filter((s) => s !== process) : [];

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => e.target === ref.current && onClose()}
      aria-labelledby={`case-${item.id}-title`}
      className="case-dialog m-auto w-[min(64rem,95vw)] max-w-none rounded-[1.75rem] border-0 bg-transparent p-0 text-fg"
    >
      <div data-lenis-prevent="" className="case-shell relative max-h-[92svh] overflow-y-auto overscroll-contain rounded-[1.75rem]">
        <button type="button" onClick={onClose} aria-label="Chiudi" className="absolute right-4 top-4 z-20 grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-night/80 text-fg backdrop-blur hover:border-gold-300 hover:text-gold-300">
          <Icon name="close" className="h-5 w-5" />
        </button>

        <div className="p-5 sm:p-8">
          {/* intestazione */}
          <div className={`grid items-center gap-6 ${video ? "md:grid-cols-[minmax(0,1fr)_auto]" : "md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]"}`}>
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-gold-300/50 px-3 py-1 text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-gold-200">
                <Icon name="briefcase" className="h-3.5 w-3.5" strokeWidth={2} />
                Case study
              </p>
              <h2 id={`case-${item.id}-title`} className="mt-3 font-display text-[clamp(1.875rem,1.3rem+2.2vw,2.875rem)] font-bold leading-[1.02] tracking-[-0.035em] text-fg">{item.client}</h2>
              <p className="mt-1.5 text-[1rem] font-medium text-fg-2">
                {item.sector} <span className="text-gold-300">·</span> {item.place}
              </p>
              <p className="mt-3 max-w-md text-[0.9375rem] leading-snug text-fg-2">{d?.lead ?? item.text}</p>
            </div>
            <div className={`case-media relative overflow-hidden rounded-[1.25rem] ${video ? "mx-auto w-[min(15rem,70vw)] md:mr-10" : ""}`}>
              {video ? (
                <CaseVideo src={video.src} poster={video.poster} label={`Video del case study ${item.client}`} />
              ) : (
                <div className="relative aspect-video">
                  <Image src={item.image} alt="" fill sizes="32rem" className="object-cover" />
                  <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-night/75 px-2.5 py-1 text-[0.6875rem] font-semibold uppercase tracking-wider text-fg backdrop-blur">
                    <Icon name={item.icon} className="h-3.5 w-3.5 text-gold-300" />
                    {item.tag}
                  </span>
                </div>
              )}
            </div>
          </div>

          {!d ? (
            <p className="py-10 text-center text-fg-2">Caricamento…</p>
          ) : (
            <>
              {/* risultati */}
              <p className="mt-8 flex items-center gap-2 text-[0.75rem] font-bold uppercase tracking-[0.22em] text-fg">
                <span className="h-3.5 w-[3px] rounded bg-gold-300" />I risultati
              </p>
              <ul className="mt-3 grid grid-cols-2 gap-2.5 lg:grid-cols-4">
                {stats.map((n, k) => (
                  <li key={n.label} className="gl-card flex items-center gap-3 rounded-xl px-3.5 py-3" title={n.note}>
                    <Icon name={STAT_ICONS[k % STAT_ICONS.length]!} className="h-6 w-6 shrink-0 text-gold-300 max-sm:hidden" strokeWidth={1.7} />
                    <span className="min-w-0">
                      <span className="block font-display text-[1.0625rem] font-bold leading-tight tracking-[-0.03em] text-gold sm:text-[1.25rem]">{n.value}</span>
                      <span className="mt-1 block text-[0.75rem] leading-tight text-fg-2">{n.label}</span>
                    </span>
                  </li>
                ))}
              </ul>

              {/* sfida e soluzione */}
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {d.blocks.slice(0, 2).map((b, i) => (
                  <section key={b.title} className={`gl-card ${i ? "gl-card--gold" : ""} rounded-[1.25rem] p-5`}>
                    <h3 className="flex items-center gap-3 font-display text-[1.25rem] font-bold text-fg">
                      <Icon name={i ? "rocket" : "target"} className="h-7 w-7 text-gold-300" strokeWidth={1.7} />
                      {b.title}
                    </h3>
                    {b.paras[0] && <p className="mt-2 text-[0.875rem] leading-snug text-fg-2">{more ? b.paras.join(" ") : firstSentence(b.paras[0])}</p>}
                    <ul className="mt-3 space-y-1.5 border-t border-white/10 pt-3">
                      {(more ? b.bullets : b.bullets.slice(0, 4)).map((x) => (
                        <li key={x} className="flex gap-2 text-[0.8125rem] leading-snug text-fg">
                          <span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full border border-gold-300 text-gold-300"><Icon name="check" className="h-2.5 w-2.5" strokeWidth={3} /></span>
                          {x}
                        </li>
                      ))}
                    </ul>
                  </section>
                ))}
              </div>

              {/* processo in linea */}
              {process?.steps && (
                <section className="mt-8">
                  <h3 className="font-display text-[1.25rem] font-bold text-fg">
                    Il processo, <span className="text-gold">passo per passo</span>
                  </h3>
                  <ol className="case-steps relative mt-5 grid gap-5" style={{ gridTemplateColumns: `repeat(${Math.min(process.steps.length, 4)}, minmax(0, 1fr))` }}>
                    <span aria-hidden="true" className="case-steps-line" />
                    {process.steps.slice(0, 4).map((st, k) => (
                      <li key={st.t} className="relative flex flex-col items-center text-center" style={{ "--i": k } as React.CSSProperties}>
                        <span className="case-step-dot relative z-[1] grid h-12 w-12 place-items-center rounded-full border-2 border-gold-300 bg-night text-gold-300">
                          <Icon name={STEP_ICONS[k % STEP_ICONS.length]!} className="h-5 w-5" strokeWidth={1.8} />
                        </span>
                        <span className="mt-2 font-display text-[1.125rem] font-bold text-gold">{String(k + 1).padStart(2, "0")}</span>
                        <strong className="font-display text-[0.9375rem] font-semibold leading-tight text-fg">{st.t}</strong>
                        <span className="mt-1 line-clamp-3 text-[0.75rem] leading-snug text-fg-2">{st.d}</span>
                      </li>
                    ))}
                  </ol>
                </section>
              )}

              {/* resto della storia */}
              {more && (
                <div className="mt-6 space-y-6">
                  {process?.steps && process.steps.length > 4 && (
                    <ol className="grid gap-2 sm:grid-cols-2">
                      {process.steps.slice(4).map((st, k) => (
                        <li key={st.t} className="gl-card rounded-xl p-3 text-[0.8125rem] text-fg-2">
                          <strong className="mr-1 font-display text-gold">{String(k + 5).padStart(2, "0")}</strong>
                          <strong className="text-fg">{st.t}</strong> · {st.d}
                        </li>
                      ))}
                    </ol>
                  )}
                  {rest.map((sec) => (
                    <section key={sec.title} className="gl-card rounded-[1.25rem] p-5">
                      <h3 className="font-display text-[1.125rem] font-bold text-fg">{sec.title}</h3>
                      {sec.paras?.map((p) => <p key={p} className="mt-2 text-[0.875rem] leading-snug text-fg-2">{p}</p>)}
                      {sec.bullets && (
                        <ul className="mt-3 grid gap-1.5 sm:grid-cols-2">
                          {sec.bullets.map((x) => (
                            <li key={x} className="flex gap-2 text-[0.8125rem] leading-snug text-fg">
                              <Icon name="check" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold-300" strokeWidth={2.6} />
                              {x}
                            </li>
                          ))}
                        </ul>
                      )}
                      {sec.steps && (
                        <ol className="mt-3 grid gap-2 sm:grid-cols-2">
                          {sec.steps.map((st, k) => (
                            <li key={st.t} className="text-[0.8125rem] text-fg-2"><strong className="mr-1 text-gold">{String(k + 1).padStart(2, "0")}</strong><strong className="text-fg">{st.t}</strong> · {st.d}</li>
                          ))}
                        </ol>
                      )}
                      {sec.table && (
                        <ul className="mt-3 space-y-1.5">
                          {sec.table.map((r) => (
                            <li key={r.what} className="grid items-center gap-2 rounded-lg bg-night/40 p-2.5 text-[0.8125rem] sm:grid-cols-[1.3fr_1fr_auto_1fr]">
                              <span className="font-semibold text-fg">{r.what}</span>
                              <span className="text-fg-3">{r.before}</span>
                              <Icon name="arrow-right" className="hidden h-3.5 w-3.5 text-gold-300 sm:block" />
                              <span className="font-display font-bold text-gold">{r.after}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </section>
                  ))}
                  <ul className="flex flex-wrap gap-1.5">
                    {d.tags.map((tg) => <li key={tg} className="rounded-full border border-azure-300/40 px-2.5 py-0.5 text-[0.6875rem] font-semibold text-azure-200">{tg}</li>)}
                  </ul>
                </div>
              )}

              <div className="mt-5 flex justify-center">
                <button type="button" onClick={() => setMore((m) => !m)} aria-expanded={more} className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-4 py-1.5 text-[0.8125rem] font-semibold text-fg-2 transition-colors hover:border-gold-300/60 hover:text-gold-200">
                  {more ? "Mostra meno" : "Leggi tutta la storia"}
                  <Icon name="chevron-down" className={`h-4 w-4 transition-transform ${more ? "rotate-180" : ""}`} strokeWidth={2.2} />
                </button>
              </div>

              {/* frase finale */}
              {d.quote && (
                <blockquote className="gl-card mt-6 flex flex-col gap-4 rounded-[1.25rem] p-5 sm:flex-row sm:items-center">
                  <span aria-hidden="true" className="font-display text-[3rem] leading-none text-gold-300">“</span>
                  <p className="flex-1 font-display text-[1rem] italic leading-snug text-fg [text-wrap:balance]">{d.quote.text.replace(/^[«"]|[»"]$/g, "")}</p>
                  {d.quote.by && (
                    <footer className="flex items-center gap-2.5 border-white/12 sm:border-l sm:pl-5">
                      <LogoMark sizes="40px" className="h-9 w-9" />
                      <span className="text-[0.8125rem] font-semibold text-fg">{d.quote.by}</span>
                    </footer>
                  )}
                </blockquote>
              )}

              <div className="mt-7 flex justify-center">
                <Button href={site.cta.href} size="lg" icon="calendar" iconPosition="start" pulse>
                  Prenota una call gratuita
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </dialog>
  );
}

/** Video del case study: parte senza audio, con il pulsante per attivarlo. */
function CaseVideo({ src, poster, label }: { src: string; poster: string; label: string }) {
  const v = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  useEffect(() => {
    v.current?.play().catch(() => {});
  }, []);
  return (
    <div className="relative aspect-[9/16] bg-black">
      <video ref={v} src={src} poster={poster} muted loop playsInline autoPlay aria-label={label} className="absolute inset-0 h-full w-full object-cover" />
      <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-night/75 px-2.5 py-1 text-[0.6875rem] font-semibold text-fg backdrop-blur">
        <Icon name="play" className="h-3 w-3 text-gold-300" strokeWidth={2.4} />
        Video case study
      </span>
      <button
        type="button"
        onClick={() => {
          const el = v.current;
          if (!el) return;
          el.muted = !el.muted;
          setMuted(el.muted);
          if (el.paused) el.play().catch(() => {});
        }}
        aria-label={muted ? "Attiva l'audio" : "Disattiva l'audio"}
        className="absolute bottom-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full border border-white/25 bg-black/55 px-3 py-1.5 text-[0.75rem] font-semibold text-white backdrop-blur-md hover:border-gold-300 hover:text-gold-200"
      >
        <Icon name={muted ? "volume-off" : "volume"} className="h-4 w-4" strokeWidth={2} />
        {muted ? "Attiva audio" : "Audio attivo"}
      </button>
    </div>
  );
}
