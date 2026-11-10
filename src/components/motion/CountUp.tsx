import { formatNumber, isDev } from "@/lib/format";
import type { Metric } from "@/content/site";

interface CountUpProps extends Pick<Metric, "value" | "prefix" | "suffix" | "decimals" | "todo"> {
  className?: string;
  duration?: number;
}

/**
 * Numero con count-up all'ingresso in viewport.
 * Server component: l'HTML contiene già il valore finale (SEO, no-JS, reduced motion);
 * l'animazione è pilotata da <RevealRoot /> modificando solo il testo di un nodo esistente.
 */
export function CountUp({ value, prefix = "", suffix = "", decimals = 0, todo, className, duration = 1.8 }: CountUpProps) {
  return (
    <span
      className={className}
      data-count=""
      data-value={value}
      data-prefix={prefix}
      data-suffix={suffix}
      data-decimals={decimals}
      data-duration={duration}
      data-todo={todo && isDev ? "" : undefined}
    >
      {`${prefix}${formatNumber(value, decimals)}${suffix}`}
    </span>
  );
}
