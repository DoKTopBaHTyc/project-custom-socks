import useQuery from '../components/hooks/useQuery';
import ColorService from '../api/colorService'
import { createContext, useContext, useState } from 'react';

const ColorContext = createContext();

export const useColorContext = () => useContext(ColorContext);

export const ColorContextProvider = ({ children }) => {
  const [colors, setColors] = useQuery(() => ColorService.getAllColors(), []);
  const [selectedColor, setSelectedColor] = useState('#bababa');
  
  const selectColor = (color) => {
    setSelectedColor(color);
    console.log('Выбран цвет:', color);
  };

  const loading = colors === null || !Array.isArray(colors) || colors.length === 0

  // const displayColors =
  //   Array.isArray(colors) && colors.length > 0 ? colors : <p>Загрузка цветов...</p>;

  return (
    <ColorContext.Provider
      value={{
        colors: Array.isArray(colors) ? colors : [],
        selectedColor,
        selectColor,
        loading,
      }}
    >
      {children}
    </ColorContext.Provider>
  );
};
