import type { Social } from "@/content/site";

/** Icone social tracciate a mano (Lucide non include più i loghi dei brand). */
export function SocialIcon({ id, className }: { id: Social["id"]; className?: string }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.75,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className,
    "aria-hidden": true,
    focusable: false,
  };
  switch (id) {
    case "instagram":
      return (
        <svg {...common}>
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.4" cy="6.6" r="0.7" fill="currentColor" stroke="none" />
        </svg>
      );
    case "whatsapp":
      return (
        <svg {...common}>
          <path d="M3.5 20.5l1.3-4.4A8.5 8.5 0 1 1 8 19.3z" />
          <path d="M9 8.6c.2 2.7 2.8 5.5 5.7 6.1l1.2-1.3-2-1-1 .7c-.8-.4-1.6-1.2-2-2l.7-1-1-2z" fill="currentColor" stroke="none" />
        </svg>
      );
    case "tiktok":
      return (
        <svg {...common}>
          <path d="M14 3v11.2a3.7 3.7 0 1 1-3.7-3.7" />
          <path d="M14 3c.4 2.6 2 4.2 4.6 4.5" />
        </svg>
      );
    case "youtube":
      return (
        <svg {...common}>
          <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
          <path d="m10.2 9.4 4.6 2.6-4.6 2.6z" fill="currentColor" />
        </svg>
      );
  }
}
