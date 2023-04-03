import React, { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkSession } from 'Utils';
import { useLoading } from 'Utils/LoadingManager';
import LoginLayoutPresenter from './LoginLayoutPresenter';

const LoginLayoutContainer = () => {
  const { handleLoadingTimer } = useLoading();
  /* Router */
  const navigate = useNavigate();
  /* State */

  /* Functions */
  const handleSession = useCallback(() => {
    const token = checkSession();
    if (token) {
      handleLoadingTimer(1000, () => {
        navigate('/');
      });
      return;
    }
  }, [navigate, handleLoadingTimer]);

  /* Hooks */
  useEffect(() => {
    handleSession();
  }, [handleSession]);

  /* Render */
  return <LoginLayoutPresenter />;
};

export default LoginLayoutContainer;
