import { useState, useCallback } from 'react';

/**
 * Хук для управления настройками изображения наложенного на 3D модель
 * 
 * @param {Object} initialSettings - Начальные настройки изображения
 * @returns {Object} Объект с состояниями и функциями для управления настройками
 */
const useImageSettings = (initialSettings = {}) => {
  // Состояния для управления размером и положением изображения
  const [imageScale, setImageScale] = useState(initialSettings.scale || 1.0);
  const [imageOffsetX, setImageOffsetX] = useState(initialSettings.offsetX || 0.0);
  const [imageOffsetY, setImageOffsetY] = useState(initialSettings.offsetY || 0.0);
  const [imageRotation, setImageRotation] = useState(initialSettings.rotation || 0.0);
  const [imageMixStrength, setImageMixStrength] = useState(initialSettings.mixStrength || 0.8);

  /**
   * Сбрасывает все настройки к значениям по умолчанию
   */
  const resetSettings = useCallback(() => {
    setImageScale(1.0);
    setImageOffsetX(0.0);
    setImageOffsetY(0.0);
    setImageRotation(0.0);
    setImageMixStrength(0.8);
  }, []);

  /**
   * Устанавливает все настройки одновременно
   * 
   * @param {Object} settings - Объект с настройками для установки
   */
  const setAllSettings = useCallback((settings) => {
    if (settings.scale !== undefined) setImageScale(settings.scale);
    if (settings.offsetX !== undefined) setImageOffsetX(settings.offsetX);
    if (settings.offsetY !== undefined) setImageOffsetY(settings.offsetY);
    if (settings.rotation !== undefined) setImageRotation(settings.rotation);
    if (settings.mixStrength !== undefined) setImageMixStrength(settings.mixStrength);
  }, []);

  // Возвращаем все состояния и функции
  return {
    // Состояния
    imageScale,
    setImageScale,
    imageOffsetX,
    setImageOffsetX,
    imageOffsetY,
    setImageOffsetY,
    imageRotation,
    setImageRotation,
    imageMixStrength,
    setImageMixStrength,
    
    // Функции
    resetSettings,
    setAllSettings,
    
    // Объект со всеми настройками для удобной передачи в другие компоненты
    settings: {
      scale: imageScale,
      offsetX: imageOffsetX,
      offsetY: imageOffsetY,
      rotation: imageRotation,
      mixStrength: imageMixStrength
    }
  };
};

export default useImageSettings;