import { site } from "@/content/site";
import { Icon, type IconName } from "@/components/ui/Icon";

type Step = { icon: IconName; title: string; text: string; get?: string };

/**
 * "Come funziona": i passi sono schede grandi che si impilano una sull'altra mentre scorri (position: sticky,
 * ognuna un po' più in basso della precedente). Ogni scheda: numero gigante in contorno, cosa facciamo e cosa ricevi.
 * Nessun JS. Su telefono le schede restano impilate con un offset più piccolo.
 */
export function MethodStack({ steps: custom, getLabel }: { steps?: Step[]; getLabel?: string } = {}) {
  const steps: Step[] = custom ?? site.paths.agency.steps.map((s, i) => ({ ...s, get: site.method.gets[i] }));
  const label = getLabel ?? site.method.getLabel;
  return (
    <ol className="ms relative mx-auto max-w-5xl">
      {steps.map((s, i) => (
        <li key={s.title} className="ms-item" style={{ "--k": i } as React.CSSProperties}>
          <div className="ms-card group/ms relative grid items-center gap-5 overflow-hidden rounded-[1.75rem] border border-gold-400/30 p-6 sm:grid-cols-[auto_minmax(0,1fr)_auto] sm:gap-8 sm:p-8">
            <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0 opacity-25 [mask-image:linear-gradient(90deg,#000,transparent_70%)]" />
            <span aria-hidden="true" className="ms-num relative font-display text-[clamp(4rem,3rem+4vw,7rem)] font-bold leading-[0.8] tracking-[-0.06em]">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="relative min-w-0">
              <p className="flex items-center gap-2 text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-azure-300">
                <Icon name={s.icon} className="h-4 w-4" strokeWidth={1.8} />
                Step {i + 1} di {steps.length}
              </p>
              <h3 className="mt-2 font-display text-[clamp(1.5rem,1.2rem+1.2vw,2.25rem)] font-bold leading-tight tracking-[-0.03em] text-fg">{s.title}</h3>
              <p className="mt-1.5 max-w-lg text-[1.0625rem] leading-snug text-fg-2">{s.text}</p>
            </div>
            <div className="relative rounded-2xl border border-gold-300/50 bg-gold-300/[0.08] px-4 py-3 sm:min-w-[12.5rem]">
              <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-gold-300">{label}</p>
              <p className="mt-1 flex items-center gap-2 font-display text-[1rem] font-semibold leading-tight text-fg">
                <Icon name="check" className="h-4 w-4 shrink-0 text-gold-300" strokeWidth={2.6} />
                {s.get}
              </p>
            </div>
            <span aria-hidden="true" className="ms-bar absolute inset-x-0 bottom-0 h-[3px] bg-gradient-to-r from-gold-500 via-gold-300 to-azure-300" style={{ width: `${((i + 1) / steps.length) * 100}%` }} />
          </div>
        </li>
      ))}
    </ol>
  );
}
