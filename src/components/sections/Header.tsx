"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, m } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { site, type NavLink } from "@/content/site";
import { cn } from "@/lib/cn";
import { getLenis } from "@/lib/lenis";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

const linkBase = "relative inline-flex h-11 items-center px-4 text-[0.9375rem] font-medium text-fg-2 transition-colors hover:text-fg aria-[current=page]:text-fg";

function isActive(item: NavLink, pathname: string): boolean {
  const own = item.href !== "#" && (item.href === "/" ? pathname === "/" : pathname === item.href || pathname.startsWith(`${item.href}/`));
  return own || !!item.children?.some((c) => c.href !== "#" && (pathname === c.href || pathname.startsWith(`${c.href}/`)));
}

const Underline = ({ on }: { on: boolean }) => (
  <span
    aria-hidden="true"
    className={cn(
      "absolute inset-x-4 bottom-2 h-px origin-left scale-x-0 bg-gold-300 transition-transform duration-[var(--dur-base)] ease-out-expo group-hover/link:scale-x-100",
      on && "scale-x-100",
    )}
  />
);

/** Header sticky con blur. Si compatta allo scroll (solo transform). Logo a destra, "Prenota ora" in fondo. */
export function Header() {
  const pathname = usePathname();
  const [compact, setCompact] = useState(false);
  // il sottomenu aperto vale solo per la pagina in cui è stato aperto: al cambio pagina si chiude da solo
  const [openState, setOpenState] = useState<{ key: string; path: string } | null>(null);
  const openKey = openState && openState.path === pathname ? openState.key : null;
  const setOpenKey = (next: string | null | ((cur: string | null) => string | null)) => {
    const value = typeof next === "function" ? next(openKey) : next;
    setOpenState(value ? { key: value, path: pathname } : null);
  };
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const hoverTimer = useRef(0);

  /* Compattamento allo scroll */
  useEffect(() => {
    let ticking = false;
    const update = () => {
      setCompact(window.scrollY > 24);
      ticking = false;
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Dropdown: click fuori */
  useEffect(() => {
    if (!openKey) return;
    const onDown = (e: PointerEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpenState(null);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [openKey]);

  /* Menu mobile: blocco scroll, focus, Esc, trap del Tab */
  const closeMenu = useCallback((restoreFocus = true) => {
    document.documentElement.classList.remove("menu-open");
    getLenis()?.start();
    setMenuOpen(false);
    if (restoreFocus) menuButtonRef.current?.focus();
  }, []);

  const openMenu = () => {
    document.documentElement.classList.add("menu-open");
    getLenis()?.stop();
    setMenuOpen(true);
  };

  useEffect(() => {
    if (!menuOpen) return;
    closeButtonRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
      if (e.key !== "Tab" || !panelRef.current) return;
      const focusables = panelRef.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (!first || !last) return;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen, closeMenu]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 64rem)");
    const onChange = () => mq.matches && menuOpen && closeMenu(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [menuOpen, closeMenu]);

  const hoverOpen = (key: string) => (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    window.clearTimeout(hoverTimer.current);
    setOpenKey(key);
  };
  const hoverClose = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    window.clearTimeout(hoverTimer.current);
    hoverTimer.current = window.setTimeout(() => setOpenKey(null), 160);
  };

  return (
    <>
      <header className="group/header fixed inset-x-0 top-0 z-50">
        {/* Pannello blur: appare e si accorcia con transform/opacity */}
        <div
          aria-hidden="true"
          className={cn(
            "absolute inset-0 origin-top border-b border-line bg-night/70 transition-[transform,opacity] duration-[var(--dur-slow)] ease-out-expo",
            compact ? "scale-y-[0.78] opacity-100 backdrop-blur-xl" : "opacity-0",
          )}
        />
        <div
          className={cn(
            "container-x relative flex h-[var(--header-h)] items-center justify-between transition-transform duration-[var(--dur-slow)] ease-out-expo",
            compact && "-translate-y-2",
          )}
        >
          <div className="flex items-center gap-4">
            <button
              ref={menuButtonRef}
              type="button"
              onClick={openMenu}
              aria-label={site.nav.menuOpen}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="-ml-2 inline-flex h-11 w-11 items-center justify-center rounded-xl text-fg transition-colors hover:text-gold-300 lg:hidden"
            >
              <Icon name="menu" className="h-6 w-6" />
            </button>

            <nav ref={navRef} aria-label="Principale" className="hidden lg:block">
              <ul className="flex items-center gap-0.5">
                {site.nav.items.map((item) => {
                  const active = isActive(item, pathname);
                  const key = item.label;
                  const open = openKey === key;

                  if (!item.children) {
                    return (
                      <li key={key}>
                        <Link href={item.href} aria-current={active ? "page" : undefined} className={cn("group/link", linkBase)}>
                          {item.label}
                          <Underline on={active} />
                        </Link>
                      </li>
                    );
                  }

                  const panelId = `nav-${key}`;
                  const hasOwnPage = item.href !== "#";
                  return (
                    <li
                      key={key}
                      className="relative"
                      onPointerEnter={hoverOpen(key)}
                      onPointerLeave={hoverClose}
                      onBlur={(e) => {
                        if (!e.currentTarget.contains(e.relatedTarget)) setOpenKey((k) => (k === key ? null : k));
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Escape" && open) {
                          setOpenKey(null);
                          (e.currentTarget.querySelector("button") as HTMLElement | null)?.focus();
                        }
                      }}
                    >
                      <div className="flex items-center">
                        {hasOwnPage ? (
                          <Link href={item.href} aria-current={active ? "page" : undefined} className={cn("group/link pr-1", linkBase)}>
                            {item.label}
                            <Underline on={active} />
                          </Link>
                        ) : null}
                        <button
                          type="button"
                          aria-expanded={open}
                          aria-controls={panelId}
                          aria-label={hasOwnPage ? `Apri il sottomenu ${item.label}` : undefined}
                          onClick={() => setOpenKey(open ? null : key)}
                          className={cn(
                            "group/link inline-flex h-11 items-center gap-1.5 text-[0.9375rem] font-medium text-fg-2 transition-colors hover:text-fg",
                            hasOwnPage ? "-ml-1 pl-1 pr-3" : "px-4",
                            !hasOwnPage && active && "text-fg",
                          )}
                        >
                          {!hasOwnPage && item.label}
                          <Icon name="chevron-down" className={cn("h-4 w-4 transition-transform duration-[var(--dur-base)] ease-out-expo", open && "rotate-180")} />
                        </button>
                      </div>
                      <AnimatePresence>
                        {open && (
                          <m.ul
                            id={panelId}
                            initial={{ opacity: 0, y: -6, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -4, scale: 0.98 }}
                            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                            className="absolute left-0 top-full z-10 mt-1 w-72 origin-top-left rounded-2xl border border-line-strong bg-surface-2/95 p-2 shadow-card backdrop-blur-xl"
                          >
                            {item.children.map((child) => (
                              <li key={child.href}>
                                <Link
                                  href={child.href}
                                  onClick={() => setOpenKey(null)}
                                  aria-current={pathname === child.href ? "page" : undefined}
                                  className="group/item flex items-center justify-between gap-3 rounded-xl px-3 py-3 transition-colors hover:bg-surface-3 aria-[current=page]:bg-surface-3"
                                >
                                  <span>
                                    <span className="block text-[0.9375rem] font-semibold text-fg">{child.label}</span>
                                    {child.hint && <span className="block text-small text-fg-3">{child.hint}</span>}
                                  </span>
                                  <Icon name="arrow-up-right" className="h-4 w-4 text-gold-300 transition-transform duration-[var(--dur-base)] ease-out-expo group-hover/item:translate-x-0.5 group-hover/item:-translate-y-0.5" />
                                </Link>
                              </li>
                            ))}
                          </m.ul>
                        )}
                      </AnimatePresence>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>

          <div className="flex items-center gap-5 xl:gap-7">
            <div className="hidden lg:block">
              <Button href={site.nav.cta.href} size="sm" icon="calendar" iconPosition="start">
                {site.nav.cta.label}
              </Button>
            </div>
            <Logo compactOnXs className={cn("origin-right transition-transform duration-[var(--dur-slow)] ease-out-expo", compact && "scale-[0.9]")} />
          </div>
        </div>
      </header>

      {/* Menu mobile a pannello fullscreen */}
      <AnimatePresence>
        {menuOpen && (
          <m.div
            ref={panelRef}
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[65] flex flex-col overflow-y-auto bg-night lg:hidden"
          >
            <div aria-hidden="true" className="bg-grid pointer-events-none fixed inset-0 opacity-70" />
            <div aria-hidden="true" className="pointer-events-none fixed inset-0 bg-[image:var(--gradient-bg-hero)] opacity-80" />
            <div className="container-x relative flex h-[var(--header-h)] shrink-0 items-center justify-between">
              <button
                ref={closeButtonRef}
                type="button"
                onClick={() => closeMenu()}
                aria-label={site.nav.menuClose}
                className="-ml-2 inline-flex h-11 w-11 items-center justify-center rounded-xl text-fg transition-colors hover:text-gold-300"
              >
                <Icon name="close" className="h-6 w-6" />
              </button>
              <Logo compactOnXs />
            </div>

            <nav aria-label="Menu mobile" className="container-x relative flex flex-1 flex-col justify-center py-6">
              <ul>
                {site.nav.items.map((item, i) => (
                  <m.li
                    key={item.label}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10, transition: { duration: 0.15, delay: 0 } }}
                    transition={{ duration: 0.55, delay: 0.06 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                    className="border-b border-line"
                  >
                    {item.href !== "#" ? (
                      <Link
                        href={item.href}
                        onClick={() => closeMenu(false)}
                        aria-current={isActive(item, pathname) ? "page" : undefined}
                        className="flex items-baseline gap-4 py-3.5 font-display text-[clamp(1.75rem,1.3rem+2.4vw,2.5rem)] font-bold tracking-tight text-fg transition-colors hover:text-gold-300 aria-[current=page]:text-gold-300"
                      >
                        <span className="w-7 text-small font-medium text-gold-400">{String(i + 1).padStart(2, "0")}</span>
                        {item.label}
                      </Link>
                    ) : (
                      <p className="flex items-baseline gap-4 py-3.5 font-display text-[clamp(1.75rem,1.3rem+2.4vw,2.5rem)] font-bold tracking-tight text-fg">
                        <span className="w-7 text-small font-medium text-gold-400">{String(i + 1).padStart(2, "0")}</span>
                        {item.label}
                      </p>
                    )}
                    {item.children && (
                      <ul className="mb-3 ml-11 space-y-0.5">
                        {item.children
                          .filter((c) => c.href !== item.href)
                          .map((c) => (
                            <li key={c.href}>
                              <Link
                                href={c.href}
                                onClick={() => closeMenu(false)}
                                className="inline-flex items-center gap-2 py-2 text-[1.0625rem] text-fg-2 transition-colors hover:text-gold-300"
                              >
                                <Icon name="chevron-right" className="h-4 w-4 text-gold-400" />
                                {c.label}
                              </Link>
                            </li>
                          ))}
                      </ul>
                    )}
                  </m.li>
                ))}
              </ul>
            </nav>

            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, transition: { duration: 0.15, delay: 0 } }}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="container-x relative pb-[max(2rem,env(safe-area-inset-bottom))]"
            >
              <Button href={site.nav.cta.href} size="lg" icon="arrow-right" className="w-full" onClick={() => closeMenu(false)}>
                {site.nav.cta.label}
              </Button>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
