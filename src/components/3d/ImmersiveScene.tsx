import React, { useEffect, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Stars } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import FlowParticles from './FlowParticles';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Global interactive state for the 3D scene
export const sceneState = {
  themeColor: new THREE.Color("#F4A261"), // Starts warm (Hero)
  particleSpread: 1.5,   // Higher = more dispersed, Lower = tighter
  speedMultiplier: 0.5,  // Overall movement speed
  structureLevel: 0.2,   // 0 = chaotic cloud, 1 = strict structured path
};

const CameraRig = () => {
  const { camera } = useThree();
  const targetPos = useRef(new THREE.Vector3(0, 0, 10));
  const targetLook = useRef(new THREE.Vector3(0, 0, 0));

  useEffect(() => {
    // Definimos os cenários visuais para cada seção
    const sections = [
      {
        id: 'home', // Sec: Hero - Acolhimento e dispersão suave
        pos: [0, 0, 10], lookAt: [0, 0, 0],
        color: "#F4A261", // Amber
        spread: 1.5, speed: 0.5, build: 0.2
      },
      {
        id: 'abordagem', // Sec: TCC - Estrutura, clareza, razão
        pos: [2, 1, 8], lookAt: [0, 0, 0],
        color: "#2A9D8F", // Teal
        spread: 0.4, speed: 0.8, build: 0.9
      },
      {
        id: 'sobre', // Sec: Sobre/Sistema Límbico - Emoção, orgânico, profundo
        pos: [-2, -1, 6], lookAt: [0, 0, 0],
        color: "#E76F51", // Coral/Rosa
        spread: 1.0, speed: 0.3, build: 0.4
      },
      {
        id: 'como-funciona', // Sec: Processo - Crescimento, caminho
        pos: [0, 2, 8], lookAt: [0, -1, 0],
        color: "#A3B4A2", // Verde suave
        spread: 0.6, speed: 1.0, build: 0.7
      },
      {
        id: 'agendar', // Sec: CTA - Expandido, seguro, claro
        pos: [0, 0, 12], lookAt: [0, 0, 0],
        color: "#E9C46A", // Dourado claro
        spread: 2.0, speed: 0.2, build: 0.1
      }
    ];

    const transitionTo = (sec: any) => {
      // Camera movement
      gsap.to(targetPos.current, { x: sec.pos[0], y: sec.pos[1], z: sec.pos[2], duration: 2.5, ease: "power2.inOut" });
      gsap.to(targetLook.current, { x: sec.lookAt[0], y: sec.lookAt[1], z: sec.lookAt[2], duration: 2.5, ease: "power2.inOut" });

      // Scene properties
      const targetColor = new THREE.Color(sec.color);
      gsap.to(sceneState.themeColor, { r: targetColor.r, g: targetColor.g, b: targetColor.b, duration: 2.5, ease: "power2.inOut" });
      gsap.to(sceneState, { particleSpread: sec.spread, speedMultiplier: sec.speed, structureLevel: sec.build, duration: 2.5, ease: "power2.inOut" });
    };

    sections.forEach((sec) => {
      const el = document.getElementById(sec.id);
      if (!el) return;

      ScrollTrigger.create({
        trigger: `#${sec.id}`,
        start: "top center",
        end: "bottom center",
        onEnter: () => transitionTo(sec),
        onEnterBack: () => transitionTo(sec)
      });
    });

    return () => { ScrollTrigger.getAll().forEach(t => t.kill()); };
  }, []);

  useFrame((state) => {
    // Interpolate camera smoothly
    state.camera.position.lerp(targetPos.current, 0.03);

    // Interpolate lookat smoothly using quaternions
    const targetQuaternion = new THREE.Quaternion();
    const cloneCam = state.camera.clone();
    cloneCam.lookAt(targetLook.current);
    targetQuaternion.copy(cloneCam.quaternion);

    state.camera.quaternion.slerp(targetQuaternion, 0.03);
  });

  return null;
};

const ImmersiveScene = () => {
  return (
    <div className="brain-canvas-container" style={{
      position: 'fixed',
      top: 0, left: 0,
      width: '100%', height: '100vh',
      zIndex: -1, pointerEvents: 'none',
      background: 'linear-gradient(to bottom, #FAF7F3, #F5EDE8)' // Soft minimal cream gradient
    }}>
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }} dpr={[1, 2]}> {/* cap DPR to 2 for performance */}
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.0} color="#ffffff" />
        <pointLight position={[-10, -10, -10]} intensity={0.3} color="#ffffff" />

        <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.2}>
          <FlowParticles count={800} />
        </Float>

        {/* Very subtle background depth points */}
        <Stars radius={100} depth={50} count={1500} factor={3} saturation={0} fade speed={0.5} />

        <CameraRig />
      </Canvas>
    </div>
  );
};

export default ImmersiveScene;
