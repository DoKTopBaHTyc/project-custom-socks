import React, { useEffect } from 'react';
import { useThree } from '@react-three/fiber';

function SockRenderCapture({ children }) {
  const { gl, scene, camera } = useThree();

  const captureImage = () => {
    try {
      // Принудительная отрисовка сцены
      gl.render(scene, camera);

      // Создаем временный холст для более надежного захвата
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = gl.domElement.width;
      tempCanvas.height = gl.domElement.height;
      const tempContext = tempCanvas.getContext('2d');

      // Копируем изображение с WebGL-холста
      tempContext.drawImage(gl.domElement, 0, 0);

      // Преобразуем в Data URL
      const imageDataUrl = tempCanvas.toDataURL('image/png');
      
      // Сохраняем в localStorage
      localStorage.setItem('finalSockImage', imageDataUrl);

      return imageDataUrl;
    } catch (error) {
      console.error('Ошибка захвата изображения:', error);
      return null;
    }
  };

  // Expose capture method to global object
  useEffect(() => {
    window.captureSocketImage = captureImage;
  }, []);

  return <>{children}</>;
}