import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/content/site";
import { Icon } from "@/components/ui/Icon";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { CountUp } from "@/components/motion/CountUp";
import { Reveal } from "@/components/motion/Reveal";
import { CaseCard } from "@/components/sections/CaseCard";
import { Reviews } from "@/components/sections/Reviews";
import { Contact } from "@/components/sections/Contact";
import { FitGrid } from "@/components/fitness/FitGrid";
import { FitFunnel } from "@/components/fitness/FitFunnel";
import { FitPackages } from "@/components/fitness/FitPackages";
import { FitShoots } from "@/components/fitness/FitShoots";
import { FitFaq } from "@/components/fitness/FitFaq";
import { FitCompare } from "@/components/fitness/FitCompare";
import { FitProfilePhone } from "@/components/fitness/FitProfilePhone";
import { FitTilt } from "@/components/fitness/FitTilt";
import { fit } from "@/components/fitness/data";
import { AiChat } from "@/components/sections/AiChat";
import { FitHeroStats } from "@/components/fitness/FitHeroStats";
import { FitCrm } from "@/components/fitness/FitCrm";

/**
 * Landing per palestre e centri fitness. Non è nel menu, nel footer né nella sitemap e non va indicizzata:
 * la vede solo chi arriva dal link diretto (es. campagne o messaggi). Tema nero + verde fluo.
 */
export const metadata: Metadata = {
  title: "Più iscritti per la tua palestra",
  description: "Social, campagne e automazioni pensati per palestre e centri fitness: casi studio reali, pacchetti da 6 mesi e riprese in palestra.",
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
};

const FIT_CASES = ["forme-fitness", "urban-fitness", "vip-fit", "mela-med", "forme-at-home"];

function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <p className="fit-kicker inline-flex items-center gap-2 rounded-md px-2.5 py-1 text-[0.6875rem] font-bold uppercase tracking-[0.2em]">
      <span className="h-1.5 w-1.5 rounded-sm bg-fit-300 shadow-[0_0_8px_#a6ff00]" />
      {children}
    </p>
  );
}

function Title({ id, children, className = "" }: { id?: string; children: React.ReactNode; className?: string }) {
  return (
    <h2 id={id} className={`fit-h mt-4 text-[clamp(2rem,1.4rem+2.6vw,3.5rem)] leading-[0.98] text-white ${className}`}>
      {children}
    </h2>
  );
}

/** Divisore tra sezioni: linea sottile verde con una luce che la percorre e un rombo che pulsa al centro. */
function Sep() {
  return (
    <div aria-hidden="true" className="fit-sep relative h-px">
      <span className="fit-sep-run" />
      <span className="fit-sep-gem" />
    </div>
  );
}

/** Invito a prenotare la call, ripetuto lungo la pagina. */
function CtaRow({ text }: { text: string }) {
  return (
    <Reveal y={10} blur={0} className="mt-10 flex flex-col items-center gap-3 text-center">
      <p className="text-[1rem] font-semibold text-white/75">{text}</p>
      <Link href="#contatti" className="fit-btn fit-btn--pulse">
        <Icon name="calendar" className="h-5 w-5" strokeWidth={2.2} /> Prenota la call gratuita
      </Link>
    </Reveal>
  );
}

const G = ({ children }: { children: React.ReactNode }) => <span className="fit-glow">{children}</span>;

export default function PalestrePage() {
  const cases = site.results.items.filter((c) => FIT_CASES.includes(c.id)).sort((a, b) => FIT_CASES.indexOf(a.id) - FIT_CASES.indexOf(b.id));
  const wa = site.brand.whatsapp;
  return (
    <div className="fit fit-page">
      {/* barra in alto, al posto del menu del sito */}
      <div className="fit-bar fixed inset-x-0 top-0 z-50">
        <div className="container-x flex h-16 items-center justify-between gap-4">
          <span className="flex items-center gap-2.5">
            <Image src="/fitness/mark.webp" alt="" width={40} height={38} className="h-9 w-auto mix-blend-screen" priority />
            <span className="leading-none">
              <span className="block font-display text-[0.9375rem] font-bold tracking-[0.12em] text-white">TRISKELL</span>
              <span className="fit-h block text-[0.625rem] tracking-[0.3em] text-fit-300">AGENCY · FITNESS</span>
            </span>
          </span>
          <Link href="#contatti" className="fit-btn fit-btn--sm">
            <Icon name="calendar" className="h-4 w-4" strokeWidth={2.4} /> <span className="max-sm:hidden">Prenota la call gratuita</span><span className="sm:hidden">Prenota</span>
          </Link>
        </div>
      </div>

      {/* HERO */}
      <section aria-labelledby="fit-title" className="fit-hero relative isolate flex items-center overflow-hidden pb-14 pt-24 lg:min-h-[100svh] lg:pb-10 lg:pt-20">
        <FitGrid />
        <span aria-hidden="true" className="fit-hero-glow" />
        <div className="container-x relative grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <Reveal y={12} blur={0}><Kicker>Per palestre e centri fitness</Kicker></Reveal>
            <Reveal y={18} blur={6} delay={0.1}>
              <h1 id="fit-title" className="fit-h mt-5 text-[clamp(2.1rem,1.2rem+3.4vw,4.25rem)] leading-[0.94] text-white">
                <span className="whitespace-nowrap">Hai un&apos;attività</span> di fitness e vuoi <G>più clienti</G>?
              </h1>
            </Reveal>
            <Reveal y={12} blur={0} delay={0.2}>
              <p className="mt-6 max-w-xl text-[clamp(1rem,0.9rem+0.4vw,1.25rem)] leading-relaxed text-white/75">
                Siamo la soluzione al tuo caso: <strong className="text-white">social, campagne e automazioni pensati solo per il fitness</strong>, con risultati misurati su palestre vere.
              </p>
            </Reveal>
            <Reveal y={12} blur={0} delay={0.3} className="mt-8 flex flex-wrap gap-3">
              <Link href="#contatti" className="fit-btn fit-btn--pulse">
                <Icon name="calendar" className="h-5 w-5" strokeWidth={2.2} /> Prenota la call gratuita
              </Link>
              <Link href="#risultati" className="fit-btn fit-btn--ghost">
                Guarda i risultati <Icon name="arrow-down" className="h-4 w-4" strokeWidth={2.4} />
              </Link>
            </Reveal>
            <Reveal y={10} blur={0} delay={0.4}>
              <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-[0.875rem] text-white/60">
                {["Call gratuita di 30 minuti", "Casi studio solo fitness", "Nessun impegno"].map((x) => (
                  <li key={x} className="flex items-center gap-1.5"><Icon name="check" className="h-4 w-4 text-fit-300" strokeWidth={3} />{x}</li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal from="scale" blur={0} className="relative mx-auto w-fit">
            <FitTilt max={18}>
              <div className="fit-tilt-body relative">
                <span aria-hidden="true" className="fit-ring fit-ring--a" />
                <span aria-hidden="true" className="fit-ring fit-ring--b" />
                <div className="fit-hero-card relative aspect-[941/1672] overflow-hidden rounded-[1.75rem]">
                  <Image src="/fitness/hero.webp" alt="Coach e cliente che si allenano in una palestra Triskell Agency Fitness" fill priority sizes="(min-width: 1024px) 25rem, 90vw" className="fit-hero-img object-cover" />
                  <span aria-hidden="true" className="fit-tilt-shine pointer-events-none absolute inset-0" />
                  <span aria-hidden="true" className="fit-scan pointer-events-none absolute inset-x-0 h-24" />
                </div>
                <FitHeroStats />
              </div>
            </FitTilt>
          </Reveal>
        </div>
      </section>

      {/* striscia di parole */}
      <div aria-hidden="true" className="fit-strip overflow-hidden py-3">
        <div className="fit-strip-track flex w-max gap-8">
          {[0, 1].map((k) => (
            <span key={k} className="flex gap-8">
              {["Più iscritti", "Campagne ADV", "Reel che convertono", "Riprese in palestra", "Segretaria AI", "CRM", "Prove gratuite", "Risultati misurati"].map((w) => (
                <span key={w + k} className="fit-h flex items-center gap-8 whitespace-nowrap text-[1.125rem] text-black">{w}<span className="h-2.5 w-2.5 rotate-45 bg-black" /></span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* DOVE SEI ORA → DOVE PUOI ARRIVARE */}
      <section aria-labelledby="fit-pains" className="fit-bg-beams relative isolate overflow-hidden py-20 lg:py-28">
        <div className="fit-squares" aria-hidden="true" />
        <div className="container-x relative">
          <Reveal y={12} blur={0} className="mx-auto max-w-3xl text-center">
            <Kicker>Ti riconosci?</Kicker>
            <Title id="fit-pains">Dove sei ora e <G>dove puoi arrivare</G>.</Title>
            <p className="mx-auto mt-4 max-w-2xl text-[1.0625rem] text-white/70">Le situazioni che ci raccontano le palestre ogni giorno,<br className="max-sm:hidden" /> e come cambiano quando lavoriamo insieme.</p>
          </Reveal>
          <Reveal y={16} blur={0} className="mx-auto mt-10 max-w-5xl">
            <FitCompare />
          </Reveal>
          <Reveal y={16} blur={0} className="fit-answer relative mt-14 overflow-hidden rounded-3xl p-8 text-center sm:p-12">
            <FitGrid cell={40} density={0.06} />
            <p className="relative text-[0.8125rem] font-bold uppercase tracking-[0.22em] text-fit-300">Noi rispondiamo a una domanda sola</p>
            <p className="fit-h relative mx-auto mt-4 max-w-4xl text-[clamp(1.6rem,1.1rem+2.2vw,3rem)] leading-[1.04] text-white">
              «Come faccio ad avere <G>più clienti</G> ogni mese?»
            </p>
            <Link href="#contatti" className="fit-btn fit-btn--pulse relative mt-7">
              <Icon name="calendar" className="h-5 w-5" strokeWidth={2.2} /> Scoprilo in una call gratuita
            </Link>
          </Reveal>
        </div>
      </section>

      <Sep />

      {/* NUMERI */}
      <section aria-labelledby="fit-numbers" className="fit-bg-dots relative isolate overflow-hidden py-16 lg:py-20">
        <div className="container-x">
          <Reveal y={12} blur={0} className="text-center">
            <Kicker>I numeri delle palestre che seguiamo</Kicker>
            <Title id="fit-numbers" className="mx-auto max-w-3xl">Ecco cosa possiamo <G>portarti</G>.</Title>
          </Reveal>
          <Reveal y={0} blur={0} className="mt-12">
            <ul className="fit-helix mx-auto grid max-w-4xl grid-cols-2 gap-3 lg:grid-cols-4">
              {fit.numbers.map((n, i) => (
                <li key={n.label} className="fit-helix-item" style={{ "--i": i } as React.CSSProperties}>
                  <div className="fit-stat fit-stat--sm relative flex flex-col overflow-hidden rounded-2xl px-4 py-4">
                    <span className="flex items-center justify-between">
                      <span className="fit-ico grid h-8 w-8 place-items-center rounded-lg"><Icon name={(["users", "target", "calendar", "trending"] as const)[i]!} className="h-4 w-4" strokeWidth={2.2} /></span>
                      <span className="font-mono text-[0.625rem] font-bold text-fit-300/70">0{i + 1}</span>
                    </span>
                    <CountUp value={n.value} prefix={n.prefix} suffix={n.suffix} className="fit-num mt-3 block whitespace-nowrap text-[clamp(1.6rem,1.1rem+1.6vw,2.4rem)] leading-none" duration={1.4} />
                    <span className="mt-1.5 block text-[0.875rem] font-bold leading-tight text-white">{n.label}</span>
                    <span className="mt-0.5 block text-[0.6875rem] text-white/50">{n.note}</span>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
          <CtaRow text="Vuoi numeri così anche per la tua palestra?" />
        </div>
      </section>

      <Sep />

      {/* METODO */}
      <section aria-labelledby="fit-metodo" className="fit-bg-glow relative isolate overflow-hidden py-20 lg:py-28">
        <div className="fit-squares" aria-hidden="true" />
        <div className="container-x relative">
          <Reveal y={12} blur={0} className="text-center">
            <Kicker>Metodo Triskell Fitness</Kicker>
            <Title id="fit-metodo" className="mx-auto max-w-4xl">Social + Campagne = <G>più iscritti</G></Title>
            <p className="mx-auto mt-4 max-w-2xl text-[1.0625rem] text-white/70">Il profilo dà fiducia, le campagne portano persone, la segretaria AI non ne perde nessuna. Un solo team per tutto.</p>
          </Reveal>
          <Reveal y={0} blur={0} className="mt-12">
            <div className="fit-eq grid items-stretch gap-3 lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1.15fr]">
              {[
                { icon: "smartphone", t: "Social", p: "Reel e post che mostrano la tua palestra" },
                { icon: "target", t: "Campagne", p: "Meta e Google Ads sulla tua zona" },
                { icon: "bot", t: "Segretaria AI", p: "Risponde a ogni contatto in pochi secondi" },
              ].map((x, i) => (
                <div key={x.t} className="contents">
                  <div className="fit-pop fit-card flex items-center gap-4 rounded-2xl p-5 lg:flex-col lg:items-start" style={{ "--i": i * 2 } as React.CSSProperties}>
                    <span className="fit-ico grid h-12 w-12 shrink-0 place-items-center rounded-lg"><Icon name={x.icon as "smartphone"} className="h-6 w-6" strokeWidth={2} /></span>
                    <span><span className="fit-h block text-[1.5rem] text-white">{x.t}</span><span className="mt-1 block text-[0.875rem] text-white/65">{x.p}</span></span>
                  </div>
                  <span aria-hidden="true" className="fit-pop fit-op grid place-items-center" style={{ "--i": i * 2 + 1 } as React.CSSProperties}>
                    <span className="fit-h grid h-11 w-11 place-items-center rounded-lg text-[1.5rem]">{i < 2 ? "+" : "="}</span>
                  </span>
                </div>
              ))}
              <div className="fit-pop fit-res flex flex-col justify-center rounded-2xl p-6" style={{ "--i": 6 } as React.CSSProperties}>
                <span className="fit-h text-[2rem] leading-none text-black">Più iscritti</span>
                <span className="mt-2 text-[0.9375rem] font-semibold text-black/75">Contatti ogni mese, prove prenotate, abbonamenti nuovi.</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <Sep />

      {/* PERCORSO A SPIRALE, guidato dallo scroll */}
      <section aria-labelledby="fit-path" className="fit-bg-aurora2 relative isolate overflow-x-clip">
        <FitFunnel />
      </section>

      <Sep />

      {/* PROFILO */}
      <section aria-labelledby="fit-feed" className="fit-bg-hex relative isolate overflow-hidden py-20 lg:py-28">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <Reveal y={12} blur={0}>
            <Kicker>Il profilo che costruiamo</Kicker>
            <Title id="fit-feed">Un profilo che fa venire <G>voglia di allenarsi</G> da te.</Title>
            <p className="mt-5 max-w-lg text-[1.0625rem] text-white/70">Stile riconoscibile, contenuti che spiegano e motivano, storie in evidenza ordinate. Chi arriva dalla campagna trova una palestra seria e prenota la prova.</p>
            <ul className="mt-6 grid max-w-lg grid-cols-2 gap-2">
              {[["video", "Reel dinamici"], ["image", "Post informativi"], ["repeat", "Storie e dietro le quinte"], ["users", "Risultati dei clienti"]].map(([ic, t]) => (
                <li key={t} className="fit-card flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-[0.875rem] font-semibold text-white">
                  <Icon name={ic as "video"} className="h-4 w-4 text-fit-300" strokeWidth={2.2} />{t}
                </li>
              ))}
            </ul>
            <Link href="#contatti" className="fit-btn fit-btn--pulse mt-8">
              <Icon name="calendar" className="h-5 w-5" strokeWidth={2.2} /> Voglio un profilo così
            </Link>
          </Reveal>
          <Reveal y={0} blur={0}>
            <FitProfilePhone />
          </Reveal>
        </div>
      </section>

      <Sep />

      {/* PACCHETTI */}
      <section id="pacchetti" aria-labelledby="fit-pack" className="fit-bg-stage relative isolate overflow-hidden py-20 lg:py-28">
        <div className="fit-squares" aria-hidden="true" />
        <div className="container-x relative">
          <Reveal y={12} blur={0} className="text-center">
            <Kicker>I pacchetti</Kicker>
            <Title id="fit-pack" className="mx-auto max-w-3xl">Social + Campagne, <G>in base ai contenuti</G> che ti servono.</Title>
            <p className="mx-auto mt-4 max-w-2xl text-[1.0625rem] text-white/70">Scegli quanti contenuti al mese vuoi pubblicare: le campagne e la gestione crescono insieme. Con il pacchetto da 6 mesi hai la scontistica maggiore.</p>
          </Reveal>
          <Reveal y={12} blur={0} className="mt-10">
            <FitPackages />
          </Reveal>
        </div>
      </section>

      <Sep />

      {/* SEGRETARIA AI */}
      <section aria-labelledby="fit-ai" className="fit-bg-aurora fit-ai relative isolate overflow-hidden py-14 lg:py-16">
        <div className="fit-squares" aria-hidden="true" />
        <div className="container-x relative grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-12">
          <div>
            <Reveal y={12} blur={0}>
              <Kicker>Il nostro vantaggio competitivo</Kicker>
              <Title id="fit-ai" className="text-[clamp(1.9rem,1.3rem+2vw,3rem)]">La segretaria AI che <G>non ti fa perdere</G> nessun cliente.</Title>
              <p className="mt-4 max-w-xl text-[1rem] text-white/70">Arriva un contatto dalla campagna: l&apos;assistente AI gli scrive subito su WhatsApp, raccoglie quando vuole essere richiamato e tu chiami un cliente già pronto.</p>
            </Reveal>
            <Reveal y={0} blur={0} className="mt-5">
              <dl className="grid max-w-md grid-cols-3 gap-2">
                {site.ai.console.stats.map((st, k) => (
                  <div key={st.label} className="fit-pop fit-stat relative overflow-hidden rounded-xl px-3 py-2.5" style={{ "--i": k } as React.CSSProperties}>
                    <dd><CountUp {...st} className="fit-num block whitespace-nowrap text-[clamp(1.25rem,0.9rem+1vw,1.75rem)] leading-none" duration={1.2} /></dd>
                    <dt className="mt-1 text-[0.6875rem] font-semibold text-white/70">{st.label}</dt>
                  </div>
                ))}
              </dl>
            </Reveal>
            <Reveal y={0} blur={0} className="mt-5">
              <ol className="fit-tl relative grid grid-cols-1 gap-2 sm:grid-cols-6 sm:gap-1">
                <span aria-hidden="true" className="fit-tl-line" />
                {([
                  ["click", "Arriva un contatto", "ads"],
                  ["bot", "L'AI gli scrive", "ai"],
                  ["clock", "Chiede l'orario", "ai"],
                  ["phone", "Tu lo chiami", "tu"],
                  ["calendar", "Fissate la prova", "tu"],
                  ["bell", "L'AI lo ricorda", "ai"],
                ] as const).map(([ic, t, who], k) => (
                  <li key={t} className="fit-pop relative flex items-center gap-3 sm:flex-col sm:items-center sm:gap-1.5 sm:text-center" style={{ "--i": k + 3 } as React.CSSProperties}>
                    <span className={`fit-tl-dot relative z-[1] grid h-10 w-10 shrink-0 place-items-center rounded-full ${who === "ai" ? "fit-tl-dot--ai" : who === "tu" ? "fit-tl-dot--tu" : ""}`}>
                      <Icon name={ic} className="h-4 w-4" strokeWidth={2.2} />
                      <span className="fit-tl-n">{k + 1}</span>
                    </span>
                    <span className="text-[0.8125rem] font-bold leading-tight text-white sm:text-[0.75rem]">{t}</span>
                    <span className={`ml-auto rounded px-1.5 py-0.5 text-[0.5625rem] font-bold uppercase tracking-wider sm:ml-0 ${who === "ai" ? "bg-fit-300 text-black" : who === "tu" ? "border border-white/30 text-white/85" : "text-white/50"}`}>{who === "ai" ? "AI" : who === "tu" ? "Tu" : "Campagna"}</span>
                  </li>
                ))}
              </ol>
            </Reveal>
            <Reveal y={0} blur={0} className="mt-6">
              <Link href="#contatti" className="fit-btn fit-btn--pulse">
                <Icon name="calendar" className="h-5 w-5" strokeWidth={2.2} /> Voglio la segretaria AI
              </Link>
            </Reveal>
          </div>
          <Reveal from="right" blur={0} className="mx-auto w-full max-w-[21rem]">
            <AiChat chat={fit.chat} bot="Segretaria AI" />
          </Reveal>
        </div>
      </section>

      <Sep />

      {/* CRM */}
      <section aria-labelledby="fit-crm" className="fit-bg-rays relative isolate overflow-hidden py-20 lg:py-28">
        <div className="fit-squares" aria-hidden="true" />
        <div className="container-x relative grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]">
          <Reveal y={0} blur={0} className="order-2 lg:order-1">
            <FitCrm />
          </Reveal>
          <div className="order-1 lg:order-2">
            <Reveal y={12} blur={0}>
              <Kicker>Il CRM per la tua palestra</Kicker>
              <Title id="fit-crm">Tutti i tuoi contatti <G>in un posto solo</G>.</Title>
              <p className="mt-5 max-w-xl text-[1.0625rem] text-white/70">Il CRM è l&apos;archivio intelligente dei tuoi clienti: ogni persona che ti scrive finisce lì, con nome, provenienza e a che punto è. Così sai sempre chi richiamare, chi ha fatto la prova e chi si è iscritto.</p>
            </Reveal>
            <Reveal y={0} blur={0} className="mt-7">
              <ul className="grid gap-2.5 sm:grid-cols-2">
                {([
                  ["phone", "Nessun contatto dimenticato", "Ogni richiesta ha un promemoria: nessuno resta senza risposta."],
                  ["calendar", "Prove e appuntamenti in ordine", "Vedi chi viene a provare e quando, giorno per giorno."],
                  ["refresh", "Rinnovi e abbonamenti", "Avvisi automatici prima della scadenza: meno abbandoni."],
                  ["chart", "Sai cosa funziona", "Da quale campagna arriva ogni iscritto e quanto ti costa."],
                ] as const).map(([ic, t, d], i) => (
                  <li key={t} className="fit-pop fit-card rounded-xl p-4" style={{ "--i": i } as React.CSSProperties}>
                    <span className="flex items-center gap-2.5"><span className="fit-ico grid h-9 w-9 shrink-0 place-items-center rounded-lg"><Icon name={ic} className="h-4 w-4" strokeWidth={2.2} /></span><span className="text-[0.9375rem] font-bold text-white">{t}</span></span>
                    <span className="mt-2 block text-[0.8125rem] leading-snug text-white/65">{d}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal y={0} blur={0} className="mt-7">
              <Link href="#contatti" className="fit-btn fit-btn--pulse">
                <Icon name="calendar" className="h-5 w-5" strokeWidth={2.2} /> Voglio il CRM per la mia palestra
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      <Sep />

      {/* RIPRESE */}
      <section aria-labelledby="fit-shoot" className="fit-bg-aurora2 fit-shoots-sec relative isolate overflow-hidden">
        <div className="container-x">
          <Reveal y={12} blur={0}>
            <FitShoots
              heading={
                <>
                  <Kicker>Le riprese</Kicker>
                  <Title id="fit-shoot" className="!text-[clamp(1.75rem,1.2rem+2vw,2.75rem)]">Veniamo noi in palestra <G>o registri tu</G>: decidi tu.</Title>
                </>
              }
            />
          </Reveal>
        </div>
      </section>

      <Sep />

      {/* CASI STUDIO */}
      <section id="risultati" aria-labelledby="fit-cases" className="fit-bg-glow relative isolate scroll-mt-16 overflow-hidden py-20 lg:py-28">
        <div className="fit-squares" aria-hidden="true" />
        <div className="container-x relative">
          <Reveal y={12} blur={0} className="max-w-3xl">
            <Kicker>Casi studio fitness</Kicker>
            <Title id="fit-cases">Palestre vere, <G>numeri veri</G>.</Title>
            <p className="mt-4 max-w-2xl text-[1.0625rem] text-white/70">Solo progetti nel mondo fitness e wellness. Apri ogni caso per vedere la sfida, cosa abbiamo fatto e i risultati.</p>
          </Reveal>
          <Reveal y={0} blur={0} className="mt-10">
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {cases.map((c, i) => (
                <li key={c.id} className="fit-pop" style={{ "--i": i } as React.CSSProperties}><CaseCard item={c} /></li>
              ))}
              <li className="fit-pop" style={{ "--i": cases.length } as React.CSSProperties}>
                <Link href="#contatti" className="fit-answer fit-next group relative flex h-full min-h-[16rem] flex-col justify-between overflow-hidden rounded-[1.25rem] p-6">
                  <span className="text-[0.75rem] font-bold uppercase tracking-[0.2em] text-fit-300">Il prossimo caso studio</span>
                  <span className="fit-h text-[2rem] leading-[1] text-white">Potrebbe essere <G>la tua palestra</G>.</span>
                  <span className="fit-btn fit-btn--sm fit-btn--pulse w-fit">Prenota la call <Icon name="arrow-right" className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={2.6} /></span>
                </Link>
              </li>
            </ul>
          </Reveal>
        </div>
      </section>

      <Sep />

      {/* RECENSIONI */}
      <div className="fit-bg-glow fit-reviews">
        <Reviews />
      </div>

      <Sep />

      {/* FAQ */}
      <section aria-labelledby="fit-faq" className="fit-bg-dots relative isolate overflow-hidden py-16 lg:py-20">
        <div className="container-x">
          <Reveal y={12} blur={0} className="mb-8 text-center">
            <Kicker>Domande frequenti</Kicker>
            <Title id="fit-faq" className="text-[clamp(1.75rem,1.3rem+1.8vw,2.75rem)]">Le domande <G>che ci fanno</G>.</Title>
          </Reveal>
          <Reveal y={12} blur={0}><FitFaq /></Reveal>
          <CtaRow text="Hai un'altra domanda? Parliamone in call, è gratuita." />
        </div>
      </section>

      <Sep />

      {/* CONTATTI */}
      <div className="fit-band">
        <Contact />
      </div>

      <footer className="border-t border-fit-300/15 bg-black py-8">
        <div className="container-x flex flex-wrap items-center justify-between gap-4 text-[0.8125rem] text-white/50">
          <span>© {new Date().getFullYear()} Triskell Agency · Fitness. Un ramo di Triskell Ecosystem.</span>
          <span className="flex items-center gap-4">
            <a href={wa} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-fit-300"><SocialIcon id="whatsapp" className="h-4 w-4" /> Scrivici su WhatsApp</a>
            <Link href="/privacy" className="hover:text-fit-300">Privacy</Link>
          </span>
        </div>
      </footer>
    </div>
  );
}
