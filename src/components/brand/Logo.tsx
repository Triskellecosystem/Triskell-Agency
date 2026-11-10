import Link from "next/link";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";
import { LogoMark } from "./LogoMark";

interface LogoProps {
  className?: string;
  /** Mostra il lockup compatto (solo simbolo) su schermi molto piccoli. */
  compactOnXs?: boolean;
  asLink?: boolean;
}

/** Lockup: simbolo + wordmark "TRISKELL / AGENCY". */
export function Logo({ className, compactOnXs = false, asLink = true }: LogoProps) {
  const inner = (
    <>
      <LogoMark size={40} loading="eager" className="h-9 w-9 shrink-0 sm:h-10 sm:w-10" />
      <span className={cn("flex flex-col leading-none", compactOnXs && "max-xs:hidden")}>
        <span className="font-display text-[1.125rem] font-bold tracking-[0.1em] text-fg sm:text-[1.25rem]">TRISKELL</span>
        {/* "AGENCY" come contenuto generato: il testo visibile resta "TRISKELL", incluso nel nome accessibile */}
        <span
          aria-hidden="true"
          className="mt-1 block font-display text-[0.5625rem] font-medium tracking-[0.46em] text-fg-2 after:content-['AGENCY'] sm:text-[0.625rem]"
        />
      </span>
    </>
  );

  if (!asLink) return <span className={cn("group/logo inline-flex items-center gap-2.5", className)}>{inner}</span>;

  return (
    <Link href="/" aria-label={site.a11y.home} className={cn("group/logo inline-flex items-center gap-2.5", className)}>
      {inner}
    </Link>
  );
}
