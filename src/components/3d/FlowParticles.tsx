import React, { useMemo, useRef, useLayoutEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { sceneState } from './ImmersiveScene';

export default function FlowParticles({ count = 400 }) { // Halved count for a very minimalistic feel
    const mesh = useRef<THREE.InstancedMesh>(null);
    const linesGeometryRef = useRef<THREE.BufferGeometry>(null);
    const dummy = useMemo(() => new THREE.Object3D(), []);

    // Use refs to avoid recreating position arrays in components
    const currentPositionsRef = useRef(new Float32Array(count * 3));
    const currentColorObj = useRef(new THREE.Color());

    // Generate particle structural parameters
    const { particles, connections } = useMemo(() => {
        const tempParticles = [];

        for (let i = 0; i < count; i++) {
            const t = i / count; // 0 to 1 progression along the wave

            // Structured river/DNA shape (when structureLevel -> 1)
            const u = t * Math.PI * 2 * 3; // 3 loops
            const structX = Math.cos(u) * 2 + (Math.random() - 0.5) * 0.5;
            const structY = (t - 0.5) * 12; // stretch along Y
            const structZ = Math.sin(u) * 2 + (Math.random() - 0.5) * 0.5;

            // Origin/Organic cloud shape (when structureLevel -> 0)
            const cloudX = (Math.random() - 0.5) * 8;
            const cloudY = (Math.random() - 0.5) * 8;
            const cloudZ = (Math.random() - 0.5) * 8;

            // Individual drift noise offsets
            const nx = Math.random() * Math.PI * 2;
            const ny = Math.random() * Math.PI * 2;
            const nz = Math.random() * Math.PI * 2;

            // Movement speeds
            const speed = 0.5 + Math.random();

            // Base color offset for slight shimmering variation
            const colorVar = (Math.random() - 0.5) * 0.15;

            tempParticles.push({
                t,
                structX, structY, structZ,
                cloudX, cloudY, cloudZ,
                nx, ny, nz,
                speed, colorVar
            });
        }

        // Connect particles that are near each other in the *structural* shape
        // This makes the connections look like an organized web that breaks apart gracefully
        const tempConnections = [];
        const maxDist = 1.0;

        for (let i = 0; i < count; i++) {
            for (let j = i + 1; j < count; j++) {
                const dx = tempParticles[i].structX - tempParticles[j].structX;
                const dy = tempParticles[i].structY - tempParticles[j].structY;
                const dz = tempParticles[i].structZ - tempParticles[j].structZ;

                if (dx * dx + dy * dy + dz * dz < maxDist * maxDist) {
                    // Randomly drop some connections to keep it looking clean, not strictly meshed
                    if (Math.random() > 0.4) {
                        tempConnections.push([i, j]);
                    }
                }
            }
        }

        return { particles: tempParticles, connections: tempConnections };
    }, [count]);

    const linePositions = useMemo(() => new Float32Array(connections.length * 6), [connections]);
    const lineColors = useMemo(() => new Float32Array(connections.length * 6), [connections]);

    useLayoutEffect(() => {
        if (!mesh.current) return;

        particles.forEach((p, i) => {
            dummy.position.set(p.cloudX, p.cloudY, p.cloudZ);
            dummy.scale.set(0.03, 0.03, 0.03); // Even smaller particles
            dummy.updateMatrix();
            mesh.current!.setMatrixAt(i, dummy.matrix);
            mesh.current!.setColorAt(i, new THREE.Color(0.8, 0.8, 0.8));
        });
        mesh.current.instanceMatrix.needsUpdate = true;
        if (mesh.current.instanceColor) mesh.current.instanceColor.needsUpdate = true;
    }, [particles, dummy]);

    useFrame((state) => {
        if (!mesh.current || !linesGeometryRef.current) return;
        const time = state.clock.getElapsedTime();
        const currentPositions = currentPositionsRef.current;

        // Read values from GSAP-controlled global state
        const { themeColor, particleSpread, speedMultiplier, structureLevel } = sceneState;

        particles.forEach((p, i) => {
            // Individual continuous movement
            const waveT = time * 0.5 * p.speed * speedMultiplier;

            // Target organic point (drifting noise)
            const cx = p.cloudX + Math.sin(waveT + p.nx) * particleSpread;
            const cy = p.cloudY + Math.cos(waveT + p.ny) * particleSpread;
            const cz = p.cloudZ + Math.sin(waveT + p.nz) * particleSpread;

            // target structured point (with minor drifting)
            const sx = p.structX + Math.sin(waveT + p.nx) * (particleSpread * 0.2);
            const sy = p.structY + Math.cos(waveT + p.ny) * (particleSpread * 0.2);
            const sz = p.structZ + Math.sin(waveT + p.nz) * (particleSpread * 0.2);

            // Lerp between Cloud shape and Structured shape
            const finalX = THREE.MathUtils.lerp(cx, sx, structureLevel);
            const finalY = THREE.MathUtils.lerp(cy, sy, structureLevel);
            const finalZ = THREE.MathUtils.lerp(cz, sz, structureLevel);

            dummy.position.set(finalX, finalY, finalZ);

            // Soft pulsing based on proximity to center and time
            const pulse = 0.03 + Math.abs(Math.sin(time + p.nx)) * 0.02;
            dummy.scale.set(pulse, pulse, pulse);

            dummy.updateMatrix();
            mesh.current!.setMatrixAt(i, dummy.matrix);

            // Store current position for lines
            currentPositions[i * 3] = finalX;
            currentPositions[i * 3 + 1] = finalY;
            currentPositions[i * 3 + 2] = finalZ;

            // Subtle color variations across particles
            const c = currentColorObj.current;
            c.copy(themeColor);
            c.r += p.colorVar;
            c.g += p.colorVar * 0.5;
            c.b += p.colorVar;
            // Mix in almost entirely white for a very pale pastel look
            c.lerp(new THREE.Color(0xffffff), 0.85); // 85% white wash
            mesh.current!.setColorAt(i, c);
        });

        mesh.current.instanceMatrix.needsUpdate = true;
        if (mesh.current.instanceColor) mesh.current.instanceColor.needsUpdate = true;

        // Update lines positions dynamically
        const positions = linesGeometryRef.current.attributes.position.array as Float32Array;
        const colors = linesGeometryRef.current.attributes.color.array as Float32Array; // If we want to update colors

        // Convert global color to values with slight variance per connection
        const r = themeColor.r;
        const g = themeColor.g;
        const b = themeColor.b;

        connections.forEach(([i, j], index) => {
            const i3 = i * 3;
            const j3 = j * 3;
            const idx6 = index * 6;

            // Pos A
            positions[idx6] = currentPositions[i3];
            positions[idx6 + 1] = currentPositions[i3 + 1];
            positions[idx6 + 2] = currentPositions[i3 + 2];

            // Pos B
            positions[idx6 + 3] = currentPositions[j3];
            positions[idx6 + 4] = currentPositions[j3 + 1];
            positions[idx6 + 5] = currentPositions[j3 + 2];

            // Ensure lines share the theme color (or we could gradient them, but this is faster)
            // Only need to do this occasionally or if color changes greatly, doing it here is fine since count is low
            colors[idx6] = r; colors[idx6 + 1] = g; colors[idx6 + 2] = b;
            colors[idx6 + 3] = r; colors[idx6 + 4] = g; colors[idx6 + 5] = b;
        });

        linesGeometryRef.current.attributes.position.needsUpdate = true;
        linesGeometryRef.current.attributes.color.needsUpdate = true;

        // Slow global rotation to give it epic scale
        const groupTime = time * 0.05 * speedMultiplier;
        mesh.current.rotation.y = groupTime;

        // The lines are a separate object, but they read world positions of particles. 
        // Wait, the positions are locally calculated inside particles.
        // If we rotate the particle mesh, the lines won't rotate unless they are in the same group.
        // However, since we populate the lines explicitly with the particle local positions, we MUST rotate the group, not the mesh.
    });

    // Attach a ref to a wrapper group to rotate them both perfectly in sync
    const groupRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.05 * sceneState.speedMultiplier;
        }
    });

    return (
        <group ref={groupRef}>
            <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
                <sphereGeometry args={[1, 16, 16]} />
                <meshStandardMaterial
                    vertexColors
                    roughness={1.0} // Fully diffuse
                    metalness={0.0} // No metallic reflection
                    emissive="#ffffff"
                    emissiveIntensity={0.1} // Soft glow
                    transparent
                    opacity={0.15} // Extremely soft, almost dust-like
                    depthWrite={false}
                    blending={THREE.AdditiveBlending} // Adds to the background instead of darkening it
                />
            </instancedMesh>

            <lineSegments>
                <bufferGeometry ref={linesGeometryRef}>
                    <bufferAttribute
                        attach="attributes-position"
                        args={[linePositions, 3]}
                        usage={THREE.DynamicDrawUsage}
                    />
                    <bufferAttribute
                        attach="attributes-color"
                        args={[lineColors, 3]}
                        usage={THREE.DynamicDrawUsage}
                    />
                </bufferGeometry>
                <lineBasicMaterial
                    vertexColors
                    transparent
                    opacity={0.04} // Extremely subtle lines
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                />
            </lineSegments>
        </group>
    );
}
