import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import {
  Decal,
  Float,
  OrbitControls,
  Preload,
  useTexture,
} from '@react-three/drei';

import Loader from '../Loader';

interface BallProps {
  imgUrl: string;
}

const Ball: React.FC<BallProps> = ({ imgUrl }) => {
  // In a real implementation, we would use useTexture to load a texture
  // For demonstration purposes, we'll use a simple colored ball
  
  return (
    <Float speed={1.75} rotationIntensity={1} floatIntensity={2}>
      <ambientLight intensity={0.25} />
      <directionalLight position={[0, 0, 0.05]} />
      <mesh castShadow receiveShadow scale={2.75}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color="#7C3AED"
          polygonOffset
          polygonOffsetFactor={-5}
          flatShading
        />
      </mesh>
    </Float>
  );
};

interface BallCanvasProps {
  icon: string;
}

const BallCanvas: React.FC<BallCanvasProps> = ({ icon }) => {
  return (
    <Canvas
      frameloop="always"
      dpr={[1, 2]}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<Loader />}>
        <OrbitControls enableZoom={false} />
        <Ball imgUrl={icon} />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default BallCanvas;