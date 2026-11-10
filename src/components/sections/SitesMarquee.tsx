import Image from "next/image";
import { site } from "@/content/site";

/**
 * Siti che scorrono da soli su due file, in versi opposti, leggermente inclinate in prospettiva. Le schede non si
 * muovono al passaggio del mouse (niente saltelli): la fila si ferma e la scheda si illumina solo nel bordo, con il
 * nome che compare. Clic per aprire il sito. Con movimento ridotto le file restano ferme e scorrono a mano.
 */
export function SitesMarquee() {
  const items = site.sitiWeb.items.filter((s) => !s.demo);
  const rows = [items, [...items].reverse()];
  return (
    <div className="smq relative left-1/2 w-screen -translate-x-1/2 overflow-hidden py-4">
      <div className="smq-plane space-y-5">
        {rows.map((row, r) => (
          <div key={r} className="smq-row flex w-max gap-5" data-dir={r}>
            {[...row, ...row].map((it, k) => (
              <a
                key={`${it.id}-${k}`}
                href={it.url}
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={k < row.length ? 0 : -1}
                aria-hidden={k >= row.length}
                className="smq-card group relative block w-[17rem] shrink-0 overflow-hidden rounded-xl border border-white/12 bg-night shadow-[0_24px_50px_-26px_rgb(0_0_0/0.95)] transition-[border-color,box-shadow] duration-300 hover:border-gold-300/80 hover:shadow-[0_0_40px_-12px_rgb(247_200_92/0.6)] sm:w-[22rem]"
              >
                <span className="flex items-center gap-1 border-b border-white/10 bg-surface-2 px-2.5 py-1.5">
                  <i className="h-1.5 w-1.5 rounded-full bg-ember-400/80" />
                  <i className="h-1.5 w-1.5 rounded-full bg-gold-300/80" />
                  <i className="h-1.5 w-1.5 rounded-full bg-lime-300/80" />
                  <span className="ml-2 truncate text-[0.625rem] text-fg-3">{it.domain}</span>
                </span>
                <span className="relative block aspect-[16/10]">
                  <Image src={it.image} alt={k < row.length ? `Sito ${it.name}` : ""} fill sizes="22rem" className="object-cover object-top" />
                  <span className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-night/95 to-transparent px-3 pb-2.5 pt-8 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                    <span className="font-display text-[0.9375rem] font-semibold text-fg">{it.name}</span>
                    <span className="text-[0.6875rem] font-semibold text-gold-200">Apri ↗</span>
                  </span>
                </span>
              </a>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
