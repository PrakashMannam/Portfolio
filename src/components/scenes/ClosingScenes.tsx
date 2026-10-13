import {
  about,
  contacts,
  education,
  identity,
  highlights,
  resume,
  footer,
} from "@/content/portfolio";
import { Reveal } from "@/components/ui/Reveal";
import { TechSection } from "@/components/skills/TechSection";

export function TechScene() {
  return (
    <div className="relative bg-background">
      <TechSection />

      {/* Highlights strip */}
      <div className="mx-auto -mt-6 pb-28 md:pb-36 max-w-5xl px-6 md:px-14">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {highlights.map((h, i) => (
            <Reveal key={h.label} delay={i * 120}>
              <div className="text-center">
                <p className="font-display text-4xl md:text-5xl">{h.metric}</p>
                <p className="eyebrow mt-3 text-muted-foreground">{h.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}

export function AboutScene() {
  return (
    <section id="about" className="relative bg-background py-28 sm:py-32" aria-label="About Me">
      {/* Subtle top divider */}
      <div className="absolute inset-x-0 top-0 h-px bg-border/40" />

      <div className="mx-auto max-w-7xl px-6 sm:px-10 md:px-14">
        {/* Section Header */}
        <div className="pb-12 border-b border-border/30">
          <p className="eyebrow text-xs sm:text-[0.78rem] font-semibold tracking-[0.24em] text-muted-foreground uppercase">
            03 — ABOUT
          </p>
          <h2 className="mt-3.5 font-display text-5xl sm:text-6xl md:text-7xl tracking-tight text-foreground">
            About Me
          </h2>
        </div>

        <div className="mt-14 grid gap-12 lg:grid-cols-12 items-start">
          {/* Left Column: Education & Bio */}
          <div className="lg:col-span-7">
            <p className="font-display text-2xl sm:text-3xl md:text-4xl leading-snug text-foreground/90">
              {about}
            </p>

            <div className="mt-8 rounded-2xl border border-border/40 bg-card/60 p-6 sm:p-8">
              <h3 className="eyebrow text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                Academic Background
              </h3>
              <p className="mt-3 text-base sm:text-lg font-semibold text-foreground">
                {education.degree}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{education.college}</p>
              <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground/80 font-mono">
                <span>{education.location}</span>
                <span>·</span>
                <span className="font-semibold text-foreground/80">{education.graduating}</span>
              </div>
            </div>

            {/* Resume Action Button */}
            <div className="mt-8">
              {resume.available ? (
                <a
                  href={resume.href ?? "/resume.pdf"}
                  download="Prakash_Mannam_Resume.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2.5 rounded-[12px] border border-foreground/25 bg-background px-6 py-3.5 text-xs font-semibold tracking-[0.16em] uppercase text-foreground transition-all duration-300 hover:border-foreground/60 hover:bg-foreground/[0.04]"
                >
                  <span className="text-sm">↓</span>
                  <span>DOWNLOAD RESUME</span>
                </a>
              ) : (
                <a
                  href={resume.emailHref}
                  className="inline-flex items-center gap-2.5 rounded-[12px] border border-foreground/25 bg-background px-6 py-3.5 text-xs font-semibold tracking-[0.16em] uppercase text-foreground transition-all duration-300 hover:border-foreground/60 hover:bg-foreground/[0.04]"
                >
                  <span className="text-sm">✉</span>
                  <span>{resume.placeholder} — REQUEST VIA EMAIL ↗</span>
                </a>
              )}
            </div>
          </div>

          {/* Right Column: Focus Areas */}
          <div className="lg:col-span-5 rounded-2xl border border-border/40 bg-card/40 p-6 sm:p-8 space-y-5">
            <h3 className="eyebrow text-xs font-semibold tracking-wider text-muted-foreground uppercase">
              Core Engineering Focus
            </h3>

            <div className="space-y-4 text-xs sm:text-sm text-muted-foreground">
              <div className="pb-3 border-b border-border/20">
                <p className="font-semibold text-foreground">Layered Architecture</p>
                <p className="mt-1 text-xs leading-relaxed">
                  Clean separation between controllers, business services, security filters, and
                  data persistence.
                </p>
              </div>

              <div className="pb-3 border-b border-border/20">
                <p className="font-semibold text-foreground">Concurrency & Networks</p>
                <p className="mt-1 text-xs leading-relaxed">
                  Deep curiosity in TCP sockets, thread pooling, and protocol implementations from
                  scratch.
                </p>
              </div>

              <div>
                <p className="font-semibold text-foreground">Algorithmic Problem Solving</p>
                <p className="mt-1 text-xs leading-relaxed">
                  500+ solved data structures and algorithms problems across LeetCode, CodeChef, and
                  GeeksforGeeks.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ContactScene() {
  return (
    <section
      id="contact"
      className="relative bg-background py-28 sm:py-36 overflow-hidden"
      aria-label="Contact"
    >
      {/* Subtle top divider */}
      <div className="absolute inset-x-0 top-0 h-px bg-border/40" />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-10 md:px-14 text-center">
        <p className="eyebrow text-xs sm:text-[0.78rem] font-semibold tracking-[0.24em] text-muted-foreground uppercase">
          04 — CONTACT
        </p>

        <h2 className="mt-4 font-display text-5xl sm:text-6xl md:text-8xl tracking-tight text-foreground">
          Let's build something.
        </h2>

        <p className="mx-auto mt-6 max-w-lg text-sm sm:text-base leading-relaxed text-muted-foreground">
          Open to software engineering roles, internships, collaborations, and challenging backend
          problems.
        </p>

        {/* Contact Links */}
        <div className="mt-12 flex flex-wrap justify-center gap-4 sm:gap-6">
          {contacts.map((c) => (
            <a
              key={c.label}
              href={c.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-foreground/20 bg-card/60 px-5 sm:px-6 py-3 text-xs sm:text-[0.8rem] font-semibold tracking-wider text-foreground transition-all duration-300 hover:border-foreground/50 hover:bg-card hover:-translate-y-0.5"
            >
              <span>{c.label}</span>
              <span className="text-xs">↗</span>
            </a>
          ))}
        </div>

        {/* Footer */}
        <footer className="mt-28 pt-8 border-t border-border/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p className="eyebrow text-xs">{footer.tagline}</p>
          <p className="eyebrow text-xs text-muted-foreground/70">
            © {footer.year} {identity.name}
          </p>
        </footer>
      </div>
    </section>
  );
}
