import { Add, ViewList } from '@mui/icons-material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const EquipHeader = () => {
  /* Router */
  const navigate = useNavigate();
  /* State */
  /* Hooks */
  /* Functions */
  const handleCreatePage = () => {
    navigate('/equipment/register');
    return;
  };

  const handleManagmentPage = () => {
    navigate(-1);
    return;
  };

  /* Render */
  return (
    <div className="equip-page-titlebox">
      <h4 className="equip-page-title-h4">제품 목록</h4>
      <div className="equip-page-buttonbox">
        <div
          className="equip-page-button-firsthover"
          onClick={handleCreatePage}
        >
          <div className="equip-page-button equip-page-button-first">
            <Add />
            <p>제품 추가</p>
          </div>
        </div>
        <div
          className="equip-page-button-secondhover"
          onClick={handleManagmentPage}
        >
          <div className="equip-page-button equip-page-button-second">
            <ViewList />
            <p>데이터 관리</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EquipHeader;
