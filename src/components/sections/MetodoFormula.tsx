import { site } from "@/content/site";
import { cn } from "@/lib/cn";
import { Icon, type IconName } from "@/components/ui/Icon";

function Chip({ icon, name, kind, tag }: { icon: IconName; name: string; kind: "part" | "optional" | "result"; tag?: string }) {
  return (
    <span
      className={cn(
        "mf-chip relative inline-flex items-center gap-2 rounded-full border py-1.5 pl-1.5 pr-3.5 text-[0.875rem] font-semibold",
        kind === "part" && "border-azure-300/40 bg-azure-300/[0.08] text-fg",
        kind === "optional" && "border-dashed border-white/20 text-fg-2",
        kind === "result" && "mf-result border-gold-300 bg-gold-300/10 text-gold-200",
      )}
    >
      <span className={cn("grid h-7 w-7 place-items-center rounded-full", kind === "result" ? "bg-[image:var(--gradient-gold-btn)] text-night" : kind === "part" ? "bg-azure-300/15 text-azure-300" : "bg-white/5 text-fg-2")}>
        <Icon name={icon} className="h-3.5 w-3.5" strokeWidth={2} />
      </span>
      {name}
      {tag && <span className="ml-0.5 text-[0.625rem] font-medium uppercase tracking-wider text-fg-3">{tag}</span>}
    </span>
  );
}

const Op = ({ s }: { s: string }) => (
  <span aria-hidden="true" className={cn("mf-op grid h-7 w-7 shrink-0 place-items-center rounded-full font-display text-[0.9375rem] font-bold", s === "=" ? "bg-gold-300 text-night" : "border border-gold-300/60 text-gold-300")}>
    {s}
  </span>
);

/** La formula del Metodo Triskell, a schema: Social + Campagne (+ Sito, se serve) = Più clienti. */
export function MetodoFormula({ className, center }: { className?: string; center?: boolean }) {
  const f = site.metodo.formula;
  const [a, b] = f.parts;
  return (
    <div className={cn("flex flex-wrap items-center gap-2", center && "justify-center", className)} role="group" aria-label={`${a!.name} più ${b!.name}, più ${f.optional.name} se serve, uguale ${f.result.name}`}>
      <Chip icon={a!.icon} name={a!.name} kind="part" />
      <Op s="+" />
      <Chip icon={b!.icon} name={b!.name} kind="part" />
      <Op s="+" />
      <Chip icon={f.optional.icon} name={f.optional.name} kind="optional" tag={f.optional.tag} />
      <Op s="=" />
      <Chip icon={f.result.icon} name={f.result.name} kind="result" />
    </div>
  );
}
