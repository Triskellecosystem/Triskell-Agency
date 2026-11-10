import { site } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Section, SectionHeading } from "@/components/ui/Section";
import { TechBackdrop } from "@/components/ui/TechBackdrop";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { MetodoFormula } from "./MetodoFormula";

/**
 * Il Metodo Triskell in home: la formula (social + campagne + sito se serve = più clienti), i quattro motivi per cui
 * funziona, due riquadri chiave (minimo 6 mesi, base consigliata) e i link alla pagina del metodo e alla pagina social.
 */
export function MetodoTeaser() {
  const m = site.metodo;
  const base = m.base.items;
  return (
    <Section id="metodo-triskell" labelledBy="metodo-triskell-title" className="overflow-hidden">
      <TechBackdrop tone="gold" cursor rich />
      <SectionHeading id="metodo-triskell-title" overline={m.overline} title={m.title} line={m.line} align="center" className="max-w-3xl" />

      <MetodoFormula className="mt-12 sm:mt-14" />

      <RevealGroup className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4" stagger={0.09} alternate>
        {m.why.map((w) => (
          <RevealItem key={w.title} y={18} className="h-full">
            <div className="group/why flex h-full flex-col rounded-2xl border border-line bg-night/50 p-5 transition-[border-color,box-shadow] duration-[var(--dur-base)] hover:border-gold-300/60 hover:shadow-[0_0_36px_-12px_rgb(247_200_92/0.5)]">
              <span className="grid h-11 w-11 place-items-center rounded-xl border border-gold-400/45 bg-gold-300/10 text-gold-300 transition-transform duration-[var(--dur-base)] group-hover/why:scale-110">
                <Icon name={w.icon} className="h-5 w-5" strokeWidth={1.7} />
              </span>
              <h3 className="mt-4 font-display text-[1.0625rem] font-bold leading-tight text-fg">{w.title}</h3>
              <p className="mt-1.5 text-[0.875rem] leading-snug text-fg-2">{w.text}</p>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>

      <div className="mt-5 grid gap-3 md:grid-cols-2">
        <Reveal from="left" blur={0} className="h-full">
          <div className="flex h-full items-center gap-5 rounded-2xl border border-gold-400/40 bg-[linear-gradient(135deg,#2b2410,#0a1626_70%)] p-5 sm:p-6">
            <span className="mt-teaser-num font-display text-[3.5rem] font-bold leading-none tracking-[-0.06em] text-gold sm:text-[4.25rem]">6</span>
            <div>
              <p className="text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-gold-300">{m.rodaggio.overline}</p>
              <p className="mt-1 font-display text-[1.125rem] font-bold leading-tight text-fg">Il tempo per creare la struttura, metterla in moto e vedere i risultati.</p>
            </div>
          </div>
        </Reveal>
        <Reveal from="right" blur={0} className="h-full">
          <div className="flex h-full flex-wrap items-center gap-x-6 gap-y-3 rounded-2xl border border-azure-300/35 bg-[linear-gradient(135deg,#0b2a46,#0a1626_70%)] p-5 sm:p-6">
            <p className="w-full text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-azure-300">{m.base.label}</p>
            {base.map((b, i) => (
              <p key={b.unit} className="flex items-baseline gap-2">
                {i > 0 && <span className="mr-2 font-display text-[1.5rem] font-bold text-gold-300">+</span>}
                <span className="font-display text-[2.25rem] font-bold leading-none tracking-[-0.04em] text-gold">
                  {b.prefix}
                  {b.value}
                </span>
                <span className="text-[0.9375rem] font-semibold text-fg">{b.unit}</span>
              </p>
            ))}
          </div>
        </Reveal>
      </div>

      <Reveal className="mt-10 flex flex-wrap justify-center gap-4" y={14} blur={0}>
        <Button href={m.homeCta.href} size="lg" icon="arrow-right" pulse>
          {m.homeCta.label}
        </Button>
        <Button href={m.socialCta.href} size="lg" variant="secondary" icon="smartphone" iconPosition="start">
          {m.socialCta.label}
        </Button>
      </Reveal>
    </Section>
  );
}
