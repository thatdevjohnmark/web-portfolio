'use client';

import { Suspense, useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, OrbitControls, Environment, ContactShadows, Html } from '@react-three/drei';
import * as THREE from 'three';

function LoadingIndicator() {
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center gap-3">
        <div
          style={{
            width: 32,
            height: 32,
            border: '2px solid #E8002D',
            borderTopColor: 'transparent',
            borderRadius: '50%',
            animation: 'spin 0.8s linear infinite',
          }}
        />
        <span style={{ fontFamily: 'monospace', fontSize: 10, color: '#555', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
          Loading RB19...
        </span>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    </Html>
  );
}

function RB19Model() {
  const { scene } = useGLTF('/RB19/source/oracle_redbull_rb19.glb');
  const groupRef = useRef<THREE.Group>(null);
  const { camera } = useThree();

  // Auto-fit camera to model bounding box on load
  useEffect(() => {
    if (!scene) return;

    const box = new THREE.Box3().setFromObject(scene);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);

    // Move the scene so its center is at the origin
    scene.position.sub(center);

    // Pull camera back to fit the model
    const fov = (camera as THREE.PerspectiveCamera).fov * (Math.PI / 180);
    const distance = (maxDim / 2) / Math.tan(fov / 2) * 0.9;
    camera.position.set(distance * 0.6, distance * 0.25, distance * 0.6);
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();
  }, [scene, camera]);

  // Slow auto-rotate
  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.18;
    }
  });

  return (
    <group ref={groupRef}>
      <primitive object={scene} />
    </group>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 8, 5]} intensity={1.5} castShadow />
      <directionalLight position={[-5, 3, -5]} intensity={0.5} color="#6692FF" />
      <pointLight position={[0, 5, 0]} intensity={0.8} color="#E8002D" />
      <Environment preset="studio" />

      <Suspense fallback={<LoadingIndicator />}>
        <RB19Model />
        <ContactShadows
          position={[0, -1, 0]}
          opacity={0.4}
          scale={20}
          blur={2.5}
          far={2}
          color="#000"
        />
      </Suspense>

      <OrbitControls
        enablePan={false}
        enableZoom={true}
        minDistance={1}
        maxDistance={30}
        minPolarAngle={Math.PI / 8}
        maxPolarAngle={Math.PI / 2.1}
      />
    </>
  );
}

export default function RB19Viewer() {
  return (
    <div className="relative w-full" style={{ height: '520px' }}>
      <Canvas
        camera={{ position: [8, 3, 8], fov: 60, near: 0.01, far: 1000 }}
        gl={{ antialias: true, alpha: true }}
        shadows
        style={{ background: 'transparent' }}
      >
        <Scene />
      </Canvas>

      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[9px] font-mono text-[#333] uppercase tracking-widest select-none pointer-events-none whitespace-nowrap">
        Drag to rotate · Scroll to zoom
      </div>
    </div>
  );
}

useGLTF.preload('/RB19/source/oracle_redbull_rb19.glb');
