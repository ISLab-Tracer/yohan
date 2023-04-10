import React from 'react';
import { Outlet } from 'react-router-dom';
import '../../Css/main.css';
import '../../Css/login.css';
import '../../Css/register.css';

const LoginLayoutPresenter = () => {
  /* Router */
  /* State */
  /* Hooks */
  /* Functions */
  /* Render */
  return (
    <div className="mainlayout-container">
      {/* <Header /> */}
      <div className="mainlayout-body-container">
        <div className="login-page-container">
          <div className="login-page-box">{<Outlet />}</div>
        </div>
      </div>
    </div>
  );
};

export default LoginLayoutPresenter;
