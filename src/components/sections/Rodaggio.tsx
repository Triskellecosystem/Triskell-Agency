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
          <div className="flex h-full items-start gap-3.5 rounded-2xl border border-white/10 bg-[linear-gradient(160deg,rgb(13_39_61/0.7),rgb(2_18_33/0.6))] p-4">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gold-300/10 text-gold-300">
              <Icon name={ICONS[i]!} className="h-[1.1rem] w-[1.1rem]" strokeWidth={1.9} />
            </span>
            <span className="min-w-0">
              <span className="block font-mono text-[0.6875rem] font-bold uppercase tracking-wider text-gold-300">
                {ph.from === ph.to ? `Mese ${ph.from}` : i === r.phases.length - 1 ? `Dal mese ${ph.from}` : `Mesi ${ph.from}–${ph.to}`}
              </span>
              <span className="mt-0.5 block font-display text-[1.0625rem] font-semibold text-fg">{ph.title}</span>
              <span className="mt-1 block text-[0.8125rem] leading-snug text-fg-3">{ph.text}</span>
            </span>
          </div>
          {i < r.phases.length - 1 && (
            <span aria-hidden="true" className="absolute -right-[0.95rem] top-1/2 z-10 hidden h-7 w-7 -translate-y-1/2 place-items-center rounded-full border border-gold-300/50 bg-night text-gold-200 md:grid">
              <Icon name="arrow-right" className="h-3.5 w-3.5" strokeWidth={2.4} />
            </span>
          )}
        </RevealItem>
      ))}
    </RevealGroup>
  );
}
