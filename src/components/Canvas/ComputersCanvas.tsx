import React, { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Preload, useGLTF } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';

import Loader from '../Loader';

interface ComputersProps {
  isMobile: boolean;
}

const Computers: React.FC<ComputersProps> = ({ isMobile }) => {
  return (
    <mesh>
      <hemisphereLight intensity={0.15} groundColor="black" />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={1024}
      />
      <pointLight intensity={1} />
      
      {/* Interactive 3D Scene */}
      <group position={[0, -2, 0]} scale={isMobile ? 0.6 : 0.75}>
        {/* Gaming Setup */}
        <mesh position={[0, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[4, 0.2, 2]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>
        
        {/* Monitor */}
        <group position={[0, 1.5, 0]}>
          <mesh castShadow>
            <boxGeometry args={[3, 1.8, 0.1]} />
            <meshStandardMaterial color="#2a2a2a" />
          </mesh>
          {/* Screen */}
          <mesh position={[0, 0, 0.06]}>
            <boxGeometry args={[2.8, 1.6, 0.01]} />
            <meshStandardMaterial 
              color="#3466F6"
              emissive="#3466F6"
              emissiveIntensity={0.5}
              toneMapped={false}
            />
          </mesh>
        </group>

        {/* Keyboard */}
        <mesh position={[0, 0.3, 0.5]} castShadow>
          <boxGeometry args={[1.5, 0.1, 0.5]} />
          <meshStandardMaterial color="#333333" />
        </mesh>

        {/* Mouse */}
        <mesh position={[1, 0.3, 0.5]} castShadow>
          <boxGeometry args={[0.2, 0.1, 0.3]} />
          <meshStandardMaterial color="#333333" />
        </mesh>
      </group>
    </mesh>
  );
};

const ComputersCanvas: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 500px)');
    setIsMobile(mediaQuery.matches);

    const handleMediaQueryChange = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches);
    };

    mediaQuery.addEventListener('change', handleMediaQueryChange);
    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange);
    };
  }, []);

  return (
    <Canvas
      frameloop="demand"
      shadows
      dpr={[1, 2]}
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<Loader />}>
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Computers isMobile={isMobile} />
        <EffectComposer>
          <Bloom 
            intensity={1.5}
            luminanceThreshold={0.9}
            luminanceSmoothing={0.9}
          />
        </EffectComposer>
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default ComputersCanvas;