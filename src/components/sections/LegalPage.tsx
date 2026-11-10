import Link from "next/link";
import type { LegalDoc } from "@/content/legal";
import { site } from "@/content/site";
import { Icon } from "@/components/ui/Icon";

/** Pagina legale: testo leggibile, una colonna, con indice dei paragrafi e dati del titolare. */
export function LegalPage({ doc }: { doc: LegalDoc }) {
  return (
    <section className="relative pb-[clamp(3rem,6vw,5rem)] pt-[calc(var(--header-h)+clamp(2rem,5vh,4rem))]">
      <div aria-hidden="true" className="bg-grid absolute inset-0 -z-10 [mask-image:linear-gradient(to_bottom,#000,transparent_60%)]" />
      <div className="container-x">
        <article className="mx-auto max-w-3xl">
          <nav aria-label="Percorso" className="mb-6 text-small text-fg-3">
            <Link href="/" className="hover:text-gold-300">
              Home
            </Link>
            <Icon name="chevron-right" className="mx-2 inline h-3.5 w-3.5 align-[-2px]" />
            <span className="text-fg-2">{doc.title}</span>
          </nav>
          <h1 className="font-display text-[clamp(2rem,1.4rem+2.6vw,3.25rem)] font-bold leading-[1.05] tracking-[-0.035em] text-fg">{doc.title}</h1>
          <p className="mt-4 text-lead text-fg-2">{doc.intro}</p>
          <p className="mt-2 text-small text-fg-3">Ultimo aggiornamento: {doc.updated}</p>

          <div className="mt-8 rounded-2xl border border-gold-400/30 bg-night-raised/60 p-5 text-[0.9375rem] leading-relaxed text-fg-2">
            <p className="font-display text-[1rem] font-semibold text-fg">Titolare</p>
            <p className="mt-1">
              {site.brand.owner} · {site.brand.name} è il nome commerciale del progetto · P.IVA {site.brand.vat} ·{" "}
              <a className="text-gold-300 underline underline-offset-4" href={`mailto:${site.brand.email}`}>
                {site.brand.email}
              </a>
            </p>
          </div>

          {doc.sections.map((s, i) => (
            <section key={s.title} className="mt-10">
              <h2 className="font-display text-[1.375rem] font-semibold tracking-tight text-fg">
                <span className="mr-2 text-gold-400">{String(i + 1).padStart(2, "0")}</span>
                {s.title}
              </h2>
              {s.paras?.map((p) => (
                <p key={p} className="mt-3 text-[1rem] leading-relaxed text-fg-2">
                  {p}
                </p>
              ))}
              {s.bullets && (
                <ul className="mt-3 space-y-2.5">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex gap-3 text-[1rem] leading-relaxed text-fg-2">
                      <Icon name="check" className="mt-1 h-4 w-4 shrink-0 text-gold-300" strokeWidth={2.2} />
                      {b}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </article>
      </div>
    </section>
  );
}
