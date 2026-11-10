import { site } from "@/content/site";
import { GoldText } from "@/components/ui/GoldText";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/motion/Reveal";

/** Assistenza sempre disponibile: una fascia sottile con l'icona che "squilla" e tre punti. */
export function SupportBand() {
  const s = site.metodo.support;
  return (
    <Reveal y={20} blur={0}>
      <div className="relative grid items-center gap-5 overflow-hidden rounded-[1.75rem] border border-azure-300/35 bg-[linear-gradient(120deg,#0b2a46,var(--color-night-raised)_60%)] p-6 sm:grid-cols-[auto_minmax(0,1fr)] sm:gap-7 sm:p-8 lg:grid-cols-[auto_minmax(0,1fr)_auto]">
        <span className="sb-ring relative grid h-16 w-16 place-items-center rounded-2xl bg-azure-300/15 text-azure-300">
          <span aria-hidden="true" className="sb-wave absolute inset-0 rounded-2xl border-2 border-azure-300/60" />
          <Icon name={s.icon} className="sb-ico h-8 w-8" strokeWidth={1.7} />
        </span>
        <div className="min-w-0">
          <h3 className="font-display text-[clamp(1.25rem,1rem+0.9vw,1.75rem)] font-bold leading-tight tracking-tight text-fg">
            <GoldText text={s.title} />
          </h3>
          <p className="mt-1.5 max-w-2xl text-[0.9375rem] leading-snug text-fg-2">{s.text}</p>
        </div>
        <ul className="flex flex-wrap gap-2 sm:col-span-2 lg:col-span-1 lg:flex-col">
          {s.points.map((p) => (
            <li key={p} className="inline-flex items-center gap-2 text-[0.875rem] font-medium text-fg">
              <Icon name="check" className="h-4 w-4 text-lime-300" strokeWidth={2.6} />
              {p}
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  );
}
