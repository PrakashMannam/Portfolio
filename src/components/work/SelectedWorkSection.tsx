import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import type { ComponentType, ReactNode } from "react";
import campusUi from "@/assets/campus-ui.jpg";
import { campusCoders, miniRedis } from "@/content/portfolio";
import { createMiniRedisSim } from "@/lib/miniredis-sim";
import {
  JavaIcon,
  SpringBootIcon,
  ReactIcon,
  MySQLIcon,
  NetworkingIcon,
  DsaIcon,
} from "@/components/skills/TechIcons";

type Line = { cmd: string; out: string; ok: boolean };
type Icon = ComponentType<{ className?: string }>;

const PROMPT = "127.0.0.1:6379>";
const SEED: Line[] = [
  { cmd: "PING", out: "+PONG", ok: true },
  { cmd: 'SET user:prakash "Backend Engineer"', out: "+OK", ok: true },
  { cmd: "GET user:prakash", out: '"Backend Engineer"', ok: true },
];

function TechPill({
  children,
  icon: Icon,
  iconClassName = "",
}: {
  children: ReactNode;
  icon?: Icon;
  iconClassName?: string;
}) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-background/75 px-3 py-1.5 text-[0.7rem] font-medium text-foreground/85 sm:text-xs">
      {Icon && <Icon className={`h-3.5 w-3.5 shrink-0 ${iconClassName}`} />}
      {children}
    </span>
  );
}

function ProjectLink({
  href,
  children,
  subtle = false,
}: {
  href: string;
  children: ReactNode;
  subtle?: boolean;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`eyebrow inline-flex min-h-9 items-center gap-2 border-b pb-1 text-[0.62rem] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:text-[0.68rem] ${
        subtle
          ? "border-muted-foreground/25 text-muted-foreground hover:border-foreground hover:text-foreground"
          : "border-foreground/35 font-semibold text-foreground hover:border-foreground"
      }`}
    >
      {children}
      <span aria-hidden="true" className="text-[0.75rem]">
        ↗
      </span>
    </a>
  );
}

export function SelectedWorkSection() {
  const sim = useMemo(() => {
    const instance = createMiniRedisSim();
    instance.execute('SET user:prakash "Backend Engineer"');
    return instance;
  }, []);
  const [terminalLines, setTerminalLines] = useState<Line[]>(SEED);
  const [terminalInput, setTerminalInput] = useState("");
  const terminalLogRef = useRef<HTMLDivElement>(null);
  const [showArch, setShowArch] = useState(false);
  const [activeLayer, setActiveLayer] = useState<number | null>(null);

  useEffect(() => {
    terminalLogRef.current?.scrollTo({ top: terminalLogRef.current.scrollHeight });
  }, [terminalLines]);

  function submitTerminal(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const command = terminalInput.trim();
    if (!command) return;
    setTerminalInput("");
    const result = sim.execute(command);
    setTerminalLines((previous) => [
      ...previous.slice(-14),
      { cmd: command, out: result.output, ok: result.ok },
    ]);
  }

  return (
    <section
      id="work"
      className="relative overflow-hidden bg-background pb-24 pt-12 sm:pb-28 sm:pt-16 md:pt-20"
      aria-label="Selected Work"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-10 md:px-14">
        {/* Editorial section heading */}
        <header className="grid gap-5 border-b border-border/40 pb-8 sm:pb-10 md:grid-cols-[1fr_auto] md:items-end md:gap-12">
          <div>
            <p className="eyebrow text-[0.65rem] font-medium text-muted-foreground sm:text-xs">
              01 <span className="mx-1.5 text-foreground/35">—</span> Selected Work
            </p>
            <h2 className="mt-3 font-display text-5xl leading-[0.94] tracking-tight text-foreground sm:text-6xl md:text-5xl lg:text-7xl">
              Selected Work
            </h2>
          </div>
          <p className="max-w-md pb-1 text-sm leading-relaxed text-muted-foreground sm:text-base md:max-w-sm">
            A few projects that showcase my interests and experience in building real systems.
          </p>
        </header>

        {/* Project 01 — the featured product */}
        <article className="relative border-b border-border/40 py-10 sm:py-14 md:py-16">
          <div className="grid items-center gap-8 md:gap-10 lg:grid-cols-[minmax(17rem,0.78fr)_minmax(0,1.22fr)] lg:gap-14">
            <div className="relative z-10">
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-mono text-xs text-muted-foreground">01</span>
                <span className="h-px w-6 bg-border" />
                <span className="eyebrow rounded-full border border-foreground/15 px-3 py-1 text-[0.56rem] font-medium text-muted-foreground">
                  {campusCoders.status}
                </span>
              </div>

              <h3 className="mt-5 font-display text-[2.8rem] leading-[0.95] tracking-tight text-foreground sm:text-5xl md:text-[3.6rem]">
                {campusCoders.title}
              </h3>
              <p className="mt-4 text-sm font-medium text-foreground/85 sm:text-base">
                {campusCoders.tagline}
              </p>
              <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground sm:text-[0.94rem]">
                {campusCoders.summary}
              </p>

              <div className="mt-6 flex flex-wrap gap-2" aria-label="Campus Coders technologies">
                <TechPill icon={JavaIcon}>Java</TechPill>
                <TechPill icon={SpringBootIcon} iconClassName="text-[#6DB33F]">
                  Spring Boot
                </TechPill>
                <TechPill icon={ReactIcon} iconClassName="text-[#61DAFB]">
                  React
                </TechPill>
                <TechPill icon={MySQLIcon} iconClassName="text-[#4479A1]">
                  MySQL
                </TechPill>
              </div>

              <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-border/35 pt-5 sm:mt-8">
                <ProjectLink href="https://campuscoders-theta.vercel.app">View project</ProjectLink>
                <button
                  type="button"
                  onClick={() => setShowArch((open) => !open)}
                  aria-expanded={showArch}
                  aria-controls="campus-coders-case-study"
                  className="eyebrow inline-flex min-h-9 items-center gap-2 border-b border-muted-foreground/30 pb-1 text-[0.62rem] font-medium text-muted-foreground transition-colors hover:border-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:text-[0.68rem]"
                >
                  {showArch ? "Close case study" : "Case study"}
                  <span aria-hidden="true">{showArch ? "−" : "＋"}</span>
                </button>
                <ProjectLink href="https://github.com/PrakashMannam" subtle>
                  GitHub
                </ProjectLink>
                <ProjectLink href="https://campuscoders-theta.vercel.app/api-docs" subtle>
                  API docs
                </ProjectLink>
              </div>
            </div>

            {/* Real product image in a spacious browser frame */}
            <div className="relative isolate min-w-0 py-2 sm:py-4">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-x-3 inset-y-7 -z-10 rotate-[-2deg] rounded-[1.8rem] border border-cyan-300/25 bg-gradient-to-br from-cyan-200/20 via-violet-200/15 to-orange-100/25 blur-[1px] sm:-inset-x-5"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-2 top-0 -z-10 h-24 w-24 rotate-[12deg] rounded-xl border border-violet-300/30 bg-gradient-to-br from-blue-200/20 to-violet-200/20 sm:-right-4 sm:h-32 sm:w-32"
              />
              <div className="overflow-hidden rounded-[1.1rem] border border-foreground/10 bg-card shadow-[0_18px_55px_-30px_rgba(26,36,52,0.28)] sm:rounded-[1.4rem]">
                <div className="flex h-10 items-center justify-between border-b border-border/50 bg-card/90 px-3 sm:h-11 sm:px-4">
                  <div className="flex items-center gap-1.5" aria-hidden="true">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F56]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#27C93F]" />
                  </div>
                  <span className="truncate rounded-md border border-border/40 bg-background/80 px-3 py-1 font-mono text-[0.58rem] text-muted-foreground sm:text-[0.65rem]">
                    campuscoders-theta.vercel.app
                  </span>
                  <span className="w-8" aria-hidden="true" />
                </div>
                <div className="aspect-[16/10] overflow-hidden bg-secondary/40 sm:aspect-[16/9]">
                  <img
                    src={campusUi}
                    alt="Campus Coders student learning and coding platform"
                    className="h-full w-full object-cover object-top"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>

          {showArch && (
            <div
              id="campus-coders-case-study"
              className="mt-10 border-t border-border/40 pt-7 sm:mt-12 sm:pt-9"
            >
              <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="eyebrow text-[0.6rem] text-muted-foreground">
                    A request through the stack
                  </p>
                  <h4 className="mt-2 font-display text-2xl text-foreground sm:text-3xl">
                    How Campus Coders is put together
                  </h4>
                </div>
                <p className="text-xs text-muted-foreground">
                  Select or hover a layer to inspect it.
                </p>
              </div>
              <ol className="grid gap-2 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-7">
                {campusCoders.layers.map((layer, index) => {
                  const selected = activeLayer === index;
                  return (
                    <li key={layer.name}>
                      <button
                        type="button"
                        onClick={() => setActiveLayer(selected ? null : index)}
                        onMouseEnter={() => setActiveLayer(index)}
                        onMouseLeave={() => setActiveLayer(null)}
                        onFocus={() => setActiveLayer(index)}
                        onBlur={() => setActiveLayer(null)}
                        aria-pressed={selected}
                        className={`flex min-h-32 w-full flex-col justify-between rounded-xl border p-3.5 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                          selected
                            ? "border-foreground bg-foreground text-background"
                            : "border-border/60 bg-card/50 text-foreground hover:bg-card"
                        }`}
                      >
                        <span className="flex w-full items-center justify-between border-b border-current/15 pb-2 font-mono text-[0.62rem] opacity-70">
                          0{index + 1}
                          <span aria-hidden="true">
                            {index < campusCoders.layers.length - 1 ? "→" : "✓"}
                          </span>
                        </span>
                        <span className="pt-3">
                          <span className="block text-xs font-semibold">{layer.name}</span>
                          <span
                            className={`mt-1.5 block text-[0.66rem] leading-snug ${selected ? "text-background/75" : "text-muted-foreground"}`}
                          >
                            {layer.note}
                          </span>
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ol>
            </div>
          )}
        </article>

        {/* Project 02 — systems work, deliberately distinct from the product showcase */}
        <article className="grid gap-8 py-10 sm:py-14 md:py-16 lg:grid-cols-[minmax(16rem,0.7fr)_minmax(0,1.3fr)] lg:items-center lg:gap-14">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-mono text-xs text-muted-foreground">02</span>
              <span className="h-px w-6 bg-border" />
              <span className="eyebrow rounded-full border border-foreground/15 px-3 py-1 text-[0.56rem] font-medium text-muted-foreground">
                {miniRedis.status}
              </span>
            </div>
            <h3 className="mt-5 font-display text-[2.8rem] leading-[0.95] tracking-tight text-foreground sm:text-5xl md:text-[3.6rem]">
              {miniRedis.title}
            </h3>
            <p className="mt-4 text-sm font-medium text-foreground/85 sm:text-base">
              {miniRedis.tagline}
            </p>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground sm:text-[0.94rem]">
              {miniRedis.summary}
            </p>

            <div className="mt-6 flex flex-wrap gap-2" aria-label="MiniRedis technologies">
              <TechPill icon={JavaIcon}>Java</TechPill>
              <TechPill icon={NetworkingIcon} iconClassName="text-blue-600">
                Networking
              </TechPill>
              <TechPill>Multithreading</TechPill>
              <TechPill icon={DsaIcon}>Data structures</TechPill>
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-border/35 pt-5 sm:mt-8">
              <ProjectLink href={miniRedis.github}>View project</ProjectLink>
              <ProjectLink href={miniRedis.github} subtle>
                Case study
              </ProjectLink>
            </div>
          </div>

          {/* Interactive local simulator and its request path */}
          <div className="min-w-0 overflow-hidden rounded-[1.15rem] border border-white/10 bg-[#111215] text-[#F3F4F6] shadow-[0_18px_55px_-28px_rgba(0,0,0,0.48)] sm:rounded-[1.4rem]">
            <div className="flex min-h-12 flex-wrap items-center justify-between gap-x-4 gap-y-2 border-b border-white/10 bg-[#1A1B1F] px-4 py-3 sm:px-5">
              <div className="flex items-center gap-2.5">
                <span className="flex gap-1.5" aria-hidden="true">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F56]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#27C93F]" />
                </span>
                <span className="font-mono text-[0.66rem] text-white/70 sm:text-xs">
                  MiniRedis / console
                </span>
              </div>
              <span className="eyebrow rounded-full border border-emerald-300/25 bg-emerald-300/10 px-2.5 py-1 text-[0.5rem] text-emerald-300 sm:text-[0.56rem]">
                Local browser simulation
              </span>
            </div>

            <div className="grid md:grid-cols-[minmax(0,1.08fr)_minmax(13rem,0.92fr)]">
              <div className="min-w-0 p-4 sm:p-5">
                <div className="mb-3 flex items-center justify-between gap-2">
                  <span className="eyebrow text-[0.56rem] text-white/45">Command line</span>
                  <span className="font-mono text-[0.58rem] text-white/35">in-memory session</span>
                </div>
                <div
                  ref={terminalLogRef}
                  className="max-h-48 min-h-36 overflow-y-auto pr-1 font-mono text-[0.68rem] leading-relaxed sm:max-h-56 sm:text-xs"
                  aria-label="MiniRedis simulated command history"
                  aria-live="polite"
                  aria-relevant="additions"
                >
                  <p className="mb-3 text-[0.62rem] leading-relaxed text-white/40 sm:text-[0.68rem]">
                    # Try PING, SET, GET, DEL, EXISTS, or KEYS
                    <br /># SET supports an optional EX seconds TTL
                  </p>
                  {terminalLines.map((line, index) => (
                    <div key={`${index}-${line.cmd}`} className="mb-2 break-words">
                      <p className="text-white/80">
                        <span className="text-sky-300">{PROMPT}</span> {line.cmd}
                      </p>
                      <p
                        className={
                          line.ok
                            ? "whitespace-pre-wrap text-emerald-300"
                            : "whitespace-pre-wrap text-rose-300"
                        }
                      >
                        {line.out}
                      </p>
                    </div>
                  ))}
                </div>
                <form
                  onSubmit={submitTerminal}
                  className="mt-3 flex min-w-0 items-center gap-2 border-t border-white/10 pt-3"
                  aria-label="Run a MiniRedis browser simulation command"
                >
                  <label
                    htmlFor="redis-cmd-input"
                    className="shrink-0 font-mono text-[0.62rem] text-sky-300 sm:text-xs"
                  >
                    {PROMPT}
                  </label>
                  <input
                    id="redis-cmd-input"
                    value={terminalInput}
                    onChange={(event) => setTerminalInput(event.target.value)}
                    placeholder="command + Enter"
                    autoComplete="off"
                    spellCheck={false}
                    className="min-w-0 flex-1 bg-transparent font-mono text-[0.68rem] text-white outline-none placeholder:text-white/30 focus-visible:ring-1 focus-visible:ring-sky-300 sm:text-xs"
                  />
                  <button
                    type="submit"
                    className="shrink-0 rounded-md bg-white/10 px-2.5 py-1.5 text-[0.62rem] font-medium text-white/80 transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 sm:px-3 sm:text-[0.68rem]"
                  >
                    Run
                  </button>
                </form>
              </div>

              <div className="border-t border-white/10 bg-white/[0.025] p-4 sm:p-5 md:border-l md:border-t-0">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <span className="eyebrow text-[0.56rem] text-white/45">Request path</span>
                  <span className="font-mono text-[0.58rem] text-white/35">architecture</span>
                </div>
                <ol className="space-y-0" aria-label="MiniRedis request architecture">
                  {miniRedis.path.map((node, index) => (
                    <li key={node} className="flex flex-col items-start">
                      <div className="flex min-h-9 w-full items-center gap-3 rounded-lg border border-white/10 bg-white/[0.035] px-3 py-2">
                        <span className="font-mono text-[0.58rem] text-sky-300/75">
                          0{index + 1}
                        </span>
                        <span className="text-[0.68rem] font-medium text-white/85 sm:text-xs">
                          {node}
                        </span>
                      </div>
                      {index < miniRedis.path.length - 1 && (
                        <span className="ml-5 h-4 border-l border-sky-300/35" aria-hidden="true" />
                      )}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
