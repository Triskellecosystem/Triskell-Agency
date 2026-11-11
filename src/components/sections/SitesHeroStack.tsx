import Image from "next/image";
import { site } from "@/content/site";

/** Apertura Siti web: tre siti veri in finestre del browser luminose, inclinate in 3D, sopra un anello d'oro. */
export function SitesHeroStack() {
  const pick = (id: string) => site.sitiWeb.items.find((s) => s.id === id)!;
  const cards = [
    { it: pick("mani"), cls: "shs-card--a" },
    { it: site.sitiWeb.items.find((s) => s.demo) ?? pick("nutrex"), cls: "shs-card--b" },
    { it: pick("chiodo"), cls: "shs-card--c" },
  ];
  return (
    <div aria-hidden="true" className="shs relative mx-auto aspect-[5/4] w-full max-w-[38rem]">
      <span className="shs-ring" />
      {cards.map(({ it, cls }) => (
        <div key={it.id} className={`shs-card ${cls}`}>
          <div className="flex items-center gap-1.5 border-b border-white/10 bg-[#0a1b2e] px-3 py-1.5">
            <i className="h-2 w-2 rounded-full bg-ember-400/90" />
            <i className="h-2 w-2 rounded-full bg-gold-300/90" />
            <i className="h-2 w-2 rounded-full bg-lime-300/90" />
            <span className="ml-2 truncate text-[0.625rem] text-fg-3">{it.domain}</span>
          </div>
          <div className="relative aspect-[16/10]">
            <Image src={it.image} alt="" fill sizes="26rem" className="object-cover object-top" />
          </div>
        </div>
      ))}
    </div>
  );
}
