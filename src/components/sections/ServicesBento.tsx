import Image from "next/image";
import Link from "next/link";
import type { Service } from "@/content/site";
import { Icon } from "@/components/ui/Icon";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";

/** Immagine di sfondo e colore del bordo di ogni servizio (stesso ordine di site.services.items). */
const LOOK: Array<{ img: string; color: string; pos?: string }> = [
  { img: "/cases/forme-fitness.webp", color: "#f7c85c" },
  { img: "/social-examples/vertis.webp", color: "#e1306c", pos: "50% 90%" },
  { img: "/sites/sfizi.jpg", color: "#3aa4d4" },
  { img: "/cases/urban-fitness.webp", color: "#a78bfa" },
  { img: "/cases/mela-med.webp", color: "#7fe0a0" },
  { img: "/cases/vip-fit.webp", color: "#22d3ee" },
  { img: "/cases/forme-at-home.webp", color: "#fb923c" },
  { img: "/social-examples/essentia.webp", color: "#f472b6", pos: "50% 90%" },
];

/**
 * Servizi: otto tessere della stessa misura, in ordine. Ognuna ha la sua immagine di sfondo (scurita) e un bordo
 * del proprio colore che si accende e gira al passaggio del mouse; titolo e una riga sola.
 */
export function ServicesBento({ items }: { items: Service[] }) {
  return (
    <RevealGroup className="grid gap-3 max-md:grid-cols-2 md:grid-cols-4" stagger={0.07}>
      {items.map((s, i) => {
        const look = LOOK[i % LOOK.length]!;
        return (
          <RevealItem key={s.title} y={18} className="h-full">
            <Link href={s.href ?? "/contatti"} className="svc2 group/s relative block h-full rounded-[1.125rem] p-[1.5px]" style={{ "--c": look.color } as React.CSSProperties}>
              <span aria-hidden="true" className="svc2-ring absolute inset-0 rounded-[inherit]" />
              <span className="relative flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-[calc(1.125rem-1.5px)] bg-night p-4 sm:aspect-[4/4.4]">
                <Image src={look.img} alt="" fill sizes="(min-width: 768px) 18rem, 46vw" className="object-cover opacity-55 transition-[transform,opacity] duration-700 ease-out-expo group-hover/s:scale-110 group-hover/s:opacity-75" style={{ objectPosition: look.pos ?? "50% 50%" }} />
                <span aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,rgb(1_15_28/0.2),rgb(1_15_28/0.65)_45%,rgb(1_15_28/0.97))]" />
                <span className="absolute left-4 top-4 grid h-9 w-9 place-items-center rounded-xl backdrop-blur-md" style={{ background: "color-mix(in srgb, var(--c) 22%, transparent)", color: "var(--c)" }}>
                  <Icon name={s.icon} className="h-4 w-4" strokeWidth={2} />
                </span>
                <Icon name="arrow-up-right" className="absolute right-4 top-4 h-4 w-4 text-white/60 transition-transform duration-[var(--dur-base)] group-hover/s:-translate-y-0.5 group-hover/s:translate-x-0.5 group-hover/s:text-white" />
                <span className="relative">
                  <span className="block font-display text-[1rem] font-bold leading-tight text-white sm:text-[1.125rem]">{s.title}</span>
                  <span className="mt-1 block text-[0.75rem] leading-snug text-white/70">{s.text}</span>
                  <span aria-hidden="true" className="mt-3 block h-[2px] w-8 rounded-full transition-[width] duration-500 ease-out-expo group-hover/s:w-16" style={{ background: "var(--c)" }} />
                </span>
              </span>
            </Link>
          </RevealItem>
        );
      })}
    </RevealGroup>
  );
}
