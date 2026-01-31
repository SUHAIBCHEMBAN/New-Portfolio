import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Torus, Box } from '@react-three/drei';

export default function Contact3D() {
  const torusRef = useRef();
  const boxRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    if (torusRef.current) {
      torusRef.current.rotation.x = time * 0.3;
      torusRef.current.rotation.y = time * 0.2;
    }
    
    if (boxRef.current) {
      boxRef.current.rotation.x = time * 0.2;
      boxRef.current.rotation.z = time * 0.1;
      boxRef.current.position.y = Math.sin(time) * 0.5;
    }
  });

  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={0.5} color="#00d4ff" />
      <pointLight position={[-10, -10, -10]} intensity={0.3} color="#6366f1" />
      
      <Torus ref={torusRef} args={[1.5, 0.5, 16, 100]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#6366f1" wireframe />
      </Torus>
      
      <Box ref={boxRef} args={[0.8, 0.8, 0.8]} position={[2, 0, -1]}>
        <meshStandardMaterial color="#00d4ff" metalness={0.8} roughness={0.2} />
      </Box>
    </>
  );
}
