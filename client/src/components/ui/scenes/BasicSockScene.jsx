import { Canvas } from '@react-three/fiber';
import { useEffect, useState } from 'react';
import React, { Suspense } from 'react';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { useColorContext } from '../../../context/ColorContext';
import { usePatternContext } from '../../../context/PatternContext';
import { useImageContext } from '../../../context/ImageContext';

function Sock() {
  const { selectedColor } = useColorContext();
  const { selectedPattern } = usePatternContext();
  const { imageUrl } = useImageContext(); // Используем контекст изображения
  
  const [sockModel, setSockModel] = useState(null);
  const [patternTexture, setPatternTexture] = useState(null);
  const [imageTexture, setImageTexture] = useState(null);

  // Отладочная информация для проверки состояния текстур
  useEffect(() => {
    console.log("Текущее состояние:");
    console.log("- Цвет:", selectedColor);
    console.log("- Паттерн:", selectedPattern?.url);
    console.log("- Изображение:", imageUrl);
    console.log("- Текстура паттерна загружена:", patternTexture !== null);
    console.log("- Текстура изображения загружена:", imageTexture !== null);
  }, [selectedColor, selectedPattern, imageUrl, patternTexture, imageTexture]);

  // Загрузка OBJ модели
  useEffect(() => {
    const loader = new OBJLoader();
    loader.load(
      '/sock.obj',
      (loadedModel) => {
        console.log("Модель носка загружена успешно");
        setSockModel(loadedModel);
      },
      (xhr) => {
        console.log((xhr.loaded / xhr.total * 100) + '% модели загружено');
      },
      (error) => {
        console.error('Ошибка загрузки модели:', error);
      },
    );
  }, []);

  // Загрузка паттернов
  useEffect(() => {
    // Очищаем текстуру, если паттерн не выбран
    if (!selectedPattern?.url) {
      setPatternTexture(null);
      return;
    }

    console.log("Загрузка текстуры паттерна:", `data/${selectedPattern.url}`);
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(
      `data/${selectedPattern.url}`,
      (loadedTexture) => {
        console.log("Текстура паттерна загружена успешно");
        loadedTexture.wrapS = THREE.RepeatWrapping;
        loadedTexture.wrapT = THREE.RepeatWrapping;
        loadedTexture.magFilter = THREE.LinearFilter;
        loadedTexture.minFilter = THREE.LinearMipmapLinearFilter;
        
        setPatternTexture(loadedTexture);
      },
      (xhr) => {
        console.log((xhr.loaded / xhr.total * 100) + '% текстуры паттерна загружено');
      },
      (error) => {
        console.error('Ошибка загрузки текстуры паттерна:', error);
      },
    );
  }, [selectedPattern]);

  // Загрузка изображения
  useEffect(() => {
    console.log(imageUrl)
    // Очищаем текстуру, если изображение не выбрано
    if (!imageUrl) {
      setImageTexture(null);
      return;
    }

    console.log("Загрузка текстуры изображения:", imageUrl);
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(
      imageUrl,
      (loadedTexture) => {
        console.log("Текстура изображения загружена успешно");
        loadedTexture.wrapS = THREE.RepeatWrapping;
        loadedTexture.wrapT = THREE.RepeatWrapping;
        loadedTexture.magFilter = THREE.LinearFilter;
        loadedTexture.minFilter = THREE.LinearMipmapLinearFilter;
        
        setImageTexture(loadedTexture);
      },
      (xhr) => {
        if (xhr.lengthComputable) {
          console.log((xhr.loaded / xhr.total * 100) + '% текстуры изображения загружено');
        }
      },
      (error) => {
        console.error('Ошибка загрузки изображения:', error);
      },
    );
  }, [imageUrl]);

  // Применение материала к модели
  useEffect(() => {
    if (!sockModel) return;
    
    console.log("Обновление материала модели");
    console.log("- Использует цвет:", selectedColor);
    console.log("- Использует паттерн:", patternTexture !== null);
    console.log("- Использует изображение:", imageTexture !== null);

    sockModel.traverse((child) => {
      if (child.isMesh) {
        // Создаем параметры для шейдера
        const uniforms = {
          baseColor: { value: new THREE.Color(selectedColor || "#ffffff") },
          patternTexture: { value: patternTexture },
          hasPatternTexture: { value: patternTexture !== null ? 1.0 : 0.0 },
          imageTexture: { value: imageTexture },
          hasImageTexture: { value: imageTexture !== null ? 1.0 : 0.0 },
          imageMixStrength: { value: 0.8 },
          ambientLightIntensity: { value: 0.8 },
          lightIntensity: { value: 0.15 },
        };

        // Создаем новый материал с шейдером
        child.material = new THREE.ShaderMaterial({
          uniforms: uniforms,
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
            uniform float hasPatternTexture;
            uniform sampler2D imageTexture;
            uniform float hasImageTexture;
            uniform float imageMixStrength;
            
            uniform float ambientLightIntensity;
            uniform float lightIntensity;
            
            varying vec2 vUv;
            varying vec3 vNormal;
            
            void main() {
              // Начинаем с базового цвета
              vec3 finalColor = baseColor;
              
              // Если есть текстура паттерна, применяем её
              if (hasPatternTexture > 0.5) {
                vec4 patternColor = texture2D(patternTexture, vUv);
                
                // Применяем паттерн только там, где он не прозрачный
                if (patternColor.a > 0.1) {
                  finalColor = mix(finalColor, patternColor.rgb, patternColor.a);
                }
              }
              
              // Если есть текстура изображения, применяем её поверх
              if (hasImageTexture > 0.5) {
                vec4 imgColor = texture2D(imageTexture, vUv);
                
                // Применяем изображение там, где оно не прозрачное
                if (imgColor.a > 0.1) {
                  float mixFactor = imgColor.a * imageMixStrength;
                  finalColor = mix(finalColor, imgColor.rgb, mixFactor);
                }
              }
              
              // Применяем освещение
              vec3 normal = normalize(vNormal);
              float lighting = max(dot(normal, vec3(0.5, 0.5, 1.0)), 0.0) * lightIntensity;
              float totalLight = ambientLightIntensity + lighting;
              
              // Итоговый цвет пикселя
              gl_FragColor = vec4(finalColor * totalLight, 1.0);
            }
          `,
          transparent: true,
          blending: THREE.NormalBlending,
        });
      }
    });
  }, [sockModel, selectedColor, patternTexture, imageTexture]);

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
          position: [0, 0.8, 0.7],
          fov: 35,
          near: 0.05,
          far: 1000,
        }}
        shadows
        gl={{
          antialias: true,
          pixelRatio: window.devicePixelRatio,
        }}
      >
        <ambientLight intensity={0.2} />
        <pointLight position={[3, 5, 1]} intensity={1} />
        <spotLight position={[0, -5, 0]} angle={0.5} intensity={0.5} distance={20} />

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