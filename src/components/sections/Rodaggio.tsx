import { site } from "@/content/site";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Rodaggio di 6 mesi, semplice: una barra divisa nelle tre fasi (larghe quanto i mesi che durano) che si riempie
 * da sinistra, un punto d'oro che la percorre e il traguardo "Risultati" alla fine.
 */
export function Rodaggio() {
  const r = site.metodo.rodaggio;
  return (
    <Reveal y={20} blur={0}>
      <div className="rd2 rounded-[1.25rem] border border-white/10 bg-white/[0.02] p-5 sm:p-7">
        <div className="flex items-baseline justify-between gap-3">
          <p className="font-display text-[1rem] font-semibold text-fg">
            <span className="text-gold font-bold">6 mesi</span> per far partire tutto
          </p>
          <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-fg-3">{r.badge}</p>
        </div>
        <div className="relative mt-6">
          <div className="flex h-2.5 gap-1 overflow-hidden rounded-full">
            {r.phases.map((p, i) => (
              <span key={p.title} className="relative h-full overflow-hidden rounded-full bg-white/10" style={{ flex: p.to - p.from + 1 }}>
                <span className="rd2-fill absolute inset-0 origin-left rounded-full" style={{ transitionDelay: `${0.2 + i * 0.5}s`, background: ["var(--color-azure-300)", "linear-gradient(90deg,var(--color-azure-300),var(--color-gold-300))", "var(--color-gold-300)"][i] }} />
              </span>
            ))}
          </div>
          <span aria-hidden="true" className="rd2-dot absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-gold-200 shadow-[0_0_14px_4px_rgb(247_200_92/0.6)]" />
        </div>
        <ol className="mt-4 flex gap-1">
          {r.phases.map((p) => (
            <li key={p.title} className="min-w-0" style={{ flex: p.to - p.from + 1 }}>
              <p className="font-mono text-[0.625rem] font-semibold uppercase tracking-wider text-fg-3">{p.from === p.to ? `Mese ${p.from}` : `Mesi ${p.from}–${p.to}`}</p>
              <p className="mt-0.5 truncate font-display text-[0.875rem] font-semibold text-fg sm:text-[0.9375rem]">{p.title}</p>
            </li>
          ))}
        </ol>
      </div>
    </Reveal>
  );
}
