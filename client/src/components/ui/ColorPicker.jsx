import React from 'react';
import { useColorContext } from '../../context/ColorContext';
import ColorButton from './ColorButton';

export default function ColorPicker() {
  const { colors, selectColor, loading, selectedColor } = useColorContext();

  // Найдем объект цвета, соответствующий выбранному selectedColor
  const selectedColorObj = colors.find((color) => color.hex === selectedColor);

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
      {loading ? (
        <p>Загрузка цветов...</p>
      ) : Array.isArray(colors) ? (
        colors.map((color, index) => (
          <ColorButton key={index} color={color.hex} onClick={selectColor} size={40} />
        ))
      ) : (
        <p>Нет доступных цветов</p>
      )}
      <span>
        {selectedColorObj && <div>Выбранный цвет: {selectedColorObj.name} </div>}
      </span>
    </div>
  );
}
