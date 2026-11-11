import { SectionGlow } from "@/components/ui/SectionGlow";
import type { BgKind } from "@/components/ui/SectionBg";
import { site } from "@/content/site";
import { LogoMark } from "@/components/brand/LogoMark";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { Reveal } from "@/components/motion/Reveal";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { ContactForm } from "./ContactForm";

const FEATS: Array<{ icon: IconName; title: string; text: string }> = [
  { icon: "zap", title: "Risposta rapida", text: "Ti contattiamo entro 24 ore" },
  { icon: "handshake", title: "Consulenza su misura", text: "Soluzioni pensate per i tuoi obiettivi" },
  { icon: "award", title: "Nessun impegno", text: "Parliamone in totale libertà" },
];

/**
 * Contatti: a sinistra il titolo, la riga e tre vantaggi con icone dorate (e il triskell in trasparenza sul bordo),
 * a destra il modulo in un pannello di vetro con il bordo luminoso.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function Contact({ bg }: { bg?: BgKind } = {}) {
  const { contact } = site;
  return (
    <Section id={contact.id} labelledBy="contact-title" className="overflow-hidden pb-[clamp(3.5rem,3rem+3vw,6rem)]">
      <SectionGlow floor />
      <LogoMark sizes="420px" className="pointer-events-none absolute -left-60 top-1/2 h-[26rem] w-[26rem] -translate-y-1/2 opacity-20 max-lg:hidden" />
      <div className="relative grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
        <div className="relative lg:pl-10">
          <SplitReveal id="contact-title" text={contact.title} as="h2" className="text-[clamp(2.25rem,1.6rem+2.6vw,3.75rem)] font-bold leading-[1.02] tracking-[-0.035em] text-fg" />
          <Reveal delay={0.2} blur={4} y={14}>
            <p className="mt-4 max-w-md text-[1.0625rem] leading-relaxed text-fg-2">{contact.line}</p>
          </Reveal>
          <ul className="mt-8 space-y-5">
            {FEATS.map((f) => (
              <li key={f.title} className="ct-feat flex items-center gap-4 pb-5">
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl border border-gold-300/60 bg-[linear-gradient(160deg,rgb(247_200_92/0.14),rgb(5_26_52/0.8))] text-gold-300 shadow-[0_0_24px_-6px_rgb(247_200_92/0.6)]">
                  <Icon name={f.icon} className="h-6 w-6" strokeWidth={1.7} />
                </span>
                <span>
                  <span className="block font-display text-[1.25rem] font-semibold italic text-fg">{f.title}</span>
                  <span className="block text-[0.875rem] text-fg-2">{f.text}</span>
                </span>
              </li>
            ))}
          </ul>
          <a href={site.brand.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex w-fit items-center gap-2 rounded-full border border-gold-400/50 px-4 py-2 font-display text-[0.875rem] font-semibold text-gold-200 transition-[background-color,border-color] hover:border-gold-300 hover:bg-gold-300/10">
            <SocialIcon id="whatsapp" className="h-5 w-5" />
            WhatsApp · {site.brand.phone}
          </a>
        </div>
        <Reveal y={30} blur={4}>
          <div className="ct-form relative rounded-[1.75rem] p-5 sm:p-8">
            <ContactForm />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
