import { SectionBg, type BgKind } from "@/components/ui/SectionBg";
import { site } from "@/content/site";
import { LogoMark } from "@/components/brand/LogoMark";
import { BeamCard } from "@/components/ui/BeamCard";
import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { Reveal } from "@/components/motion/Reveal";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { ContactForm } from "./ContactForm";

/**
 * CTA finale + form: un unico pannello largo con bordo beam; a sinistra messaggio e vantaggi
 * (consulenza gratuita · 30 minuti · piano su misura, come nella grafica), a destra il form.
 */
export function Contact({ bg = "dots" }: { bg?: BgKind } = {}) {
  const { contact } = site;
  return (
    <Section id={contact.id} labelledBy="contact-title" className="pb-[clamp(3.5rem,3rem+3vw,6rem)]">
      <SectionBg kind={bg} />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[image:var(--gradient-bg-cta)]" />
      <Reveal y={30} blur={4}>
        <BeamCard className="relative mx-auto max-w-5xl">
          <div className="relative grid gap-10 overflow-hidden rounded-[inherit] bg-[linear-gradient(135deg,var(--color-surface-2),var(--color-night-raised)_55%,var(--color-surface))] p-5 sm:p-7 lg:grid-cols-[0.85fr_1.15fr] lg:gap-10 lg:p-9">
            <LogoMark sizes="288px" className="pointer-events-none absolute -bottom-20 -left-16 h-72 w-72 opacity-[0.08]" />

            <div className="relative flex flex-col">
              <SplitReveal id="contact-title" text={contact.title} as="h2" className="text-h2 text-fg" />
              <Reveal delay={0.2} blur={4} y={14}>
                <p className="mt-3 max-w-md text-[0.9375rem] text-fg-2">{contact.line}</p>
              </Reveal>

              <ul className="mt-6 space-y-2.5 lg:mt-auto">
                {contact.perks.map((perk) => (
                  <li key={perk.label} className="flex items-center gap-3 text-[0.875rem] font-medium text-fg">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-gold-300/10 text-gold-300">
                      <Icon name={perk.icon} className="h-4 w-4" strokeWidth={1.8} />
                    </span>
                    {perk.label}
                  </li>
                ))}
              </ul>
              <a
                href={site.brand.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex w-fit items-center gap-2 rounded-full border border-gold-400/50 px-4 py-2 font-display text-[0.875rem] font-semibold text-gold-200 transition-[background-color,border-color,box-shadow] duration-[var(--dur-base)] hover:border-gold-300 hover:bg-gold-300/10 hover:shadow-[0_0_30px_-6px_rgb(247_200_92/0.5)]"
              >
                <SocialIcon id="whatsapp" className="h-5 w-5" />
                WhatsApp · {site.brand.phone}
              </a>
            </div>

            <div className="relative">
              <ContactForm />
            </div>
          </div>
        </BeamCard>
      </Reveal>
    </Section>
  );
}
