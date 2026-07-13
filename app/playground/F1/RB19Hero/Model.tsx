'use client';

import { useRef, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ModelProps {
  floatRef:       React.MutableRefObject<number>;
  scrollProgress: React.MutableRefObject<number>;
  /** Instantaneous scroll speed 0→1 — drives wheel RPM. */
  scrollVelocity: React.MutableRefObject<number>;
  onReady:        (box: THREE.Box3, size: THREE.Vector3, center: THREE.Vector3) => void;
}

const TRACK_Y = -1.08; // must match TrackPlane position y

export default function Model({ floatRef, scrollProgress, scrollVelocity, onReady }: ModelProps) {
  const { scene } = useGLTF('/RB19/source/oracle_red_bull_f1_car_rb19_2023.glb');
  const groupRef  = useRef<THREE.Group>(null);
  const wheelRefs = useRef<THREE.Object3D[]>([]);
  const clock     = useRef(0);
  const ready     = useRef(false);
  const baseY     = useRef(0); // Y offset so wheels sit on the track

  useEffect(() => {
    if (!scene || ready.current) return;
    ready.current = true;

    const box    = new THREE.Box3().setFromObject(scene);
    const size   = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);

    // Center the model horizontally/depth-wise, but keep Y at origin first
    scene.position.sub(center);

    // After centering, recompute the box minimum Y (bottom of model)
    const box2 = new THREE.Box3().setFromObject(scene);
    // Raise/lower the group so the bottom of the model sits exactly on TRACK_Y
    baseY.current = TRACK_Y - box2.min.y;

    scene.traverse((obj) => {
      const name = obj.name.toLowerCase();

      // Log all node names once so we can see what the GLB contains
      if (process.env.NODE_ENV === 'development') {
        console.log('[RB19 node]', obj.name, obj.type);
      }

      if (
        name.includes('wheel') ||
        name.includes('tyre') ||
        name.includes('tire') ||
        name.includes('rim') ||
        name.includes('roue') ||
        name.includes('roda') ||
        name.includes('reifen') ||
        name.includes('ruota') ||
        name.includes('front_l') ||
        name.includes('front_r') ||
        name.includes('rear_l') ||
        name.includes('rear_r') ||
        name.includes('fl_') ||
        name.includes('fr_') ||
        name.includes('rl_') ||
        name.includes('rr_') ||
        name.includes('_fl') ||
        name.includes('_fr') ||
        name.includes('_rl') ||
        name.includes('_rr') ||
        name.includes('suspension') ||
        name.includes('axle') ||
        name.includes('rotate')
      ) {
        wheelRefs.current.push(obj);
      }
    });

    onReady(box, size, center);
  }, [scene, onReady]);

  useFrame((_, delta) => {
    clock.current += delta;

    if (groupRef.current) {
      // Gentle float — always present, anchored to the track surface
      groupRef.current.position.y =
        baseY.current + Math.sin(clock.current * 0.4) * 0.015 + floatRef.current;

      // Micro suspension oscillation — invisible unless you look for it
      groupRef.current.rotation.z =
        Math.sin(clock.current * 0.9) * 0.003;
    }

    // Wheel spin speed: base 0.5 rad/s + boost from scroll velocity
    const vel      = scrollVelocity.current;
    const spinRate = 0.5 + vel * 8.0; // fast scrolling = spinning wheels

    wheelRefs.current.forEach((wheel) => {
      wheel.rotation.x += delta * spinRate;
    });
  });

  return (
    <group ref={groupRef} rotation={[0, Math.PI, 0]}>
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload('/RB19/source/oracle_red_bull_f1_car_rb19_2023.glb');
