import { useRef, useState, useEffect, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, MeshWobbleMaterial, Stars, Sparkles, Environment } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";

function ShieldModel() {
  const meshRef = useRef();
  const { viewport } = useThree();
  const pointer = useRef({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const onMove = (e) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, pointer.current.y * 0.4, 0.08);
      meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, pointer.current.x * 0.4, 0.08);
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.4}>
      <mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={viewport.width / 5.5}
      >
        <octahedronGeometry args={[1, 0]} />
        <MeshWobbleMaterial
          color={hovered ? "#F2600B" : "#1a1a1a"}
          emissive="#F2600B"
          emissiveIntensity={hovered ? 0.7 : 0.25}
          roughness={0.3}
          metalness={0.7}
          speed={1.5}
          factor={0.4}
        />
      </mesh>
    </Float>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      dpr={[1, 1.5]}
      performance={{ min: 0.5 }}
      style={{ position: "absolute", inset: 0 }}
    >
      <Suspense fallback={null}>
        <color attach="background" args={["#000000"]} />
        <fog attach="fog" args={["#000000", 5, 15]} />
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={0.8} color="#F2600B" />
        <pointLight position={[-10, -5, 5]} intensity={0.4} color="#FFFFFF" />
        <ShieldModel />
        <Stars radius={50} depth={50} count={600} factor={4} saturation={0} fade speed={0.8} />
        <Sparkles count={60} scale={10} size={2} speed={0.4} color="#F2600B" />
        <Environment preset="city" />
        <EffectComposer multisampling={0}>
          <Bloom luminanceThreshold={0.3} luminanceSmoothing={0.9} height={200} intensity={1} />
          <Vignette eskil={false} offset={0.1} darkness={1.1} />
        </EffectComposer>
      </Suspense>
    </Canvas>
  );
}
