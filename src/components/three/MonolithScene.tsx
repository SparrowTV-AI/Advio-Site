"use client";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Environment, Lightformer } from "@react-three/drei";

export type MonolithPose = {
  rotation?: [number, number, number];
  position?: [number, number, number];
  scale?: number;
};

/** Builds the ADVIO mark: a rounded square with a circular bite in one corner. */
function useMarkGeometry() {
  return useMemo(() => {
    const R = 0.38; // corner radius
    const cx = 0.75, cy = 0.75, r = 0.75; // bite circle
    const yHit = cy - Math.sqrt(r * r - (1 - cx) ** 2);
    const xHit = cx - Math.sqrt(r * r - (1 - cy) ** 2);
    const s = new THREE.Shape();
    s.moveTo(-1 + R, -1);
    s.lineTo(1 - R, -1);
    s.quadraticCurveTo(1, -1, 1, -1 + R);
    s.lineTo(1, yHit);
    s.absarc(cx, cy, r, Math.atan2(yHit - cy, 1 - cx), Math.atan2(1 - cy, xHit - cx), true);
    s.lineTo(-1 + R, 1);
    s.quadraticCurveTo(-1, 1, -1, 1 - R);
    s.lineTo(-1, -1 + R);
    s.quadraticCurveTo(-1, -1, -1 + R, -1);
    const g = new THREE.ExtrudeGeometry(s, {
      depth: 0.7,
      bevelEnabled: true,
      bevelThickness: 0.16,
      bevelSize: 0.14,
      bevelSegments: 12,
      curveSegments: 64,
    });
    g.translate(0, 0, -0.35);
    g.computeVertexNormals();
    return g;
  }, []);
}

/** The blue rhombus from the Advio logo, as a faceted 3D diamond (a tall octahedron). */
function useDiamondGeometry() {
  return useMemo(() => {
    const g = new THREE.OctahedronGeometry(0.4, 0);
    g.scale(1, 1.3, 1);
    g.computeVertexNormals();
    return g;
  }, []);
}

function Mark({ pose }: { pose: MonolithPose }) {
  const group = useRef<THREE.Group>(null);
  const gem = useRef<THREE.Mesh>(null);
  const geometry = useMarkGeometry();
  const diamond = useDiamondGeometry();
  const base = pose.rotation ?? [0.1, -0.38, 0.62];

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    const scroll = typeof window !== "undefined" ? window.scrollY / window.innerHeight : 0;
    const { x, y } = state.pointer;
    const g = group.current;
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, base[0] - y * 0.15 + Math.sin(t * 0.4) * 0.04, 0.05);
    g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, base[1] + x * 0.25 + scroll * 0.9, 0.05);
    g.rotation.z = base[2];
    g.position.y = (pose.position?.[1] ?? 0) + Math.sin(t * 0.8) * 0.06 + scroll * 0.6;
    if (gem.current) {
      gem.current.rotation.y = t * 0.45;
    }
  });

  return (
    <group ref={group} position={pose.position ?? [0, 0, 0]} scale={pose.scale ?? 1}>
      <mesh geometry={geometry} castShadow>
        <meshPhysicalMaterial color="#e6e9ef" metalness={1} roughness={0.26} clearcoat={0.5} clearcoatRoughness={0.25} envMapIntensity={1.4} />
      </mesh>
      {/* counter the mark's tilt so the diamond stands upright */}
      <group position={[0.56, 0.56, 0.14]} rotation={[0, 0, -base[2]]} scale={1}>
        <mesh ref={gem} geometry={diamond}>
          <meshPhysicalMaterial
            color="#1a4bff"
            toneMapped={false}
            emissive="#0b35ff"
            emissiveIntensity={0.25}
            metalness={0.2}
            roughness={0.08}
            clearcoat={1}
            flatShading
            envMapIntensity={1.8}
          />
        </mesh>
      </group>
      <pointLight position={[0.6, 0.6, 1.1]} color="#2f5bff" intensity={3} distance={2.5} />
    </group>
  );
}

export default function MonolithScene({ pose = {} }: { pose?: MonolithPose }) {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0, 6.2], fov: 32 }}
      gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping }}
    >
      <ambientLight intensity={0.25} />
      <spotLight position={[4, 6, 5]} angle={0.4} penumbra={1} intensity={60} color="#ffffff" />
      <Mark pose={pose} />
      <ContactShadows position={[0, -1.9, 0]} opacity={0.55} scale={8} blur={2.6} far={4} color="#000814" />
      <Environment resolution={256}>
        <Lightformer form="rect" intensity={4} position={[0, 4, -2]} scale={[10, 2, 1]} />
        <Lightformer form="rect" intensity={2.5} position={[-5, 1, 1]} rotation-y={Math.PI / 2} scale={[8, 3, 1]} />
        <Lightformer form="rect" intensity={1.5} position={[5, -1, 1]} rotation-y={-Math.PI / 2} scale={[8, 2, 1]} />
        <Lightformer form="ring" intensity={2} color="#4f7bff" position={[2, 0, -4]} scale={3} />
        <Lightformer form="rect" intensity={0.6} position={[0, -4, 2]} rotation-x={-Math.PI / 2} scale={[10, 10, 1]} />
        <Lightformer form="rect" intensity={1.2} position={[-3, 3, 6]} scale={[6, 4, 1]} />
        <Lightformer form="rect" intensity={0.8} position={[3, -2, 6]} scale={[4, 6, 1]} color="#cfd8ea" />
      </Environment>
    </Canvas>
  );
}
