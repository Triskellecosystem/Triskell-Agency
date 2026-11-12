import Link from "next/link";
import { site } from "@/content/site";
import { Icon } from "@/components/ui/Icon";
import { Scarcity } from "@/components/ui/Scarcity";
import { Section } from "@/components/ui/Section";
import { SectionGlow } from "@/components/ui/SectionGlow";
import { Reveal } from "@/components/motion/Reveal";

/** Chiusura della pagina social: la frase forte su due righe e, sotto, un pannello luminoso con il pulsante, l'avviso e i vantaggi. */
export function SocialFinale() {
  const f = site.social.finale;
  return (
    <Section id="pensiamo-noi" labelledBy="finale-title" className="overflow-hidden text-center">
      <SectionGlow floor />
      <Reveal y={20} blur={6}>
        <h2 id="finale-title" className="mx-auto max-w-4xl font-display text-[clamp(2rem,1.3rem+2.8vw,3.75rem)] font-bold leading-[1.04] tracking-[-0.045em] text-fg">
          {f.title.split(/(\[[^\]]+\])/).filter(Boolean).map((part) =>
            part.startsWith("[") ? (
              <span key={part} className="block text-gold">{part.slice(1, -1)}</span>
            ) : (
              <span key={part} className="block">{part.trim()}</span>
            ),
          )}
        </h2>
      </Reveal>
      <Reveal delay={0.15} y={14} blur={0}>
        <p className="mx-auto mt-5 max-w-xl text-lead text-fg-2">{f.text}</p>
      </Reveal>
      <Reveal delay={0.25} y={20} blur={0} className="mt-10">
        <div className="cta-soft mx-auto flex max-w-3xl flex-col items-center gap-4 rounded-[1.75rem] px-6 py-7">
          <Link href="/contatti" className="cta-btn group inline-flex items-center gap-3 rounded-full bg-[image:var(--gradient-gold-btn)] py-3.5 pl-7 pr-3 font-display text-[1.1875rem] font-bold text-night">
            <Icon name="calendar" className="h-5 w-5" strokeWidth={2.2} />
            Prenota la call gratuita
            <span className="grid h-10 w-10 place-items-center rounded-full bg-night text-gold-200"><Icon name="arrow-right" className="cta-arrow h-5 w-5" strokeWidth={2.4} /></span>
          </Link>
          <Scarcity />
          <ul className="flex flex-wrap justify-center gap-x-5 gap-y-1">
            {site.cta.perks.map((p) => (
              <li key={p.label} className="inline-flex items-center gap-1.5 text-[0.875rem] font-medium text-fg-2">
                <Icon name={p.icon} className="h-4 w-4 text-gold-300" strokeWidth={2.2} />
                {p.label}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </Section>
  );
}
