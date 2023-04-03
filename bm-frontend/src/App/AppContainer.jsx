import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLoading } from 'Utils/LoadingManager';
import Loading from '../Components/Loading/Loading';
import AppPresenter from './AppPresenter';

const AppContainer = () => {
  /* Router */
  const location = useLocation();
  /* State */
  const { handleLoadingTimer } = useLoading();
  /* Functions */
  /* Hooks */
  useEffect(() => {
    handleLoadingTimer(1000);
    // eslint-disable-next-line
  }, [location]);

  /* Render */
  return (
    <>
      <Loading isLoading={false} />
      <AppPresenter />
    </>
  );
};

export default AppContainer;
