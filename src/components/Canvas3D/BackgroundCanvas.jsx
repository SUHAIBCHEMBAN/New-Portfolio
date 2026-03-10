import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function ScrollParticles({ count = 2000 }) {
  const pointsRef = useRef();
  
  // Generate random positions tightly packed into a sphere/cloud
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
       // Random position within a sphere roughly representing data points
       const r = 10 * Math.cbrt(Math.random());
       const theta = Math.random() * 2 * Math.PI;
       const phi = Math.acos(2 * Math.random() - 1);
       
       pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
       pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
       pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, [count]);

  useEffect(() => {
    // ScrollTrigger to animate the rotation of the particle sphere based on scroll
    if (pointsRef.current) {
        gsap.to(pointsRef.current.rotation, {
            y: Math.PI * 2,
            x: Math.PI / 2,
            ease: "none",
            scrollTrigger: {
                trigger: document.body,
                start: "top top",
                end: "bottom bottom",
                scrub: 1.5 // Smooth scrubbing tied to scroll
            }
        });
    }
  }, []);

  // Extremely subtle continuous ambient movement
  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.z += delta * 0.02;
    }
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      {/* 
        A very clean, professional look: extremely small, sharp dots.
        Color matches the Python Blue accent defined in our CSS.
      */}
      <PointMaterial
        transparent
        color="#2563eb"
        size={0.05}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.4}
      />
    </Points>
  );
}

export default function BackgroundCanvas() {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', zIndex: 0, pointerEvents: 'none', background: 'transparent' }}>
      <Canvas 
        camera={{ position: [0, 0, 15], fov: 60 }}
        dpr={[1, 1.5]} // Limit pixel ratio for high-res screens
        gl={{ 
          antialias: false, // Disable antialiasing for performance
          powerPreference: "high-performance",
          alpha: true,
          stencil: false,
          depth: false
        }}
      >
        <ambientLight intensity={1} />
        <ScrollParticles count={1800} /> {/* Slightly reduced count for better mobile performance */}
      </Canvas>
    </div>
  );
}
