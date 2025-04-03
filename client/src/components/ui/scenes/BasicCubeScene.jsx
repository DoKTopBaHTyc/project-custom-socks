import { Canvas } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import React from 'react';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { useColorContext } from '../../../context/ColorContext';
import { usePatternContext } from '../../../context/PatternContext';

function Cube() {
  const meshRef = useRef();
  const { selectedColor } = useColorContext();
  const { selectedPattern } = usePatternContext();
  const [texture, setTexture] = useState(null);

  useEffect(() => {
    if (!selectedPattern?.url) return;

    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(
      `data/${selectedPattern.url}`,
      (loadedTexture) => {
        loadedTexture.wrapS = THREE.ClampToEdgeWrapping;
        loadedTexture.wrapT = THREE.ClampToEdgeWrapping;
        loadedTexture.magFilter = THREE.LinearFilter;
        loadedTexture.minFilter = THREE.LinearMipmapLinearFilter;
        loadedTexture.premultiplyAlpha = true; // Важно для корректной прозрачности

        console.log('Текстура загружена:', loadedTexture);
        setTexture(loadedTexture);
      },
      undefined,
      (error) => {
        console.error('Ошибка загрузки текстуры:', error);
      },
    );
  }, [selectedPattern]);

  // Кастомный шейдер с улучшенной прозрачностью
  const customMaterial = new THREE.ShaderMaterial({
    uniforms: {
      baseColor: { value: new THREE.Color(selectedColor) },
      patternTexture: { value: texture },

      // Параметры освещения
      ambientLightIntensity: { value: 0.9 },
      lightIntensity: { value: 0.3 },
    },
    vertexShader: `
      varying vec2 vUv;
      varying vec3 vNormal;
      
      void main() {
        vUv = uv;
        vNormal = normalMatrix * normal;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
  uniform vec3 baseColor;
  uniform sampler2D patternTexture;
  
  uniform float ambientLightIntensity;
  uniform float lightIntensity;
  
  varying vec2 vUv;
  varying vec3 vNormal;
  
  void main() {
    vec4 texColor = texture2D(patternTexture, vUv);
    
    // Базовое освещение
    vec3 normal = normalize(vNormal);
    float lighting = max(dot(normal, vec3(0.5, 0.5, 1.0)), 0.0) * lightIntensity;
    float totalLight = ambientLightIntensity + lighting;
    
    // Если текстура непрозрачная (черная) - оставляем черный цвет с освещением
    if (texColor.a > 0.5) {
      gl_FragColor = vec4(vec3(0.0) * totalLight, 1.0);
    } else {
      // Прозрачные области заливаем базовым цветом с освещением
      gl_FragColor = vec4(baseColor * totalLight, 1.0);
    }
  }
`,
    transparent: true,
    blending: THREE.NormalBlending,
  });

  return (
    <group>
      <mesh ref={meshRef} castShadow receiveShadow material={customMaterial}>
        <boxGeometry args={[2, 2, 2]} />
      </mesh>
      <axesHelper args={[3]} />
    </group>
  );
}

export default function BasicCubeScene() {
  return (
    <div style={{ width: '60%', height: '500px' }}>
      <Canvas
        shadows
        gl={{
          antialias: true,
          pixelRatio: window.devicePixelRatio,
        }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[3, 5, 1]} intensity={1} />
        <spotLight position={[0, -5, 0]} angle={0.5} intensity={0.5} distance={20} />
        <Cube position={[0, 0, 0]} />
        <OrbitControls />
      </Canvas>
    </div>
  );
}
