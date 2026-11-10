import { site } from "@/content/site";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Marquee } from "@/components/motion/Marquee";
import { Reveal } from "@/components/motion/Reveal";

/**
 * "È per te se ti riconosci": a sinistra il titolo e l'invito, a destra le domande che compaiono una dopo l'altra
 * come messaggi (alternati a sinistra e a destra) e, dopo ognuna, la risposta "Sì" che scatta. Sotto, i settori.
 */
export function ForWho() {
  const f = site.forWho;
  return (
    <Section id="per-chi" labelledBy="per-chi-title" className="overflow-hidden">
      <div className="grid items-center gap-x-14 gap-y-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
        <div>
          <SectionHeading id="per-chi-title" overline={f.overline} title={f.title} line={f.closing} />
          <Reveal y={12} blur={0} delay={0.2} className="mt-6">
            <Button href="/contatti" size="md" icon="calendar" iconPosition="start">
              Parliamone gratis
            </Button>
          </Reveal>
        </div>

        <Reveal y={0} blur={0}>
          <ul className="fq space-y-2.5">
            {f.items.map((it, i) => {
              const right = i % 2 === 1;
              return (
                <li key={it.title} className={cn("fq-row flex items-center gap-2", right ? "justify-end" : "justify-start")} style={{ "--i": i } as React.CSSProperties}>
                  <span className={cn("fq-q inline-flex items-center gap-2.5 rounded-2xl border px-4 py-2.5 font-display text-[clamp(0.9375rem,0.85rem+0.5vw,1.1875rem)] font-semibold tracking-[-0.01em] text-fg", right ? "rounded-br-md border-gold-300/30 bg-gold-300/[0.06]" : "rounded-bl-md border-azure-300/30 bg-azure-300/[0.07]")}>
                    <Icon name={it.icon} className={cn("h-4 w-4 shrink-0", right ? "text-gold-300" : "text-azure-300")} strokeWidth={2} />
                    {it.title}
                  </span>
                  <span className="fq-a grid h-7 shrink-0 place-items-center rounded-full bg-lime-300 px-2.5 text-[0.6875rem] font-bold text-night">{f.answer}</span>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
      <div className="mt-10">
        <Marquee items={f.sectors} label={f.sectorsLabel} />
      </div>
    </Section>
  );
}
