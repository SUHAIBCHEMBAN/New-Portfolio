import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function ScrollParticles({ count = 1500 }) {
  const pointsRef = useRef();
  
  // Generate a texture with coding symbols
  const iconTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    
    // Draw coding symbols
    ctx.fillStyle = 'white';
    ctx.font = 'bold 48px monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    const icons = ['{', '}', '<', '>', '/', '#', ';', '(', ')'];
    const icon = icons[Math.floor(Math.random() * icons.length)];
    ctx.fillText(icon, 32, 32);
    
    const tex = new THREE.CanvasTexture(canvas);
    return tex;
  }, []);

  // Generate random positions tightly packed into a sphere/cloud
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
       const r = 12 * Math.cbrt(Math.random());
       const theta = Math.random() * 2 * Math.PI;
       const phi = Math.acos(2 * Math.random() - 1);
       
       pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
       pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
       pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, [count]);

  useEffect(() => {
    if (pointsRef.current) {
        gsap.to(pointsRef.current.rotation, {
            y: Math.PI * 2,
            x: Math.PI / 4,
            ease: "none",
            scrollTrigger: {
                trigger: document.body,
                start: "top top",
                end: "bottom bottom",
                scrub: 2
            }
        });
    }
  }, []);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.z += delta * 0.01;
      pointsRef.current.rotation.y += delta * 0.005;
    }
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        alphaMap={iconTexture}
        alphaTest={0.01}
        color="#ffffff"
        size={0.12}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.3}
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
