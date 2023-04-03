import React, { createContext, useContext, useState } from 'react';

const LoadingContext = createContext(null);

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('Cannot find LoadingContext');
  }
  return context;
};

const LoadingManager = ({ children }) => {
  /* Router */
  /* State */
  const [isLoading, setIsLoading] = useState(false);
  /* Functions */
  const handleLoading = (val = true) => {
    setIsLoading(val);
  };
  const handleLoadingTimer = (timer = 3000, callback = null) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (callback) {
        callback();
      }
    }, timer);
  };
  /* Hooks */
  /* Render */
  return (
    <LoadingContext.Provider
      value={{ isLoading, handleLoading, handleLoadingTimer }}
    >
      {children}
    </LoadingContext.Provider>
  );
};

export default LoadingManager;
