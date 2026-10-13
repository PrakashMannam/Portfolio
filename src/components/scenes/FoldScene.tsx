import { lazy, Suspense, useLayoutEffect, useRef, useState } from "react";
import { ClientOnly } from "@tanstack/react-router";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { campusCoders, identity } from "@/content/portfolio";

const Sculpture = lazy(() => import("@/components/fold/Sculpture"));

/**
 * Scenes 01–02: the object, then the fold that reveals Campus Coders.
 * One ScrollTrigger maps scroll to progress 0..1. It is written to a ref
 * (read by the 3D sculpture each frame) and to a CSS variable --p
 * (read by the typography overlays). Both are pure functions of scroll.
 */
export function FoldScene() {
  const root = useRef<HTMLElement>(null);
  const progress = useRef(0);
  const [reduced, setReduced] = useState(false);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = root.current;
    if (!el) return;
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    el.style.setProperty("--p", "0");
    const st = ScrollTrigger.create({
      trigger: el,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        progress.current = self.progress;
        el.style.setProperty("--p", self.progress.toFixed(4));
      },
    });
    return () => st.kill();
  }, []);

  return (
    <section ref={root} className="relative h-[380vh]" aria-label="The Impossible Fold">
      <div id="work" className="absolute top-[210vh]" tabIndex={-1} aria-hidden="true" />
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="fold-ground absolute inset-0" />
        <div className="absolute inset-0">
          <ClientOnly fallback={null}>
            <Suspense fallback={null}>
              <Sculpture progress={progress} reduced={reduced} />
            </Suspense>
          </ClientOnly>
        </div>

        {/* Scene 01 — the object */}
        <div
          className="pointer-events-none absolute inset-0 flex flex-col justify-end px-6 pb-10 md:justify-center md:px-14 md:pb-0"
          style={{
            opacity: "clamp(0, 1 - var(--p) * 5, 1)",
            transform: "translateY(calc(var(--p) * -120px))",
          }}
        >
          <div className="max-w-md">
            <p className="eyebrow text-muted-foreground">{identity.roles.join(" · ")}</p>
            <h1 className="mt-5 font-display text-6xl leading-[0.92] tracking-tight md:text-8xl">
              Prakash
              <br />
              Mannam
            </h1>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-muted-foreground">
              {identity.statement}
            </p>
          </div>
        </div>
        <div
          className="eyebrow pointer-events-none absolute bottom-8 right-6 hidden md:flex items-center gap-3 text-muted-foreground md:right-14"
          style={{ opacity: "clamp(0, 1 - var(--p) * 6, 1)" }}
        >
          Scroll to unfold <span className="block h-10 w-px bg-foreground/40" />
        </div>

        {/* Scene 02 — Campus Coders, revealed in sequence */}
        <div className="pointer-events-none absolute inset-0 flex flex-col justify-end px-6 pb-10 md:justify-center md:px-14 md:pb-0">
          <div className="max-w-sm pointer-events-auto">
            <div
              className="flex items-center gap-3"
              style={{ opacity: "clamp(0, (var(--p) - 0.5) * 6, 1)" }}
            >
              <p className="eyebrow text-muted-foreground">01 — Project</p>
              <span className="eyebrow rounded-full border border-foreground/25 px-2.5 py-0.5 text-[0.58rem] text-muted-foreground">
                {campusCoders.status}
              </span>
            </div>
            <h2
              className="mt-4 font-display text-5xl leading-[0.95] md:text-7xl"
              style={{
                opacity: "clamp(0, (var(--p) - 0.56) * 6, 1)",
                transform: "translateY(calc(clamp(0, 0.72 - var(--p), 1) * 80px))",
              }}
            >
              Campus
              <br />
              Coders
            </h2>
            <p
              className="mt-5 text-sm leading-relaxed text-muted-foreground"
              style={{ opacity: "clamp(0, (var(--p) - 0.66) * 6, 1)" }}
            >
              {campusCoders.tagline}. {campusCoders.summary}
            </p>
            <div
              className="mt-8 flex flex-wrap gap-6"
              style={{ opacity: "clamp(0, (var(--p) - 0.76) * 6, 1)", pointerEvents: "auto" }}
            >
              {campusCoders.links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                  className="eyebrow border-b border-foreground/40 pb-1 transition-colors hover:border-foreground"
                >
                  {l.label} ↗
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
