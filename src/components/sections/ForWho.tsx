import { site } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Marquee } from "@/components/motion/Marquee";
import { Reveal } from "@/components/motion/Reveal";
import { QuestionStack } from "./QuestionStack";
import { SectionBg } from "@/components/ui/SectionBg";

/**
 * "È per te se ti riconosci": a sinistra il titolo e l'invito, a destra le domande che compaiono una dopo l'altra
 * come messaggi (alternati a sinistra e a destra) e, dopo ognuna, la risposta "Sì" che scatta. Sotto, i settori.
 */
export function ForWho() {
  const f = site.forWho;
  return (
    <Section id="per-chi" labelledBy="per-chi-title" className="overflow-hidden">
      <SectionBg kind="room" tone="gold" view="left" />
      <div className="grid items-center gap-x-14 gap-y-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
        <div>
          <SectionHeading id="per-chi-title" overline={f.overline} title={f.title} line={f.closing} />
          <Reveal y={12} blur={0} delay={0.2} className="mt-6">
            <Button href="/contatti" size="md" icon="calendar" iconPosition="start" pulse>
              Parliamone gratis
            </Button>
          </Reveal>
        </div>

        <Reveal y={20} blur={0}>
          <QuestionStack />
        </Reveal>
      </div>
      <div className="mt-10">
        <Marquee items={f.sectors} label={f.sectorsLabel} />
      </div>
    </Section>
  );
}
