import Link from "next/link";
import type { Service } from "@/content/site";
import { Icon } from "@/components/ui/Icon";
import { Spotlight } from "@/components/ui/Spotlight";
import { Reveal } from "@/components/motion/Reveal";

const TONES = ["#f7c85c", "#e1306c", "#3aa4d4", "#a78bfa", "#7fe0a0", "#22d3ee", "#fb923c", "#f472b6"];
/** Da dove arriva ogni scheda (x, y in vw/vh e rotazione): da tanti punti diversi dello schermo. */
const FROM = [
  ["-60vw", "-30vh", "-14deg"],
  ["-20vw", "-55vh", "10deg"],
  ["25vw", "-50vh", "-8deg"],
  ["60vw", "-25vh", "14deg"],
  ["-60vw", "30vh", "12deg"],
  ["-15vw", "55vh", "-10deg"],
  ["25vw", "50vh", "8deg"],
  ["60vw", "28vh", "-14deg"],
];

/**
 * Servizi: otto schede della stessa misura, piene (icona, titolo, riga, tre punti, risultato tipico). Quando la
 * sezione entra nello schermo arrivano da punti diversi e si posano al loro posto, poi galleggiano piano.
 */
export function ServicesBento({ items }: { items: Service[] }) {
  return (
    <Reveal y={0} blur={0}>
      <ul className="sv grid gap-3 max-md:grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((s, i) => {
          const [x, y, r] = FROM[i % FROM.length]!;
          return (
            <li key={s.title} className="sv-item h-full" style={{ "--fx": x, "--fy": y, "--fr": r, "--i": i, "--c": TONES[i % TONES.length] } as React.CSSProperties}>
              <Link href={s.href ?? "/contatti"} className="sv-float group/sv block h-full">
                <Spotlight className="si-card flex h-full flex-col rounded-[1.125rem] border bg-[linear-gradient(165deg,var(--color-surface-2),var(--color-night-raised))] p-5 transition-[transform,border-color,box-shadow] duration-[var(--dur-base)] ease-out-expo hover:-translate-y-1.5" size={280}>
                  <div className="relative z-[2] flex h-full flex-col">
                    <div className="flex items-start justify-between">
                      <span className="si-ico grid h-12 w-12 place-items-center rounded-2xl" style={{ animationDelay: `${i * 0.35}s` }}>
                        <Icon name={s.icon} className="h-6 w-6" strokeWidth={1.8} />
                      </span>
                      <Icon name="arrow-up-right" className="h-4 w-4 text-fg-3 transition-[transform,color] duration-300 group-hover/sv:-translate-y-0.5 group-hover/sv:translate-x-0.5 group-hover/sv:text-gold-300" />
                    </div>
                    <h3 className="mt-4 font-display text-[1.0625rem] font-bold leading-tight text-fg">{s.title}</h3>
                    <p className="mt-1 text-[0.8125rem] leading-snug text-fg-2">{s.text}</p>
                    <ul className="mt-3 space-y-1">
                      {s.details.slice(0, 3).map((d) => (
                        <li key={d} className="flex items-start gap-1.5 text-[0.75rem] leading-snug text-fg-2">
                          <Icon name="check" className="mt-0.5 h-3 w-3 shrink-0" strokeWidth={3} style={{ color: "var(--c)" }} />
                          {d}
                        </li>
                      ))}
                    </ul>
                    {s.kpi && (
                      <p className="mt-auto flex items-baseline gap-2 border-t border-white/[0.08] pt-3">
                        <span className="sv-kpi font-display text-[2rem] font-bold leading-none tracking-[-0.04em]" style={{ color: "var(--c)", textShadow: "0 0 24px color-mix(in srgb, var(--c) 45%, transparent)" }}>{s.kpi.value}</span>
                        <span className="text-[0.75rem] font-medium leading-tight text-fg-2">{s.kpi.label}</span>
                      </p>
                    )}
                  </div>
                </Spotlight>
              </Link>
            </li>
          );
        })}
      </ul>
    </Reveal>
  );
}
