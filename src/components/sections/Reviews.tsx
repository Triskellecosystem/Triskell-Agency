"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/Icon";
import { Section, SectionHeading } from "@/components/ui/Section";
import { SectionGlow } from "@/components/ui/SectionGlow";
import { Reveal } from "@/components/motion/Reveal";

const VIDEOS = [
  { src: "/video/recensione-forme-1.mp4", poster: "/video/recensione-forme-1.jpg", who: "Davide", topic: "Le campagne social" },
  { src: "/video/recensione-forme-2.mp4", poster: "/video/recensione-forme-2.jpg", who: "Fabio", topic: "La piattaforma ForMe at Home" },
];

/** Recensioni Google vere, testo originale invariato, 5 stelle ciascuna. */
const REVIEWS = [
  { name: "Alex", meta: "Local Guide · 9 mesi fa", text: "Dopo aver analizzato le mie pagine social gestite in modo casereccio, abbiamo capito che c'è molto margine di miglioramento. Sono molto soddisfatto del lavoro svolto, il team è trasparente, altamente competente e sempre disponibile. Sono flessibili, ascoltano le esigenze del cliente e tengono davvero a realizzare un lavoro di qualità. Consigliati." },
  { name: "Jing Jin", meta: "Katana Sushi · Genova · 2 anni fa", text: "Collaboro con i Ragazzi di Triskell Ecosystem da prima della nascita del Progetto e della creazione del Team alla base. Sono ormai 3 anni che mi affido ai loro servizi di Digital Marketing per il mio Ristorante Katana Sushi a Genova. Seguendo le loro indicazioni e strategia abbiamo costruito un sitoweb che ad oggi ha tutte le funzionalità per l'ordinazione online e che ormai è molto usato dai miei clienti. Attraverso poi le campagne pubblicitarie e la gestione Social Media sono riusciti a creare per il mio locale una solida base utenti e a portare ordinazioni costanti, continue e in crescita nel tempo. Ad oggi sono pienamente soddisfatta della collaborazione e del rapporto costruito e felice di essere seguiti da professionisti appassionati, attenti alle esigenze, disponibili e aggiornati sulle ultime novità di settore. Consigliati." },
  { name: "Mia Perna", meta: "2 anni fa", text: "Personalità, concretezza e precisione è ciò che distingue TRISKELL ECOSYSTEM dagli altri. Il loro punto di forza? una mission mirata al raggiungimento effettivo degli obiettivi aziendali dei propri clienti. In poco tempo Tomaso e il suo team hanno portato la nostra società a raggiungere risultati tangibili e in continua evoluzione, stimolando costantemente il nostro lavoro. ESTREMAMENTE CONSIGLIATO." },
  { name: "Davide Rosignoli", meta: "Centro fitness · 2 anni fa", text: "Mi sono affidato a loro da più di un anno per la gestione marketing e la ricerca clienti online, il mio centro fitness ha incrementato notevolmente le iscrizioni con nuovi clienti generati dalle loro campagne social molto professionali e gestite nel modo migliore. Sono sempre molto disponibili e aperti al dialogo e al confronto per venire incontro alle richieste del cliente. Consigliatissimi" },
  { name: "Gabriele Gatti", meta: "Osteopata · un anno fa", text: "Sono seguito da loro da un anno ormai e non posso che ritenermi soddisfatto. Oltre la costruzione del sito, forniscono supporto continuo anche per cambiamenti o modifiche in fase di sviluppo. Sempre disponibili anche per confronti via call. Non posso che ritenermi pienamente soddisfatto." },
  { name: "Valentina Randazzo", meta: "2 anni fa", text: "Grazie alla loro attività di digital marketing mi sono stati di supporto nella realizzazione della mia presentazione! Disponibili, competenti e affidabili. Estremamente soddisfatta!" },
  { name: "Kristian di Lillo", meta: "Local Guide · un anno fa", text: "Tomaso è davvero forte nel suo lavoro. Lo consiglio vivamente a chi vuole affidarsi ad un professionista del marketing 💪" },
  { name: "Giorgio Traverso", meta: "2 anni fa", text: "Una squadra fantastica, lavorare con loro e per loro è stato molto costruttivo! Tutti molto disponibili e attenti ai dettagli." },
];
const COLORS = ["#4285f4", "#ea4335", "#c2410c", "#0f9d58", "#7c3aed", "#db2777", "#0891b2", "#ca8a04"];

function Stars({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex gap-0.5 text-[#fbbc04]", className)} aria-label="5 stelle su 5">
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} viewBox="0 0 20 20" className="h-4 w-4" fill="currentColor" aria-hidden="true"><path d="M10 1.5l2.6 5.4 5.9.8-4.3 4.1 1 5.8L10 14.8l-5.2 2.8 1-5.8L1.5 7.7l5.9-.8z" /></svg>
      ))}
    </span>
  );
}
function GoogleG() {
  return (
    <svg viewBox="0 0 48 48" className="h-6 w-6" aria-hidden="true">
      <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9 3.6l6.7-6.7C35.6 2.4 30.2 0 24 0 14.6 0 6.6 5.4 2.7 13.3l7.8 6C12.4 13.7 17.7 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.1 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.4c-.5 2.9-2.2 5.3-4.6 7l7.1 5.5c4.2-3.9 7.2-9.6 7.2-17z" />
      <path fill="#FBBC05" d="M10.5 28.7a14.5 14.5 0 010-9.4l-7.8-6a24 24 0 000 21.4l7.8-6z" />
      <path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.1-5.5c-2 1.4-4.6 2.3-8.8 2.3-6.3 0-11.6-4.2-13.5-9.9l-7.8 6C6.6 42.6 14.6 48 24 48z" />
    </svg>
  );
}

/**
 * Recensioni in home: a sinistra le due video-recensioni dello stesso cliente (ForMe Fitness) in un unico player a
 * "storie" (1 Davide → 2 Fabio, si passa avanti o indietro, a fine video parte il successivo); a destra il riepilogo
 * Google 5,0 e le recensioni vere che scorrono, con "Leggi tutte" che le apre tutte.
 */
export function Reviews() {
  const [cur, setCur] = useState(0);
  const [prog, setProg] = useState(0);
  const [muted, setMuted] = useState(true);
  const [all, setAll] = useState(false);
  const v = useRef<HTMLVideoElement>(null);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = v.current;
    const host = box.current;
    if (!el || !host) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const io = new IntersectionObserver(([e]) => (e?.isIntersecting && !reduced ? el.play().catch(() => {}) : el.pause()), { threshold: 0.4 });
    io.observe(host);
    const onT = () => setProg(el.duration ? el.currentTime / el.duration : 0);
    const onEnd = () => setCur((c) => (c + 1) % VIDEOS.length);
    el.addEventListener("timeupdate", onT);
    el.addEventListener("ended", onEnd);
    return () => {
      io.disconnect();
      el.removeEventListener("timeupdate", onT);
      el.removeEventListener("ended", onEnd);
    };
  }, []);
  useEffect(() => {
    const el = v.current;
    if (!el) return;
    el.load();
    el.muted = muted;
    el.play().catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cur]);

  const go = (i: number) => setCur((i + VIDEOS.length) % VIDEOS.length);
  const shown = all ? REVIEWS : REVIEWS.slice(0, 4);

  return (
    <Section id="recensioni" labelledBy="recensioni-title" className="overflow-hidden">
      <SectionGlow />
      <SectionHeading id="recensioni-title" overline="Recensioni" title="Cosa dicono [i nostri clienti]" line="Video veri e recensioni Google: parlano le persone che seguiamo." align="center" />
      <div className="mt-10 grid items-start gap-8 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)]">
        {/* video-storie dello stesso cliente */}
        <Reveal y={20} blur={0}>
          <div ref={box} className="mx-auto w-full max-w-[20rem]">
            <p className="mb-3 flex items-center justify-center gap-2 text-[0.8125rem] font-semibold text-fg">
              <span className="grid h-6 w-6 place-items-center rounded-md bg-[#76c434] font-display text-[0.5rem] font-black text-white">FOR<span className="text-night">ME</span></span>
              ForMe Fitness · 2 video
            </p>
            <div className="rv-frame relative aspect-[9/16] overflow-hidden rounded-[1.75rem] bg-black">
              <video ref={v} src={VIDEOS[cur]!.src} poster={VIDEOS[cur]!.poster} muted={muted} playsInline preload="metadata" aria-label={`Video recensione di ${VIDEOS[cur]!.who}, ForMe Fitness`} className="absolute inset-0 h-full w-full object-cover" />
              {/* barre stile storie */}
              <div className="absolute inset-x-3 top-3 z-10 flex gap-1.5">
                {VIDEOS.map((x, i) => (
                  <span key={x.src} className="h-1 flex-1 overflow-hidden rounded-full bg-white/30">
                    <span className="block h-full rounded-full bg-white" style={{ width: `${i < cur ? 100 : i === cur ? prog * 100 : 0}%` }} />
                  </span>
                ))}
              </div>
              <button type="button" aria-label="Video precedente" onClick={() => go(cur - 1)} className="absolute inset-y-0 left-0 z-[5] w-1/4" />
              <button type="button" aria-label="Video successivo" onClick={() => go(cur + 1)} className="absolute inset-y-0 right-0 z-[5] w-1/4" />
              <button type="button" onClick={() => { const el = v.current; if (!el) return; el.muted = !muted; setMuted(!muted); el.play().catch(() => {}); }} aria-label={muted ? "Attiva l'audio" : "Disattiva l'audio"} className="absolute bottom-3 left-1/2 z-10 inline-flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full border border-white/25 bg-black/55 px-3 py-1.5 text-[0.75rem] font-semibold text-white backdrop-blur-md hover:border-gold-300 hover:text-gold-200">
                <Icon name={muted ? "volume-off" : "volume"} className="h-4 w-4" strokeWidth={2} />
                {muted ? "Attiva audio" : "Audio attivo"}
              </button>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {VIDEOS.map((x, i) => (
                <button key={x.src} type="button" onClick={() => go(i)} aria-pressed={i === cur} className={cn("gl-card rounded-xl px-3 py-2 text-left transition-transform", i === cur && "gl-card--on -translate-y-0.5")}>
                  <span className="block font-mono text-[0.625rem] font-bold text-gold-300">VIDEO {i + 1}</span>
                  <span className="block font-display text-[0.875rem] font-semibold text-fg">{x.who}</span>
                  <span className="block truncate text-[0.6875rem] text-fg-2">{x.topic}</span>
                </button>
              ))}
            </div>
            <button type="button" onClick={() => go(cur + 1)} className="mx-auto mt-3 flex items-center gap-1.5 text-[0.8125rem] font-semibold text-gold-200 hover:text-gold-100">
              {cur === 0 ? "Guarda il video di Fabio" : "Rivedi il video di Davide"}
              <Icon name="arrow-right" className="h-4 w-4" strokeWidth={2.2} />
            </button>
          </div>
        </Reveal>

        {/* recensioni Google */}
        <div>
          <Reveal y={16} blur={0}>
            <div className="gl-card flex flex-wrap items-center gap-x-6 gap-y-3 rounded-[1.5rem] px-6 py-5">
              <span className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-white"><GoogleG /></span>
                <span>
                  <span className="block font-display text-[1.0625rem] font-semibold text-fg">Recensioni Google</span>
                  <span className="block text-[0.75rem] text-fg-2">Triskell Ecosystem</span>
                </span>
              </span>
              <span className="flex items-center gap-3 sm:ml-auto">
                <span className="font-display text-[2.75rem] font-bold leading-none text-fg">5,0</span>
                <span>
                  <Stars />
                  <span className="mt-1 block text-[0.75rem] text-fg-2">su 8 recensioni · tutte 5 stelle</span>
                </span>
              </span>
            </div>
          </Reveal>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {shown.map((r, i) => (
              <li key={r.name} className="rv-card gl-card flex flex-col rounded-[1.25rem] p-4" style={{ "--i": i % 4 } as React.CSSProperties}>
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full font-display text-[1rem] font-bold text-white" style={{ background: COLORS[i % COLORS.length] }}>{r.name[0]}</span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-display text-[0.9375rem] font-semibold text-fg">{r.name}</span>
                    <span className="block truncate text-[0.6875rem] text-fg-3">{r.meta}</span>
                  </span>
                  <GoogleG />
                </div>
                <Stars className="mt-2.5" />
                <p className={cn("mt-2 text-[0.8125rem] leading-relaxed text-fg-2", !all && "line-clamp-6")}>«{r.text}»</p>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex justify-center">
            <button type="button" onClick={() => setAll((a) => !a)} aria-expanded={all} className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-4 py-2 text-[0.8125rem] font-semibold text-fg-2 transition-colors hover:border-gold-300/60 hover:text-gold-200">
              {all ? "Mostra meno" : `Leggi tutte le ${REVIEWS.length} recensioni`}
              <Icon name="chevron-down" className={cn("h-4 w-4 transition-transform", all && "rotate-180")} strokeWidth={2.2} />
            </button>
          </div>
        </div>
      </div>
    </Section>
  );
}
