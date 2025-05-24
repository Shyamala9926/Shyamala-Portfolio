/*import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const FuturisticProfileCanvas = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<{ scene: THREE.Scene; camera: THREE.Camera; renderer: THREE.WebGLRenderer } | null>(null);
  const animationRef = useRef<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    setIsMobile(mediaQuery.matches);

    const handleMediaQueryChange = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches);
    };

    mediaQuery.addEventListener('change', handleMediaQueryChange);
    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange);
    };
  }, []);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      isMobile ? 60 : 45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      preserveDrawingBuffer: true 
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setClearColor(0x000000, 0);
    
    mountRef.current.appendChild(renderer.domElement);
    sceneRef.current = { scene, camera, renderer };

    // Camera position
    camera.position.set(0, 0, 8);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.3);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(10, 10, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 1024;
    directionalLight.shadow.mapSize.height = 1024;
    scene.add(directionalLight);

    const pointLight1 = new THREE.PointLight(0x3466F6, 0.5, 100);
    pointLight1.position.set(-10, -10, -10);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x00ffff, 0.5, 100);
    pointLight2.position.set(10, 10, 10);
    scene.add(pointLight2);

    // Central hologram group
    const hologramGroup = new THREE.Group();
    scene.add(hologramGroup);

    // Main holographic ring
    const ringGeometry = new THREE.RingGeometry(1.5, 1.8, 32);
    const ringMaterial = new THREE.MeshStandardMaterial({
      color: 0x00ffff,
      emissive: 0x00ffff,
      emissiveIntensity: 0.4,
      transparent: true,
      opacity: 0.8,
      side: THREE.DoubleSide
    });
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    hologramGroup.add(ring);

    // Inner energy sphere
    const sphereGeometry = new THREE.SphereGeometry(0.8, 32, 32);
    const sphereMaterial = new THREE.MeshStandardMaterial({
      color: 0x3466F6,
      emissive: 0x3466F6,
      emissiveIntensity: 0.6,
      transparent: true,
      opacity: 0.3,
      wireframe: true
    });
    const innerSphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    hologramGroup.add(innerSphere);

    // Rotating rings
    const torusGeometry1 = new THREE.TorusGeometry(1.2, 0.02, 8, 64);
    const torusMaterial1 = new THREE.MeshStandardMaterial({
      color: 0xff00ff,
      emissive: 0xff00ff,
      emissiveIntensity: 0.5
    });
    const torus1 = new THREE.Mesh(torusGeometry1, torusMaterial1);
    torus1.rotation.x = Math.PI / 2;
    hologramGroup.add(torus1);

    const torusGeometry2 = new THREE.TorusGeometry(1.0, 0.02, 8, 64);
    const torusMaterial2 = new THREE.MeshStandardMaterial({
      color: 0xffff00,
      emissive: 0xffff00,
      emissiveIntensity: 0.5
    });
    const torus2 = new THREE.Mesh(torusGeometry2, torusMaterial2);
    torus2.rotation.y = Math.PI / 2;
    hologramGroup.add(torus2);

    // Floating geometric shapes
    const floatingShapes: THREE.Mesh[] = [];
    
    const createFloatingShape = (position: [number, number, number], color: number, type: string, speed: number) => {
      let geometry;
      switch(type) {
        case 'sphere':
          geometry = new THREE.SphereGeometry(0.3, 16, 16);
          break;
        case 'box':
          geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
          break;
        case 'torus':
          geometry = new THREE.TorusGeometry(0.3, 0.1, 8, 24);
          break;
        case 'octahedron':
          geometry = new THREE.OctahedronGeometry(0.4);
          break;
        default:
          geometry = new THREE.SphereGeometry(0.3, 16, 16);
      }
      
      const material = new THREE.MeshStandardMaterial({
        color: color,
        emissive: color,
        emissiveIntensity: 0.2,
        metalness: 0.8,
        roughness: 0.2
      });
      
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(...position);
      mesh.castShadow = true;
      mesh.userData = { originalY: position[1], speed };
      scene.add(mesh);
      floatingShapes.push(mesh);
    };

    createFloatingShape([-3, 2, -2], 0xff0080, 'octahedron', 0.8);
    createFloatingShape([3, 1, -1], 0x00ff80, 'torus', 1.2);
    createFloatingShape([-2, -2, 2], 0x8000ff, 'box', 0.6);
    createFloatingShape([2, -1, 3], 0xff8000, 'sphere', 1.0);
    createFloatingShape([0, 3, -3], 0x0080ff, 'octahedron', 0.9);

    // Particle system
    const particleCount = 100;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;

      const color = new THREE.Color();
      color.setHSL(Math.random() * 0.3 + 0.5, 0.8, 0.8);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      sizeAttenuation: true
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Ground plane
    const groundGeometry = new THREE.PlaneGeometry(20, 20, 50, 50);
    const groundMaterial = new THREE.MeshStandardMaterial({
      color: 0x001122,
      transparent: true,
      opacity: 0.3,
      wireframe: true
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -4;
    ground.receiveShadow = true;
    scene.add(ground);

    // Mouse interaction
    const mouse = new THREE.Vector2();
    const raycaster = new THREE.Raycaster();
    let isHovered = false;

    const onMouseMove = (event: MouseEvent) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObject(hologramGroup, true);
      
      if (intersects.length > 0 && !isHovered) {
        isHovered = true;
        ringMaterial.emissiveIntensity = 0.8;
        sphereMaterial.emissiveIntensity = 1.0;
      } else if (intersects.length === 0 && isHovered) {
        isHovered = false;
        ringMaterial.emissiveIntensity = 0.4;
        sphereMaterial.emissiveIntensity = 0.6;
      }
    };

    window.addEventListener('mousemove', onMouseMove);

    // Animation loop
    const clock = new THREE.Clock();
    let autoRotateAngle = 0;

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      
      // Auto rotate scene
      autoRotateAngle += 0.005;
      scene.rotation.y = autoRotateAngle;

      // Animate hologram
      hologramGroup.rotation.y += 0.005;
      hologramGroup.position.y = Math.sin(elapsedTime * 0.5) * 0.1;

      // Animate floating shapes
      floatingShapes.forEach((shape) => {
        shape.rotation.x += 0.01 * shape.userData.speed;
        shape.rotation.y += 0.015 * shape.userData.speed;
        shape.position.y = shape.userData.originalY + Math.sin(elapsedTime * shape.userData.speed) * 0.3;
      });

      // Animate particles
      particles.rotation.y += 0.002;

      renderer.render(scene, camera);
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [isMobile]);

  return (
    <div style={{ 
      width: '100%', 
      height: '100vh', 
      background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div ref={mountRef} style={{ width: '100%', height: '100%' }} />
      
      {/* Text overlay *//*}
      <div style={{
        position: 'absolute',
        bottom: '20%',
        left: '50%',
        transform: 'translateX(-50%)',
        textAlign: 'center',
        color: '#ffffff',
        fontFamily: 'Arial, sans-serif',
        zIndex: 10,
        pointerEvents: 'none'
      }}>
        <h1 style={{
          fontSize: isMobile ? '1.5rem' : '2rem',
          margin: '0 0 10px 0',
          textShadow: '0 0 20px #00ffff',
          fontWeight: 'bold'
        }}>
          CREATIVE DEVELOPER
        </h1>
        <p style={{
          fontSize: isMobile ? '0.9rem' : '1.1rem',
          margin: 0,
          color: '#00ffff',
          textShadow: '0 0 10px #00ffff',
          opacity: 0.9
        }}>
          Building the Future
        </p>
      </div>
    </div>
  );
};

export default FuturisticProfileCanvas;*/


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