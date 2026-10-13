import { useState, useRef, useEffect, type ReactNode } from "react";
import {
  JavaIcon,
  SpringBootIcon,
  SpringSecurityIcon,
  HibernateIcon,
  ReactIcon,
  JavaScriptIcon,
  MySQLIcon,
  JpaHibernateIcon,
  GitIcon,
  DockerIcon,
  MavenIcon,
  IntelliJIcon,
  JUnitIcon,
  NetworkingIcon,
  DsaIcon,
  RestApiIcon,
} from "./TechIcons";

interface TechItem {
  id: string;
  name: string;
  icon: (props: { className?: string }) => ReactNode;
  brandColor: string;
  haloRgb: string;
  hoverAnimClass: string;
}

interface Category {
  id: string;
  title: string;
  dotColor: string;
  accentRgb: string;
  items: TechItem[];
  // Genuine skills & architectural focus from Prakash's projects
  summary: string;
  highlights: string[];
}

const CATEGORIES: Category[] = [
  {
    id: "backend",
    title: "BACKEND",
    dotColor: "#8B5CF6",
    accentRgb: "139, 92, 246",
    items: [
      {
        id: "java",
        name: "Java",
        icon: JavaIcon,
        brandColor: "#E76F00",
        haloRgb: "231, 111, 0",
        hoverAnimClass: "group-hover:-translate-y-1.5 transition-transform duration-300",
      },
      {
        id: "spring-boot",
        name: "Spring Boot",
        icon: SpringBootIcon,
        brandColor: "#6DB33F",
        haloRgb: "109, 179, 63",
        hoverAnimClass:
          "group-hover:rotate-6 group-hover:scale-105 transition-transform duration-300",
      },
      {
        id: "spring-security",
        name: "Spring Security",
        icon: SpringSecurityIcon,
        brandColor: "#2E7D32",
        haloRgb: "46, 125, 50",
        hoverAnimClass: "group-hover:scale-105 transition-transform duration-300",
      },
      {
        id: "hibernate",
        name: "Hibernate",
        icon: HibernateIcon,
        brandColor: "#BCAE79",
        haloRgb: "188, 174, 121",
        hoverAnimClass:
          "group-hover:rotate-[-4deg] group-hover:scale-105 transition-transform duration-300",
      },
    ],
    summary:
      "Production-ready Spring Boot services, security filter chains, and layered architecture.",
    highlights: [
      "RESTful API Design",
      "Spring Security Guarding",
      "Entity Relationships",
      "Global Exception Handling",
    ],
  },
  {
    id: "frontend",
    title: "FRONTEND",
    dotColor: "#3B82F6",
    accentRgb: "59, 130, 246",
    items: [
      {
        id: "react",
        name: "React",
        icon: ReactIcon,
        brandColor: "#61DAFB",
        haloRgb: "97, 218, 251",
        hoverAnimClass:
          "group-hover:rotate-90 group-hover:scale-105 transition-transform duration-500 ease-out",
      },
      {
        id: "javascript",
        name: "JavaScript",
        icon: JavaScriptIcon,
        brandColor: "#F7DF1E",
        haloRgb: "247, 223, 30",
        hoverAnimClass:
          "group-hover:scale-105 group-hover:-translate-y-1 transition-transform duration-300",
      },
    ],
    summary: "Modern client-side applications with reactive state, smooth routing, and clean UI.",
    highlights: [
      "Component Architecture",
      "Custom Hooks & State",
      "Responsive Tailwind UI",
      "Client-Side Routing",
    ],
  },
  {
    id: "database",
    title: "DATABASE",
    dotColor: "#EA580C",
    accentRgb: "234, 88, 12",
    items: [
      {
        id: "mysql",
        name: "MySQL",
        icon: MySQLIcon,
        brandColor: "#00758F",
        haloRgb: "0, 117, 143",
        hoverAnimClass:
          "group-hover:-translate-y-1.5 group-hover:rotate-[-3deg] transition-transform duration-300",
      },
      {
        id: "jpa-hibernate",
        name: "JPA / Hibernate",
        icon: JpaHibernateIcon,
        brandColor: "#DC2626",
        haloRgb: "220, 38, 38",
        hoverAnimClass:
          "group-hover:scale-105 group-hover:-translate-y-1 transition-transform duration-300",
      },
    ],
    summary: "Relational persistence, ACID compliance, and optimized Object-Relational Mapping.",
    highlights: [
      "Relational Schema Design",
      "JPA Entity Mapping",
      "Transactional Integrity",
      "Query Optimization",
    ],
  },
  {
    id: "tools-devops",
    title: "TOOLS & DEVOPS",
    dotColor: "#14B8A6",
    accentRgb: "20, 184, 166",
    items: [
      {
        id: "git",
        name: "Git",
        icon: GitIcon,
        brandColor: "#F05032",
        haloRgb: "240, 80, 50",
        hoverAnimClass:
          "group-hover:rotate-6 group-hover:scale-105 transition-transform duration-300",
      },
      {
        id: "docker",
        name: "Docker",
        icon: DockerIcon,
        brandColor: "#2496ED",
        haloRgb: "36, 150, 237",
        hoverAnimClass: "group-hover:-translate-y-1.5 transition-transform duration-300",
      },
      {
        id: "maven",
        name: "Maven",
        icon: MavenIcon,
        brandColor: "#C71A36",
        haloRgb: "199, 26, 54",
        hoverAnimClass:
          "group-hover:rotate-[-6deg] group-hover:scale-105 transition-transform duration-300",
      },
      {
        id: "intellij-idea",
        name: "IntelliJ IDEA",
        icon: IntelliJIcon,
        brandColor: "#7B2CBF",
        haloRgb: "123, 44, 191",
        hoverAnimClass:
          "group-hover:scale-105 group-hover:-translate-y-1 transition-transform duration-300",
      },
    ],
    summary:
      "Containerization, automated build lifecycle, version control, and engineering workflow.",
    highlights: [
      "Multi-Stage Docker Builds",
      "Git Feature Workflows",
      "Maven Lifecycle & Plugins",
      "IDE Debugging & Profiling",
    ],
  },
  {
    id: "concepts",
    title: "CONCEPTS",
    dotColor: "#8B5CF6",
    accentRgb: "139, 92, 246",
    items: [
      {
        id: "junit",
        name: "JUnit",
        icon: JUnitIcon,
        brandColor: "#25A162",
        haloRgb: "37, 161, 98",
        hoverAnimClass:
          "group-hover:scale-105 group-hover:-translate-y-1 transition-transform duration-300",
      },
      {
        id: "networking",
        name: "Networking",
        icon: NetworkingIcon,
        brandColor: "#1D4ED8",
        haloRgb: "29, 78, 216",
        hoverAnimClass: "group-hover:scale-105 transition-transform duration-300",
      },
      {
        id: "dsa",
        name: "DSA",
        icon: DsaIcon,
        brandColor: "#475569",
        haloRgb: "71, 85, 105",
        hoverAnimClass: "group-hover:scale-105 transition-transform duration-300",
      },
      {
        id: "rest-apis",
        name: "REST APIs",
        icon: RestApiIcon,
        brandColor: "#0284C7",
        haloRgb: "2, 132, 199",
        hoverAnimClass: "group-hover:-translate-y-1.5 transition-transform duration-300",
      },
    ],
    summary:
      "Core systems programming, protocol implementations, algorithms, and automated testing.",
    highlights: [
      "TCP Socket Servers",
      "RESP Protocol Parsing",
      "500+ DSA Solutions",
      "Unit & Integration Testing",
    ],
  },
];

function CategoryCard({
  category,
  index,
  isSectionVisible,
}: {
  category: Category;
  index: number;
  isSectionVisible: boolean;
}) {
  const [expanded, setExpanded] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0, active: false });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true,
    });
  };

  const handleMouseLeave = () => {
    setMousePos((prev) => ({ ...prev, active: false }));
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`group relative flex flex-col justify-between h-full overflow-hidden rounded-[26px] md:rounded-[30px] p-5 sm:p-6 md:p-7 transition-all duration-500 ease-out ${
        isSectionVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}
      style={{
        transitionDelay: `${index * 90 + 120}ms`,
        backgroundColor: `color-mix(in srgb, var(--card) 94%, rgb(${category.accentRgb}))`,
        boxShadow:
          "0 10px 32px -4px rgba(0, 0, 0, 0.03), 0 1px 2px rgba(0, 0, 0, 0.02), inset 0 1px 0 rgba(255, 255, 255, 0.8)",
        border: `1px solid color-mix(in srgb, var(--border) 65%, rgba(${category.accentRgb}, 0.3))`,
      }}
    >
      {/* Subtle pointer-following radial light (Desktop only) */}
      {mousePos.active && (
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-300"
          style={{
            background: `radial-gradient(280px circle at ${mousePos.x}px ${mousePos.y}px, rgba(${category.accentRgb}, 0.08), transparent 75%)`,
          }}
        />
      )}

      {/* Subtle ambient corner glow */}
      <div
        className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full blur-3xl opacity-35 transition-opacity group-hover:opacity-60"
        style={{ backgroundColor: `rgba(${category.accentRgb}, 0.15)` }}
      />

      {/* Card Header */}
      <div className="relative z-10 flex items-center justify-between pb-4 sm:pb-5">
        <div className="flex items-center gap-2.5">
          <span
            className="h-2 w-2 rounded-full ring-4 ring-black/[0.02] dark:ring-white/[0.04]"
            style={{ backgroundColor: category.dotColor }}
          />
          <h3 className="eyebrow text-[0.68rem] tracking-[0.24em] font-semibold text-muted-foreground/90 uppercase">
            {category.title}
          </h3>
        </div>

        {/* Expand / Collapse Button */}
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          aria-expanded={expanded}
          aria-label={`${expanded ? "Collapse" : "Expand"} ${category.title} details`}
          className="relative flex h-7 w-7 items-center justify-center rounded-full border border-foreground/15 bg-background/50 text-muted-foreground transition-all duration-300 hover:border-foreground/40 hover:bg-background hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20"
        >
          <span
            className={`block text-xs font-light transition-transform duration-300 ${
              expanded ? "rotate-45" : "rotate-0"
            }`}
          >
            +
          </span>
        </button>
      </div>

      {/* Technology Tiles Row */}
      <div
        className={`relative z-10 flex flex-nowrap items-center ${
          category.items.length === 2
            ? "justify-center gap-7 sm:gap-9 md:gap-11"
            : "justify-between sm:justify-around gap-1.5 sm:gap-2.5 md:gap-3"
        } pt-1`}
      >
        {category.items.map((item, itemIdx) => {
          const IconComp = item.icon;
          return (
            <div
              key={item.id}
              className={`group/tile flex flex-col items-center shrink-0 transition-all duration-500 ${
                isSectionVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
              style={{
                transitionDelay: `${index * 90 + itemIdx * 60 + 200}ms`,
              }}
            >
              {/* Icon Container Tile */}
              <div
                className="relative flex h-[74px] w-[74px] sm:h-[80px] sm:w-[80px] md:h-[86px] md:w-[86px] shrink-0 items-center justify-center rounded-[18px] sm:rounded-[20px] bg-white/95 dark:bg-card/90 border border-black/[0.04] dark:border-white/[0.07] transition-all duration-300 ease-out group-hover/tile:-translate-y-1.5"
                style={{
                  boxShadow:
                    "0 3px 12px rgba(0, 0, 0, 0.03), inset 0 1px 0 rgba(255, 255, 255, 0.8)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = `0 12px 24px -4px rgba(${item.haloRgb}, 0.28), inset 0 1px 0 rgba(255, 255, 255, 0.9)`;
                  e.currentTarget.style.borderColor = `rgba(${item.haloRgb}, 0.35)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 3px 12px rgba(0, 0, 0, 0.03), inset 0 1px 0 rgba(255, 255, 255, 0.8)";
                  e.currentTarget.style.borderColor = "";
                }}
              >
                <div className={`flex items-center justify-center ${item.hoverAnimClass}`}>
                  <IconComp className="h-10 w-10 sm:h-11 sm:w-11 drop-shadow-sm" />
                </div>
              </div>

              {/* Technology Label */}
              <span className="mt-2.5 text-center text-xs sm:text-[0.78rem] font-medium tracking-tight text-foreground/90 whitespace-nowrap select-none">
                {item.name}
              </span>
            </div>
          );
        })}
      </div>

      {/* Expandable Architectural Details */}
      <div
        className={`grid transition-[grid-template-rows,opacity] duration-400 ease-out ${
          expanded
            ? "grid-rows-[1fr] opacity-100 mt-5 pt-4 border-t border-foreground/10"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="text-xs text-muted-foreground leading-relaxed">{category.summary}</p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {category.highlights.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-background/80 px-2.5 py-0.5 text-[0.64rem] font-medium text-foreground/80 border border-foreground/10"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function TechSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative bg-background pt-16 sm:pt-20 md:pt-24 pb-16 sm:pb-20 md:pb-24 overflow-hidden"
      aria-label="Technologies and Skills"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8 md:px-12">
        {/* Section Header matching Reference Image */}
        <div
          className={`mx-auto max-w-2xl text-center transition-all duration-700 ease-out ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          {/* Eyebrow */}
          <p className="eyebrow text-muted-foreground font-medium text-[0.68rem] tracking-[0.34em]">
            WHAT I WORK WITH
          </p>

          {/* Under-eyebrow accent bar */}
          <div className="mx-auto my-3 h-px w-10 bg-foreground/25" />

          {/* Large Serif Title */}
          <h2 className="font-display text-4xl sm:text-5xl md:text-[3.35rem] tracking-tight text-foreground">
            Technologies I Use
          </h2>

          {/* Subtitle Description */}
          <p className="mx-auto mt-3.5 max-w-xl text-sm sm:text-base leading-relaxed text-muted-foreground">
            A curated set of tools and technologies I use to build scalable, secure, and
            high-performance applications.
          </p>
        </div>

        {/* 5 Category Cards Grid matching Reference Image */}
        <div className="mt-10 sm:mt-12 md:mt-14 flex flex-col gap-4 sm:gap-5">
          {/* Row 1: Backend (wider: 4 items), Frontend (2 items), Database (2 items) */}
          <div className="flex flex-col lg:flex-row gap-4 sm:gap-5 items-stretch">
            {/* 1. Backend */}
            <div className="lg:flex-[1.6] min-w-0 flex flex-col">
              <CategoryCard category={CATEGORIES[0]!} index={0} isSectionVisible={isVisible} />
            </div>

            {/* 2. Frontend */}
            <div className="lg:flex-1 min-w-0 flex flex-col">
              <CategoryCard category={CATEGORIES[1]!} index={1} isSectionVisible={isVisible} />
            </div>

            {/* 3. Database */}
            <div className="lg:flex-1 min-w-0 flex flex-col">
              <CategoryCard category={CATEGORIES[2]!} index={2} isSectionVisible={isVisible} />
            </div>
          </div>

          {/* Row 2: Tools & DevOps (4 items), Concepts (4 items) */}
          <div className="flex flex-col lg:flex-row gap-4 sm:gap-5 items-stretch">
            {/* 4. Tools & DevOps */}
            <div className="lg:flex-1 min-w-0 flex flex-col">
              <CategoryCard category={CATEGORIES[3]!} index={3} isSectionVisible={isVisible} />
            </div>

            {/* 5. Concepts */}
            <div className="lg:flex-1 min-w-0 flex flex-col">
              <CategoryCard category={CATEGORIES[4]!} index={4} isSectionVisible={isVisible} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
