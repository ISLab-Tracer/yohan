import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header, SideMenu } from '../../Components';
import '../../Css/main.css';
import '../../Css/equipment.css';

const MainLayoutPresenter = () => {
  /* Router */
  /* State */
  /* Hooks */
  /* Functions */
  /* Render */
  return (
    <div className="mainlayout-container">
      <Header />
      <div className="mainlayout-body-container">
        <SideMenu />
        {<Outlet />}
      </div>
    </div>
  );
};

export default MainLayoutPresenter;
