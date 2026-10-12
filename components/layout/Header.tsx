"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { cn } from "@/lib/cn";
import { easeOut } from "@/lib/motion";
import { siteConfig } from "@/lib/site-config";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function Header() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [prevPath, setPrevPath] = useState(pathname);

  // Close the menu whenever the route changes
  if (prevPath !== pathname) {
    setPrevPath(pathname);
    setOpen(false);
  }

  // Solid background after a few pixels; tuck away while scrolling down
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    setScrolled(latest > 12);
    setHidden(latest > 240 && latest > previous + 2);
    if (latest < previous - 2) setHidden(false);
  });

  useEffect(() => {
    if (!open) return;
    const toggle = toggleRef.current;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      toggle?.focus();
    };
  }, [open]);

  return (
    <>
      <motion.header
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-500 ease-out-expo",
          scrolled ? "border-line bg-bg/80 backdrop-blur-md" : "border-transparent bg-transparent",
        )}
        animate={{ y: hidden && !open ? "-100%" : "0%" }}
        transition={{ duration: 0.5, ease: easeOut }}
      >
        <Container className="flex h-[var(--header-h)] items-center justify-between gap-6">
          <Logo height={34} priority className="shrink-0" />

          <nav aria-label="Hoofdnavigatie" className="hidden lg:block">
            <ul className="flex items-center gap-7 xl:gap-9">
              {siteConfig.nav.map((item) => {
                const active = isActive(pathname, item.href);
                return (
                  <li key={item.href} className="relative">
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "group relative block py-2 text-[12px] font-medium uppercase tracking-[0.16em] transition-colors duration-300",
                        active ? "text-ink" : "text-ink/70 hover:text-ink",
                      )}
                    >
                      {item.label}
                      <span
                        aria-hidden
                        className="absolute inset-x-0 -bottom-px h-px origin-left scale-x-0 bg-ink/40 transition-transform duration-500 ease-out-expo group-hover:scale-x-100"
                      />
                      {active && (
                        <motion.span
                          aria-hidden
                          layoutId="nav-active"
                          className="absolute inset-x-0 -bottom-px h-px bg-accent"
                          transition={{ duration: 0.6, ease: easeOut }}
                        />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden lg:block">
              <Button href={siteConfig.cta.login.href} variant="secondary" size="sm">
                {siteConfig.cta.login.label}
              </Button>
            </div>
            <div className="hidden sm:block">
              <Button href={siteConfig.cta.request.href} size="sm">
                {siteConfig.cta.request.label}
              </Button>
            </div>
            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen(true)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label="Menu openen"
              className="inline-flex h-10 w-10 items-center justify-center border border-line-strong text-ink transition-colors hover:border-accent hover:text-accent lg:hidden"
            >
              <Menu className="h-5 w-5" strokeWidth={1.5} />
            </button>
          </div>
        </Container>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-bg"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: easeOut }}
          >
            <div aria-hidden className="week-grid pointer-events-none absolute inset-0 opacity-60 [--cols:6]" />
            <Container className="relative flex h-[var(--header-h)] shrink-0 items-center justify-between border-b border-line">
              <Logo height={34} />
              <button
                ref={closeRef}
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Menu sluiten"
                className="inline-flex h-10 w-10 items-center justify-center border border-line-strong text-ink transition-colors hover:border-accent hover:text-accent"
              >
                <X className="h-5 w-5" strokeWidth={1.5} />
              </button>
            </Container>

            <Container className="relative flex flex-1 flex-col justify-between gap-12 py-10">
              <nav aria-label="Mobiele navigatie">
                <ul className="border-t border-line">
                  {siteConfig.nav.map((item, index) => {
                    const active = isActive(pathname, item.href);
                    return (
                      <motion.li
                        key={item.href}
                        className="border-b border-line"
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: easeOut, delay: 0.15 + index * 0.05 }}
                      >
                        <Link
                          href={item.href}
                          aria-current={active ? "page" : undefined}
                          className={cn(
                            "group flex items-baseline gap-5 py-4 text-[clamp(1.75rem,7vw,2.75rem)] font-light leading-tight tracking-[-0.02em] transition-colors",
                            active ? "text-accent" : "text-ink hover:text-accent",
                          )}
                        >
                          {item.label}
                        </Link>
                      </motion.li>
                    );
                  })}
                </ul>
              </nav>

              <motion.div
                className="flex flex-col gap-3 sm:flex-row"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: easeOut, delay: 0.5 }}
              >
                <Button href={siteConfig.cta.request.href} size="lg" arrow>
                  {siteConfig.cta.request.label}
                </Button>
                <Button href={siteConfig.cta.login.href} variant="secondary" size="lg">
                  {siteConfig.cta.login.label}
                </Button>
              </motion.div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
