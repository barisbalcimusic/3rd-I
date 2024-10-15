import React, { createContext, useContext, useState } from "react";

const ImageContext = createContext();

export const ImageProvider = ({ children }) => {
  const [imgSrc, setImgSrc] = useState(null);

  return (
    <ImageContext.Provider value={{ imgSrc, setImgSrc }}>
      {children}
    </ImageContext.Provider>
  );
};

export const useImageContext = () => useContext(ImageContext);
