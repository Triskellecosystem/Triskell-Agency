import { site } from "@/content/site";
import { Icon } from "@/components/ui/Icon";
import { Spotlight } from "@/components/ui/Spotlight";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";

/** Cosa è incluso nel Metodo Triskell: quattro blocchi, ognuno con il suo numero (12 contenuti, 4–5 campagne…) e tre punti. */
export function IncludedBlocks() {
  const inc = site.metodo.included;
  return (
    <>
      <RevealGroup className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4" stagger={0.1} alternate>
        {inc.blocks.map((b, i) => (
          <RevealItem key={b.title} y={18} className="h-full">
            <Spotlight className="h-full rounded-[1.125rem] border border-white/[0.08] bg-[linear-gradient(165deg,var(--color-surface-2),var(--color-night-raised))] p-4 transition-colors duration-[var(--dur-base)] hover:border-gold-300/50 sm:p-5" size={260}>
              <div className="relative z-[2]">
                <div className="flex items-center justify-between">
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-gold-300/10 text-gold-300">
                    <Icon name={b.icon} className="h-4 w-4" strokeWidth={1.9} />
                  </span>
                  <span className="font-mono text-[0.625rem] font-bold text-fg-3">0{i + 1}</span>
                </div>
                <h3 className="mt-3 font-display text-[1rem] font-bold text-fg">{b.title}</h3>
                <p className="mt-3 font-display text-[2rem] font-bold leading-none tracking-[-0.04em] text-gold">{b.value}</p>
                <p className="mt-1 text-[0.6875rem] font-semibold uppercase tracking-wider text-fg-3">{b.unit}</p>
                <ul className="mt-3 space-y-1 border-t border-white/[0.07] pt-3">
                  {b.points.map((p) => (
                    <li key={p} className="flex items-start gap-1.5 text-[0.8125rem] leading-snug text-fg-2">
                      <Icon name="check" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold-300" strokeWidth={2.6} />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </Spotlight>
          </RevealItem>
        ))}
      </RevealGroup>
      <Reveal y={10} blur={0} className="mt-4 flex justify-center">
        <p className="inline-flex items-center gap-2 rounded-full border border-dashed border-white/20 px-3.5 py-1.5 text-[0.8125rem] text-fg-2">
          <Icon name="monitor" className="h-4 w-4 text-gold-300" strokeWidth={1.9} />
          {inc.site}
        </p>
      </Reveal>
    </>
  );
}
