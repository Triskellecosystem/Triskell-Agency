import { site } from "@/content/site";
import { cn } from "@/lib/cn";

/**
 * Due nastri di servizi che scorrono in direzioni opposte, leggermente inclinati: tanto movimento, zero JS.
 * Il primo è oro pieno, il secondo in contorno. Con reduced motion restano fermi (vedi .marquee in globals.css).
 */
export function ServiceMarquee() {
  const items = site.marquee;
  const row = (rev: boolean) => {
    const set = (hidden: boolean) => (
      <ul className="marquee-set flex shrink-0 items-center gap-8 pr-8 sm:gap-12 sm:pr-12" aria-hidden={hidden || undefined}>
        {items.map((item) => (
          <li key={item} className={cn("flex items-center gap-8 whitespace-nowrap font-display text-[clamp(1.75rem,1.2rem+2.4vw,3.5rem)] font-bold uppercase leading-none tracking-[-0.02em] sm:gap-12", rev ? "mq-outline" : "text-gold")}>
            <span>{item}</span>
            <span aria-hidden="true" className={cn("h-3 w-3 rotate-45", rev ? "bg-azure-300/70" : "bg-gold-300")} />
          </li>
        ))}
      </ul>
    );
    return (
      <div className={cn("marquee mq-big relative overflow-hidden py-3", rev && "marquee--rev")}>
        <div className="marquee-track flex w-max">
          {set(false)}
          {set(true)}
        </div>
      </div>
    );
  };
  return (
    <section aria-label="I nostri servizi" className="mq-band relative isolate overflow-hidden border-y border-line bg-night-deep/60 py-6 sm:py-8">
      <div className="mq-tilt">{row(false)}</div>
      <div className="mq-tilt mq-tilt--b">{row(true)}</div>
    </section>
  );
}
