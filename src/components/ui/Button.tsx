import Link from "next/link";
import { cn } from "@/lib/cn";
import { Icon, type IconName } from "./Icon";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg" | "xl";

interface CommonProps {
  variant?: Variant;
  size?: Size;
  icon?: IconName;
  /** Posizione dell'icona (default: dopo il testo). */
  iconPosition?: "start" | "end";
  /** Lampeggia: solo il pulsante, con un alone di luce che pulsa (niente anelli attorno). Per le azioni "Prenota ora". */
  pulse?: boolean;
  className?: string;
  children: React.ReactNode;
}

type ButtonProps = CommonProps & { href?: undefined } & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps>;
type LinkProps = CommonProps & { href: string } & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps | "href">;

// I pulsanti NON si spostano: restano sul loro asse. Feedback solo con luce (glow) e colore.
const base =
  "group/btn relative inline-flex select-none items-center justify-center gap-2.5 overflow-hidden whitespace-nowrap rounded-[14px] font-display font-semibold tracking-[-0.01em] " +
  "transition-[box-shadow,background-color,border-color,color,filter,opacity] duration-[var(--dur-base)] ease-out-expo " +
  "active:duration-100 disabled:pointer-events-none disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary:
    "btn-m-primary bg-[image:var(--gradient-gold-btn)] text-night shadow-glow-gold " +
    "hover:brightness-105 hover:shadow-[0_0_0_1px_rgb(255_247_190/0.7),0_0_44px_2px_rgb(255_185_27/0.6)] " +
    "active:brightness-[1.18] active:shadow-[0_0_0_2px_rgb(255_247_190/0.95),0_0_70px_10px_rgb(255_200_70/0.85)]",
  secondary:
    "btn-m-secondary border border-line-strong bg-night/40 text-fg backdrop-blur-sm " +
    "hover:border-gold-300/80 hover:text-gold-200 hover:shadow-[0_0_30px_-4px_rgb(247_200_92/0.5)] " +
    "active:border-gold-200 active:bg-gold-300/15 active:text-gold-100 active:shadow-[0_0_0_1px_rgb(253_218_90/0.8),0_0_50px_2px_rgb(247_200_92/0.65)]",
  ghost: "text-fg-2 hover:text-fg active:text-gold-200",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-4 text-[0.875rem]",
  md: "h-12 px-6 text-[0.9375rem]",
  lg: "h-14 px-7 text-[1rem]",
  xl: "h-16 px-9 text-[1.125rem] sm:h-[4.25rem] sm:px-12 sm:text-[1.25rem]",
};

/** Bottone / link con 3 varianti. Riflesso "shine" sulla primaria, freccia che scorre. */
export function Button(props: ButtonProps | LinkProps) {
  const { variant = "primary", size = "md", icon, iconPosition = "end", pulse = false, className, children, ...rest } = props;
  const classes = cn(base, variants[variant], sizes[size], pulse && "btn-blink", className);

  const content = (
    <>
      {variant === "primary" && (
        <span
          aria-hidden="true"
          className="btn-m-shine pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/45 to-transparent opacity-0 group-hover/btn:animate-[shine_0.9s_var(--ease-out-expo)] group-hover/btn:opacity-100"
        />
      )}
      {icon && iconPosition === "start" && <Icon name={icon} className="h-[1.1em] w-[1.1em] shrink-0" />}
      <span className="relative">{children}</span>
      {icon && iconPosition === "end" && (
        <Icon
          name={icon}
          className={cn(
            "relative h-[1.1em] w-[1.1em] shrink-0 transition-transform duration-[var(--dur-base)] ease-out-expo group-hover/btn:translate-x-0.5",
            icon === "loader" && "animate-spin group-hover/btn:translate-x-0",
          )}
        />
      )}
    </>
  );

  const withPulse = (button: React.ReactNode) => button;

  if ("href" in props && props.href !== undefined) {
    const { href, ...anchorRest } = rest as Omit<LinkProps, keyof CommonProps>;
    return withPulse(
      <Link href={href} className={classes} {...anchorRest}>
        {content}
      </Link>,
    );
  }
  return withPulse(
    <button type="button" className={classes} {...(rest as Omit<ButtonProps, keyof CommonProps>)}>
      {content}
    </button>,
  );
}
