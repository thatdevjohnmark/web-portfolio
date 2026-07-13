'use client';

/**
 * Lighting — Drone Cinematography Edition
 * ─────────────────────────────────────────────────────────────
 * Lighting adapts to the current GP drone shot.
 *
 * During the journey phase, the key light position and accent
 * colour shift across the 22 GPs, matching each race environment's
 * lighting mood. The lighting orbits slowly at a speed that
 * complements but never fights the camera movement.
 *
 * Accent colours come directly from the race data's `env.accent`
 * so the per-GP palette stays consistent across layers.
 */

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { ContactShadows, Environment } from '@react-three/drei';
import * as THREE from 'three';

interface LightingProps {
  scrollProgress: React.MutableRefObject<number>;
  phase:          React.MutableRefObject<'intro' | 'journey'>;
}

// Per-GP accent colours — same order as RACE_WINS (rounds 1-22)
// Derived from each race's env.accent in VictoryJourney/data.ts
const GP_ACCENTS = [
  '#7b4fc8', // 0  BAHRAIN        — purple desert night
  '#5533bb', // 1  SAUDI ARABIA   — deep indigo street
  '#1a88c8', // 2  AUSTRALIA      — afternoon blue
  '#2244cc', // 3  AZERBAIJAN     — city dusk blue
  '#00c4e8', // 4  MIAMI          — neon cyan
  '#4488ff', // 5  MONACO         — marina shimmer
  '#88cc44', // 6  SPAIN          — mediterranean green
  '#22aacc', // 7  CANADA         — northern sky
  '#44cc66', // 8  AUSTRIA        — alpine green
  '#aabbcc', // 9  GREAT BRITAIN  — overcast cool silver
  '#cc8822', // 10 HUNGARY        — eastern warm amber
  '#55aa33', // 11 BELGIUM        — ardennes forest
  '#ee6600', // 12 NETHERLANDS    — north sea orange
  '#66bb44', // 13 ITALY          — monza forest
  '#4466ff', // 14 SINGAPORE      — night circuit blue
  '#ffaacc', // 15 JAPAN          — cherry blossom pink
  '#ffaa22', // 16 QATAR          — desert twilight amber
  '#dd6600', // 17 UNITED STATES  — texas sunset
  '#22cc66', // 18 MEXICO         — high altitude green
  '#886688', // 19 SÃO PAULO      — stormy violet
  '#cc44ff', // 20 LAS VEGAS      — neon purple
  '#44aaff', // 21 ABU DHABI      — Yas Marina blue
];

// ── Smooth double-smoothstep ─────────────────────────────────
function ease(t: number): number {
  const s = Math.max(0, Math.min(1, t));
  const a = s * s * (3 - 2 * s);
  return a * a * (3 - 2 * a);
}

function hexToColor(hex: string): THREE.Color {
  return new THREE.Color(hex);
}

function lerpColor(a: THREE.Color, b: THREE.Color, t: number): THREE.Color {
  return a.clone().lerp(b, ease(t));
}

export default function Lighting({ scrollProgress, phase }: LightingProps) {
  const keyLightRef    = useRef<THREE.DirectionalLight>(null);
  const rimLightRef    = useRef<THREE.DirectionalLight>(null);
  const fillLightRef   = useRef<THREE.PointLight>(null);
  const redAccentRef   = useRef<THREE.PointLight>(null);
  const journeyRimRef  = useRef<THREE.DirectionalLight>(null);
  const accentPointRef = useRef<THREE.PointLight>(null);
  const breathClock    = useRef(0);

  useFrame((_, delta) => {
    breathClock.current += delta;
    const t = scrollProgress.current;

    if (phase.current === 'journey') {
      const JOURNEY_START_T = 0.28;
      const jp = t < JOURNEY_START_T
        ? 0
        : Math.min(1, (t - JOURNEY_START_T) / (1 - JOURNEY_START_T));

      // ── Per-GP accent colour interpolation ────────────────────
      const n      = GP_ACCENTS.length - 1;
      const scaled = jp * n;
      const idxA   = Math.min(Math.floor(scaled), n - 1);
      const idxB   = idxA + 1;
      const frac   = scaled - idxA;

      const colorA = hexToColor(GP_ACCENTS[idxA]);
      const colorB = hexToColor(GP_ACCENTS[idxB]);
      const accent = lerpColor(colorA, colorB, frac);

      // ── Key light: slow orbital drift simulating sun/time-of-day
      if (keyLightRef.current) {
        const orbitAngle = breathClock.current * 0.08 + jp * Math.PI * 1.5;
        keyLightRef.current.position.set(
          Math.sin(orbitAngle) * 9,
          5.5 + Math.cos(breathClock.current * 0.06) * 1.2,
          Math.cos(orbitAngle) * 5
        );
        // Intensity slightly higher for ground-level shots (backlit drama),
        // slightly lower for top-down shots (soft diffuse)
        keyLightRef.current.intensity = 2.0 + Math.sin(breathClock.current * 0.12) * 0.25;
        keyLightRef.current.color.set('#f0f4ff'); // cool white key
      }

      // ── Rim light: takes the race's accent colour ──────────────
      if (rimLightRef.current) {
        rimLightRef.current.color.copy(accent);
        rimLightRef.current.intensity = 1.6 + Math.sin(breathClock.current * 0.09) * 0.3;
        rimLightRef.current.position.set(-9, 2.5, -3);
      }

      // ── Journey extra rim (front-below fill) ───────────────────
      if (journeyRimRef.current) {
        journeyRimRef.current.color.copy(accent).multiplyScalar(0.5);
        journeyRimRef.current.intensity = 0.55 + Math.sin(breathClock.current * 0.13) * 0.1;
        journeyRimRef.current.position.set(5, -0.5, 6);
      }

      // ── Accent point under the car ─────────────────────────────
      if (accentPointRef.current) {
        accentPointRef.current.color.copy(accent);
        accentPointRef.current.intensity = 0.45 + Math.sin(breathClock.current * 0.18) * 0.12;
      }

      // ── Red brand accent (signature Red Bull pop) ──────────────
      if (redAccentRef.current) {
        redAccentRef.current.intensity = 0.7 + Math.sin(breathClock.current * 0.22) * 0.2;
      }

      // ── Reduce fill during journey for more contrast ───────────
      if (fillLightRef.current) {
        fillLightRef.current.intensity = 0.18;
      }

    } else {
      // ── INTRO: dynamic lighting that follows scroll ─────────────
      if (keyLightRef.current) {
        keyLightRef.current.position.set(
          THREE.MathUtils.lerp(0, 8, t),
          THREE.MathUtils.lerp(12, 5, t),
          THREE.MathUtils.lerp(0, 4, t)
        );
        keyLightRef.current.intensity = THREE.MathUtils.lerp(1.2, 2.0, t);
        keyLightRef.current.color.set('#f0f4ff');
      }

      if (rimLightRef.current) {
        rimLightRef.current.intensity = THREE.MathUtils.lerp(0.2, 1.6, t);
        rimLightRef.current.color.set('#6692ff');
        rimLightRef.current.position.set(
          THREE.MathUtils.lerp(-4, -9, t),
          THREE.MathUtils.lerp(2,  2.5, t),
          THREE.MathUtils.lerp(-4, -3, t)
        );
      }

      if (fillLightRef.current) {
        fillLightRef.current.intensity = THREE.MathUtils.lerp(0.6, 0.3, t);
      }

      if (redAccentRef.current) {
        redAccentRef.current.intensity = THREE.MathUtils.lerp(0, 1.2, Math.max(0, (t - 0.6) / 0.4));
      }

      if (journeyRimRef.current) {
        journeyRimRef.current.intensity = 0;
      }

      if (accentPointRef.current) {
        accentPointRef.current.intensity = 0;
      }
    }
  });

  return (
    <>
      <ambientLight intensity={0.20} color="#1a1a2e" />

      {/* Key light — orbits during journey, follows scroll during intro */}
      <directionalLight
        ref={keyLightRef}
        position={[0, 12, 0]}
        intensity={1.2}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.0001}
        color="#f0f4ff"
      />

      {/* Rim — takes GP accent colour during journey */}
      <directionalLight
        ref={rimLightRef}
        position={[-4, 2, -4]}
        intensity={0.2}
        color="#6692ff"
      />

      {/* Front-low fill bounce — warms during journey */}
      <directionalLight
        ref={journeyRimRef}
        position={[5, -0.5, 6]}
        intensity={0}
        color="#fff5e0"
      />

      {/* Soft warm fill */}
      <pointLight
        ref={fillLightRef}
        position={[0, 2, 6]}
        intensity={0.6}
        color="#fff5e0"
        distance={22}
      />

      {/* Red Bull brand accent — always present during journey */}
      <pointLight
        ref={redAccentRef}
        position={[3, -0.5, 3]}
        intensity={0}
        color="#E8002D"
        distance={14}
      />

      {/* GP accent colour under the car */}
      <pointLight
        ref={accentPointRef}
        position={[0, -1.2, 0]}
        intensity={0}
        color="#ffffff"
        distance={10}
      />

      {/* Hard floor fill to prevent complete underside blackout */}
      <pointLight position={[0, -2.5, 0]} intensity={0.12} color="#ffffff" distance={10} />

      <Environment preset="studio" />

      <ContactShadows
        position={[0, -1.05, 0]}
        opacity={0.62}
        scale={26}
        blur={3.2}
        far={2.6}
        color="#000010"
      />
    </>
  );
}
