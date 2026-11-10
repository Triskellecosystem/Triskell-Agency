import { cn } from "@/lib/cn";

interface MarqueeProps {
  items: readonly string[];
  label: string;
  className?: string;
}

/** Marquee lento di testo (nessun logo protetto). Pausa in hover; statico con reduced motion. */
export function Marquee({ items, label, className }: MarqueeProps) {
  const set = (hidden: boolean) => (
    <ul className="marquee-set flex shrink-0 items-center gap-10 pr-10" aria-hidden={hidden || undefined}>
      {items.map((item) => (
        <li key={item} className="flex items-center gap-10 font-display text-lg font-semibold tracking-tight text-fg-2 sm:text-xl">
          <span>{item}</span>
          <span aria-hidden="true" className="h-1.5 w-1.5 rotate-45 bg-gold-500/70" />
        </li>
      ))}
    </ul>
  );
  return (
    <div className={cn("marquee group relative overflow-hidden", className)} role="group" aria-label={label}>
      <div className="marquee-track flex w-max">
        {set(false)}
        {set(true)}
      </div>
    </div>
  );
}
