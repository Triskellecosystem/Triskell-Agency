import { site } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { GoldText } from "@/components/ui/GoldText";
import { Section } from "@/components/ui/Section";
import { TechBackdrop } from "@/components/ui/TechBackdrop";
import { Reveal } from "@/components/motion/Reveal";

/** Chiusura della pagina social: la frase forte, i verbi di quello che facciamo noi che si accendono a turno, il pulsante. */
export function SocialFinale() {
  const f = site.social.finale;
  return (
    <Section id="pensiamo-noi" labelledBy="finale-title" className="overflow-hidden text-center">
      <TechBackdrop tone="gold" cursor rich />
      <Reveal y={20} blur={6}>
        <h2 id="finale-title" className="mx-auto max-w-4xl font-display text-[clamp(2.25rem,1.4rem+3.6vw,4.5rem)] font-bold leading-[1.02] tracking-[-0.045em] text-fg">
          <GoldText text={f.title} />
        </h2>
      </Reveal>
      <ul aria-label="Cosa facciamo noi" className="mx-auto mt-8 flex max-w-4xl flex-wrap justify-center gap-2.5">
        {f.words.map((w, i) => (
          <li key={w} className="sf-word rounded-full border border-line-strong px-4 py-2 font-display text-[1rem] font-semibold text-fg-2 sm:text-[1.125rem]" style={{ "--i": i } as React.CSSProperties}>
            {w}
          </li>
        ))}
      </ul>
      <Reveal delay={0.2} y={14} blur={0}>
        <p className="mx-auto mt-7 max-w-2xl text-lead text-fg-2">{f.text}</p>
        <div className="mt-9 flex justify-center">
          <Button href="/contatti" size="xl" icon="calendar" iconPosition="start" pulse>
            Prenota la call gratuita
          </Button>
        </div>
      </Reveal>
    </Section>
  );
}
