import { Canvas } from '@react-three/fiber';
import { useEffect, useState } from 'react';
import React, { Suspense } from 'react';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { useColorContext } from '../../../context/ColorContext';
import { usePatternContext } from '../../../context/PatternContext';

function Sock() {
  const { selectedColor } = useColorContext();
  const { selectedPattern } = usePatternContext();
  const [sockModel, setSockModel] = useState(null);
  const [texture, setTexture] = useState(null);

  // Загрузка OBJ модели
  useEffect(() => {
    const loader = new OBJLoader();
    loader.load(
      '/sock.obj',
      (loadedModel) => {
        // loadedModel.position.set(0, 0, 0);
        setSockModel(loadedModel);
      },
      undefined,
      (error) => {
        console.error('Ошибка загрузки модели:', error);
      },
    );
  }, []);

  // Загрузка текстуры
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
        loadedTexture.premultiplyAlpha = true;

        setTexture(loadedTexture);
      },
      undefined,
      (error) => {
        console.error('Ошибка загрузки текстуры:', error);
      },
    );
  }, [selectedPattern]);

  // Применение материала к модели
  useEffect(() => {
    if (!sockModel || (!selectedColor && !texture)) return;

    sockModel.traverse((child) => {
      if (child.isMesh) {
        child.material = new THREE.ShaderMaterial({
          uniforms: {
            baseColor: { value: new THREE.Color(selectedColor) },
            patternTexture: { value: texture },
            ambientLightIntensity: { value: 0.8 },
            lightIntensity: { value: 0.15 },
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
              
              // Если текстура непрозрачная - оставляем ее цвет
              if (texColor.a > 0.5) {
                gl_FragColor = vec4(texColor.rgb * totalLight, 1.0);
              } else {
                // Прозрачные области заливаем базовым цветом
                gl_FragColor = vec4(baseColor * totalLight, 1.0);
              }
            }
          `,
          transparent: true,
          blending: THREE.NormalBlending,
        });
      }
    });
  }, [sockModel, selectedColor, texture]);

  return sockModel ? <primitive object={sockModel} /> : null;
}

export default function BasicSockScene() {
  return (
    <div
      style={{
        width: '70%',
        height: '400px',
        margin: '0 auto',
        borderRadius: '0.7rem',
        padding: '4px',
        background: 'linear-gradient(135deg,rgb(240, 240, 240),rgb(226, 226, 226))'
      }}
    >
      <Canvas
        camera={{
          position: [0, 0.8, 0.7], // Подняли камеру выше (было [0, 0.2, 0.7])
          fov: 35, // Угол обзора остается тем же
          near: 0.05, // Минимальная дистанция отрисовки
          far: 1000, // Максимальная дистанция отрисовки
        }}
        shadows
        gl={{
          antialias: true,
          pixelRatio: window.devicePixelRatio,
        }}
      >
        {/* <ambientLight intensity={0.2} />
        <pointLight position={[3, 5, 1]} intensity={1} />
        <spotLight position={[0, -5, 0]} angle={0.5} intensity={0.5} distance={20} /> */}

        <Suspense fallback={null}>
          <Sock />
        </Suspense>

        <OrbitControls
          enablePan={true}
          enableZoom={true}
          zoomSpeed={1.2}
          panSpeed={0.5}
          rotateSpeed={0.8}
          target={[0, 0.15, 0]} // Смещаем центр вращения еще ниже
          minDistance={0.3} // Минимальное расстояние зума очень маленькое
          maxDistance={10} // Максимальное расстояние зума
        />
      </Canvas>
    </div>
  );
}
