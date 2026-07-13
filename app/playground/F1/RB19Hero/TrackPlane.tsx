'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface TrackPlaneProps {
  scrollProgress:  React.MutableRefObject<number>;
  scrollVelocity?: React.MutableRefObject<number>;
}

// Build the track texture procedurally on a canvas
function buildTrackTexture(): THREE.CanvasTexture {
  const w = 1024;
  const h = 2048;
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d')!;

  // Asphalt base
  ctx.fillStyle = '#111113';
  ctx.fillRect(0, 0, w, h);

  // Subtle asphalt grain
  for (let i = 0; i < 8000; i++) {
    const x = Math.random() * w;
    const y = Math.random() * h;
    const r = Math.random() * 1.5;
    const v = Math.floor(Math.random() * 30 + 10);
    ctx.fillStyle = `rgba(${v},${v},${v},0.4)`;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  // Rubber tire marks — diagonal streaks
  ctx.strokeStyle = 'rgba(30,25,20,0.55)';
  ctx.lineWidth = 18;
  for (let i = 0; i < 6; i++) {
    const x = 120 + i * 140;
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x + 40, h);
    ctx.stroke();
  }

  // White centre line (dashed)
  ctx.setLineDash([80, 60]);
  ctx.strokeStyle = 'rgba(255,255,255,0.55)';
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(w / 2, 0);
  ctx.lineTo(w / 2, h);
  ctx.stroke();
  ctx.setLineDash([]);

  // White edge lines
  ctx.strokeStyle = 'rgba(255,255,255,0.5)';
  ctx.lineWidth = 6;
  for (const x of [60, w - 60]) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, h);
    ctx.stroke();
  }

  // Start/finish grid boxes
  const gridY = [200, 500, 800, 1100, 1400, 1700];
  gridY.forEach((y) => {
    ctx.fillStyle = 'rgba(255,255,255,0.06)';
    ctx.fillRect(80, y, w - 160, 60);
    ctx.strokeStyle = 'rgba(255,255,255,0.12)';
    ctx.lineWidth = 1;
    ctx.strokeRect(80, y, w - 160, 60);
  });

  // Red/white kerb stripes on edges
  const kerbW = 55;
  const stripeH = 70;
  for (let y = 0; y < h; y += stripeH * 2) {
    ctx.fillStyle = 'rgba(220,30,30,0.7)';
    ctx.fillRect(0, y, kerbW, stripeH);
    ctx.fillRect(w - kerbW, y + stripeH, kerbW, stripeH);
    ctx.fillStyle = 'rgba(255,255,255,0.7)';
    ctx.fillRect(0, y + stripeH, kerbW, stripeH);
    ctx.fillRect(w - kerbW, y, kerbW, stripeH);
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(1, 3);
  return tex;
}

export default function TrackPlane({ scrollProgress, scrollVelocity }: TrackPlaneProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const matRef  = useRef<THREE.MeshStandardMaterial>(null);
  const accumulatedOffset = useRef(0);

  const texture = useMemo(() => {
    if (typeof window === 'undefined') return null;
    return buildTrackTexture();
  }, []);

  useFrame((_, delta) => {
    if (!matRef.current || !texture) return;
    // Base speed from scroll progress + velocity boost
    const vel   = scrollVelocity?.current ?? 0;
    const speed = 1.8 + vel * 4.0;
    accumulatedOffset.current += delta * speed * 0.6;
    texture.offset.y = accumulatedOffset.current;
    texture.needsUpdate = false;
  });

  if (!texture) return null;

  return (
    <mesh
      ref={meshRef}
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -1.08, 0]}
      receiveShadow
    >
      <planeGeometry args={[14, 60, 1, 1]} />
      <meshStandardMaterial
        ref={matRef}
        map={texture}
        roughness={0.88}
        metalness={0.05}
      />
    </mesh>
  );
}
