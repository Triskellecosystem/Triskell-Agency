import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/motion/Reveal";

type Row = { them: string; us: string };

/**
 * Confronto a coppie, facile da leggere: ogni riga mette di fronte "gli altri" (testo chiaro, solo un po' più
 * spento, con una piccola x) e noi (vetro dorato, testo pieno, spunta). Le due metà arrivano dai lati e si
 * incastrano al centro su una freccia che si accende. Niente testo barrato.
 */
export function Compare({ them, us, rows }: { them: string; us: string; rows: Row[] }) {
  return (
    <Reveal y={0} blur={0}>
      <div className="cmp3 mx-auto max-w-4xl">
        <div className="grid grid-cols-[1fr_2.5rem_1fr] items-end px-1 pb-3 sm:grid-cols-[1fr_3.5rem_1fr]">
          <p className="text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-fg-3">{them}</p>
          <span />
          <p className="flex items-center gap-1.5 text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-gold-200">
            <Icon name="award" className="h-3.5 w-3.5" strokeWidth={2.2} />
            {us}
          </p>
        </div>
        <ul className="space-y-2">
          {rows.map((r, i) => (
            <li key={r.us} className="cmp3-row group/c grid grid-cols-[1fr_2.5rem_1fr] items-stretch sm:grid-cols-[1fr_3.5rem_1fr]" style={{ "--i": i } as React.CSSProperties}>
              <span className="cmp3-l flex items-center gap-2.5 rounded-xl border border-white/[0.08] bg-white/[0.03] px-3 py-3 text-[0.8125rem] leading-snug text-fg-2 sm:px-4 sm:text-[0.875rem]">
                <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-ember-400/15 text-ember-300">
                  <Icon name="close" className="h-2.5 w-2.5" strokeWidth={3} />
                </span>
                {r.them}
              </span>
              <span aria-hidden="true" className="cmp3-mid relative grid place-items-center">
                <span className="absolute inset-x-1 top-1/2 h-px bg-gradient-to-r from-white/10 via-gold-300/60 to-gold-300" />
                <span className="cmp3-arrow relative grid h-7 w-7 place-items-center rounded-full border border-gold-300/60 bg-night text-gold-200">
                  <Icon name="arrow-right" className="h-3.5 w-3.5" strokeWidth={2.4} />
                </span>
              </span>
              <span className="cmp3-r flex items-center gap-2.5 rounded-xl border border-gold-300/35 bg-[linear-gradient(120deg,rgb(247_200_92/0.13),rgb(11_42_70/0.6))] px-3 py-3 text-[0.8125rem] font-semibold leading-snug text-fg transition-[border-color,box-shadow] duration-300 group-hover/c:border-gold-300/80 group-hover/c:shadow-[0_0_30px_-10px_rgb(247_200_92/0.7)] sm:px-4 sm:text-[0.875rem]">
                <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-gold-300 text-night">
                  <Icon name="check" className="h-3 w-3" strokeWidth={3} />
                </span>
                {r.us}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  );
}
