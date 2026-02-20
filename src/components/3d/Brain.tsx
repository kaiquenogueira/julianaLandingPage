import React, { useMemo, useRef, useLayoutEffect, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const BrainParticles = ({ count = 400 }) => {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const linesGeometryRef = useRef<THREE.BufferGeometry>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Generate brain-like shape points with regions
  const { particles, connections } = useMemo(() => {
    const temp = [];
    // Two hemispheres
    for (let i = 0; i < count; i++) {
      // Choose left or right hemisphere
      const isRight = Math.random() > 0.5;
      const xOffset = isRight ? 0.8 : -0.8;
      
      // Ellipsoid parameters
      const u = Math.random();
      const v = Math.random();
      const theta = 2 * Math.PI * u;
      const phi = Math.acos(2 * v - 1);
      
      let x = 1.8 * Math.sin(phi) * Math.cos(theta); // Width
      let y = 2.2 * Math.sin(phi) * Math.sin(theta); // Height
      let z = 2.5 * Math.cos(phi); // Length - front/back
      
      // Flatten the bottom slightly
      if (y < -1) y *= 0.8;
      
      // Indent the center to separate hemispheres visually
      x += xOffset;

      // Add noise
      x += (Math.random() - 0.5) * 0.2;
      y += (Math.random() - 0.5) * 0.2;
      z += (Math.random() - 0.5) * 0.2;

      // Assign region based on position
      let color = new THREE.Color();
      let region = 'cortex'; // default

      // Prefrontal Cortex (Front) - Teal/Thought
      if (z > 1.5) {
        region = 'prefrontal';
        color.set('#2A9D8F'); // Deep Teal
      } 
      // Limbic System (Center/Deep) - Coral/Emotion
      else if (Math.abs(x) < 1.2 && Math.abs(y) < 1 && Math.abs(z) < 1) {
        region = 'limbic';
        color.set('#E76F51'); // Coral
      }
      // Hippocampus (Lower/Side) - Amber/Memory
      else if (y < -0.5 && Math.abs(x) > 1) {
        region = 'hippocampus';
        color.set('#F4A261'); // Golden Amber
      }
      // Occipital/Parietal (Back/Top) - Green/Soft
      else {
        region = 'general';
        color.set('#A3B4A2'); // Sage Green
      }

      // Randomize color slightly
      color.r += (Math.random() - 0.5) * 0.1;
      color.g += (Math.random() - 0.5) * 0.1;
      color.b += (Math.random() - 0.5) * 0.1;

      temp.push({ x, y, z, initialX: x, initialY: y, initialZ: z, color });
    }

    // Calculate connections (nearest neighbors)
    const conns = [];
    const maxDistance = 1.2; // Adjust for density of lines

    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const dx = temp[i].x - temp[j].x;
        const dy = temp[i].y - temp[j].y;
        const dz = temp[i].z - temp[j].z;
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < maxDistance) {
          conns.push([i, j]);
        }
      }
    }

    return { particles: temp, connections: conns };
  }, [count]);

  // Pre-allocate buffer for line positions
  const linePositions = useMemo(() => new Float32Array(connections.length * 6), [connections]);
  
  // Pre-calculate line colors
  const lineColors = useMemo(() => {
    const colors = new Float32Array(connections.length * 6);
    connections.forEach(([i, j], index) => {
      // Use color of the first particle for the line
      const color = particles[i].color;
      
      colors[index * 6] = color.r;
      colors[index * 6 + 1] = color.g;
      colors[index * 6 + 2] = color.b;
      
      colors[index * 6 + 3] = color.r;
      colors[index * 6 + 4] = color.g;
      colors[index * 6 + 5] = color.b;
    });
    return colors;
  }, [connections, particles]);

  useLayoutEffect(() => {
    if (!mesh.current) return;
    particles.forEach((particle, i) => {
      dummy.position.set(particle.x, particle.y, particle.z);
      dummy.scale.set(0.04, 0.04, 0.04); // Smaller particles
      dummy.updateMatrix();
      mesh.current!.setMatrixAt(i, dummy.matrix);
      mesh.current!.setColorAt(i, particle.color);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
    if (mesh.current.instanceColor) mesh.current.instanceColor.needsUpdate = true;
  }, [particles, dummy]);

  // Temp array to store current frame positions to avoid recalculating for lines
  const currentPositions = useMemo(() => new Float32Array(count * 3), [count]);

  useFrame((state) => {
    if (!mesh.current || !linesGeometryRef.current) return;
    
    const time = state.clock.getElapsedTime();

    // 1. Update Particles
    particles.forEach((particle, i) => {
      const { initialX, initialY, initialZ } = particle;
      
      // Slower, smoother movement
      const x = initialX + Math.sin(time * 0.2 + initialY) * 0.05;
      const y = initialY + Math.cos(time * 0.15 + initialX) * 0.05;
      const z = initialZ + Math.sin(time * 0.1 + initialZ) * 0.05;
      
      // Store for lines
      currentPositions[i * 3] = x;
      currentPositions[i * 3 + 1] = y;
      currentPositions[i * 3 + 2] = z;
      
      dummy.position.set(x, y, z);
      
      // Subtler pulse
      const scale = 0.03 + Math.sin(time * 1.5 + x * 2) * 0.005;
      dummy.scale.set(scale, scale, scale);
      
      dummy.updateMatrix();
      mesh.current!.setMatrixAt(i, dummy.matrix);
    });
    
    mesh.current.instanceMatrix.needsUpdate = true;
    
    // 2. Update Lines
    const positions = linesGeometryRef.current.attributes.position.array as Float32Array;
    
    connections.forEach(([i, j], index) => {
      // Point A
      positions[index * 6] = currentPositions[i * 3];
      positions[index * 6 + 1] = currentPositions[i * 3 + 1];
      positions[index * 6 + 2] = currentPositions[i * 3 + 2];
      
      // Point B
      positions[index * 6 + 3] = currentPositions[j * 3];
      positions[index * 6 + 4] = currentPositions[j * 3 + 1];
      positions[index * 6 + 5] = currentPositions[j * 3 + 2];
    });
    
    linesGeometryRef.current.attributes.position.needsUpdate = true;
    
    // Very slow global rotation
    const rotationY = time * 0.02;
    mesh.current.rotation.y = rotationY;
    // Rotate lines group to match
    // Note: Since we are updating world positions in the buffer based on local + rotation, 
    // actually we should just rotate the container group.
    // However, here we calculated positions in local space.
    // If we rotate the mesh, we must rotate the lines mesh too.
  });

  // Ref to group to rotate both together
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.02;
    }
  });

  return (
    <group ref={groupRef}>
      <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial 
          vertexColors
          roughness={0.4}
          metalness={0.6}
          emissive="#ffffff"
          emissiveIntensity={0.1}
          transparent
          opacity={0.8}
        />
      </instancedMesh>
      
      <lineSegments>
        <bufferGeometry ref={linesGeometryRef}>
          <bufferAttribute
            attach="attributes-position"
            count={linePositions.length / 3}
            array={linePositions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={lineColors.length / 3}
            array={lineColors}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          vertexColors
          transparent
          opacity={0.15} // Very subtle lines
          depthWrite={false} // Don't block other objects
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
    </group>
  );
};

export default BrainParticles;
