import { site } from "@/content/site";
import { BeamCard } from "@/components/ui/BeamCard";
import { Icon } from "@/components/ui/Icon";
import { CountUp } from "@/components/motion/CountUp";
import { Reveal } from "@/components/motion/Reveal";

/**
 * La base consigliata: 12 contenuti al mese (3 a settimana) + 4–5 campagne al mese.
 * A destra un calendario del mese dove i giorni di pubblicazione si accendono uno dopo l'altro.
 * Sotto, gli extra per i casi urgenti. `showCampaigns=false` per la pagina social (solo contenuti).
 */
export function BaseConsigliata({ showCampaigns = true, showExtras = true }: { showCampaigns?: boolean; showExtras?: boolean }) {
  const b = site.metodo.base;
  const items = showCampaigns ? b.items : b.items.slice(0, 1);
  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-8">
      <Reveal from="left" blur={0} className="h-full">
        <BeamCard className="h-full">
          <div className="relative flex h-full flex-col overflow-hidden rounded-[inherit] bg-[linear-gradient(160deg,var(--color-cobalt-600),var(--color-surface-2)_55%,var(--color-night-glow))] p-6 sm:p-8">
            <p className="inline-flex w-fit items-center gap-2 rounded-full bg-[image:var(--gradient-gold-btn)] px-3 py-1 text-[0.75rem] font-bold uppercase tracking-wider text-night">
              <Icon name="sparkles" className="h-3.5 w-3.5" strokeWidth={2.2} />
              {b.label}
            </p>
            <div className="mt-6 space-y-6">
              {items.map((it, i) => (
                <div key={it.unit} className="flex items-center gap-4">
                  {i > 0 && <span aria-hidden="true" className="-ml-1 grid h-9 w-9 shrink-0 place-items-center rounded-full border-2 border-gold-300 font-display text-[1.25rem] font-bold text-gold-300">+</span>}
                  <span className={`grid h-14 w-14 shrink-0 place-items-center rounded-2xl border border-gold-300/50 bg-gold-300/10 text-gold-300 ${i > 0 ? "max-sm:hidden" : ""}`}>
                    <Icon name={it.icon} className="h-7 w-7" strokeWidth={1.6} />
                  </span>
                  <div>
                    <p className="font-display text-[clamp(2.5rem,1.8rem+2.6vw,4rem)] font-bold leading-none tracking-[-0.05em]">
                      <CountUp value={it.value} prefix={it.prefix} className="text-gold" />
                      <span className="ml-2 text-[0.4em] tracking-[-0.02em] text-fg">{it.unit}</span>
                    </p>
                    <p className="mt-1 text-small font-semibold text-azure-300">{it.note}</p>
                  </div>
                </div>
              ))}
            </div>
            <ul className="mt-8 space-y-2.5 border-t border-gold-400/25 pt-6">
              {b.fits.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-[0.9375rem] leading-snug text-fg">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-gold-300 text-night">
                    <Icon name="check" className="h-3 w-3" strokeWidth={3} />
                  </span>
                  {f}
                </li>
              ))}
            </ul>
            <p className="mt-auto pt-6 text-[0.875rem] italic leading-snug text-fg-2">{b.note}</p>
          </div>
        </BeamCard>
      </Reveal>

      <Reveal from="right" blur={0} className="h-full">
        <div className="bc-cal flex h-full flex-col rounded-[1.75rem] border border-line bg-[linear-gradient(160deg,var(--color-surface-2),var(--color-night-raised))] p-5 sm:p-7">
          <div className="flex items-center justify-between">
            <p className="flex items-center gap-2 font-display text-[1rem] font-bold text-fg">
              <Icon name="calendar-days" className="h-5 w-5 text-gold-300" strokeWidth={1.8} />
              Il tuo mese tipo
            </p>
            <p className="text-[0.75rem] font-semibold uppercase tracking-wider text-fg-3">3 a settimana</p>
          </div>
          <div className="mt-5 grid grid-cols-[3.5rem_repeat(7,minmax(0,1fr))] gap-1.5 text-center sm:gap-2">
            <span />
            {b.days.map((d, i) => (
              <span key={i} className="text-[0.6875rem] font-semibold text-fg-3">
                {d}
              </span>
            ))}
            {b.weeks.map((w, wi) => (
              <div key={w} className="contents">
                <span className="self-center text-left text-[0.6875rem] font-semibold text-fg-3">{w}</span>
                {b.days.map((_, di) => {
                  const on = b.postDays.includes(di);
                  const n = wi * b.postDays.length + b.postDays.indexOf(di);
                  return (
                    <span key={di} className={`bc-day relative grid aspect-square place-items-center rounded-lg border ${on ? "bc-day--on border-gold-300/60" : "border-line bg-night/30"}`} style={on ? ({ "--n": n } as React.CSSProperties) : undefined}>
                      {on && <Icon name="film" className="bc-ico h-[45%] w-[45%] text-night" strokeWidth={2} />}
                    </span>
                  );
                })}
              </div>
            ))}
          </div>
          <p className="mt-4 text-center font-display text-[1rem] font-semibold text-fg">
            = <span className="text-gold">12 contenuti</span> pronti e pubblicati
          </p>

          {showExtras && (
            <div className="mt-auto border-t border-line pt-5">
              <p className="font-display text-[1rem] font-bold text-fg">{b.extrasTitle}</p>
              <p className="mt-1 text-[0.875rem] leading-snug text-fg-2">{b.extrasLine}</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {b.extras.map((e) => (
                  <li key={e.text} className="inline-flex items-center gap-1.5 rounded-full border border-ember-300/40 bg-ember-400/10 px-3 py-1.5 text-[0.8125rem] font-semibold text-ember-200">
                    <Icon name={e.icon} className="h-3.5 w-3.5" strokeWidth={2} />
                    {e.text}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </Reveal>
    </div>
  );
}
