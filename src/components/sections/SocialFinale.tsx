import { site } from "@/content/site";
import { Button } from "@/components/ui/Button";
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
        <h2 id="finale-title" className="mx-auto max-w-4xl font-display text-[clamp(1.625rem,1.1rem+2.2vw,3rem)] font-bold leading-[1.06] tracking-[-0.045em] text-fg">
          {f.title.split(/(\[[^\]]+\])/).filter(Boolean).map((part) =>
            part.startsWith("[") ? (
              <span key={part} className="block whitespace-nowrap text-gold max-sm:whitespace-normal">
                {part.slice(1, -1)}
              </span>
            ) : (
              <span key={part} className="block">
                {part.trim()}
              </span>
            ),
          )}
        </h2>
      </Reveal>
      <Reveal delay={0.2} y={14} blur={0}>
        <p className="mx-auto mt-5 max-w-xl text-lead text-fg-2">{f.text}</p>
        <div className="mt-7 flex justify-center">
          <Button href="/contatti" size="lg" icon="calendar" iconPosition="start" pulse>
            Prenota la call gratuita
          </Button>
        </div>
      </Reveal>
    </Section>
  );
}
