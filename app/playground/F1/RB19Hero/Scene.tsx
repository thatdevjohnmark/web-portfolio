'use client';

import { useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import Model from './Model';
import Lighting from './Lighting';
import CameraController from './CameraController';
import TrackPlane from './TrackPlane';
import Particles from './Particles';

interface SceneProps {
  scrollProgress:  React.MutableRefObject<number>;
  floatRef:        React.MutableRefObject<number>;
  /** 'intro' (aerial sweep) | 'journey' (locked side profile). */
  phase:           React.MutableRefObject<'intro' | 'journey'>;
  /** Instantaneous scroll speed 0→1 — used by Model for wheel rpm. */
  scrollVelocity:  React.MutableRefObject<number>;
}

export default function Scene({ scrollProgress, floatRef, phase, scrollVelocity }: SceneProps) {
  const [modelSize, setModelSize] = useState<THREE.Vector3 | null>(null);

  const handleReady = useCallback(
    (_box: THREE.Box3, size: THREE.Vector3, _center: THREE.Vector3) => {
      setModelSize(size);
    },
    []
  );

  return (
    <>
      <CameraController scrollProgress={scrollProgress} modelSize={modelSize} phase={phase} />
      <Lighting scrollProgress={scrollProgress} phase={phase} />

      {/* Track surface — scrolls beneath the car */}
      <TrackPlane scrollProgress={scrollProgress} scrollVelocity={scrollVelocity} />

      {/* The RB19 */}
      <Model
        floatRef={floatRef}
        scrollProgress={scrollProgress}
        scrollVelocity={scrollVelocity}
        onReady={handleReady}
      />

      {/* Foreground particles */}
      <Particles scrollProgress={scrollProgress} />
    </>
  );
}
