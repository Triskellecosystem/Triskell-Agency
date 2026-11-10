import Link from "next/link";
import { site } from "@/content/site";
import { Logo } from "@/components/brand/Logo";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { Icon } from "@/components/ui/Icon";

/** Footer ordinato: logo + tagline + social, colonne di link, legali. */
export function Footer() {
  const { footer } = site;
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-line bg-night-deep">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-400/40 to-transparent" />
      <div className="container-x grid gap-12 py-14 max-md:grid-cols-2 max-md:gap-x-6 max-md:gap-y-9 max-md:py-10 md:grid-cols-3 md:py-16 lg:grid-cols-12">
        <div className="max-md:col-span-2 md:col-span-3 lg:col-span-3">
          <Logo />
          <p className="mt-5 max-w-xs text-small text-fg-2 max-md:mt-3">{footer.tagline}</p>
          <p className="mt-8 max-md:mt-5 text-overline font-semibold uppercase tracking-[var(--text-overline--letter-spacing)] text-fg-3">{footer.socialTitle}</p>
          <ul className="mt-4 flex items-center gap-3">
            {footer.social.map((s) => (
              <li key={s.id}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="grid h-11 w-11 place-items-center rounded-xl border border-line-strong text-fg-2 transition-[color,border-color,box-shadow] duration-[var(--dur-base)] ease-out-expo hover:border-gold-300/70 hover:text-gold-300 hover:shadow-glow-gold"
                >
                  <SocialIcon id={s.id} className="h-5 w-5" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {footer.columns.map((col) => (
          <nav key={col.title} aria-label={col.title} className="lg:col-span-3">
            <h2 className="font-sans text-overline font-semibold uppercase tracking-[var(--text-overline--letter-spacing)] text-gold-400">{col.title}</h2>
            <ul className="mt-5 space-y-3 max-md:mt-3 max-md:space-y-0">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="group/f inline-flex items-center gap-1.5 text-[0.9375rem] text-fg-2 transition-colors hover:text-fg max-md:py-2.5">
                    {l.label}
                    <Icon name="arrow-up-right" className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition-[transform,opacity] duration-[var(--dur-base)] ease-out-expo group-hover/f:translate-x-0 group-hover/f:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="border-t border-line">
        <div className="container-x flex flex-col gap-2 py-6 max-sm:pb-24 text-small text-fg-3 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.brand.name}. {footer.rights}
          </p>
          <p className="sm:text-right">
            {footer.legal} ·{" "}
            <a className="underline-offset-4 hover:text-gold-300 hover:underline max-md:inline-block max-md:py-2.5" href={`mailto:${site.brand.email}`}>
              {site.brand.email}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
