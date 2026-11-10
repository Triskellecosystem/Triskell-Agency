import { site } from "@/content/site";
import { GoldText } from "@/components/ui/GoldText";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/motion/Reveal";

/** Assistenza sempre disponibile: una fascia sottile con l'icona che "squilla" e tre punti. */
export function SupportBand() {
  const s = site.metodo.support;
  return (
    <Reveal y={20} blur={0}>
      <div className="relative grid items-center gap-5 overflow-hidden rounded-[1.25rem] border border-azure-300/30 bg-[linear-gradient(120deg,#0b2a46,var(--color-night-raised)_60%)] p-5 sm:grid-cols-[auto_minmax(0,1fr)] sm:gap-6 sm:p-6 lg:grid-cols-[auto_minmax(0,1fr)_auto]">
        <span className="sb-ring relative grid h-11 w-11 place-items-center rounded-xl bg-azure-300/15 text-azure-300">
          <span aria-hidden="true" className="sb-wave absolute inset-0 rounded-xl border-2 border-azure-300/60" />
          <Icon name={s.icon} className="sb-ico h-5 w-5" strokeWidth={1.8} />
        </span>
        <div className="min-w-0">
          <h3 className="font-display text-[1.125rem] font-bold leading-tight tracking-tight text-fg">
            <GoldText text={s.title} />
          </h3>
          <p className="mt-1 max-w-2xl text-[0.8125rem] leading-snug text-fg-2">{s.text}</p>
        </div>
        <ul className="flex flex-wrap gap-2 sm:col-span-2 lg:col-span-1 lg:flex-col">
          {s.points.map((p) => (
            <li key={p} className="inline-flex items-center gap-2 text-[0.8125rem] font-medium text-fg">
              <Icon name="check" className="h-4 w-4 text-lime-300" strokeWidth={2.6} />
              {p}
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  );
}
