import Image from "next/image";
import { site } from "@/content/site";

/**
 * Siti in un nastro curvo: le finestre del browser scorrono in orizzontale su un arco in 3D (quelle al centro
 * vengono avanti, quelle ai lati ruotano e si allontanano), in un ordine che non mette mai due siti uguali vicini.
 * Si ferma al passaggio del mouse. Solo CSS.
 */
export function SitesRibbon() {
  const items = site.sitiWeb.items;
  const row = [...items, ...items];
  return (
    <div aria-hidden="true" className="rb relative h-[19rem] overflow-hidden sm:h-[22rem]">
      <span className="phone-glow !top-1/2 !w-[70%]" />
      <div className="rb-stage absolute inset-0">
        <ul className="rb-track absolute left-0 top-1/2 flex w-max gap-6">
          {row.map((it, k) => (
            <li key={`${it.id}-${k}`} className="rb-item w-[19rem] shrink-0 overflow-hidden rounded-xl border border-white/15 bg-night shadow-[0_30px_60px_-24px_rgb(0_0_0/0.9)] sm:w-[23rem]">
              <div className="flex items-center gap-1 border-b border-white/10 bg-surface-2 px-2.5 py-1.5">
                <i className="h-1.5 w-1.5 rounded-full bg-ember-400/80" />
                <i className="h-1.5 w-1.5 rounded-full bg-gold-300/80" />
                <i className="h-1.5 w-1.5 rounded-full bg-lime-300/80" />
                <span className="ml-2 truncate text-[0.625rem] text-fg-3">{it.domain}</span>
              </div>
              <div className="relative aspect-[16/10]">
                <Image src={it.image} alt="" fill sizes="23rem" className="object-cover object-top" />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
