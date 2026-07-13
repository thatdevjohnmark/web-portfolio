'use client';

/**
 * CameraController — Drone Cinematography Director Edition
 * ─────────────────────────────────────────────────────────────
 *
 * Every camera position is designed as a real drone shot with
 * cinematic intent. Shots alternate low/high, front/rear/side,
 * fast/slow lens — exactly how a drone DP would plan a promotional
 * film for Red Bull Racing.
 *
 * Spherical coordinate convention
 * ─────────────────────────────────
 *  phi   — polar angle from Y-up
 *           0      = directly above (top-down)
 *           π/2    = equatorial (horizon-level)
 *           <π/2   = above equator
 *           >π/2   = below equator (forbidden — would clip ground)
 *  theta — azimuthal (car faces −Z, rotated π in Model.tsx)
 *           0      = dead rear
 *           π/2    = driver's RIGHT side-profile
 *          −π/2    = driver's LEFT side-profile
 *           π /−π  = dead front
 *
 * Radius is a multiplier against baseRadius (= maxDim * 1.1).
 *
 * FoV (degrees) simulates lens choice:
 *   70–80° ≈ 24mm (wide, FPV-ish)
 *   55–65° ≈ 35mm (classic drone look)
 *   45–55° ≈ 50mm (natural)
 *   35–44° ≈ 70mm (luxury compressed side shot)
 *   25–34° ≈ 85–100mm (extreme telephoto compression)
 *
 * lookAtY offsets the look-at target above/below car center —
 * a drone operator tilts slightly to reframe, never locked rigid.
 *
 * lerpSpeed controls settling time:
 *   HIGH (2.5+) = snappy, action / FPV shots
 *   MED  (1.5)  = responsive, tracking shots
 *   LOW  (0.8)  = heavy, cinematic crane / orbit
 *   SLOW (0.4)  = glacial, epic establishing shots
 */

import { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface CameraControllerProps {
  scrollProgress: React.MutableRefObject<number>;
  modelSize:      THREE.Vector3 | null;
  phase:          React.MutableRefObject<'intro' | 'journey'>;
}

// ── Intro keyframes (aerial crane-down → side profile landing) ────────────
// Unchanged — the intro sweep is already cinematic.
const INTRO_KF = [
  { radius: 1.9,  phi: 0.18,          theta: 0.0           },  // high crane — God's eye
  { radius: 1.65, phi: Math.PI / 4,   theta: Math.PI / 6   },  // diagonal drop
  { radius: 1.55, phi: Math.PI / 2.8, theta: Math.PI / 2.6 },  // three-quarter approach
  { radius: 1.45, phi: Math.PI / 2,   theta: Math.PI / 2   },  // side-profile landing
];

// ── Journey keyframes — 22 GP drone shots ────────────────────────────────
//
// Designed as a professional drone cinematography sequence.
// Each shot has a purpose, a lens simulation (fov), a look-at Y offset,
// and a lerpSpeed that controls how the camera settles into position.
//
// No two consecutive shots share the same altitude tier or angle family.
// The sequence creates visual rhythm: low → high → front → side → rear.

interface DroneShotKF {
  radius:     number;      // distance multiplier
  phi:        number;      // polar (altitude)
  theta:      number;      // azimuthal (direction)
  fov:        number;      // lens simulation (degrees)
  lookAtY:    number;      // look-at target Y offset (world-space multiplier of baseRadius)
  lerpSpeed:  number;      // camera settling speed
  // metadata (comment only — used for intent documentation)
}

const JOURNEY_KF: DroneShotKF[] = [
  // ─────────────────────────────────────────────────────────────────────
  // 0  BAHRAIN — Spiral Orbit, right-side hero
  //    The season opens. Drone spirals down from medium altitude to lock
  //    onto the right side profile. 70mm compression, elegant pacing.
  //    Purpose: establish the car, reveal scale, open the story.
  { radius: 1.45, phi: 1.22,  theta:  Math.PI / 2,     fov: 38, lookAtY:  0.02, lerpSpeed: 0.7 },

  // ─────────────────────────────────────────────────────────────────────
  // 1  SAUDI ARABIA — Low Push-In, front-left street hero
  //    Jeddah's walls close in. Drone skims 2m off the ground, pushes in
  //    from the front-left quarter. Wide 24mm to amplify speed sensation.
  //    Purpose: create speed, convey street-circuit drama, intimate scale.
  { radius: 1.55, phi: 1.46,  theta:  Math.PI * 1.15,  fov: 65, lookAtY:  0.10, lerpSpeed: 2.2 },

  // ─────────────────────────────────────────────────────────────────────
  // 2  AUSTRALIA — Front Three-Quarter, medium-high
  //    Albert Park's blue sky. Classic automotive hero position. Drone at
  //    medium altitude, 50mm balanced lens. Car fully lit from above-left.
  //    Purpose: beauty shot, reveal livery, celebrate the season opening.
  { radius: 1.50, phi: 1.05,  theta:  Math.PI * 1.28,  fov: 50, lookAtY:  0.05, lerpSpeed: 1.0 },

  // ─────────────────────────────────────────────────────────────────────
  // 3  AZERBAIJAN — Ground-Skimming Rear Chase
  //    Baku's long straight. Drone hovers 1m off the ground dead behind
  //    the car, as if being left behind at 300 km/h. 35mm, fast settle.
  //    Purpose: communicate raw speed, emphasise the straight, low drama.
  { radius: 1.42, phi: 1.50,  theta:  0.0,             fov: 60, lookAtY:  0.12, lerpSpeed: 2.5 },

  // ─────────────────────────────────────────────────────────────────────
  // 4  MIAMI — High Spiral Three-Quarter
  //    Miami's skyline. Drone rises during a spiral orbit to a high three-
  //    quarter vantage. 35mm wide captures the environment.
  //    Purpose: showcase glamour, context, scale. Luxury automotive feel.
  { radius: 1.75, phi: 0.65,  theta:  Math.PI / 2.1,   fov: 58, lookAtY: -0.05, lerpSpeed: 0.65 },

  // ─────────────────────────────────────────────────────────────────────
  // 5  MONACO — Top-Down Helicopter
  //    Circuit de Monaco. The drone climbs straight up and looks directly
  //    down. 50mm, car fills the center of the frame like a jewel.
  //    Purpose: reveal Monaco's geometry, show the car in context of the
  //    track. Contemplative, elegant, aristocratic.
  { radius: 1.90, phi: 0.14,  theta:  Math.PI,          fov: 48, lookAtY:  0.0,  lerpSpeed: 0.45 },

  // ─────────────────────────────────────────────────────────────────────
  // 6  SPAIN — Rear Three-Quarter Banking Turn
  //    Drone banks like a real aircraft at 45° through a rear three-quarter
  //    low shot. 50mm. Simulates a professional cinematic bank.
  //    Purpose: dynamic motion, suggest the car exiting a corner at speed.
  { radius: 1.48, phi: 1.28,  theta: -Math.PI * 0.25,  fov: 52, lookAtY:  0.08, lerpSpeed: 1.8 },

  // ─────────────────────────────────────────────────────────────────────
  // 7  CANADA — Driver's Left Side, Slow Pull-Back
  //    Opposite side to the Bahrain opener. Drone slowly eases back to
  //    reveal the full car from the left. 70mm compression, very slow.
  //    Purpose: mirror shot to Bahrain, create visual symmetry in the arc.
  { radius: 1.45, phi: 1.22,  theta: -Math.PI / 2,     fov: 38, lookAtY:  0.0,  lerpSpeed: 0.7 },

  // ─────────────────────────────────────────────────────────────────────
  // 8  AUSTRIA — Red Bull Ring Low-Front Hero Dive
  //    Home race. Drone dives from above to a very low front hero shot.
  //    24mm wide — makes the car look aggressive and dominant.
  //    Purpose: celebrate the home race, create power and dominance.
  { radius: 1.52, phi: 1.44,  theta:  Math.PI * 1.05,  fov: 68, lookAtY:  0.15, lerpSpeed: 2.4 },

  // ─────────────────────────────────────────────────────────────────────
  // 9  GREAT BRITAIN — Rear-Left Tracking, Medium Height
  //    Silverstone's Wing. Drone tracks from rear-left at waist height.
  //    50mm natural lens. Car slightly offset in frame — rule of thirds.
  //    Purpose: relaxed elegance, British restraint. Calm mid-season shot.
  { radius: 1.48, phi: 1.18,  theta: -Math.PI * 0.22,  fov: 52, lookAtY:  0.04, lerpSpeed: 1.2 },

  // ─────────────────────────────────────────────────────────────────────
  // 10 HUNGARY — Crane Up High Cinematic
  //    Hungaroring's bowl. Drone cranes upward from medium to high as the
  //    season passes its midpoint. 35mm capturing context.
  //    Purpose: establish scale, mid-season reflection, sense of journey.
  { radius: 1.80, phi: 0.52,  theta:  Math.PI * 0.82,  fov: 58, lookAtY: -0.06, lerpSpeed: 0.5 },

  // ─────────────────────────────────────────────────────────────────────
  // 11 BELGIUM — Spa Rear Hero, Ground Level
  //    Eau Rouge. Drone ground-level dead behind the car — 85mm telephoto
  //    compression collapses the distance. Dramatic and clinical.
  //    Purpose: convey clinical speed of the fastest circuit on the calendar.
  { radius: 1.44, phi: 1.35,  theta:  0.05,            fov: 36, lookAtY:  0.06, lerpSpeed: 1.0 },

  // ─────────────────────────────────────────────────────────────────────
  // 12 NETHERLANDS — Front-Right Three-Quarter with Lean
  //    Zandvoort's banked corners. Drone at front-right, slightly below
  //    horizon. 50mm, tight. Car leans slightly in frame.
  //    Purpose: intimate, slightly unsettled — suggests a corner apex.
  { radius: 1.52, phi: 1.12,  theta:  Math.PI * 1.35,  fov: 50, lookAtY:  0.06, lerpSpeed: 1.4 },

  // ─────────────────────────────────────────────────────────────────────
  // 13 ITALY — Dynamic Side, Monza Speed Shot
  //    Temple of Speed. Drone at horizon level right-side, very close,
  //    70mm — maximum compression makes the car look impossibly fast.
  //    Purpose: pure speed, Monza deserves the most aggressive side shot.
  { radius: 1.35, phi: 1.40,  theta:  Math.PI / 2,     fov: 35, lookAtY:  0.0,  lerpSpeed: 2.0 },

  // ─────────────────────────────────────────────────────────────────────
  // 14 SINGAPORE — Front Hero Night Shot
  //    Marina Bay's architecture glows. Drone eye-level dead front, very
  //    slight look-up. 50mm. Car fills the frame like a spaceship.
  //    Purpose: cinematic reveal of the car from the front — create awe.
  { radius: 1.55, phi: 1.08,  theta:  Math.PI,          fov: 48, lookAtY:  0.10, lerpSpeed: 0.9 },

  // ─────────────────────────────────────────────────────────────────────
  // 15 JAPAN — FPV Cockpit Rush
  //    Suzuka's S-curves. Drone plunges close to cockpit height. Ultra-wide
  //    24mm for the FPV sensation. Very fast settle — it's an action shot.
  //    Purpose: intimacy and speed. The viewer is the driver for one moment.
  { radius: 0.92, phi: 1.08,  theta:  Math.PI,          fov: 75, lookAtY:  0.22, lerpSpeed: 3.0 },

  // ─────────────────────────────────────────────────────────────────────
  // 16 QATAR — Top-Front Overhead Pull-Back
  //    Lusail's symmetrical layout. Drone overhead but biased toward front,
  //    pulling back slowly. 50mm. Car is a small jewel on a vast canvas.
  //    Purpose: scale, isolation, the enormity of what has been achieved.
  { radius: 1.82, phi: 0.30,  theta:  Math.PI * 1.08,  fov: 50, lookAtY:  0.0,  lerpSpeed: 0.4 },

  // ─────────────────────────────────────────────────────────────────────
  // 17 UNITED STATES — Rear Three-Quarter COTA
  //    Big Tex Energy. Drone rear-right at low-medium altitude, 50mm.
  //    Slightly faster settle — the Americas sequence wants energy.
  //    Purpose: dynamic, powerful, rolling into the final straight.
  { radius: 1.48, phi: 1.20,  theta: -Math.PI * 0.30,  fov: 52, lookAtY:  0.05, lerpSpeed: 1.6 },

  // ─────────────────────────────────────────────────────────────────────
  // 18 MEXICO — Horizon-Level Left Side, Low Afternoon
  //    High altitude, thin air. Drone ground-hugging left side, 70mm.
  //    The atmosphere is thin — the shot feels slightly compressed,
  //    almost suffocating. Maximum telephoto for maximum drama.
  //    Purpose: low-slung, earth-bound. Contrast with the Qatar high shot.
  { radius: 1.40, phi: 1.45,  theta: -Math.PI / 2,     fov: 35, lookAtY:  0.0,  lerpSpeed: 1.1 },

  // ─────────────────────────────────────────────────────────────────────
  // 19 SÃO PAULO — Dramatic Front Push-In
  //    Interlagos under stormy skies. Drone pushes in from medium distance
  //    toward the front — 35mm, slightly wide. The car grows in frame.
  //    Purpose: build drama, anticipation for the closing of the season.
  { radius: 1.58, phi: 1.06,  theta:  Math.PI * 1.08,  fov: 58, lookAtY:  0.10, lerpSpeed: 1.3 },

  // ─────────────────────────────────────────────────────────────────────
  // 20 LAS VEGAS — High Wide Crane-Up
  //    The Strip at night. Drone rockets upward to its highest point.
  //    50mm at maximum height — the car is dwarfed by the context.
  //    Purpose: scale, spectacle, climax before the final shot.
  { radius: 2.00, phi: 0.42,  theta: -Math.PI / 2.2,   fov: 55, lookAtY: -0.08, lerpSpeed: 0.5 },

  // ─────────────────────────────────────────────────────────────────────
  // 21 ABU DHABI — Final Cinematic Spiral Settle
  //    Yas Marina. The last race. The drone descends in a slow spiral from
  //    high-right and settles perfectly on the right side-profile —
  //    mirroring race 0 (Bahrain) to close the circle.
  //    70mm. Glacial pace. The season is complete.
  //    Purpose: closure, elegance, championship celebration.
  { radius: 1.45, phi: 1.22,  theta:  Math.PI / 2,     fov: 38, lookAtY:  0.02, lerpSpeed: 0.6 },
];

// ── Math helpers ─────────────────────────────────────────────

/** Double-smoothstep (≈ power3.inOut) — gentle S-curve with extra softness */
function easeInOut(t: number): number {
  const s = Math.max(0, Math.min(1, t));
  const a = s * s * (3 - 2 * s);        // smoothstep
  return a * a * (3 - 2 * a);           // smoothstep again = extra soft
}

/** Shortest-path angle interpolation — prevents wrap-around snaps */
function lerpAngle(a: number, b: number, t: number): number {
  let d = b - a;
  while (d >  Math.PI) d -= Math.PI * 2;
  while (d < -Math.PI) d += Math.PI * 2;
  return a + d * easeInOut(t);
}

/** Sample the intro keyframe table */
function sampleIntro(t: number, key: 'radius' | 'phi' | 'theta'): number {
  const segs   = INTRO_KF.length - 1;
  const scaled = t * segs;
  const idx    = Math.min(Math.floor(scaled), segs - 1);
  const frac   = scaled - idx;
  const a      = INTRO_KF[idx][key];
  const b      = INTRO_KF[idx + 1][key];
  if (key === 'theta') return lerpAngle(a, b, frac);
  return a + (b - a) * easeInOut(frac);
}

/** Sample the journey keyframe table for a given scalar key */
function sampleJourney(t: number, key: keyof DroneShotKF): number {
  const kf     = JOURNEY_KF;
  const segs   = kf.length - 1;
  const scaled = Math.max(0, Math.min(1, t)) * segs;
  const idx    = Math.min(Math.floor(scaled), segs - 1);
  const frac   = scaled - idx;
  const a      = kf[idx][key] as number;
  const b      = kf[idx + 1][key] as number;
  if (key === 'theta') return lerpAngle(a, b, frac);
  // lerpSpeed blends linearly (we want the destination speed, not an eased blend of speeds)
  if (key === 'lerpSpeed') return a + (b - a) * Math.max(0, Math.min(1, frac));
  return a + (b - a) * easeInOut(frac);
}

// ── Component ────────────────────────────────────────────────

export default function CameraController({ scrollProgress, modelSize, phase }: CameraControllerProps) {
  const { camera }      = useThree();
  const cam             = camera as THREE.PerspectiveCamera;

  // Smoothly-tracked state (updated every frame via lerp, never jumped)
  const currentPos      = useRef(new THREE.Vector3());
  const currentLookAt   = useRef(new THREE.Vector3(0, 0, 0));
  const currentFov      = useRef(52);     // start at a mid FoV

  const baseRadius      = useRef(3);
  const breathClock     = useRef(0);

  // ── Seed camera position once model is measured ─────────────
  useEffect(() => {
    if (!modelSize) return;
    const maxDim       = Math.max(modelSize.x, modelSize.y, modelSize.z);
    baseRadius.current = maxDim * 1.1;

    const r   = baseRadius.current * INTRO_KF[0].radius;
    const phi = INTRO_KF[0].phi;
    // Start just off-axis so lookAt() doesn't produce a degenerate up-vector
    camera.position.set(0.001, r * Math.cos(phi), r * Math.sin(phi) * 0.001 + 0.001);
    camera.lookAt(0, 0, 0);
    currentPos.current.copy(camera.position);
    cam.fov = 52;
    cam.updateProjectionMatrix();
  }, [modelSize, camera, cam]);

  useFrame((_, delta) => {
    const t  = scrollProgress.current;
    const r  = baseRadius.current;

    // Lens-breathing oscillator — always ticking, very subtle
    breathClock.current += delta * 0.42;

    // ── Micro lens-breathe (physical camera-operator feel) ───────
    // Radius oscillates ±0.35%, vertical look-at drifts ±0.25%
    const breathR = Math.sin(breathClock.current) * 0.0035;
    const breathV = Math.sin(breathClock.current * 0.68 + 1.1) * 0.0025;

    let targetPos:    THREE.Vector3;
    let targetLookAt: THREE.Vector3;
    let targetFov:    number;
    let lerpK:        number;

    if (phase.current === 'journey') {
      // ────────────────────────────────────────────────────────────
      // JOURNEY PHASE — Drone Cinematography
      //
      // journeyProgress: re-map global t from [JOURNEY_START_T, 1] → [0, 1]
      const JOURNEY_START_T = 0.28;
      const jp = t < JOURNEY_START_T
        ? 0
        : Math.min(1, (t - JOURNEY_START_T) / (1 - JOURNEY_START_T));

      // Sample per-GP spherical target
      const tRadius  = sampleJourney(jp, 'radius') * r;
      const tPhi     = sampleJourney(jp, 'phi');
      const tTheta   = sampleJourney(jp, 'theta');
      const tLookAtY = sampleJourney(jp, 'lookAtY') * r;
      const tLerpSpd = sampleJourney(jp, 'lerpSpeed');
      targetFov      = sampleJourney(jp, 'fov');

      // Apply breathing on top
      const finalR   = tRadius * (1 + breathR);
      const finalPhi = tPhi + breathV;

      // Spherical → Cartesian
      const sinPhi = Math.sin(finalPhi);
      targetPos = new THREE.Vector3(
        finalR * sinPhi * Math.sin(tTheta),
        finalR * Math.cos(finalPhi),
        finalR * sinPhi * Math.cos(tTheta),
      );

      // Look-at drifts slightly with breathing — never rigidly locked
      targetLookAt = new THREE.Vector3(0, tLookAtY + breathV * r * 0.3, 0);

      // lerpK is the per-shot speed, scaled by delta (frame-rate independent)
      // Clamped so it never exceeds 1 (which would overshoot)
      lerpK = Math.min(1, delta * tLerpSpd);

    } else {
      // ────────────────────────────────────────────────────────────
      // INTRO PHASE — Aerial Crane Down (unchanged)
      const radius = sampleIntro(t, 'radius') * r;
      const phi    = sampleIntro(t, 'phi');
      const theta  = sampleIntro(t, 'theta');

      const sinPhi = Math.sin(phi);
      targetPos = new THREE.Vector3(
        radius * sinPhi * Math.sin(theta),
        radius * Math.cos(phi),
        radius * sinPhi * Math.cos(theta),
      );
      targetLookAt = new THREE.Vector3(0, 0, 0);
      targetFov    = 52;

      // Lerp slows as we approach the side-profile landing
      lerpK = Math.min(1, delta * (t > 0.75
        ? THREE.MathUtils.lerp(0.06, 0.015, (t - 0.75) / 0.25) * 60
        : 0.06 * 60));
    }

    // ── Smooth position, look-at, and FoV ────────────────────────
    currentPos.current.lerp(targetPos, lerpK);
    currentLookAt.current.lerp(targetLookAt, lerpK * 0.85); // look-at slightly lazier
    currentFov.current += (targetFov - currentFov.current) * Math.min(1, delta * 0.9);

    camera.position.copy(currentPos.current);
    camera.lookAt(currentLookAt.current);

    cam.fov = currentFov.current;
    cam.updateProjectionMatrix();
  });

  return null;
}
