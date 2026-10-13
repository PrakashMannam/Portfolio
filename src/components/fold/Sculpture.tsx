import { useEffect, useMemo, useRef, useState, type MutableRefObject } from "react";
import { createPortal } from "react-dom";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Edges, Environment, Lightformer } from "@react-three/drei";
import * as THREE from "three";

/**
 * THE IMPOSSIBLE FOLD — the central sculpture.
 *
 * N thin glass panels sit on a Möbius loop: each panel is rotated by half
 * its angle around the loop, so the strip has one surface and no
 * consistent inside/outside. Panels overlap and pass through each other.
 *
 * `progress` (0..1, written by GSAP ScrollTrigger) blends every panel from
 * its loop pose to a layered "unfolded" pose. One interior panel carries
 * the real Campus Coders interface and moves forward to become the reveal.
 * Everything is a pure function of progress, so scrolling up reverses it.
 */

type Props = { progress: MutableRefObject<number>; reduced: boolean };

const clamp = (v: number) => Math.min(1, Math.max(0, v));
const smooth = (t: number) => t * t * (3 - 2 * t);
const smoothRange = (value: number, start: number, end: number) =>
  smooth(clamp((value - start) / (end - start)));

const SHARDS_PER_PANEL = 8;

type ShardLayout = {
  shape: THREE.Shape;
  center: THREE.Vector2;
  direction: THREE.Vector3;
  flight: number;
  spin: THREE.Vector3;
};

function useIsDark() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const el = document.documentElement;
    const read = () => setDark(el.classList.contains("dark"));
    read();
    const mo = new MutationObserver(read);
    mo.observe(el, { attributes: true, attributeFilter: ["class"] });
    return () => mo.disconnect();
  }, []);
  return dark;
}

// Curated Light Mode glass: translucent optical crystal with ethereal icy-blue, lavender, and teal-ice tints
const LIGHT_GLASS_PALETTE = [
  "#a0d2f6", // clear crystalline icy blue
  "#c8b8f4", // ethereal crystal lavender
  "#add8f8", // crisp clear crystal blue
  "#d4c8f8", // radiant crystal lilac
  "#9ee0d8", // prismatic crystal teal-ice
  "#96caf2", // deep clear crystal blue
  "#beb0f0", // soft crystal lavender
  "#a6e4dc", // clear aqua-ice
  "#a2d0f4", // crisp sky-ice
  "#cdc0f6", // radiant crystal lilac
  "#f6d4be", // delicate pale champagne-peach accent
  "#9bcbf2", // deep crystal blue
  "#c4b6f2", // soft lavender
  "#a0ded8", // subtle teal-ice crystal
];

// Luminous crystalline edge highlights: crisp, bright reflective rims catching light
const LIGHT_EDGE_PALETTE = [
  "#60a5fa", // bright luminous icy-blue highlight
  "#b49cf8", // luminous soft lavender rim
  "#5eead4", // crisp crystal aqua-ice light
  "#c4b5fd", // bright ethereal lavender highlight
  "#38bdf8", // crystalline sky-ice rim
  "#818cf8", // radiant periwinkle-blue highlight
  "#d8b4fe", // luminous lavender rim
  "#7dd3fc", // bright icy-blue rim
  "#a78bfa", // soft radiant lavender highlight
  "#fcd34d", // delicate pale champagne glint (accent)
  "#60a5fa", // bright icy-blue rim
  "#c084fc", // radiant lavender rim
  "#e0f2fe", // crisp crystalline white highlight
  "#38bdf8", // clear luminous icy-blue rim
];

function Fold({
  progress,
  reduced,
  count,
  overlayHost,
}: Props & { count: number; overlayHost: HTMLDivElement }) {
  const group = useRef<THREE.Group>(null);
  const panels = useRef<(THREE.Mesh | null)[]>([]);
  const shardPanels = useRef<(THREE.Group | null)[]>([]);
  const shards = useRef<(THREE.Mesh | null)[]>([]);
  const shadow = useRef<THREE.Mesh>(null);
  const peachGlow = useRef<THREE.Mesh>(null);
  const lavenderGlow = useRef<THREE.Mesh>(null);
  const eased = useRef(0);
  const dark = useIsDark();
  const { viewport, size } = useThree();
  const heroHeight = useRef(
    typeof document === "undefined"
      ? 0
      : (document.querySelector<HTMLElement>('[aria-label="Prakash Mannam — Hero"]')
          ?.clientHeight ?? 0),
  );
  const wide = viewport.aspect > 1;

  useEffect(() => {
    const hero = document.querySelector<HTMLElement>('[aria-label="Prakash Mannam — Hero"]');
    if (!hero) return;

    const updateHeight = () => {
      heroHeight.current = hero.clientHeight;
    };
    const observer = new ResizeObserver(updateHeight);
    updateHeight();
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  const peachGlowTex = useMemo(() => {
    if (typeof document === "undefined") return null;
    const c = document.createElement("canvas");
    c.width = 256;
    c.height = 256;
    const ctx = c.getContext("2d");
    if (!ctx) return null;
    ctx.clearRect(0, 0, 256, 256);
    // Whisper-soft ambient peach glow behind the sculpture
    const g = ctx.createRadialGradient(128, 128, 0, 128, 128, 105);
    g.addColorStop(0, "rgba(255, 222, 198, 0.16)");
    g.addColorStop(0.25, "rgba(255, 228, 210, 0.09)");
    g.addColorStop(0.5, "rgba(255, 236, 224, 0.035)");
    g.addColorStop(0.75, "rgba(255, 244, 236, 0.008)");
    g.addColorStop(1, "rgba(255, 248, 244, 0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 256, 256);
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  }, []);

  const lavenderGlowTex = useMemo(() => {
    if (typeof document === "undefined") return null;
    const c = document.createElement("canvas");
    c.width = 256;
    c.height = 256;
    const ctx = c.getContext("2d");
    if (!ctx) return null;
    ctx.clearRect(0, 0, 256, 256);
    // Whisper-soft ambient lavender-blue glow behind the sculpture
    const g = ctx.createRadialGradient(128, 128, 0, 128, 128, 105);
    g.addColorStop(0, "rgba(205, 218, 255, 0.14)");
    g.addColorStop(0.25, "rgba(215, 225, 255, 0.08)");
    g.addColorStop(0.5, "rgba(228, 234, 255, 0.03)");
    g.addColorStop(0.75, "rgba(240, 244, 255, 0.006)");
    g.addColorStop(1, "rgba(248, 250, 255, 0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 256, 256);
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  }, []);

  const shadowTex = useMemo(() => {
    if (typeof document === "undefined") return null;
    const c = document.createElement("canvas");
    c.width = 256;
    c.height = 256;
    const ctx = c.getContext("2d");
    if (!ctx) return null;
    ctx.clearRect(0, 0, 256, 256);
    // Ultra-soft diffused ground contact shadow
    const g = ctx.createRadialGradient(128, 128, 0, 128, 128, 112);
    g.addColorStop(0, "rgba(65, 56, 48, 0.18)");
    g.addColorStop(0.25, "rgba(65, 56, 48, 0.09)");
    g.addColorStop(0.5, "rgba(75, 65, 56, 0.035)");
    g.addColorStop(0.75, "rgba(85, 75, 65, 0.008)");
    g.addColorStop(1, "rgba(90, 80, 70, 0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 256, 256);
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  }, []);

  const poses = useMemo(() => {
    const R = 1.25;
    return Array.from({ length: count }, (_, i) => {
      const a = (i / count) * Math.PI * 2;
      const loopPos = new THREE.Vector3(Math.cos(a) * R, Math.sin(a * 2) * 0.18, Math.sin(a) * R);
      const loopRot = new THREE.Euler(0, -a + Math.PI / 2, a / 2, "YXZ");
      const loopQ = new THREE.Quaternion().setFromEuler(loopRot);

      // Dispersal vector: outward along loop angle + gentle vertical float
      const radX = Math.cos(a);
      const radZ = Math.sin(a);
      const floatY = 0.5 + ((i % 3) - 1) * 0.2;
      const spreadDir = new THREE.Vector3(radX * 0.9, floatY, radZ * 0.9);
      const rotDelta = new THREE.Euler(
        ((i % 2 === 0 ? 0.3 : -0.3) * Math.PI) / 6,
        (((i % 3) - 1) * Math.PI) / 6,
        ((i % 2 === 0 ? -0.2 : 0.2) * Math.PI) / 6,
        "YXZ",
      );
      const spreadQ = new THREE.Quaternion().setFromEuler(
        new THREE.Euler(
          loopRot.x + rotDelta.x,
          loopRot.y + rotDelta.y,
          loopRot.z + rotDelta.z,
          "YXZ",
        ),
      );
      return {
        loopPos,
        loopQ,
        spreadDir,
        spreadQ,
      };
    });
  }, [count]);

  // Eight fixed triangular facets exactly tile each original panel. Their
  // fracture points, radial paths, sizes, and spins are deterministic.
  const shardLayouts = useMemo<ShardLayout[][]>(() => {
    const halfW = 1.05 / 2;
    const halfH = 1.5 / 2;
    const perimeter: THREE.Vector2[] = [
      new THREE.Vector2(-halfW, -halfH),
      new THREE.Vector2(-halfW * 0.08, -halfH),
      new THREE.Vector2(halfW, -halfH),
      new THREE.Vector2(halfW, halfH * 0.12),
      new THREE.Vector2(halfW, halfH),
      new THREE.Vector2(-halfW * 0.2, halfH),
      new THREE.Vector2(-halfW, halfH),
      new THREE.Vector2(-halfW, -halfH * 0.18),
    ];

    return Array.from({ length: count }, (_, panelIndex) => {
      const fractureCenter = new THREE.Vector2(
        Math.sin((panelIndex + 1) * 2.17) * 0.11,
        Math.cos((panelIndex + 1) * 1.37) * 0.13,
      );
      const globalPanelOffset = panelIndex * SHARDS_PER_PANEL;

      return perimeter.map((point, shardIndex) => {
        const nextPoint = perimeter[(shardIndex + 1) % perimeter.length]!;
        const points = [fractureCenter, point, nextPoint];
        const center = points
          .reduce((sum, point) => sum.add(point), new THREE.Vector2())
          .multiplyScalar(1 / points.length);
        const shape = new THREE.Shape();
        shape.moveTo(points[0]!.x - center.x, points[0]!.y - center.y);
        for (const point of points.slice(1)) {
          shape.lineTo(point.x - center.x, point.y - center.y);
        }
        shape.closePath();

        const globalShardIndex = globalPanelOffset + shardIndex;
        const angle = (globalShardIndex % 12) * ((Math.PI * 2) / 12);
        const angularVariation = Math.sin(globalShardIndex * 12.9898) * 0.075;
        const depth = (((globalShardIndex * 7) % 5) - 2) * 0.035;
        const direction = new THREE.Vector3(
          Math.cos(angle + angularVariation),
          Math.sin(angle + angularVariation),
          depth,
        ).normalize();
        const flight = 1.08 + ((globalShardIndex * 7 + 3) % 9) * 0.025;
        const sign = globalShardIndex % 2 === 0 ? 1 : -1;
        const variation = ((globalShardIndex * 5 + 2) % 11) / 10;

        return {
          shape,
          center,
          direction,
          flight,
          spin: new THREE.Vector3(
            sign * (0.16 + variation * 0.32),
            (((globalShardIndex * 3) % 5) - 2) * 0.13,
            -sign * (0.18 + variation * 0.34),
          ),
        };
      });
    });
  }, [count]);

  const tmpV = useMemo(() => new THREE.Vector3(), []);
  const tmpQ = useMemo(() => new THREE.Quaternion(), []);

  useFrame((state, rawDelta) => {
    const dt = Math.min(rawDelta, 0.05);
    const target = progress.current;
    eased.current = reduced ? target : THREE.MathUtils.damp(eased.current, target, 6, dt);
    const p = smooth(clamp(eased.current));
    const overlayZ = p >= 0.985 ? "0" : p > 0.15 ? "20" : "1";
    if (overlayHost.style.zIndex !== overlayZ) overlayHost.style.zIndex = overlayZ;
    const fracture = smoothRange(p, 0.06, 0.34);
    const acceleration = Math.pow(smoothRange(p, 0.24, 0.82), 1.55);
    const separation = reduced ? smoothRange(p, 0.24, 0.82) * 0.035 : acceleration;
    const shardFade = 1 - smoothRange(p, 0.84, 1);
    const fragmentOpacity = fracture * shardFade;
    const ambientFade = Math.max(0, 1 - p * 1.35); // Ambient glows fade before leaving hero
    const viewportHeightPx = Math.max(1, size.height);
    const heroPixelScale = (heroHeight.current || viewportHeightPx) / viewportHeightPx;
    const heroCenterOffset =
      ((window.innerHeight - (heroHeight.current || viewportHeightPx)) / 2) *
      (viewport.height / viewportHeightPx);
    const baseScale = (wide ? 0.78 : 0.62) * heroPixelScale;
    const groupScale = baseScale * (1 - (reduced ? 0 : p * 0.16));
    const viewportDiagonal = Math.hypot(viewport.width, viewport.height);

    if (group.current) {
      const idle = reduced ? 0 : state.clock.elapsedTime * 0.04;
      // Idle rotation blends naturally with scroll-driven transform
      group.current.rotation.y = idle + (reduced ? 0 : p * 0.35);
      group.current.rotation.x = 0.35 + (reduced ? 0 : p * 0.1);
      group.current.scale.setScalar(groupScale);
      group.current.position.x = (wide ? 1.4 + (reduced ? 0 : p * 0.25) : 0) * heroPixelScale;
      group.current.position.y =
        (wide ? 0.05 : 0.5) * heroPixelScale +
        heroCenterOffset +
        (reduced ? 0 : p * 0.4 * heroPixelScale);
    }

    poses.forEach((pose, i) => {
      const m = panels.current[i];
      if (!m) return;

      if (!reduced) {
        // Disperse panels slightly apart creating a dissolving, floating-away effect
        tmpV.copy(pose.loopPos).addScaledVector(pose.spreadDir, p * 0.85);
        tmpQ.slerpQuaternions(pose.loopQ, pose.spreadQ, p * 0.75);
        m.position.copy(tmpV);
        m.quaternion.copy(tmpQ);
        const shardPanel = shardPanels.current[i];
        if (shardPanel) {
          shardPanel.position.copy(tmpV);
          shardPanel.quaternion.copy(tmpQ);
        }
      } else {
        m.position.copy(pose.loopPos);
        m.quaternion.copy(pose.loopQ);
        const shardPanel = shardPanels.current[i];
        if (shardPanel) {
          shardPanel.position.copy(pose.loopPos);
          shardPanel.quaternion.copy(pose.loopQ);
        }
      }

      // Cross-fade the intact panel into the facets cut from that same surface.
      const baseOpacity = dark ? 0.22 : 0.2 + (i % 4) * 0.03;
      const mat = m.material as THREE.MeshPhysicalMaterial;
      mat.opacity = baseOpacity * (1 - fracture);
      mat.reflectivity = THREE.MathUtils.lerp(dark ? 0.9 : 0.98, 0.25, p);
      mat.roughness = THREE.MathUtils.lerp(dark ? 0.08 : 0.02, 0.18, p);

      // Fade the original panel edges as its contiguous glass surface separates.
      if (m.children.length > 0) {
        const edgeChild = m.children[0] as THREE.LineSegments;
        if (edgeChild?.material) {
          const edgeMat = edgeChild.material as THREE.LineBasicMaterial;
          edgeMat.transparent = true;
          edgeMat.opacity = (1 - fracture) * (dark ? 0.85 : 0.95);
        }
      }

      const panelShards = shardLayouts[i] ?? [];
      panelShards.forEach((layout, shardIndex) => {
        const shard = shards.current[i * SHARDS_PER_PANEL + shardIndex];
        const shardPanel = shardPanels.current[i];
        if (!shard || !shardPanel) return;

        const flightDistance =
          (viewportDiagonal * layout.flight * separation) / Math.max(0.1, groupScale);
        tmpQ.copy(shardPanel.quaternion).invert();
        tmpV.copy(layout.direction).applyQuaternion(tmpQ).multiplyScalar(flightDistance);
        shard.position.set(layout.center.x + tmpV.x, layout.center.y + tmpV.y, 0.018 + tmpV.z);
        shard.rotation.set(
          layout.spin.x * separation,
          layout.spin.y * separation,
          layout.spin.z * separation,
        );

        const shardMaterial = shard.material as THREE.MeshPhysicalMaterial;
        shardMaterial.opacity = baseOpacity * fragmentOpacity;
        shardMaterial.reflectivity = mat.reflectivity;
        shardMaterial.roughness = mat.roughness;

        if (shard.children.length > 0) {
          const edgeChild = shard.children[0] as THREE.LineSegments;
          if (edgeChild?.material) {
            const edgeMaterial = edgeChild.material as THREE.LineBasicMaterial;
            edgeMaterial.transparent = true;
            edgeMaterial.opacity = fragmentOpacity * (dark ? 0.42 : 0.52);
          }
        }
      });
    });

    // Fade ambient glows in sync
    if (peachGlow.current) {
      peachGlow.current.position.set(
        (wide ? 1.65 : 0.35) * heroPixelScale,
        0.25 * heroPixelScale + heroCenterOffset,
        -1.5,
      );
      peachGlow.current.scale.setScalar(5.8 * heroPixelScale);
      (peachGlow.current.material as THREE.MeshBasicMaterial).opacity = 0.45 * ambientFade;
    }
    if (lavenderGlow.current) {
      lavenderGlow.current.position.set(
        (wide ? 1.15 : -0.3) * heroPixelScale,
        -0.2 * heroPixelScale + heroCenterOffset,
        -1.6,
      );
      lavenderGlow.current.scale.setScalar(6 * heroPixelScale);
      (lavenderGlow.current.material as THREE.MeshBasicMaterial).opacity = 0.45 * ambientFade;
    }

    // Fade ground shadow in sync
    if (shadow.current) {
      shadow.current.position.set(
        (wide ? 1.4 : 0) * heroPixelScale,
        -1.45 * heroPixelScale + heroCenterOffset,
        0,
      );
      const baseShadow = dark ? 0.35 : 0.14;
      (shadow.current.material as THREE.MeshBasicMaterial).opacity = baseShadow * ambientFade;
      const s = THREE.MathUtils.lerp(1.0, 1.25, p);
      shadow.current.scale.set(heroPixelScale * s, heroPixelScale * s, 1);
    }
  });

  return (
    <>
      {/* Subtle Light Mode ambient glow behind the sculpture */}
      {!dark && peachGlowTex && (
        <mesh ref={peachGlow} position={[wide ? 1.65 : 0.35, 0.25, -1.5]} scale={[5.8, 5.8, 1]}>
          <planeGeometry args={[1, 1]} />
          <meshBasicMaterial map={peachGlowTex} transparent depthWrite={false} opacity={0.45} />
        </mesh>
      )}
      {!dark && lavenderGlowTex && (
        <mesh ref={lavenderGlow} position={[wide ? 1.15 : -0.3, -0.2, -1.6]} scale={[6.0, 6.0, 1]}>
          <planeGeometry args={[1, 1]} />
          <meshBasicMaterial map={lavenderGlowTex} transparent depthWrite={false} opacity={0.45} />
        </mesh>
      )}

      {/* Shadow */}
      <mesh ref={shadow} position={[wide ? 1.4 : 0, -1.45, 0]} rotation-x={-Math.PI / 2}>
        <planeGeometry args={dark ? [1, 1] : [wide ? 2.8 : 2.2, wide ? 1.5 : 1.2]} />
        <meshBasicMaterial
          map={dark ? null : (shadowTex ?? null)}
          color={dark ? "#000000" : "#ffffff"}
          transparent
          depthWrite={false}
          opacity={dark ? 0.35 : 0.14}
        />
      </mesh>

      <group ref={group}>
        {poses.map((_, i) => {
          const colorIndex =
            Math.floor((i / count) * LIGHT_GLASS_PALETTE.length) % LIGHT_GLASS_PALETTE.length;
          const panelColor = dark ? "#9aa6b8" : (LIGHT_GLASS_PALETTE[colorIndex] ?? "#a0d2f6");
          const panelEdge = dark ? "#c9d4e6" : (LIGHT_EDGE_PALETTE[colorIndex] ?? "#60a5fa");
          const panelBaseOpacity = dark ? 0.22 : 0.2 + (i % 4) * 0.03;
          return (
            <mesh
              key={i}
              ref={(m) => {
                panels.current[i] = m;
              }}
            >
              <boxGeometry args={[1.05, 1.5, 0.02]} />
              <meshPhysicalMaterial
                color={panelColor}
                transparent={true}
                opacity={panelBaseOpacity}
                roughness={dark ? 0.08 : 0.02}
                metalness={dark ? 0.1 : 0.05}
                clearcoat={1}
                clearcoatRoughness={dark ? 0.1 : 0.02}
                reflectivity={dark ? 0.9 : 0.98}
                ior={1.54}
                side={THREE.DoubleSide}
                depthWrite={false}
              />
              <Edges threshold={15} color={panelEdge} />
            </mesh>
          );
        })}

        {poses.map((_, i) => {
          const colorIndex =
            Math.floor((i / count) * LIGHT_GLASS_PALETTE.length) % LIGHT_GLASS_PALETTE.length;
          const panelColor = dark ? "#9aa6b8" : (LIGHT_GLASS_PALETTE[colorIndex] ?? "#a0d2f6");
          const panelEdge = dark ? "#c9d4e6" : (LIGHT_EDGE_PALETTE[colorIndex] ?? "#60a5fa");
          const panelShards = shardLayouts[i] ?? [];

          return (
            <group
              key={`shards-${i}`}
              ref={(shardPanel) => {
                shardPanels.current[i] = shardPanel;
              }}
            >
              {panelShards.map((layout, shardIndex) => (
                <mesh
                  key={`shard-${i}-${shardIndex}`}
                  ref={(shard) => {
                    shards.current[i * SHARDS_PER_PANEL + shardIndex] = shard;
                  }}
                  position={[layout.center.x, layout.center.y, 0.018]}
                >
                  <shapeGeometry args={[layout.shape]} />
                  <meshPhysicalMaterial
                    color={panelColor}
                    transparent
                    opacity={0}
                    roughness={dark ? 0.08 : 0.02}
                    metalness={dark ? 0.1 : 0.05}
                    clearcoat={1}
                    clearcoatRoughness={dark ? 0.1 : 0.02}
                    reflectivity={dark ? 0.9 : 0.98}
                    ior={1.54}
                    side={THREE.DoubleSide}
                    depthWrite={false}
                  />
                  <Edges threshold={15} color={panelEdge} />
                </mesh>
              ))}
            </group>
          );
        })}
      </group>
    </>
  );
}

export default function Sculpture({ progress, reduced }: Props) {
  const [count, setCount] = useState(14);
  const [overlayHost, setOverlayHost] = useState<HTMLDivElement | null>(null);
  const dark = useIsDark();
  useEffect(() => {
    if (window.innerWidth < 700) setCount(9);
  }, []);

  useEffect(() => {
    const hero = document.querySelector<HTMLElement>('[aria-label="Prakash Mannam — Hero"]');
    const host = document.createElement("div");
    host.dataset["glassShatterOverlay"] = "true";
    host.setAttribute("aria-hidden", "true");
    Object.assign(host.style, {
      position: "fixed",
      inset: "0",
      width: "100vw",
      height: "100vh",
      overflow: "hidden",
      pointerEvents: "none",
      zIndex: "1",
    });

    const parent = hero?.parentElement ?? document.body;
    if (hero && hero.parentElement) parent.insertBefore(host, hero.nextSibling);
    else parent.appendChild(host);
    setOverlayHost(host);

    return () => host.remove();
  }, []);

  if (!overlayHost) return null;

  return createPortal(
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0.2, 5.2], fov: 38 }}
      gl={{ antialias: true, alpha: true }}
      style={{ width: "100%", height: "100%", pointerEvents: "none" }}
    >
      <ambientLight intensity={dark ? 0.7 : 0.65} color={dark ? "#ffffff" : "#f6f8fc"} />
      <directionalLight
        position={[3, 5, 4]}
        intensity={dark ? 1.4 : 2.2}
        color={dark ? "#ffffff" : "#fffbf5"}
      />
      <Environment resolution={128}>
        {/* Top Crisp Specular Lightformer */}
        <Lightformer
          intensity={dark ? 2.2 : 4.5}
          color={dark ? "#ffffff" : "#ffffff"}
          position={[0, 4, 2]}
          scale={[10, 3.5, 1]}
        />
        {/* Left Rim Lightformer: Rich Icy Blue Specular Streaks */}
        <Lightformer
          intensity={dark ? 1.2 : 3.8}
          color={dark ? "#ffffff" : "#93c5fd"}
          position={[-4, 1, -1]}
          rotation-y={Math.PI / 3}
          scale={[12, 3, 1]}
        />
        {/* Right Rim Lightformer: Soft Radiant Lavender Specular Highlights */}
        <Lightformer
          intensity={dark ? 0.8 : 3.4}
          color={dark ? "#ffe9cc" : "#c084fc"}
          position={[4, 0, -1]}
          rotation-y={-Math.PI / 3}
          scale={[10, 3, 1]}
        />
        {/* Front Low Warm Champagne Glint */}
        {!dark && (
          <Lightformer
            intensity={1.8}
            color="#fed7aa"
            position={[1, -2, 2]}
            rotation-x={Math.PI / 4}
            scale={[8, 2, 1]}
          />
        )}
      </Environment>
      <Fold progress={progress} reduced={reduced} count={count} overlayHost={overlayHost} />
    </Canvas>,
    overlayHost,
  );
}
