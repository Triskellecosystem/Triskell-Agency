import type { Metadata } from "next";
import Link from "next/link";
import { BaseConsigliata } from "@/components/sections/BaseConsigliata";
import { Contact } from "@/components/sections/Contact";
import { CtaBand } from "@/components/sections/CtaBand";
import { MetodoFormula } from "@/components/sections/MetodoFormula";
import { PhoneProfile } from "@/components/sections/PhoneProfile";
import { Rodaggio } from "@/components/sections/Rodaggio";
import { SupportBand } from "@/components/sections/SupportBand";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Section, SectionHeading } from "@/components/ui/Section";
import { TechBackdrop } from "@/components/ui/TechBackdrop";
import { DigitalCursor } from "@/components/motion/DigitalCursor";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { demoProfiles } from "@/content/demo-profiles";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Il Metodo Triskell",
  description: "Social + campagne (+ sito, se serve): la combinazione che fa crescere il profilo e porta clienti. Collaborazioni da minimo 6 mesi, tutto su misura.",
  alternates: { canonical: "/metodo-triskell" },
};

export default function MetodoPage() {
  const m = site.metodo;
  const links = [
    { icon: "smartphone", title: "Gestione social", href: "/social" },
    { icon: "monitor", title: "Siti web", href: "/siti-web" },
    { icon: "trending", title: "Risultati", href: "/risultati" },
  ] as const;
  return (
    <>
      <section aria-labelledby="metodo-title" className="relative isolate overflow-hidden pb-[clamp(2.5rem,5vw,4rem)] pt-[calc(var(--header-h)+clamp(2rem,5vh,3.5rem))]">
        <div aria-hidden="true" className="ah-bg absolute inset-0 -z-10">
          <span className="ah-aurora ah-aurora--a" />
          <span className="ah-aurora ah-aurora--b" />
          <span className="ah-dots" />
        </div>
        <DigitalCursor className="-z-10" />
        <div className="container-x grid items-center gap-x-12 gap-y-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <div>
            <p className="animate-[fade-in_0.8s_var(--ease-soft)_both] text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-fg-3">{m.overline}</p>
            <h1 id="metodo-title" className="mt-3 animate-[line-up_1s_var(--ease-out-expo)_backwards] font-display text-[clamp(2.75rem,1.8rem+3.8vw,5rem)] font-bold leading-[0.95] tracking-[-0.045em] text-fg">
              Metodo <span className="text-gold">Triskell</span>
            </h1>
            <p className="mt-3 font-display text-[clamp(1.25rem,1rem+1vw,1.75rem)] font-semibold tracking-[-0.02em] text-fg-2">
              Social <span className="text-gold-300">+</span> Campagne
            </p>
            <p className="mt-4 max-w-md text-[0.9375rem] leading-relaxed text-fg-2">{m.line}</p>
            <MetodoFormula className="mt-6" />
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/contatti" size="md" icon="calendar" iconPosition="start" pulse>
                Prenota la call gratuita
              </Button>
              <Button href="#rodaggio" size="md" variant="secondary" icon="arrow-down">
                Come funziona
              </Button>
            </div>
          </div>
          <div className="relative">
            <span aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgb(58_164_212/0.2),rgb(247_200_92/0.08)_45%,transparent_70%)] blur-2xl" />
            <PhoneProfile profile={demoProfiles[1]!} campaign />
          </div>
        </div>
      </section>

      <Section id="numeri-metodo" labelledBy="numeri-metodo-title" className="py-[clamp(2rem,1.4rem+2vw,3.25rem)]">
        <h2 id="numeri-metodo-title" className="sr-only">
          Il metodo in tre numeri
        </h2>
        <RevealGroup className="grid gap-3 sm:grid-cols-3" stagger={0.1}>
          {m.facts.map((f) => (
            <RevealItem key={f.label} y={14}>
              <div className="rounded-[1.125rem] border border-white/[0.08] bg-white/[0.02] p-5 text-center">
                <p className="font-display text-[2.5rem] font-bold leading-none tracking-[-0.05em] text-gold">
                  {f.value}
                  <span className="ml-1.5 text-[0.9375rem] font-semibold tracking-normal text-fg">{f.unit}</span>
                </p>
                <p className="mt-1.5 text-[0.75rem] text-fg-3">{f.label}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <Section id="rodaggio" labelledBy="rodaggio-title" className="py-[clamp(2.5rem,1.6rem+2.6vw,4rem)]">
        <TechBackdrop tone="azure" rich />
        <SectionHeading id="rodaggio-title" overline={m.rodaggio.overline} title={m.rodaggio.title} line="Struttura, messa in moto, risultati. Con meno tempo i risultati restano troppo relativi." />
        <div className="mt-8">
          <Rodaggio />
        </div>
      </Section>

      <Section id="base" labelledBy="base-title" className="py-[clamp(2.5rem,1.6rem+2.6vw,4rem)]">
        <SectionHeading id="base-title" overline={m.base.overline} title={m.base.title} line="Ogni attività è un caso a sé. Ma c'è una base che consigliamo sempre." />
        <div className="mt-8 space-y-4">
          <BaseConsigliata />
          <SupportBand />
        </div>
        <Reveal y={14} blur={0} className="mt-8 flex flex-wrap items-center gap-2">
          <span className="mr-1 text-[0.75rem] font-semibold uppercase tracking-[0.16em] text-fg-3">Approfondisci</span>
          {links.map((l) => (
            <Link key={l.title} href={l.href} className="group/l inline-flex items-center gap-2 rounded-full border border-white/10 py-1.5 pl-1.5 pr-3 text-[0.8125rem] font-semibold text-fg transition-colors hover:border-gold-300/60">
              <span className="grid h-6 w-6 place-items-center rounded-full bg-gold-300/10 text-gold-300">
                <Icon name={l.icon} className="h-3.5 w-3.5" strokeWidth={2} />
              </span>
              {l.title}
              <Icon name="arrow-right" className="h-3.5 w-3.5 text-gold-300 transition-transform group-hover/l:translate-x-0.5" />
            </Link>
          ))}
        </Reveal>
      </Section>

      <CtaBand content={site.cta.agency} />
      <Contact />
    </>
  );
}
