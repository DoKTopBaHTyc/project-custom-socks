import { Canvas } from '@react-three/fiber';
import { useEffect, useState } from 'react';
import React, { Suspense } from 'react';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { useColorContext } from '../../../context/ColorContext';
import { usePatternContext } from '../../../context/PatternContext';
import { useImageContext } from '../../../context/ImageContext';
import { 
  createVertexShader, 
  createFragmentShader, 
  createUniforms, 
  loadTexture 
} from '../../utils/imageShaderUtils';
import ImageControlsPanel from '../ImageControlsPanel';
import useImageSettings from '../../hooks/useImageSettings';

/**
 * Компонент, который отображает 3D модель носка с настройками текстур и изображения
 */
function Sock({
  imageScale,
  imageOffsetX,
  imageOffsetY,
  imageRotation,
  imageMixStrength
}) {
  const { selectedColor } = useColorContext();
  const { selectedPattern } = usePatternContext();
  const { imageUrl } = useImageContext();
  
  const [sockModel, setSockModel] = useState(null);
  const [patternTexture, setPatternTexture] = useState(null);
  const [imageTexture, setImageTexture] = useState(null);

  // Отладочная информация для проверки состояния текстур
  useEffect(() => {
    // console.log("Текущее состояние:");
    // console.log("- Цвет:", selectedColor);
    // console.log("- Паттерн:", selectedPattern?.url);
    // console.log("- Изображение:", imageUrl);
    // console.log("- Текстура паттерна загружена:", patternTexture !== null);
    // console.log("- Текстура изображения загружена:", imageTexture !== null);
  }, [selectedColor, selectedPattern, imageUrl, patternTexture, imageTexture]);

  
  // Загрузка OBJ модели
  useEffect(() => {
    const loader = new OBJLoader();
    loader.load(
      '/sock.obj',
      (loadedModel) => {
        // console.log("Модель носка загружена успешно");
        setSockModel(loadedModel);
      },
      (xhr) => {
        // console.log((xhr.loaded / xhr.total * 100) + '% модели загружено');
      },
      (error) => {
        console.error('Ошибка загрузки модели:', error);
      },
    );
  }, []);

  // Загрузка паттернов
  useEffect(() => {
    if (!selectedPattern?.url) {
      setPatternTexture(null);
      return;
    }

    // console.log("Загрузка текстуры паттерна:", `data/${selectedPattern.url}`);
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(
      `data/${selectedPattern.url}`,
      (loadedTexture) => {
        // console.log("Текстура паттерна загружена успешно");
        loadedTexture.wrapS = THREE.RepeatWrapping;
        loadedTexture.wrapT = THREE.RepeatWrapping;
        loadedTexture.magFilter = THREE.LinearFilter;
        loadedTexture.minFilter = THREE.LinearMipmapLinearFilter;
        
        setPatternTexture(loadedTexture);
      },
      (xhr) => {
        // console.log((xhr.loaded / xhr.total * 100) + '% текстуры паттерна загружено');
    loadTexture(
      `data/${selectedPattern.url}`,
      (loadedTexture) => {
        console.log("Текстура паттерна загружена успешно");
        setPatternTexture(loadedTexture);
      },
      (xhr) => {
        if (xhr.lengthComputable) {
          console.log((xhr.loaded / xhr.total * 100) + '% текстуры паттерна загружено');
        }
      },
      (error) => {
        console.error('Ошибка загрузки текстуры паттерна:', error);
      }
    );
  }, [selectedPattern]);

  // Загрузка изображения
  useEffect(() => {
    // console.log(imageUrl)
    // Очищаем текстуру, если изображение не выбрано
    if (!imageUrl) {
      setImageTexture(null);
      return;
    }

    // console.log("Загрузка текстуры изображения:", imageUrl);
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(
      imageUrl,
      (loadedTexture) => {
        // console.log("Текстура изображения загружена успешно");
        loadedTexture.wrapS = THREE.RepeatWrapping;
        loadedTexture.wrapT = THREE.RepeatWrapping;
        loadedTexture.magFilter = THREE.LinearFilter;
        loadedTexture.minFilter = THREE.LinearMipmapLinearFilter;
        
    loadTexture(
      imageUrl,
      (loadedTexture) => {
        console.log("Текстура изображения загружена успешно");
        setImageTexture(loadedTexture);
      },
      (xhr) => {
        if (xhr.lengthComputable) {
          // console.log((xhr.loaded / xhr.total * 100) + '% текстуры изображения загружено');
        }
      },
      (error) => {
        console.error('Ошибка загрузки изображения:', error);
      }
    );
  }, [imageUrl]);

  // Применение материала к модели
  useEffect(() => {
    if (!sockModel) return;
    
    // console.log("Обновление материала модели");
    // console.log("- Использует цвет:", selectedColor);
    // console.log("- Использует паттерн:", patternTexture !== null);
    // console.log("- Использует изображение:", imageTexture !== null);

    sockModel.traverse((child) => {
      if (child.isMesh) {
        // Создаем параметры для шейдера
        const uniforms = createUniforms({
          selectedColor,
          patternTexture,
          imageTexture,
          imageScale,
          imageOffsetX,
          imageOffsetY,
          imageRotation,
          imageMixStrength
        });

        // Создаем новый материал с шейдером
        child.material = new THREE.ShaderMaterial({
          uniforms: uniforms,
          vertexShader: createVertexShader(),
          fragmentShader: createFragmentShader(),
          transparent: true,
          blending: THREE.NormalBlending,
        });
      }
    });
  }, [
    sockModel, 
    selectedColor, 
    patternTexture, 
    imageTexture, 
    imageScale, 
    imageOffsetX, 
    imageOffsetY, 
    imageRotation, 
    imageMixStrength
  ]);

  return sockModel ? <primitive object={sockModel} /> : null;
}

/**
 * Основной компонент сцены с 3D моделью носка
 */
export default function BasicSockScene() {
  // Используем хук для управления настройками изображения
  const {
    imageScale, setImageScale,
    imageOffsetX, setImageOffsetX,
    imageOffsetY, setImageOffsetY,
    imageRotation, setImageRotation,
    imageMixStrength, setImageMixStrength,
  } = useImageSettings();
  
  // Проверяем, есть ли изображение для отображения контролов
  const { imageUrl } = useImageContext();
  const showControls = !!imageUrl;





  return (
    <div style={{ width: '60%', height: '500px', position: 'relative' }}>
      {/* Панель управления изображением */}
      <ImageControlsPanel 
        imageScale={imageScale}
        setImageScale={setImageScale}
        imageOffsetX={imageOffsetX}
        setImageOffsetX={setImageOffsetX}
        imageOffsetY={imageOffsetY}
        setImageOffsetY={setImageOffsetY}
        imageRotation={imageRotation}
        setImageRotation={setImageRotation}
        imageMixStrength={imageMixStrength}
        setImageMixStrength={setImageMixStrength}
        visible={showControls}
        position={{ left: '600px', top: '10px' }}
      />
      
      {/* Canvas с 3D моделью */}
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
          <Sock 
            imageScale={imageScale}
            imageOffsetX={imageOffsetX}
            imageOffsetY={imageOffsetY}
            imageRotation={imageRotation}
            imageMixStrength={imageMixStrength}
          />
        </Suspense>

        <OrbitControls
          enablePan={true}
          enableZoom={true}
          zoomSpeed={1.2}
          panSpeed={0.5}
          rotateSpeed={0.8}
          target={[0, 0.1, 0]}
          minDistance={0.3}
          maxDistance={10}
        />
      </Canvas>
    </div>
  );
}