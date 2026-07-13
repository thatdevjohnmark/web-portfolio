'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticlesProps {
  scrollProgress: React.MutableRefObject<number>;
}

const COUNT = 120;

export default function Particles({ scrollProgress }: ParticlesProps) {
  const meshRef = useRef<THREE.Points>(null);

  // Build particle positions and metadata once
  const { positions, velocities, sizes } = useMemo(() => {
    const positions  = new Float32Array(COUNT * 3);
    const velocities = new Float32Array(COUNT); // z-speed per particle
    const sizes      = new Float32Array(COUNT);

    for (let i = 0; i < COUNT; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * 16;   // x spread
      positions[i * 3 + 1] = (Math.random() - 0.5) * 4;    // y spread
      positions[i * 3 + 2] = (Math.random() - 0.5) * 12;   // z spread
      velocities[i] = 0.02 + Math.random() * 0.06;
      sizes[i] = Math.random();
    }
    return { positions, velocities, sizes };
  }, []);

  const posRef = useRef(positions.slice());

  useFrame((_, delta) => {
    if (!meshRef.current) return;

    const t     = scrollProgress.current;
    const speed = THREE.MathUtils.lerp(0.3, 2.5, t); // faster as scroll increases

    for (let i = 0; i < COUNT; i++) {
      // Move particles toward camera (positive Z)
      posRef.current[i * 3 + 2] += velocities[i] * speed;

      // Wrap back when too close to camera
      if (posRef.current[i * 3 + 2] > 8) {
        posRef.current[i * 3 + 2] = -12;
        posRef.current[i * 3 + 0] = (Math.random() - 0.5) * 16;
        posRef.current[i * 3 + 1] = (Math.random() - 0.5) * 4;
      }
    }

    const attr = meshRef.current.geometry.attributes.position as THREE.BufferAttribute;
    attr.array.set(posRef.current);
    attr.needsUpdate = true;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[sizes, 1]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#ffffff"
        transparent
        opacity={0.45}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
