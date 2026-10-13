import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { ClientOnly } from "@tanstack/react-router";
import { identity, education, resume } from "@/content/portfolio";

const Sculpture = lazy(() => import("@/components/fold/Sculpture"));

// Clean SVG Icons for Hero Meta Details
function CapIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  );
}

function PinIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function CalendarIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  );
}

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const progress = useRef(0);
  const tickerRef = useRef<HTMLDivElement>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(media.matches);
    const onMediaChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    media.addEventListener("change", onMediaChange);

    const onScroll = () => {
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const scrollDist = Math.max(0, -rect.top);
      // Normalized distance to complete hero transition (around 70% of hero height)
      const range = Math.max(260, (section.offsetHeight || window.innerHeight) * 0.72);
      const rawProgress = Math.min(1, Math.max(0, scrollDist / range));
      progress.current = rawProgress;

      if (tickerRef.current) {
        // Fade out side ticker in sync with sculpture
        const tickerFade = Math.max(0, 1 - rawProgress * 1.5);
        tickerRef.current.style.opacity = tickerFade.toFixed(3);
        if (!media.matches) {
          tickerRef.current.style.transform = `translateY(calc(-50% - ${(rawProgress * 20).toFixed(1)}px))`;
        }
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      media.removeEventListener("change", onMediaChange);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex flex-col justify-between pt-24 sm:pt-28 md:pt-30 pb-6 sm:pb-8 overflow-hidden bg-background"
      aria-label="Prakash Mannam — Hero"
    >
      {/* 3D Glass Sculpture Canvas (Full bleed background, positioned on right half) */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <ClientOnly fallback={null}>
          <Suspense fallback={null}>
            <Sculpture progress={progress} reduced={reduced} />
          </Suspense>
        </ClientOnly>
      </div>

      {/* Right Margin Vertical Ticker Treatment: | IDEAS CODE BUILD REPEAT */}
      <div
        ref={tickerRef}
        className="pointer-events-none absolute right-3 sm:right-5 md:right-7 lg:right-9 xl:right-12 top-[28%] -translate-y-1/2 hidden md:flex items-center gap-3.5 z-20 select-none will-change-[transform,opacity]"
      >
        <div className="h-16 sm:h-20 w-px bg-foreground/25" />
        <div className="flex flex-col gap-1.5 text-[9.5px] font-medium tracking-[0.28em] text-muted-foreground/80 uppercase">
          <span>IDEAS</span>
          <span>CODE</span>
          <span>BUILD</span>
          <span>REPEAT</span>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 sm:px-10 md:px-14 flex-1 flex flex-col justify-center">
        {/* Mobile Horizontal Ticker */}
        <div className="md:hidden flex items-center gap-2 text-[8px] tracking-[0.24em] text-muted-foreground/70 uppercase mb-2">
          <span>IDEAS</span>
          <span>·</span>
          <span>CODE</span>
          <span>·</span>
          <span>BUILD</span>
          <span>·</span>
          <span>REPEAT</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Role, Name, Bio, Buttons */}
          <div className="lg:col-span-7 max-w-2xl">
            {/* Role Eyebrow */}
            <p className="eyebrow text-xs sm:text-[0.8rem] font-semibold tracking-[0.24em] text-muted-foreground uppercase">
              {identity.roles.join(" · ")}
            </p>

            {/* Large Two-Line Heading matching Reference */}
            <h1 className="mt-4 sm:mt-5 font-display text-[4rem] sm:text-7xl md:text-8xl lg:text-[6.4rem] leading-[0.92] tracking-tight text-foreground">
              Prakash
              <br />
              Mannam
            </h1>

            {/* Introduction Subtitle */}
            <p className="mt-5 sm:mt-6 max-w-xl text-base sm:text-lg leading-relaxed text-muted-foreground font-normal">
              {identity.statement}
            </p>

            {/* Action Buttons */}
            <div className="mt-7 sm:mt-8 flex flex-wrap items-center gap-3.5 sm:gap-4">
              <a
                href="#work"
                className="inline-flex items-center gap-2.5 rounded-[13px] bg-[#121214] dark:bg-foreground px-6 sm:px-7 py-3 sm:py-3.5 text-xs font-semibold tracking-[0.16em] uppercase text-white dark:text-background shadow-[0_2px_10px_rgba(0,0,0,0.12)] transition-all duration-300 hover:opacity-90 hover:scale-[1.01] hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
              >
                <span>VIEW PROJECTS</span>
                <span className="text-sm">→</span>
              </a>

              {resume.available ? (
                <a
                  href={resume.href ?? "/resume.pdf"}
                  download="Prakash_Mannam_Resume.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-[13px] border border-foreground/25 bg-background/50 backdrop-blur-sm px-6 sm:px-7 py-3 sm:py-3.5 text-xs font-semibold tracking-[0.16em] uppercase text-foreground transition-all duration-300 hover:border-foreground/60 hover:bg-foreground/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
                >
                  <span className="text-sm">↓</span>
                  <span>DOWNLOAD RESUME</span>
                </a>
              ) : (
                <a
                  href={resume.emailHref}
                  className="inline-flex items-center gap-2 rounded-[13px] border border-foreground/25 bg-background/50 backdrop-blur-sm px-6 sm:px-7 py-3 sm:py-3.5 text-xs font-semibold tracking-[0.16em] uppercase text-foreground transition-all duration-300 hover:border-foreground/60 hover:bg-foreground/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
                >
                  <span className="text-sm">↓</span>
                  <span>DOWNLOAD RESUME</span>
                </a>
              )}
            </div>
          </div>

          {/* Right Column Spacer (The 3D Canvas shines through here) */}
          <div className="lg:col-span-5 h-[280px] sm:h-[360px] lg:h-full relative pointer-events-none" />
        </div>
      </div>

      {/* Bottom Row: Metadata Info Groups (Left) & Scroll to Explore (Right) */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 sm:px-10 md:px-14 mt-10 sm:mt-14 pb-5 sm:pb-7">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          {/* Three Compact Information Groups */}
          <div className="flex flex-wrap items-center gap-6 sm:gap-8">
            {/* Group 1: Degree & College */}
            <div className="flex items-center gap-3">
              <div className="text-muted-foreground/80 shrink-0">
                <CapIcon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-semibold tracking-tight text-foreground">
                  B.Tech CSE
                </p>
                <p className="text-[0.72rem] sm:text-xs text-muted-foreground leading-snug">
                  {education.college}
                </p>
              </div>
            </div>

            {/* Subtle Vertical Divider */}
            <div className="hidden sm:block h-8 w-px bg-border/40" />

            {/* Group 2: Location */}
            <div className="flex items-center gap-3">
              <div className="text-muted-foreground/80 shrink-0">
                <PinIcon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-semibold tracking-tight text-foreground">
                  Ongole,
                </p>
                <p className="text-[0.72rem] sm:text-xs text-muted-foreground leading-snug">
                  Andhra Pradesh
                </p>
              </div>
            </div>

            {/* Subtle Vertical Divider */}
            <div className="hidden sm:block h-8 w-px bg-border/40" />

            {/* Group 3: Graduation */}
            <div className="flex items-center gap-3">
              <div className="text-muted-foreground/80 shrink-0">
                <CalendarIcon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-semibold tracking-tight text-foreground">
                  Graduating
                </p>
                <p className="text-[0.72rem] sm:text-xs text-muted-foreground leading-snug">2027</p>
              </div>
            </div>
          </div>

          {/* Right: Scroll to Explore Indicator */}
          <div className="flex items-center justify-end">
            <a
              href="#work"
              className="eyebrow flex items-center gap-2.5 text-[0.68rem] tracking-[0.24em] font-medium text-muted-foreground/80 transition-colors hover:text-foreground"
            >
              <span>SCROLL TO EXPLORE</span>
              <span className="text-xs animate-bounce">↓</span>
            </a>
          </div>
        </div>
      </div>

      {/* Thin Horizontal Divider Line separating Hero and Selected Work */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-border/40" />
    </section>
  );
}
