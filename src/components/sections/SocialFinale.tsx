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
        <h2 id="finale-title" className="mx-auto max-w-3xl font-display text-[clamp(1.75rem,1.2rem+2.2vw,3rem)] font-bold leading-[1.06] tracking-[-0.045em] text-fg">
          <GoldText text={f.title} />
        </h2>
      </Reveal>
      <ul aria-label="Cosa facciamo noi" className="mx-auto mt-6 flex max-w-3xl flex-wrap justify-center gap-2">
        {f.words.map((w, i) => (
          <li key={w} className="sf-word rounded-full border border-line-strong px-3.5 py-1.5 font-display text-[0.875rem] font-semibold text-fg-2" style={{ "--i": i } as React.CSSProperties}>
            {w}
          </li>
        ))}
      </ul>
      <Reveal delay={0.2} y={14} blur={0}>
        <p className="mx-auto mt-5 max-w-xl text-lead text-fg-2">{f.text}</p>
        <div className="mt-7 flex justify-center">
          <Button href="/contatti" size="md" icon="calendar" iconPosition="start" pulse>
            Prenota la call gratuita
          </Button>
        </div>
      </Reveal>
    </Section>
  );
}
