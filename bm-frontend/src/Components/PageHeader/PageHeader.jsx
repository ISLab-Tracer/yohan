import { Divider } from '@mui/material';
import React from 'react';
import './pageheader.css';

const PageHeader = ({
  title,
  subTitle,
  maxWidth = '100%',
  right = '',
  bottom = '',
}) => {
  /* Router */
  /* State */
  /* Functions */
  /* Hooks */
  /* Render */
  return (
    <div className="page-header-container" style={{ maxWidth }}>
      <div className="top">
        <div className="header-left">
          <div className="header-subtitle">{subTitle}</div>
          <div className="header-title">{title}</div>
        </div>
        <div className="header-right">{right}</div>
      </div>
      <div className="bottom">
        {bottom ? (
          <>
            {bottom}
            <Divider />
          </>
        ) : (
          ''
        )}
        <div></div>
      </div>
    </div>
  );
};

export default PageHeader;
