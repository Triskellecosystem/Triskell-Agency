import Link from "next/link";
import { GoldText } from "@/components/ui/GoldText";
import { Icon } from "@/components/ui/Icon";

interface Crumb {
  label: string;
  href?: string;
}

interface PageHeroProps {
  overline: string;
  title: string;
  line: string;
  crumbs?: Crumb[];
  children?: React.ReactNode;
  /** Visual a lato (es. mockup animato). Con `aside` il titolo occupa 7/12 e il visual 5/12. */
  aside?: React.ReactNode;
  /** Classi del contenitore del visual (es. "max-lg:hidden" per nasconderlo su mobile). */
  asideClassName?: string;
  /** Con un visual alto (es. il telefono) il titolo resta in alto invece di scendere al centro. */
  alignTop?: boolean;
  /** La parte in [oro] del titolo si ingrandisce e si illumina piano, in loop. */
  pulseGold?: boolean;
  /** Sfondo aggiuntivo (es. quadratoni in prospettiva). */
  backdrop?: React.ReactNode;
}

/**
 * Intestazione delle pagine interne: breadcrumb, overline, titolo (parti in [oro]) e una riga.
 * Il titolo usa solo un'animazione a fuoco (blur + traslazione, mai opacità) per restare candidato LCP.
 */
export function PageHero({ overline, title, line, crumbs = [], children, aside, asideClassName, alignTop, pulseGold, backdrop }: PageHeroProps) {
  return (
    <section className="relative isolate flex min-h-[clamp(26rem,62vh,40rem)] flex-col justify-center overflow-hidden pb-[clamp(2.5rem,5vw,4.5rem)] pt-[calc(var(--header-h)+clamp(2rem,5vh,4rem))]">
      <div aria-hidden="true" className="absolute inset-0 -z-20 bg-[image:var(--gradient-bg-hero)]" />
      {backdrop}
      <div className={aside ? `container-x grid gap-x-10 gap-y-14 lg:grid-cols-12 ${alignTop ? "lg:items-start" : "items-center"}` : "container-x"}>
        <div className={aside ? (alignTop ? "lg:col-span-7 lg:pt-6" : "lg:col-span-7") : undefined}>
        {crumbs.length > 0 && (
          <nav aria-label="Percorso" className="mb-6 animate-[fade-in_0.8s_var(--ease-soft)_both]">
            <ol className="flex flex-wrap items-center gap-2 text-small text-fg-3">
              <li>
                <Link href="/" className="transition-colors hover:text-gold-300 max-md:inline-block max-md:py-3">
                  Home
                </Link>
              </li>
              {crumbs.map((c) => (
                <li key={c.label} className="flex items-center gap-2">
                  <Icon name="chevron-right" className="h-3.5 w-3.5" />
                  {c.href ? (
                    <Link href={c.href} className="transition-colors hover:text-gold-300">
                      {c.label}
                    </Link>
                  ) : (
                    <span aria-current="page" className="text-fg-2">
                      {c.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
        <p className="ag-chip mb-4 inline-flex items-center gap-2.5 rounded-full border border-gold-400/40 bg-gold-300/[0.06] py-1 pl-1.5 pr-3 text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-gold-300">
          <span aria-hidden="true" className="ag-chip-dot relative grid h-4 w-4 place-items-center">
            <span className="absolute inset-0 rounded-full bg-gold-300/30" />
            <span className="h-1.5 w-1.5 rounded-full bg-gold-300" />
          </span>
          {overline}
        </p>
        <h1 className="max-w-3xl animate-[line-up_1s_var(--ease-out-expo)_backwards] text-[clamp(2rem,1.3rem+2.4vw,3.25rem)] leading-[1.06] tracking-[-0.035em] text-fg">
          <GoldText text={title} pulse={pulseGold} />
        </h1>
        <p className="mt-4 max-w-xl animate-[fade-in_0.9s_0.3s_var(--ease-soft)_both] whitespace-pre-line text-lead text-fg-2 [text-wrap:balance] max-md:whitespace-normal">{line}</p>
        {children && <div className="mt-7 flex animate-[fade-in_0.9s_0.4s_var(--ease-soft)_both] flex-wrap items-center gap-4">{children}</div>}
        </div>
        {aside && <div className={`relative lg:col-span-5 ${asideClassName ?? ""}`}>{aside}</div>}
      </div>
    </section>
  );
}
