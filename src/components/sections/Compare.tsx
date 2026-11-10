import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/motion/Reveal";

type Row = { them: string; us: string };

/**
 * Confronto: due colonne che arrivano da lati opposti e si uniscono al centro. A sinistra "gli altri" (più scuro,
 * voci barrate), a destra noi (oro, voci che si accendono una alla volta). Al centro un "VS" che pulsa.
 */
export function Compare({ them, us, rows }: { them: string; us: string; rows: Row[] }) {
  return (
    <Reveal y={0} blur={0}>
      <div className="cmp2 relative mx-auto grid max-w-4xl gap-3 md:grid-cols-2 md:gap-0">
        <span aria-hidden="true" className="cmp2-vs absolute left-1/2 top-1/2 z-10 hidden h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-gold-300 bg-[#04213a] font-display text-[0.875rem] font-bold text-gold-200 md:grid">VS</span>
        <div className="cmp2-l rounded-[1.25rem] border border-white/10 bg-[#071a2b] p-5 md:rounded-r-none md:pr-9">
          <p className="text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-fg-3">{them}</p>
          <ul className="mt-4 space-y-2.5">
            {rows.map((r, i) => (
              <li key={r.them} className="cmp2-row flex items-start gap-2.5 text-[0.875rem] leading-snug text-fg-3" style={{ "--i": i } as React.CSSProperties}>
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-ember-400/15 text-ember-300">
                  <Icon name="close" className="h-3 w-3" strokeWidth={3} />
                </span>
                <span className="cmp2-strike">{r.them}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="cmp2-r relative overflow-hidden rounded-[1.25rem] border border-gold-300/60 bg-[linear-gradient(150deg,#4a3808,#0b2a46_75%)] p-5 shadow-[0_0_60px_-20px_rgb(247_200_92/0.6)] md:rounded-l-none md:pl-9">
          <span aria-hidden="true" className="cta-gold-shine opacity-30" />
          <p className="relative flex items-center gap-2 text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-gold-200">
            <Icon name="award" className="h-3.5 w-3.5" strokeWidth={2.2} />
            {us}
          </p>
          <ul className="relative mt-4 space-y-2.5">
            {rows.map((r, i) => (
              <li key={r.us} className="cmp2-row cmp2-good flex items-start gap-2.5 text-[0.875rem] font-semibold leading-snug text-fg" style={{ "--i": i } as React.CSSProperties}>
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-gold-300 text-night">
                  <Icon name="check" className="h-3 w-3" strokeWidth={3} />
                </span>
                {r.us}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Reveal>
  );
}
