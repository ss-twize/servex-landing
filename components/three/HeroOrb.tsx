"use client";
import { Suspense, useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/* ─── Animated orb core ─── */
function Orb() {
  const groupRef = useRef<THREE.Group>(null);
  const wireRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.PointLight>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const { viewport } = useThree();

  /* Track pointer across the canvas */
  useFrame(({ pointer, clock }) => {
    const t = clock.getElapsedTime();

    // Smooth mouse follow
    mouse.current.x += (pointer.x * 0.3 - mouse.current.x) * 0.05;
    mouse.current.y += (pointer.y * 0.2 - mouse.current.y) * 0.05;

    if (groupRef.current) {
      // Slow auto-rotation + mouse offset
      groupRef.current.rotation.y = t * 0.08 + mouse.current.x * 0.5;
      groupRef.current.rotation.x = Math.sin(t * 0.05) * 0.1 + mouse.current.y * 0.3;
      groupRef.current.rotation.z = Math.sin(t * 0.03) * 0.05;
    }

    // Wireframe counter-rotation for depth
    if (wireRef.current) {
      wireRef.current.rotation.y = -t * 0.04;
      wireRef.current.rotation.x = -t * 0.02;
    }

    // Pulsing glow
    if (glowRef.current) {
      glowRef.current.intensity = 1.5 + Math.sin(t * 1.2) * 0.4;
    }
  });

  const radius = Math.min(viewport.width, viewport.height) * 0.28;
  const clampedRadius = Math.max(1.2, Math.min(radius, 2.2));

  /* Shared geometry for perf */
  const icoGeo = useMemo(
    () => new THREE.IcosahedronGeometry(clampedRadius, 2),
    [clampedRadius]
  );
  const sphereGeo = useMemo(
    () => new THREE.IcosahedronGeometry(clampedRadius * 0.92, 3),
    [clampedRadius]
  );
  const glowGeo = useMemo(
    () => new THREE.IcosahedronGeometry(clampedRadius * 1.15, 3),
    [clampedRadius]
  );

  return (
    <group ref={groupRef}>
      {/* Point light for glow pulse */}
      <pointLight
        ref={glowRef}
        color="#00F090"
        intensity={1.5}
        distance={12}
        decay={2}
      />

      {/* Dark solid core */}
      <mesh geometry={sphereGeo}>
        <meshStandardMaterial
          color="#040F0F"
          roughness={0.7}
          metalness={0.3}
        />
      </mesh>

      {/* Green energy wireframe */}
      <mesh ref={wireRef} geometry={icoGeo}>
        <meshBasicMaterial
          color="#00F090"
          wireframe
          transparent
          opacity={0.35}
        />
      </mesh>

      {/* Secondary finer wireframe for depth */}
      <mesh geometry={icoGeo} rotation={[0.4, 0.3, 0.1]}>
        <meshBasicMaterial
          color="#00F090"
          wireframe
          transparent
          opacity={0.12}
        />
      </mesh>

      {/* Outer glow shell */}
      <mesh geometry={glowGeo}>
        <meshBasicMaterial
          color="#00F090"
          transparent
          opacity={0.04}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

/* ─── Ambient particles floating around ─── */
function Particles({ count = 40 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 2.5 + Math.random() * 2;
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count]);

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * 0.02;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#00F090"
        size={0.02}
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* ─── Exported Canvas wrapper ─── */
export default function HeroOrb({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <Suspense fallback={<div className="w-full h-full" />}>
        <Canvas
          camera={{ position: [0, 0, 6], fov: 45 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true }}
          style={{ background: "transparent" }}
        >
          <ambientLight intensity={0.15} />
          <directionalLight
            position={[5, 3, 5]}
            intensity={0.3}
            color="#FDFBED"
          />
          <Orb />
          <Particles />
        </Canvas>
      </Suspense>
    </div>
  );
}
