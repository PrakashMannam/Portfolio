import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & {
  className?: string;
};

// 1. Java: Official Coffee Cup with Red/Orange Steam & Blue Cup
export function JavaIcon({ className = "w-10 h-10", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" {...props}>
      {/* Steam trails */}
      <path
        d="M20 6c2 3.5-1 6.5 0 9.5M26 4c2.5 4.5-1.5 8.5 0 12.5M15 10c1.5 2.5-0.5 5 0.5 7.5"
        stroke="#ED1D25"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      {/* Cup body */}
      <path d="M11 20h23c0 0-1 12-11.5 12S11 20 11 20z" fill="#007396" />
      {/* Cup handle */}
      <path
        d="M32 21c3.5 0 6 2 6 5s-2.5 5-6 5"
        stroke="#007396"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* Saucer */}
      <path d="M9 36c4 3 23 3 27 0" stroke="#007396" strokeWidth="2.8" strokeLinecap="round" />
      <path
        d="M12 37.5c3.5 1.8 17.5 1.8 21 0"
        stroke="#ED1D25"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

// 2. Spring Boot: Green Circle with White Spring Leaf
export function SpringBootIcon({ className = "w-10 h-10", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" {...props}>
      <circle cx="24" cy="24" r="20" fill="#6DB33F" />
      <path d="M36 12C26.5 13 14 20 15 33c.8 10 11.5 6 17 2 6-4.5 5.5-16.5 4-23z" fill="#FFFFFF" />
      <path d="M34 14.5c-7.5 1.5-16 7-15 17 .6 7 8 4 12 1.5 4.5-3 5-13.5 3-18.5z" fill="#6DB33F" />
      <path
        d="M19 31.5c4-1 9-4.5 12.5-9"
        stroke="#FFFFFF"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

// 3. Spring Security: Green Shield with White Padlock
export function SpringSecurityIcon({ className = "w-9 h-9", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" {...props}>
      {/* Shield base */}
      <path d="M24 7L11 12v12c0 9 6 15 13 18 7-3 13-9 13-18V12L24 7z" fill="#2E7D32" />
      <path d="M24 9.5L13 13.7v10.5c0 7.8 5 13 11 15.6V9.5z" fill="#388E3C" />
      {/* Lock shackle */}
      <path
        d="M20 23v-3c0-2.2 1.8-4 4-4s4 1.8 4 4v3"
        stroke="#FFFFFF"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      {/* Lock body */}
      <rect x="18" y="23" width="12" height="10" rx="2" fill="#FFFFFF" />
      {/* Keyhole */}
      <circle cx="24" cy="27" r="1.5" fill="#2E7D32" />
      <path d="M24 28.5v2" stroke="#2E7D32" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

// 4. Hibernate: 3D Isometric Hexagon/Cube
export function HibernateIcon({ className = "w-9 h-9", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" {...props}>
      {/* Top face (Champagne/Gold) */}
      <path d="M24 8l13 7.5-13 7.5L11 15.5 24 8z" fill="#BCAE79" />
      {/* Right face (Charcoal Slate) */}
      <path d="M24 23l13-7.5V31L24 38.5V23z" fill="#59666C" />
      {/* Left face (Dark Slate) */}
      <path d="M11 15.5L24 23v15.5L11 31V15.5z" fill="#424D52" />
      {/* Inner highlight facets */}
      <path d="M24 8l6 3.5-6 3.5-6-3.5L24 8z" fill="#D6CA98" opacity="0.6" />
    </svg>
  );
}

// 5. React: Atom Orbit with Cyan Oval Rings
export function ReactIcon({ className = "w-9 h-9", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" {...props}>
      <circle cx="24" cy="24" r="3.2" fill="#61DAFB" />
      <ellipse cx="24" cy="24" rx="18" ry="6.8" stroke="#61DAFB" strokeWidth="2.2" />
      <ellipse
        cx="24"
        cy="24"
        rx="18"
        ry="6.8"
        stroke="#61DAFB"
        strokeWidth="2.2"
        transform="rotate(60 24 24)"
      />
      <ellipse
        cx="24"
        cy="24"
        rx="18"
        ry="6.8"
        stroke="#61DAFB"
        strokeWidth="2.2"
        transform="rotate(120 24 24)"
      />
    </svg>
  );
}

// 6. JavaScript: Yellow Rounded Square with Black JS
export function JavaScriptIcon({ className = "w-9 h-9", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" {...props}>
      <rect x="4" y="4" width="40" height="40" rx="6" fill="#F7DF1E" />
      {/* J */}
      <path
        d="M16 22v11c0 3-1.8 4.2-4.2 4.2-1.8 0-3.3-.8-4.2-2.2l2.8-1.8c.5.8 1.2 1.3 2 1.3.8 0 1.4-.4 1.4-1.6V22h2.2z"
        fill="#000000"
      />
      {/* S */}
      <path
        d="M23.5 31.8c1.2.9 2.5 1.5 4 1.5 1.8 0 2.8-.8 2.8-2 0-1.2-.9-1.7-2.6-2.4-2.7-1.1-4.2-2.2-4.2-4.6 0-2.4 1.8-4.3 4.8-4.3 1.8 0 3.2.6 4.3 1.5l-2.2 2.3c-.8-.6-1.6-1-2.4-1-1 0-1.6.6-1.6 1.4 0 1 .8 1.5 2.6 2.2 2.8 1.1 4.3 2.3 4.3 4.8 0 2.7-2 4.5-5.2 4.5-2.2 0-3.8-.8-5-2l2.4-2.5z"
        fill="#000000"
      />
    </svg>
  );
}

// 7. MySQL: Official Dolphin (Sakila) outline matching reference mockup
export function MySQLIcon({ className = "w-9 h-9", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 128 128" className={className} fill="none" {...props}>
      <path
        stroke="#00618A"
        strokeWidth="4"
        strokeLinejoin="round"
        fill="#00618A"
        fillOpacity="0.1"
        d="M117.688 98.242c-6.973-.191-12.297.461-16.852 2.379-1.293.547-3.355.559-3.566 2.18.711.746.82 1.859 1.387 2.777 1.086 1.754 2.922 4.113 4.559 5.352 1.789 1.348 3.633 2.793 5.551 3.961 3.414 2.082 7.223 3.27 10.504 5.352 1.938 1.23 3.859 2.777 5.75 4.164.934.684 1.563 1.75 2.773 2.18v-.195c-.637-.812-.801-1.93-1.387-2.777l-2.578-2.578c-2.52-3.344-5.719-6.281-9.117-8.719-2.711-1.949-8.781-4.578-9.91-7.73l-.199-.199c1.922-.219 4.172-.914 5.949-1.391 2.98-.797 5.645-.59 8.719-1.387l4.164-1.187v-.793c-1.555-1.594-2.664-3.707-4.359-5.152-4.441-3.781-9.285-7.555-14.273-10.703-2.766-1.746-6.184-2.883-9.117-4.363-.988-.496-2.719-.758-3.371-1.586-1.539-1.961-2.379-4.449-3.566-6.738-2.488-4.793-4.93-10.023-7.137-15.066-1.504-3.437-2.484-6.828-4.359-9.91-9-14.797-18.687-23.73-33.695-32.508-3.195-1.867-7.039-2.605-11.102-3.57l-6.543-.395c-1.332-.555-2.715-2.184-3.965-2.977C16.977 3.52 4.223-3.312.539 5.672-1.785 11.34 4.016 16.871 6.09 19.746c1.457 2.012 3.32 4.273 4.359 6.539.688 1.492.805 2.984 1.391 4.559 1.438 3.883 2.695 8.109 4.559 11.695.941 1.816 1.98 3.727 3.172 5.352.727.996 1.98 1.438 2.18 2.973-1.227 1.715-1.297 4.375-1.984 6.543-3.098 9.77-1.926 21.91 2.578 29.137 1.383 2.223 4.641 6.98 9.117 5.156 3.918-1.598 3.043-6.539 4.164-10.902.254-.988.098-1.715.594-2.379v.199l3.57 7.133c2.641 4.254 7.324 8.699 11.297 11.699 2.059 1.555 3.68 4.242 6.344 5.152v-.199h-.199c-.516-.805-1.324-1.137-1.98-1.781-1.551-1.523-3.277-3.414-4.559-5.156-3.613-4.902-6.805-10.27-9.711-15.855-1.391-2.668-2.598-5.609-3.77-8.324-.453-1.047-.445-2.633-1.387-3.172-1.281 1.988-3.172 3.598-4.164 5.945-1.582 3.754-1.789 8.336-2.375 13.082-.348.125-.195.039-.398.199-2.762-.668-3.73-3.508-4.758-5.949-2.594-6.164-3.078-16.09-.793-23.191.59-1.836 3.262-7.617 2.18-9.316-.516-1.691-2.219-2.672-3.172-3.965-1.18-1.598-2.355-3.703-3.172-5.551-2.125-4.805-3.113-10.203-5.352-15.062-1.07-2.324-2.875-4.676-4.359-6.738-1.645-2.289-3.484-3.977-4.758-6.742-.453-.984-1.066-2.559-.398-3.566.215-.684.516-.969 1.191-1.191 1.148-.887 4.352.297 5.547.793 3.18 1.32 5.832 2.578 8.527 4.363 1.289.855 2.598 2.512 4.16 2.973h1.785c2.789.641 5.914.195 8.523.988 4.609 1.402 8.738 3.582 12.488 5.949 11.422 7.215 20.766 17.48 27.156 29.734 1.027 1.973 1.473 3.852 2.379 5.945 1.824 4.219 4.125 8.559 5.941 12.688 1.816 4.113 3.582 8.27 6.148 11.695 1.348 1.801 6.551 2.766 8.918 3.766 1.66.699 4.379 1.43 5.949 2.379 3 1.809 5.906 3.965 8.723 5.945 1.402.992 5.73 3.168 5.945 4.957zm-88.605-75.52c-1.453-.027-2.48.156-3.566.395v.199h.195c.695 1.422 1.918 2.34 2.777 3.566l1.98 4.164.199-.195c1.227-.867 1.789-2.25 1.781-4.363-.492-.52-.562-1.164-.992-1.785-.562-.824-1.66-1.289-2.375-1.98zm0 0"
      />
    </svg>
  );
}

// 8. JPA / Hibernate: Cylindrical Red Database Stack
export function JpaHibernateIcon({ className = "w-9 h-9", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" {...props}>
      {/* Bottom Disk */}
      <ellipse cx="24" cy="36" rx="14" ry="5" fill="#B91C1C" />
      <path
        d="M10 28v8c0 2.8 6.3 5 14 5s14-2.2 14-5v-8c0 2.8-6.3 5-14 5s-14-2.2-14-5z"
        fill="#DC2626"
      />

      {/* Middle Disk */}
      <ellipse cx="24" cy="24" rx="14" ry="5" fill="#B91C1C" />
      <path
        d="M10 16v8c0 2.8 6.3 5 14 5s14-2.2 14-5v-8c0 2.8-6.3 5-14 5s-14-2.2-14-5z"
        fill="#EF4444"
      />

      {/* Top Disk */}
      <path
        d="M10 8v8c0 2.8 6.3 5 14 5s14-2.2 14-5V8c0 2.8-6.3 5-14 5S10 10.8 10 8z"
        fill="#F87171"
      />
      <ellipse cx="24" cy="8" rx="14" ry="5" fill="#EF4444" />
      <ellipse cx="24" cy="8" rx="11" ry="3.8" fill="#FCA5A5" opacity="0.6" />
    </svg>
  );
}

// 9. Git: Orange Diamond with Branch Graph
export function GitIcon({ className = "w-9 h-9", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" {...props}>
      {/* Rounded diamond */}
      <rect x="6" y="6" width="34" height="34" rx="7" transform="rotate(45 24 24)" fill="#F05032" />
      {/* Branch nodes & lines */}
      <g stroke="#FFFFFF" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
        <line x1="16" y1="24" x2="32" y2="24" />
        <path d="M22 24c0-4 4-6 6-6h4" />
      </g>
      <circle cx="16" cy="24" r="3.2" fill="#FFFFFF" />
      <circle cx="32" cy="24" r="3.2" fill="#FFFFFF" />
      <circle cx="32" cy="18" r="3.2" fill="#FFFFFF" />
    </svg>
  );
}

// 10. Docker: Blue Whale with Containers
export function DockerIcon({ className = "w-9 h-9", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" {...props}>
      {/* Containers */}
      <rect x="14" y="16" width="4.5" height="4" rx="0.5" fill="#2496ED" />
      <rect x="20" y="16" width="4.5" height="4" rx="0.5" fill="#2496ED" />
      <rect x="26" y="16" width="4.5" height="4" rx="0.5" fill="#2496ED" />
      <rect x="8" y="21.5" width="4.5" height="4" rx="0.5" fill="#2496ED" />
      <rect x="14" y="21.5" width="4.5" height="4" rx="0.5" fill="#2496ED" />
      <rect x="20" y="21.5" width="4.5" height="4" rx="0.5" fill="#2496ED" />
      <rect x="26" y="21.5" width="4.5" height="4" rx="0.5" fill="#2496ED" />
      <rect x="32" y="21.5" width="4.5" height="4" rx="0.5" fill="#2496ED" />

      {/* Whale body */}
      <path
        d="M40 24c-1 0-2 .5-3 1.2-1.5-1.2-3.5-1.2-5-1.2H6c0 7 5 13 13 13 8 0 16-3 19.5-8.5 2.5.2 4.5-1.5 4.5-3.5 0-.6-.3-1-.6-1z"
        fill="#2496ED"
      />
      {/* Eye */}
      <circle cx="13" cy="28.5" r="1.2" fill="#FFFFFF" />
      {/* Spout */}
      <path d="M37 21c1-2 3-3 5-3" stroke="#2496ED" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

// 11. Maven: Apache Multi-Colored Feather
export function MavenIcon({ className = "w-9 h-9", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" {...props}>
      {/* Feather stem */}
      <path d="M12 38C20 28 32 14 36 8" stroke="#8B5CF6" strokeWidth="1.8" strokeLinecap="round" />
      {/* Quill vane segments */}
      <path d="M36 8c-6 3-10 8-12 14 3-1 7-3 9-6 2-3 3-6 3-8z" fill="#C71A36" />
      <path d="M24 22c-3 4-5 8-6 13 3-1 6-4 8-8 1-2 1-4 1-5l-3 0z" fill="#EA580C" />
      <path d="M33 14c-4 3-8 7-10 12 3 0 6-2 8-5 1-2 2-5 2-7z" fill="#F59E0B" />
      <path d="M18 35c-2 2-3 4-4 6 2-1 3-3 4-5l0-1z" fill="#3B82F6" />
      <path d="M26 19c-2 3-4 6-5 10 2-1 4-3 5-6 1-2 1-3 0-4z" fill="#EC4899" />
    </svg>
  );
}

// 12. IntelliJ IDEA: JetBrains Rounded Icon
export function IntelliJIcon({ className = "w-9 h-9", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" {...props}>
      <defs>
        <linearGradient id="ijGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00F5D4" />
          <stop offset="50%" stopColor="#7B2CBF" />
          <stop offset="100%" stopColor="#FF007F" />
        </linearGradient>
      </defs>
      {/* Background shape */}
      <rect x="5" y="5" width="38" height="38" rx="8" fill="url(#ijGrad)" />
      {/* Black center card */}
      <rect x="10" y="10" width="28" height="28" rx="3" fill="#000000" />
      {/* IJ Text */}
      <text
        x="13"
        y="29"
        fontFamily="system-ui, sans-serif"
        fontWeight="bold"
        fontSize="17"
        fill="#FFFFFF"
        letterSpacing="-1"
      >
        IJ
      </text>
      {/* Cyan cursor bar */}
      <rect x="13" y="32" width="11" height="2.2" fill="#00F5D4" />
    </svg>
  );
}

// 13. JUnit: Green JU + Red nit
export function JUnitIcon({ className = "w-9 h-9", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 54 48" className={className} fill="none" {...props}>
      {/* JU */}
      <text
        x="4"
        y="32"
        fontFamily="system-ui, sans-serif"
        fontWeight="800"
        fontSize="25"
        fill="#25A162"
        letterSpacing="-1.5"
      >
        JU
      </text>
      {/* nit */}
      <text
        x="32"
        y="32"
        fontFamily="system-ui, sans-serif"
        fontWeight="700"
        fontSize="17"
        fill="#CA2222"
        letterSpacing="-0.5"
      >
        nit
      </text>
    </svg>
  );
}

// 14. Networking: Central Hub with Antenna & Client Nodes matching reference mockup
export function NetworkingIcon({ className = "w-9 h-9", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" {...props}>
      {/* Top vertical mast */}
      <line
        x1="24"
        y1="13.5"
        x2="24"
        y2="19"
        stroke="#2563EB"
        strokeWidth="2.6"
        strokeLinecap="round"
      />

      {/* Diagonal legs to bottom client rings */}
      <line
        x1="20"
        y1="29.5"
        x2="16"
        y2="34"
        stroke="#2563EB"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      <line
        x1="28"
        y1="29.5"
        x2="32"
        y2="34"
        stroke="#2563EB"
        strokeWidth="2.6"
        strokeLinecap="round"
      />

      {/* Bottom horizontal bridge with center router node */}
      <line
        x1="19"
        y1="36"
        x2="29"
        y2="36"
        stroke="#2563EB"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <circle cx="24" cy="36" r="1.8" fill="#2563EB" />

      {/* Central server chassis with side ports */}
      <rect x="17.5" y="19" width="13" height="11" rx="2" fill="#2563EB" />
      <circle cx="15" cy="24.5" r="2.2" fill="#2563EB" />
      <circle cx="33" cy="24.5" r="2.2" fill="#2563EB" />

      {/* Top antenna ring node */}
      <circle cx="24" cy="9.5" r="4.2" fill="#FFFFFF" stroke="#2563EB" strokeWidth="2.6" />
      {/* Bottom left client ring node */}
      <circle cx="15" cy="36" r="4.2" fill="#FFFFFF" stroke="#2563EB" strokeWidth="2.6" />
      {/* Bottom right client ring node */}
      <circle cx="33" cy="36" r="4.2" fill="#FFFFFF" stroke="#2563EB" strokeWidth="2.6" />
    </svg>
  );
}

// 15. DSA: Binary Tree / Graph Structure with 3 Nodes matching reference mockup
export function DsaIcon({ className = "w-9 h-9", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" {...props}>
      {/* Top vertical stem */}
      <line
        x1="24"
        y1="13.5"
        x2="24"
        y2="19"
        stroke="#334155"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      {/* Straight diagonal legs to leaf nodes */}
      <line
        x1="24"
        y1="19"
        x2="15"
        y2="32"
        stroke="#334155"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      <line
        x1="24"
        y1="19"
        x2="33"
        y2="32"
        stroke="#334155"
        strokeWidth="2.6"
        strokeLinecap="round"
      />

      {/* Top root node ring */}
      <circle cx="24" cy="9.5" r="4.2" fill="#FFFFFF" stroke="#334155" strokeWidth="2.6" />
      {/* Bottom left leaf node ring */}
      <circle cx="15" cy="35" r="4.2" fill="#FFFFFF" stroke="#334155" strokeWidth="2.6" />
      {/* Bottom right leaf node ring */}
      <circle cx="33" cy="35" r="4.2" fill="#FFFFFF" stroke="#334155" strokeWidth="2.6" />
    </svg>
  );
}

// 16. REST APIs: Cloud with API Badge
export function RestApiIcon({ className = "w-9 h-9", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" {...props}>
      {/* Cloud outline */}
      <path
        d="M37 28a7 7 0 0 0-1-13.8 11 11 0 0 0-21.4 3 6.5 6.5 0 0 0-2.6 11.8"
        stroke="#0284C7"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path d="M12 29h25a6 6 0 0 0 0-12" stroke="#0284C7" strokeWidth="2.5" strokeLinecap="round" />
      {/* API Text */}
      <text
        x="15"
        y="30"
        fontFamily="system-ui, sans-serif"
        fontWeight="800"
        fontSize="10"
        fill="#0284C7"
        letterSpacing="0.8"
      >
        API
      </text>
    </svg>
  );
}
