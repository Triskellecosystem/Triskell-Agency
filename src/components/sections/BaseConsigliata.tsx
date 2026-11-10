import { site } from "@/content/site";
import { Icon } from "@/components/ui/Icon";
import { CountUp } from "@/components/motion/CountUp";
import { Reveal } from "@/components/motion/Reveal";

/**
 * La base consigliata, in una sola fascia: due numeri grandi (12 contenuti al mese · 4–5 campagne al mese) e, a
 * lato, gli extra per i casi urgenti. `showCampaigns=false` mostra solo i contenuti.
 */
export function BaseConsigliata({ showCampaigns = true }: { showCampaigns?: boolean; showExtras?: boolean }) {
  const b = site.metodo.base;
  const items = showCampaigns ? b.items : b.items.slice(0, 1);
  return (
    <Reveal y={20} blur={0}>
      <div className="bc grid overflow-hidden rounded-[1.25rem] border border-gold-400/35 bg-[linear-gradient(120deg,#2b2410,var(--color-night-raised)_45%,#0b2a46)] lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <div className="flex flex-wrap items-center gap-x-8 gap-y-5 p-6 sm:p-7">
          <p className="w-full text-[0.6875rem] font-bold uppercase tracking-[0.18em] text-gold-300">{b.label}</p>
          {items.map((it, i) => (
            <div key={it.unit} className="flex items-center gap-3">
              {i > 0 && <span className="mr-2 font-display text-[1.5rem] font-bold text-gold-300">+</span>}
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-gold-300/10 text-gold-300">
                <Icon name={it.icon} className="h-5 w-5" strokeWidth={1.8} />
              </span>
              <div>
                <p className="font-display text-[2.25rem] font-bold leading-none tracking-[-0.045em]">
                  <CountUp value={it.value} prefix={it.prefix} className="text-gold" />
                </p>
                <p className="mt-1 text-[0.75rem] font-semibold text-fg">
                  {it.unit} <span className="font-normal text-fg-3">· {it.note}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="border-white/10 p-6 max-lg:border-t sm:p-7 lg:border-l">
          <p className="flex items-center gap-2 text-[0.6875rem] font-bold uppercase tracking-[0.18em] text-ember-200">
            <Icon name="zap" className="h-3.5 w-3.5" strokeWidth={2.2} />
            Extra urgenti
          </p>
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {b.extras.map((e) => (
              <li key={e.text} className="inline-flex items-center gap-1.5 rounded-full border border-ember-300/35 bg-ember-400/10 px-2.5 py-1 text-[0.75rem] font-semibold text-ember-200">
                <Icon name={e.icon} className="h-3 w-3" strokeWidth={2.2} />
                {e.text}
              </li>
            ))}
          </ul>
          <p className="mt-3 text-[0.75rem] leading-snug text-fg-3">Su misura: la base è un punto di partenza, non un limite.</p>
        </div>
      </div>
    </Reveal>
  );
}
