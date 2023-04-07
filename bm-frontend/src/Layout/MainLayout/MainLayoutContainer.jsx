import React, { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSession } from 'Utils';
import { useLoading } from 'Utils/LoadingManager';
import MainLayoutPresenter from './MainLayoutPresenter';
import { useCommonData } from 'Hooks/CommonDataManager';

const MainLayoutContainer = () => {
  const { handleLoadingTimer } = useLoading();
  const { categoryList } = useCommonData();

  const check = categoryList ? true : false;

  /* Router */
  const navigate = useNavigate();
  /* State */

  /* Functions */
  const handleSession = useCallback(() => {
    if (getSession()) {
      return;
    }

    handleLoadingTimer(1000, () => {
      navigate('/equipment');
    });
  }, [navigate, handleLoadingTimer]);

  /* Hooks */
  useEffect(() => {
    handleSession();
  }, [handleSession]);

  /* Render */
  return check ? <MainLayoutPresenter /> : '';
};

export default MainLayoutContainer;
