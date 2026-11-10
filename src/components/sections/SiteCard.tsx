import Image from "next/image";
import { site, type SiteItem } from "@/content/site";
import { Icon } from "@/components/ui/Icon";

/**
 * Scheda di un sito realizzato: finestra del browser con dominio e screenshot, categoria, nome e link.
 * Tutta la scheda è un link che apre il sito in una nuova scheda.
 */
export function SiteCard({ item, priority = false }: { item: SiteItem; priority?: boolean }) {
  return (
    <a
      href={item.url}
      {...(item.demo ? {} : { target: "_blank", rel: "noopener noreferrer" })}
      className="group/site relative flex h-full flex-col overflow-hidden rounded-card border border-line bg-[linear-gradient(170deg,var(--color-surface-2),var(--color-night-raised))] transition-[border-color,box-shadow,transform] duration-[var(--dur-base)] ease-out-expo hover:border-gold-300/70 hover:shadow-[0_0_44px_-12px_rgb(247_200_92/0.5)]"
    >
      <div className="flex items-center gap-1.5 border-b border-line bg-night/70 px-3.5 py-2.5 max-md:hidden">
        {[0, 1, 2].map((d) => (
          <span key={d} className={d === 0 ? "h-2 w-2 rounded-full bg-gold-300" : "h-2 w-2 rounded-full bg-line-strong"} />
        ))}
        <span className="ml-2 min-w-0 flex-1 truncate rounded-md bg-line/60 px-2.5 py-0.5 font-mono text-[0.6875rem] text-fg-2">{item.domain}</span>
      </div>
      <div className="relative aspect-[16/10] overflow-hidden bg-night">
        <Image
          src={item.image}
          alt={`Anteprima del sito ${item.name}`}
          width={1280}
          height={800}
          sizes="(min-width: 1024px) 26rem, (min-width: 640px) 45vw, 92vw"
          priority={priority}
          className="h-full w-full object-cover object-top transition-transform duration-[900ms] ease-out-expo group-hover/site:scale-[1.06]"
        />
        <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-night/50 via-transparent to-transparent opacity-0 transition-opacity duration-[var(--dur-base)] group-hover/site:opacity-100" />
      </div>
      <div className="flex flex-1 flex-col p-5 max-md:p-3">
        <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-azure-300 max-md:line-clamp-1 max-md:text-[0.625rem]">{item.category}</p>
        <h3 className="mt-1.5 font-display text-[1.25rem] max-md:text-[0.9375rem] font-semibold leading-tight tracking-tight text-fg">{item.name}</h3>
        <span className="mt-auto inline-flex items-center gap-2 pt-4 max-md:pt-2 max-md:text-[0.8125rem] text-small font-semibold text-gold-300 transition-colors group-hover/site:text-gold-100">
          {item.demo ? site.sitiWeb.visitDemo : site.sitiWeb.visit}
          <Icon name="arrow-up-right" className="h-4 w-4 transition-transform duration-[var(--dur-base)] ease-out-expo group-hover/site:-translate-y-0.5 group-hover/site:translate-x-0.5" />
        </span>
      </div>
    </a>
  );
}
