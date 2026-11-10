import { site } from "@/content/site";
import { Icon } from "@/components/ui/Icon";
import { Section, SectionHeading } from "@/components/ui/Section";
import { TechBackdrop } from "@/components/ui/TechBackdrop";
import { ScrollSlide } from "@/components/motion/ScrollSlide";

/** "Come lavoriamo" (nella pagina Chi siamo): quattro passi, dalla prima call ai risultati. Le schede arrivano dai lati. */
export function HowWeWork() {
  const m = site.about.method;
  return (
    <Section id="metodo" labelledBy="metodo-title">
      <TechBackdrop tone="mixed" rich />
      <SectionHeading id="metodo-title" overline={m.overline} title={m.title} line={m.line} align="center" />
      <ol className="relative mx-auto mt-12 max-md:mt-8 grid max-w-5xl gap-4 max-md:grid-cols-1 max-md:gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {m.steps.map((st, i) => (
          <li key={st.title} className="min-w-0">
            <ScrollSlide from={i % 2 === 0 ? "left" : "right"} className="h-full">
              <div className="relative h-full rounded-card border border-line bg-[linear-gradient(170deg,var(--color-surface-2),var(--color-night-raised))] p-5">
                <div className="flex items-center justify-between">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl border border-gold-400/45 bg-gold-300/10 text-gold-300">
                    <Icon name={st.icon} className="h-6 w-6" strokeWidth={1.6} />
                  </span>
                  <span className="font-display text-[2rem] font-bold leading-none tracking-[-0.04em] text-gold-400/50">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="mt-4 font-display text-[1.25rem] font-bold tracking-tight text-fg">{st.title}</h3>
                <p className="mt-1.5 text-[0.9375rem] leading-snug text-fg-2">{st.text}</p>
                <ul className="mt-4 space-y-1.5 border-t border-line pt-3.5 max-md:hidden">
                  {st.points.map((p) => (
                    <li key={p} className="flex items-center gap-2 text-[0.875rem] text-fg">
                      <Icon name="check" className="h-3.5 w-3.5 shrink-0 text-gold-300" strokeWidth={2.4} />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollSlide>
          </li>
        ))}
      </ol>
    </Section>
  );
}
