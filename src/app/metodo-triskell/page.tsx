import type { Metadata } from "next";
import Link from "next/link";
import { BaseConsigliata } from "@/components/sections/BaseConsigliata";
import { Contact } from "@/components/sections/Contact";
import { CtaBand } from "@/components/sections/CtaBand";
import { MetodoFormula } from "@/components/sections/MetodoFormula";
import { PageHero } from "@/components/sections/PageHero";
import { Rodaggio } from "@/components/sections/Rodaggio";
import { SupportBand } from "@/components/sections/SupportBand";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Section, SectionHeading } from "@/components/ui/Section";
import { TechBackdrop } from "@/components/ui/TechBackdrop";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Il Metodo Triskell",
  description: "Gestione social + campagne pubblicitarie (+ sito, se serve): la combinazione che fa crescere il profilo e porta clienti. Collaborazioni da minimo 6 mesi, tutto su misura.",
  alternates: { canonical: "/metodo-triskell" },
};

export default function MetodoPage() {
  const m = site.metodo;
  const links = [
    { icon: "smartphone", title: "Gestione social", text: "Come lavoriamo: call, script, riprese, editing e pubblicazione.", href: "/social" },
    { icon: "monitor", title: "Il sito, se serve", text: "Dalla prima call al sito finito, con le revisioni incluse.", href: "/siti-web" },
    { icon: "trending", title: "I risultati", text: "Clienti reali che seguiamo con questo metodo.", href: "/risultati" },
  ] as const;
  return (
    <>
      <PageHero overline={m.overline} title={m.title} line={m.line} crumbs={[{ label: "Metodo Triskell" }]} pulseGold>
        <Button href="/contatti" size="lg" icon="calendar" iconPosition="start" pulse>
          Prenota la call gratuita
        </Button>
        <Button href="#formula" variant="secondary" size="lg" icon="arrow-down">
          Come funziona
        </Button>
      </PageHero>

      <Section id="formula" labelledBy="formula-title" className="pt-[clamp(1rem,2vw,2rem)]">
        <TechBackdrop tone="gold" cursor rich />
        <h2 id="formula-title" className="sr-only">
          La formula del Metodo Triskell
        </h2>
        <MetodoFormula />
      </Section>

      <Section id="perche" labelledBy="perche-title">
        <SectionHeading id="perche-title" overline="Perché funziona" title={m.whyTitle} line="Social e campagne da soli rendono meno. Insieme si danno forza a vicenda." />
        <RevealGroup className="mt-10 grid gap-4 md:grid-cols-2" stagger={0.1} alternate>
          {m.why.map((w, i) => (
            <RevealItem key={w.title} y={20} className="h-full">
              <div className="group/w relative flex h-full gap-5 overflow-hidden rounded-[1.5rem] border border-line bg-[linear-gradient(160deg,var(--color-surface-2),var(--color-night-raised))] p-6 transition-[border-color,box-shadow] duration-[var(--dur-base)] hover:border-gold-300/60 hover:shadow-[0_0_40px_-12px_rgb(247_200_92/0.5)] sm:p-7">
                <span aria-hidden="true" className="pointer-events-none absolute -right-2 -top-5 font-display text-[6rem] font-bold leading-none text-fg/[0.04]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl border border-gold-400/45 bg-gold-300/10 text-gold-300 transition-transform duration-[var(--dur-base)] group-hover/w:scale-110">
                  <Icon name={w.icon} className="h-7 w-7" strokeWidth={1.6} />
                </span>
                <div className="relative">
                  <h3 className="font-display text-[1.25rem] font-bold leading-tight text-fg">{w.title}</h3>
                  <p className="mt-2 text-[1rem] leading-snug text-fg-2">{w.text}</p>
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <Section id="rodaggio" labelledBy="rodaggio-title">
        <TechBackdrop tone="azure" rich />
        <SectionHeading id="rodaggio-title" overline={m.rodaggio.overline} title={m.rodaggio.title} line={m.rodaggio.line} />
        <div className="mt-10">
          <Rodaggio />
        </div>
      </Section>

      <Section id="base" labelledBy="base-title">
        <TechBackdrop tone="gold" rich />
        <SectionHeading id="base-title" overline={m.base.overline} title={m.base.title} line={m.base.line} />
        <div className="mt-10">
          <BaseConsigliata />
        </div>
        <div className="mt-6">
          <SupportBand />
        </div>
      </Section>

      <Section id="approfondisci" labelledBy="approfondisci-title">
        <SectionHeading id="approfondisci-title" overline="Approfondisci" title="Ogni parte del metodo, [nel dettaglio]" align="center" />
        <RevealGroup className="mt-10 grid gap-4 md:grid-cols-3" stagger={0.1}>
          {links.map((l) => (
            <RevealItem key={l.title} y={20} className="h-full">
              <Link href={l.href} className="group/l flex h-full flex-col rounded-[1.5rem] border border-line bg-[linear-gradient(160deg,var(--color-surface-2),var(--color-surface))] p-6 transition-[border-color,transform] duration-[var(--dur-base)] ease-out-expo hover:-translate-y-1 hover:border-gold-300/70">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[image:var(--gradient-gold-btn)] text-night">
                  <Icon name={l.icon} className="h-6 w-6" strokeWidth={1.8} />
                </span>
                <h3 className="mt-5 flex items-center gap-2 font-display text-[1.25rem] font-bold text-fg">
                  {l.title}
                  <Icon name="arrow-right" className="h-4 w-4 text-gold-300 transition-transform duration-[var(--dur-base)] group-hover/l:translate-x-1" />
                </h3>
                <p className="mt-1.5 text-[0.9375rem] leading-snug text-fg-2">{l.text}</p>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <CtaBand content={site.cta.agency} />
      <Contact />
    </>
  );
}
