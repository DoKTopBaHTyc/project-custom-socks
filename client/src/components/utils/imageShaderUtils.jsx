import * as THREE from 'three';

/**
 * Создает вершинный шейдер для работы с изображениями
 * @returns {string} Код вершинного шейдера
 */
export const createVertexShader = () => {
  return `
    varying vec2 vUv;
    varying vec3 vNormal;
    
    void main() {
      vUv = uv;
      vNormal = normalMatrix * normal;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;
};

/**
 * Создает фрагментный шейдер для наложения изображения на 3D-модель
 * @returns {string} Код фрагментного шейдера
 */
export const createFragmentShader = () => {
  return `
    uniform vec3 baseColor;
    uniform sampler2D patternTexture;
    uniform float hasPatternTexture;
    uniform sampler2D imageTexture;
    uniform float hasImageTexture;
    uniform float imageMixStrength;
    uniform float imageScale;
    uniform float imageOffsetX;
    uniform float imageOffsetY;
    uniform float imageRotation;
    
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
        // Центр для преобразований
        vec2 center = vec2(0.5, 0.5);
        
        // Трансформируем UV-координаты для масштабирования
        vec2 scaledUV = (vUv - center) / imageScale + center;
        
        // Применяем смещение
        scaledUV.x += imageOffsetX;
        scaledUV.y += imageOffsetY;
        
        // Применяем поворот (относительно центра)
        vec2 rotatedUV = scaledUV - center;
        float s = sin(imageRotation);
        float c = cos(imageRotation);
        rotatedUV = vec2(
          rotatedUV.x * c - rotatedUV.y * s,
          rotatedUV.x * s + rotatedUV.y * c
        );
        rotatedUV += center;
        
        vec4 imgColor = texture2D(imageTexture, rotatedUV);
        
        // Проверяем, находятся ли координаты в пределах текстуры
        // и применяем изображение только там, где оно не прозрачное
        if (rotatedUV.x >= 0.0 && rotatedUV.x <= 1.0 && 
            rotatedUV.y >= 0.0 && rotatedUV.y <= 1.0 &&
            imgColor.a > 0.1) {
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
  `;
};


export const createUniforms = ({
  selectedColor = "#ffffff",
  patternTexture = null,
  imageTexture = null,
  imageScale = 1.0,
  imageOffsetX = 0.0,
  imageOffsetY = 0.0,
  imageRotation = 0.0,
  imageMixStrength = 0.8
}) => {
  return {
    baseColor: { value: new THREE.Color(selectedColor) },
    patternTexture: { value: patternTexture },
    hasPatternTexture: { value: patternTexture !== null ? 1.0 : 0.0 },
    imageTexture: { value: imageTexture },
    hasImageTexture: { value: imageTexture !== null ? 1.0 : 0.0 },
    imageMixStrength: { value: imageMixStrength },
    imageScale: { value: imageScale },
    imageOffsetX: { value: imageOffsetX },
    imageOffsetY: { value: imageOffsetY },
    imageRotation: { value: imageRotation },
    ambientLightIntensity: { value: 0.8 },
    lightIntensity: { value: 0.15 },
  };
};

/**
 * Загружает текстуру с заданными настройками
 * 
 * @param {string} url - URL текстуры для загрузки
 * @param {Function} onLoad - Функция обратного вызова при успешной загрузке
 * @param {Function} onProgress - Функция обратного вызова для отслеживания прогресса
 * @param {Function} onError - Функция обратного вызова при ошибке
 */
export const loadTexture = (url, onLoad, onProgress, onError) => {
  if (!url) {
    if (onLoad) onLoad(null);
    return;
  }

  const textureLoader = new THREE.TextureLoader();
  textureLoader.load(
    url,
    (loadedTexture) => {
      // Настройка текстуры
      loadedTexture.wrapS = THREE.RepeatWrapping;
      loadedTexture.wrapT = THREE.RepeatWrapping;
      loadedTexture.magFilter = THREE.LinearFilter;
      loadedTexture.minFilter = THREE.LinearMipmapLinearFilter;
      
      if (onLoad) onLoad(loadedTexture);
    },
    onProgress,
    onError
  );
};