import { site } from "@/content/site";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/Icon";
import { Section, SectionHeading } from "@/components/ui/Section";
import { TechBackdrop } from "@/components/ui/TechBackdrop";
import { Reveal } from "@/components/motion/Reveal";

/** Le due strade per le riprese: veniamo noi sul posto, oppure registri in autonomia (con script e call di formazione). */
export function RecordingOptions() {
  const r = site.social.recording;
  return (
    <Section id="riprese" labelledBy="riprese-title">
      <TechBackdrop tone="azure" rich />
      <SectionHeading id="riprese-title" overline={r.overline} title={r.title} line={r.line} align="center" />
      <div className="relative mx-auto mt-9 grid max-w-4xl gap-4 md:grid-cols-2 md:gap-6">
        <span aria-hidden="true" className="absolute left-1/2 top-1/2 z-[2] hidden h-9 w-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-gold-300 bg-night font-display text-[0.75rem] font-bold text-gold-300 md:grid">
          o
        </span>
        {r.options.map((o, i) => (
          <Reveal key={o.id} from={i === 0 ? "left" : "right"} blur={0} className="h-full">
            <div className={cn("group/ro relative flex h-full flex-col overflow-hidden rounded-[1.25rem] border p-5 transition-[border-color,box-shadow] duration-[var(--dur-base)] sm:p-6", i === 0 ? "border-gold-400/40 bg-[linear-gradient(160deg,#2b2410,var(--color-night-raised)_65%)] hover:border-gold-300 hover:shadow-[0_0_50px_-14px_rgb(247_200_92/0.55)]" : "border-azure-300/40 bg-[linear-gradient(160deg,#0b2a46,var(--color-night-raised)_65%)] hover:border-azure-300 hover:shadow-[0_0_50px_-14px_rgb(58_164_212/0.6)]")}>
              <div className="flex items-start justify-between gap-3">
                <span className={cn("grid h-11 w-11 place-items-center rounded-xl transition-transform duration-[var(--dur-base)] group-hover/ro:scale-110 group-hover/ro:-rotate-6", i === 0 ? "bg-[image:var(--gradient-gold-btn)] text-night" : "bg-azure-300/15 text-azure-300")}>
                  <Icon name={o.icon} className="h-5 w-5" strokeWidth={1.8} />
                </span>
                <span className={cn("rounded-full px-2.5 py-0.5 text-[0.625rem] font-bold uppercase tracking-wider", i === 0 ? "border border-gold-300/60 text-gold-200" : "border border-lime-300/60 text-lime-300")}>{o.tag}</span>
              </div>
              <h3 className="mt-4 font-display text-[1.25rem] font-bold leading-tight tracking-[-0.03em] text-fg">{o.title}</h3>
              <p className="mt-1 text-[0.875rem] leading-snug text-fg-2">{o.text}</p>
              <ul className="mt-4 space-y-2 border-t border-white/10 pt-4">
                {o.points.map((p) => (
                  <li key={p} className="flex items-start gap-2.5 text-[0.8125rem] leading-snug text-fg">
                    <span className={cn("mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full", i === 0 ? "bg-gold-300 text-night" : "bg-azure-300 text-night")}>
                      <Icon name="check" className="h-3 w-3" strokeWidth={3} />
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
