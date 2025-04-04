import React from 'react';
import { useImageContext } from '../../context/ImageContext';
/**
 * Компонент для управления параметрами наложения изображения на 3D модель
 * 
 * @param {Object} props - Свойства компонента
 * @param {number} props.imageScale - Масштаб изображения
 * @param {Function} props.setImageScale - Функция установки масштаба
 * @param {number} props.imageOffsetX - Смещение по X
 * @param {Function} props.setImageOffsetX - Функция установки смещения по X
 * @param {number} props.imageOffsetY - Смещение по Y
 * @param {Function} props.setImageOffsetY - Функция установки смещения по Y
 * @param {number} props.imageRotation - Поворот изображения (в радианах)
 * @param {Function} props.setImageRotation - Функция установки поворота
 * @param {number} props.imageMixStrength - Интенсивность наложения (0-1)
 * @param {Function} props.setImageMixStrength - Функция установки интенсивности
 * @param {boolean} props.visible - Флаг видимости панели
 * @param {Object} props.position - Объект для позиционирования панели (CSS-стили)
 */

const imageControlsPanel = ({ 
  imageScale, setImageScale,
  imageOffsetX, setImageOffsetX, 
  imageOffsetY, setImageOffsetY,
  imageRotation, setImageRotation,
  imageMixStrength, setImageMixStrength,
  visible,
  position = { left: '700px', top: '10px' }
}) => {
  const { imageUrl } = useImageContext();
  
  // Если компонент не должен быть видимым или нет изображения, не рендерим его
  if (!visible || !imageUrl) {
    return null;
  }

  // Вычисляем угол поворота в градусах для отображения
  const rotationDegrees = Math.round(imageRotation * 180 / Math.PI);
  
  // Вычисляем процент непрозрачности
  const opacityPercent = Math.round(imageMixStrength * 100);

  return (
    <div className="image-controls-panel" 
      style={{ 
        position: 'absolute',
        zIndex: 1000,
        width: '250px',
        background: 'rgba(255,255,255,0.9)',
        padding: '15px',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        ...position
      }}
    >
      <div style={{ marginBottom: '10px', fontWeight: 'bold', fontSize: '16px' }}>
        Настройки изображения
      </div>
      
      {/* Масштаб изображения */}
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>
          Масштаб: {imageScale.toFixed(1)}x
        </label>
        <input 
          type="range" 
          min="0.1" 
          max="3" 
          step="0.1"
          value={imageScale}
          onChange={(e) => setImageScale(parseFloat(e.target.value))}
          style={{ width: '100%' }}
        />
      </div>
      
      {/* Смещение по X */}
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>
          Смещение по горизонтали: {imageOffsetX.toFixed(2)}
        </label>
        <input 
          type="range" 
          min="-1" 
          max="1" 
          step="0.05"
          value={imageOffsetX}
          onChange={(e) => setImageOffsetX(parseFloat(e.target.value))}
          style={{ width: '100%' }}
        />
      </div>
      
      {/* Смещение по Y */}
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>
          Смещение по вертикали: {imageOffsetY.toFixed(2)}
        </label>
        <input 
          type="range" 
          min="-1" 
          max="1" 
          step="0.05"
          value={imageOffsetY}
          onChange={(e) => setImageOffsetY(parseFloat(e.target.value))}
          style={{ width: '100%' }}
        />
      </div>
      
      {/* Поворот */}
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>
          Поворот: {rotationDegrees}°
        </label>
        <input 
          type="range" 
          min="-3.14" 
          max="3.14" 
          step="0.1"
          value={imageRotation}
          onChange={(e) => setImageRotation(parseFloat(e.target.value))}
          style={{ width: '100%' }}
        />
      </div>
      
      {/* Непрозрачность */}
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>
          Непрозрачность: {opacityPercent}%
        </label>
        <input 
          type="range" 
          min="0" 
          max="1" 
          step="0.05"
          value={imageMixStrength}
          onChange={(e) => setImageMixStrength(parseFloat(e.target.value))}
          style={{ width: '100%' }}
        />
      </div>
      
      {/* Кнопка сброса */}
      <button 
        onClick={() => {
          setImageScale(1.0);
          setImageOffsetX(0.0);
          setImageOffsetY(0.0);
          setImageRotation(0.0);
          setImageMixStrength(0.8);
        }}
        style={{
          padding: '8px 12px',
          background: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          width: '100%',
          fontSize: '14px'
        }}
      >
        Сбросить настройки
      </button>
    </div>
  );
};

export default imageControlsPanel;