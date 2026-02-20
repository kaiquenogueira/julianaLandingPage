import React, { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, Float, Stars } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import BrainParticles from './Brain';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const CameraRig = () => {
  const { camera } = useThree();
  const cameraRef = useRef(camera);
  
  // Initial camera position
  const targetPosition = useRef(new THREE.Vector3(0, 0, 9));
  const targetLookAt = useRef(new THREE.Vector3(0, 0, 0));

  useEffect(() => {
    // Define scroll sections and their corresponding camera states
    const sections = [
      {
        id: 'home', // Hero - Overview
        position: { x: 0, y: 0, z: 9 },
        lookAt: { x: 0, y: 0, z: 0 }
      },
      {
        id: 'abordagem', // Prefrontal Cortex - Thought/Approach
        position: { x: 0, y: 2, z: 6 }, // Front/Top focus
        lookAt: { x: 0, y: 1, z: 2 }
      },
      {
        id: 'sobre', // Limbic System - Emotions
        position: { x: 3, y: 0, z: 3 }, // Side/Deep
        lookAt: { x: 0, y: 0, z: 0 }
      },
      {
        id: 'como-funciona', // Hippocampus - Memories/Process
        position: { x: -2, y: -2, z: 4 }, // Lower/Side
        lookAt: { x: 0, y: -1, z: 0 }
      },
      {
        id: 'agendar', // CTA/Amygdala - Safety/Action
        position: { x: 0, y: 0, z: 12 }, // Zoom out for safety/perspective
        lookAt: { x: 0, y: 0, z: 0 }
      }
    ];

    sections.forEach((section, index) => {
      const element = document.getElementById(section.id);
      if (!element) return;

      // Create scroll trigger for each section
      ScrollTrigger.create({
        trigger: `#${section.id}`,
        start: "top center",
        end: "bottom center",
        onEnter: () => {
          gsap.to(targetPosition.current, {
            x: section.position.x,
            y: section.position.y,
            z: section.position.z,
            duration: 2,
            ease: "power2.inOut"
          });
          gsap.to(targetLookAt.current, {
            x: section.lookAt.x,
            y: section.lookAt.y,
            z: section.lookAt.z,
            duration: 2,
            ease: "power2.inOut"
          });
        },
        onEnterBack: () => {
          gsap.to(targetPosition.current, {
            x: section.position.x,
            y: section.position.y,
            z: section.position.z,
            duration: 2,
            ease: "power2.inOut"
          });
          gsap.to(targetLookAt.current, {
            x: section.lookAt.x,
            y: section.lookAt.y,
            z: section.lookAt.z,
            duration: 2,
            ease: "power2.inOut"
          });
        }
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  useFrame((state) => {
    // Smoothly interpolate camera position
    state.camera.position.lerp(targetPosition.current, 0.03);
    
    // Smoothly look at target
    const targetQuaternion = new THREE.Quaternion();
    const cloneCam = state.camera.clone();
    cloneCam.lookAt(targetLookAt.current);
    targetQuaternion.copy(cloneCam.quaternion);
    
    state.camera.quaternion.slerp(targetQuaternion, 0.03);
  });

  return null;
};

const BrainScene = () => {
  return (
    <div className="brain-canvas-container" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100vh',
      zIndex: -1,
      pointerEvents: 'none',
      background: 'linear-gradient(to bottom, #FAF7F3, #F5EDE8)' // Warm cream gradient
    }}>
      <Canvas camera={{ position: [0, 0, 9], fov: 45 }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={0.8} color="#F4A261" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#2A9D8F" />
        
        <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.2}>
          <BrainParticles />
        </Float>
        
        {/* Subtle background particles/stars for depth */}
        <Stars radius={100} depth={50} count={1000} factor={4} saturation={0} fade speed={1} />
        
        <CameraRig />
      </Canvas>
    </div>
  );
};

export default BrainScene;
