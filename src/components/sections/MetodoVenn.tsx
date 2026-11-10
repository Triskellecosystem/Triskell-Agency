import { site } from "@/content/site";
import { LogoMark } from "@/components/brand/LogoMark";
import { Icon } from "@/components/ui/Icon";

/**
 * Il Metodo Triskell in un colpo d'occhio: due cerchi (Social, Campagne) che arrivano dai lati e si sovrappongono;
 * nell'intersezione si accende "Più clienti" con il simbolo Triskell. Sotto, il sito come elemento facoltativo.
 * Le animazioni partono quando un antenato riceve [data-revealed] (Reveal).
 */
export function MetodoVenn() {
  const v = site.metodo.venn;
  return (
    <div className="mv relative mx-auto w-full max-w-3xl" role="group" aria-label={`${v.social.title} più ${v.ads.title} uguale ${v.center}`}>
      <div className="mv-stage relative">
        <div className="mv-c mv-c--l">
          <p className="mv-title text-azure-300">
            <Icon name="smartphone" className="h-4 w-4" strokeWidth={2} />
            {v.social.title}
          </p>
          <ul className="mv-list">
            {v.social.points.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </div>
        <div className="mv-c mv-c--r">
          <p className="mv-title text-gold-300">
            <Icon name="click" className="h-4 w-4" strokeWidth={2} />
            {v.ads.title}
          </p>
          <ul className="mv-list">
            {v.ads.points.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </div>
        <div className="mv-core">
          <LogoMark size={44} sizes="44px" className="mv-logo" />
          <p className="mt-1.5 font-display text-[0.9375rem] font-bold leading-tight text-night">{v.center}</p>
        </div>
      </div>
      <p className="mv-site mx-auto mt-4 flex w-fit items-center gap-2 rounded-full border border-dashed border-white/20 px-3 py-1 text-[0.75rem] font-medium text-fg-2">
        <span className="font-display font-bold text-gold-300">+</span>
        <Icon name="monitor" className="h-3.5 w-3.5" strokeWidth={2} />
        {v.site}
      </p>
    </div>
  );
}
