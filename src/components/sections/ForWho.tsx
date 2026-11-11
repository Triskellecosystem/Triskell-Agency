import { site } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Marquee } from "@/components/motion/Marquee";
import { Reveal } from "@/components/motion/Reveal";
import { QuestionStack } from "./QuestionStack";
import { SectionGlow } from "@/components/ui/SectionGlow";

/**
 * "È per te se ti riconosci": a sinistra il titolo e l'invito, a destra le domande che compaiono una dopo l'altra
 * come messaggi (alternati a sinistra e a destra) e, dopo ognuna, la risposta "Sì" che scatta. Sotto, i settori.
 */
export function ForWho() {
  const f = site.forWho;
  return (
    <Section id="per-chi" labelledBy="per-chi-title" className="z-[2] pb-[clamp(4rem,3rem+3vw,6rem)]">
      <SectionGlow floor alt />
      <div className="grid items-center gap-x-14 gap-y-10 lg:grid-cols-[minmax(0,0.6fr)_minmax(0,1.4fr)]">
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
      {/* i settori stanno a cavallo della linea che separa questa sezione dalla successiva */}
      <div className="absolute inset-x-0 bottom-0 z-10 translate-y-1/2 border-y border-gold-300/20 bg-[rgb(3_20_36/0.92)] py-3 backdrop-blur-md">
        <Marquee items={f.sectors} label={f.sectorsLabel} />
      </div>
    </Section>
  );
}
