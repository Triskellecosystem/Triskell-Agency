import { site } from "@/content/site";
import { Icon, type IconName } from "@/components/ui/Icon";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";

const ICONS: IconName[] = ["layers", "rocket", "trending"];

/** I 6 mesi in tre passi, schematici: mese 1 struttura → mesi 2–3 in moto → dal mese 4 i risultati. */
export function Rodaggio() {
  const r = site.metodo.rodaggio;
  return (
    <RevealGroup className="grid gap-3 md:grid-cols-3" stagger={0.15}>
      {r.phases.map((ph, i) => (
        <RevealItem key={ph.title} y={12} className="relative">
          <div className={`gl-card ${i === 1 ? "gl-card--gold" : ""} flex h-full items-start gap-3.5 rounded-[1.5rem] p-5`}>
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-night/50 text-gold-300">
              <Icon name={ICONS[i]!} className="h-[1.1rem] w-[1.1rem]" strokeWidth={1.9} />
            </span>
            <span className="min-w-0">
              <span className="block font-mono text-[0.6875rem] font-bold uppercase tracking-wider text-gold-300">
                {ph.from === ph.to ? `Mese ${ph.from}` : i === r.phases.length - 1 ? `Dal mese ${ph.from}` : `Mesi ${ph.from}–${ph.to}`}
              </span>
              <span className="mt-0.5 block font-display text-[1.375rem] font-bold text-fg">{ph.title}</span>
              <span className="mt-1 block text-[0.875rem] leading-snug text-fg-2">{ph.text}</span>
            </span>
          </div>
          {i < r.phases.length - 1 && (
            <span aria-hidden="true" className="absolute -right-[0.95rem] top-1/2 z-10 hidden h-8 w-8 -translate-y-1/2 place-items-center rounded-full border-2 border-gold-300 bg-night text-gold-200 shadow-[0_0_16px_rgb(247_200_92/0.5)] md:grid">
              <Icon name="plus" className="h-3.5 w-3.5" strokeWidth={2.6} />
            </span>
          )}
        </RevealItem>
      ))}
    </RevealGroup>
  );
}
