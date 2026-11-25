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
import { fit } from "@/components/fitness/data";

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
      <section aria-labelledby="fit-title" className="fit-hero relative isolate overflow-hidden pb-20 pt-28 sm:pt-32 lg:pb-28">
        <FitGrid />
        <span aria-hidden="true" className="fit-hero-glow" />
        <div className="container-x relative grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <Reveal y={12} blur={0}><Kicker>Per palestre e centri fitness</Kicker></Reveal>
            <Reveal y={18} blur={6} delay={0.1}>
              <h1 id="fit-title" className="fit-h mt-5 text-[clamp(2.75rem,1.6rem+5vw,5.75rem)] leading-[0.9] text-white">
                Hai una palestra?<br />Vuoi <G>più iscritti</G>?
              </h1>
            </Reveal>
            <Reveal y={12} blur={0} delay={0.2}>
              <p className="mt-6 max-w-xl text-[clamp(1rem,0.9rem+0.4vw,1.25rem)] leading-relaxed text-white/75">
                Siamo la soluzione al tuo caso: <strong className="text-white">social, campagne e automazioni pensati solo per il fitness</strong>, con risultati misurati su palestre vere.
              </p>
            </Reveal>
            <Reveal y={12} blur={0} delay={0.3} className="mt-8 flex flex-wrap gap-3">
              <Link href="#contatti" className="fit-btn">
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

          <Reveal from="scale" blur={0} className="relative mx-auto w-full max-w-[30rem]">
            <div className="fit-emblem relative aspect-square">
              <span aria-hidden="true" className="fit-ring fit-ring--a" />
              <span aria-hidden="true" className="fit-ring fit-ring--b" />
              <Image src="/fitness/logo.webp" alt="Triskell Agency Fitness" fill sizes="30rem" className="fit-logo object-contain mix-blend-screen" priority />
            </div>
            <div className="fit-chip fit-chip--1"><span className="fit-num text-[1.5rem]">30–60</span><span>lead al mese</span></div>
            <div className="fit-chip fit-chip--2"><span className="fit-num text-[1.5rem]">~1 su 3</span><span>prenota la prova</span></div>
            <div className="fit-chip fit-chip--3"><span className="fit-num text-[1.5rem]">500+</span><span>contatti in un anno</span></div>
          </Reveal>
        </div>
      </section>

      {/* striscia di parole */}
      <div aria-hidden="true" className="fit-strip overflow-hidden py-3">
        <div className="fit-strip-track flex w-max gap-8">
          {[0, 1].map((k) => (
            <span key={k} className="flex gap-8">
              {["Più iscritti", "Campagne ADV", "Reel che convertono", "Riprese in palestra", "Irelia AI", "CRM", "Prove gratuite", "Risultati misurati"].map((w) => (
                <span key={w + k} className="fit-h flex items-center gap-8 whitespace-nowrap text-[1.125rem] text-black">{w}<span className="h-2.5 w-2.5 rotate-45 bg-black" /></span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* LA DOMANDA */}
      <section aria-labelledby="fit-pains" className="relative isolate overflow-hidden py-20 lg:py-28">
        <div className="fit-squares" aria-hidden="true" />
        <div className="container-x relative">
          <Reveal y={12} blur={0} className="max-w-3xl">
            <Kicker>Ti riconosci?</Kicker>
            <Title id="fit-pains">La palestra va bene, <G>ma potrebbe andare molto meglio</G>.</Title>
          </Reveal>
          <Reveal y={0} blur={0} className="mt-10">
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {fit.pains.map((p, i) => (
                <li key={p.title} className="fit-pop fit-card group rounded-2xl p-5" style={{ "--i": i } as React.CSSProperties}>
                  <span className="fit-ico grid h-11 w-11 place-items-center rounded-lg"><Icon name={p.icon} className="h-5 w-5" strokeWidth={2} /></span>
                  <p className="mt-4 text-[1.0625rem] font-bold text-white">{p.title}</p>
                  <p className="mt-1.5 text-[0.9375rem] leading-snug text-white/65">{p.text}</p>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal y={16} blur={0} className="fit-answer relative mt-12 overflow-hidden rounded-3xl p-8 text-center sm:p-12">
            <FitGrid cell={40} density={0.06} />
            <p className="relative text-[0.8125rem] font-bold uppercase tracking-[0.22em] text-fit-300">Noi rispondiamo a una domanda sola</p>
            <p className="fit-h relative mx-auto mt-4 max-w-4xl text-[clamp(1.75rem,1.2rem+2.4vw,3.25rem)] leading-[1.02] text-white">
              «Come porto <G>nuovi iscritti</G> in palestra, <G>ogni mese</G>?»
            </p>
          </Reveal>
        </div>
      </section>

      {/* NUMERI */}
      <section aria-labelledby="fit-numbers" className="fit-band relative isolate overflow-hidden py-20 lg:py-24">
        <div className="container-x">
          <Reveal y={12} blur={0} className="text-center">
            <Kicker>I numeri delle palestre che seguiamo</Kicker>
            <Title id="fit-numbers" className="mx-auto max-w-3xl">Ecco cosa possiamo <G>portarti</G>.</Title>
          </Reveal>
          <Reveal y={0} blur={0} className="mt-12">
            <ul className="grid grid-cols-2 gap-3 lg:grid-cols-4">
              {fit.numbers.map((n, i) => (
                <li key={n.label} className="fit-pop fit-stat relative flex aspect-square flex-col justify-between overflow-hidden rounded-2xl p-5 sm:p-7" style={{ "--i": i } as React.CSSProperties}>
                  <span className="font-mono text-[0.6875rem] font-bold text-fit-300/70">0{i + 1}</span>
                  <span>
                    <CountUp value={n.value} prefix={n.prefix} suffix={n.suffix} className="fit-num block whitespace-nowrap text-[clamp(2rem,1.2rem+2.8vw,3.75rem)] leading-none" duration={1.4} />
                    <span className="mt-2 block text-[1rem] font-bold text-white sm:text-[1.125rem]">{n.label}</span>
                    <span className="mt-1 block text-[0.75rem] text-white/50">{n.note}</span>
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* METODO */}
      <section aria-labelledby="fit-metodo" className="relative isolate overflow-hidden py-20 lg:py-28">
        <div className="fit-squares" aria-hidden="true" />
        <div className="container-x relative">
          <Reveal y={12} blur={0} className="text-center">
            <Kicker>Metodo Triskell Fitness</Kicker>
            <Title id="fit-metodo" className="mx-auto max-w-4xl">Social + Campagne = <G>più iscritti</G></Title>
            <p className="mx-auto mt-4 max-w-2xl text-[1.0625rem] text-white/70">Il profilo dà fiducia, le campagne portano persone, Irelia AI non ne perde nessuna. Un solo team per tutto.</p>
          </Reveal>
          <Reveal y={0} blur={0} className="mt-12">
            <div className="fit-eq grid items-stretch gap-3 lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1.15fr]">
              {[
                { icon: "smartphone", t: "Social", p: "Reel e post che mostrano la tua palestra" },
                { icon: "target", t: "Campagne", p: "Meta e Google Ads sulla tua zona" },
                { icon: "bot", t: "Irelia AI", p: "Risponde a ogni contatto in pochi secondi" },
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
          <Reveal y={12} blur={0} className="mt-14">
            <p className="mb-4 text-center text-[0.8125rem] font-bold uppercase tracking-[0.22em] text-white/60">Da un contenuto a un nuovo iscritto</p>
            <FitFunnel />
          </Reveal>
        </div>
      </section>

      {/* PROFILO */}
      <section aria-labelledby="fit-feed" className="fit-band relative isolate overflow-hidden py-20 lg:py-28">
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
          </Reveal>
          <Reveal y={0} blur={0} className="mx-auto w-full max-w-[22rem]">
            <div className="fit-device rounded-[2.4rem] p-2.5">
              <div className="overflow-hidden rounded-[1.9rem] bg-black">
                <div className="flex items-center gap-3 px-4 pb-3 pt-5">
                  <Image src="/fitness/mark.webp" alt="" width={56} height={53} className="h-14 w-14 rounded-full border-2 border-fit-300 bg-black object-contain p-1 mix-blend-screen" />
                  <div className="grid flex-1 grid-cols-3 text-center text-white">
                    {[["312", "post"], ["14,8k", "follower"], ["52", "seguiti"]].map(([v, l]) => (
                      <span key={l}><span className="block text-[0.9375rem] font-bold">{v}</span><span className="text-[0.6875rem] text-white/60">{l}</span></span>
                    ))}
                  </div>
                </div>
                <div className="px-4 text-[0.75rem] leading-snug text-white/80">
                  <p className="font-bold text-white">La tua palestra</p>
                  <p>Allenamento, risultati, community 💪</p>
                  <p className="text-fit-300">Prenota la prova gratuita ↓</p>
                </div>
                <div className="mt-3 flex justify-between px-4">
                  {[["chart", "Risultati"], ["dumbbell", "Corsi"], ["play", "Video"], ["users", "Clienti"], ["calendar", "Prova"]].map(([ic, l]) => (
                    <span key={l} className="flex flex-col items-center gap-1 text-[0.5625rem] text-white/70">
                      <span className="grid h-10 w-10 place-items-center rounded-full border border-fit-300/70 text-fit-300"><Icon name={ic as "chart"} className="h-4 w-4" strokeWidth={2} /></span>{l}
                    </span>
                  ))}
                </div>
                <ul className="fit-feed mt-3 grid grid-cols-3 gap-0.5">
                  {Array.from({ length: 9 }, (_, i) => (
                    <li key={i} className="fit-tile relative aspect-square overflow-hidden" style={{ "--i": i } as React.CSSProperties}>
                      <Image src={`/fitness/post-${i}.webp`} alt="" fill sizes="7rem" className="object-cover" />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* PACCHETTI */}
      <section id="pacchetti" aria-labelledby="fit-pack" className="relative isolate overflow-hidden py-20 lg:py-28">
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

      {/* RIPRESE */}
      <section aria-labelledby="fit-shoot" className="fit-band relative isolate overflow-hidden py-20 lg:py-28">
        <div className="container-x">
          <Reveal y={12} blur={0} className="mb-10 max-w-3xl">
            <Kicker>Le riprese</Kicker>
            <Title id="fit-shoot">Veniamo noi in palestra <G>o registri tu</G>: decidi tu.</Title>
          </Reveal>
          <Reveal y={12} blur={0}>
            <FitShoots />
          </Reveal>
        </div>
      </section>

      {/* CASI STUDIO */}
      <section id="risultati" aria-labelledby="fit-cases" className="relative isolate scroll-mt-16 overflow-hidden py-20 lg:py-28">
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
                <Link href="#contatti" className="fit-answer group relative flex h-full min-h-[16rem] flex-col justify-between overflow-hidden rounded-[1.25rem] p-6">
                  <span className="text-[0.75rem] font-bold uppercase tracking-[0.2em] text-fit-300">Il prossimo caso studio</span>
                  <span className="fit-h text-[2rem] leading-[1] text-white">Potrebbe essere <G>la tua palestra</G>.</span>
                  <span className="fit-btn fit-btn--sm w-fit">Prenota la call <Icon name="arrow-right" className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={2.6} /></span>
                </Link>
              </li>
            </ul>
          </Reveal>
        </div>
      </section>

      {/* RECENSIONI */}
      <div className="fit-band">
        <Reviews />
      </div>

      {/* FAQ */}
      <section aria-labelledby="fit-faq" className="relative isolate overflow-hidden py-20 lg:py-24">
        <div className="container-x">
          <Reveal y={12} blur={0} className="mb-10 text-center">
            <Kicker>Domande frequenti</Kicker>
            <Title id="fit-faq">Le domande che <G>ci fanno le palestre</G>.</Title>
          </Reveal>
          <Reveal y={12} blur={0}><FitFaq /></Reveal>
        </div>
      </section>

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
