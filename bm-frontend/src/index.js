import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import LoadingManager from './Utils/LoadingManager';
import SessionManager from 'Hooks/SessionManager';
import CommonDataManager from 'Hooks/CommonDataManager';

console.log(`
--------------------------
\n
Release Version: V1.0.0.2
Last Release: 2023.03.29
\n
--------------------------`);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <SessionManager>
      <CommonDataManager>
        <LoadingManager>
          <App />
        </LoadingManager>
      </CommonDataManager>
    </SessionManager>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
