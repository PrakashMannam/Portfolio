import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

/**
 * Persistent top header for the portfolio.
 * Stays fixed at the top of the viewport across all scenes.
 * Renders transparent at the very top, and transitions to a subtle frosted glass
 * bar once the user scrolls down, preserving the editorial aesthetic.
 */
export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 40);
    }
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ease-out ${
        scrolled
          ? "bg-background/80 py-4 backdrop-blur-md border-b border-border/30 shadow-[0_4px_24px_-8px_oklch(0_0_0/0.08)] md:py-5"
          : "bg-transparent py-7 md:py-9"
      } px-6 md:px-14`}
      aria-label="Site header"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <a
          href="#"
          aria-label="Prakash Mannam — back to top"
          className="font-display text-2xl tracking-tight transition-opacity hover:opacity-75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          PM
        </a>

        <div className="flex items-center gap-7 sm:gap-10">
          <nav
            className="flex items-center gap-6 sm:gap-10 text-[0.72rem] tracking-[0.24em] font-medium uppercase text-muted-foreground"
            aria-label="Main navigation"
          >
            <a
              href="#work"
              className="transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              WORK
            </a>
            <a
              href="#about"
              className="transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              ABOUT
            </a>
            <a
              href="#contact"
              className="transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              CONTACT
            </a>
          </nav>

          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
