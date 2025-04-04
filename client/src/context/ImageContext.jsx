import React, { createContext, useContext, useState, useEffect } from 'react';

const ImageContext = createContext();

export const useImageContext = () => useContext(ImageContext);

export const ImageContextProvider = ({ children }) => {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    const savedImage = localStorage.getItem('image');
    if (savedImage) {
      setImageUrl(savedImage);
    }
  }, []);

  const saveImageUrl = (url) => {
    setImageUrl(url);
    if (url) {
      localStorage.setItem('image', url);
    } else {
      localStorage.removeItem('image');
    }
  };

  return (
    <ImageContext.Provider
      value={{
        imageUrl,
        setImageUrl: saveImageUrl
      }}
    >
      {children}
    </ImageContext.Provider>
  );
};

export default ImageContext;