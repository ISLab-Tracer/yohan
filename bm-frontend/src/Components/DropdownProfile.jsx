import React, { useEffect, useRef, useState } from 'react';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { useNavigate } from 'react-router-dom';
import { logout } from 'Utils';
import { useSession } from 'Hooks/SessionManager';

const DropdownProfile = ({ info, setInfo, drop }) => {
  const { session } = useSession();
  const { user_nm } = session;
  /* Router */
  /* State */
  const navigate = useNavigate();
  const [mouse, setMouse] = useState(false);
  const dropMenuRef = useRef();

  /* Hooks */
  /**
   * 클릭 감지
   * FIXME
   * NOTE Real DOM 접근 없앨것.
   */
  useEffect(() => {
    document.addEventListener('mousedown', clickOutSide);

    return () => {
      document.removeEventListener('mousedown', clickOutSide);
    };
  });

  /* Functions */
  /**
   * Dropdown 영역 이외에 클릭 시 Off
   * @param {*} e
   */
  const clickOutSide = (e) => {
    if (
      info &&
      !dropMenuRef.current.contains(e.target) &&
      !drop.current.contains(e.target)
    ) {
      setInfo(false);
    }
  };
  /**
   * 마우스 온/오버 이벤트 핸들러
   * @param {*} e
   */
  const onMouseOver = (e) => {
    setMouse(e.target.id);
  };
  const onMouseLeave = () => {
    setMouse();
  };
  const handlepage = (e) => {
    if (e.currentTarget.id === 'info') {
      setInfo(false);
      navigate('/profile');
    } else {
      const result = logout();
      if (result) {
        navigate('/login');
        return;
      }
    }
  };
  /* Render */
  return (
    <div className="info-menu-container" ref={dropMenuRef}>
      <div className="info-name">{user_nm}</div>
      <div
        className="info-menu"
        id="info"
        onMouseOver={onMouseOver}
        onMouseLeave={onMouseLeave}
        style={{ backgroundColor: mouse === 'info' ? '#eff6ff' : '#fff' }}
        onClick={handlepage}
      >
        <SettingsOutlinedIcon
          fontSize="small"
          id="info"
          sx={{ marginRight: 2, color: '#8f91a0' }}
        />
        <span id="info">회원정보</span>
      </div>
      <div
        className="info-menu"
        id="logout"
        onMouseOver={onMouseOver}
        onMouseLeave={onMouseLeave}
        style={{ backgroundColor: mouse === 'logout' ? '#eff6ff' : '#fff' }}
        onClick={handlepage}
      >
        <LogoutOutlinedIcon
          id="logout"
          fontSize="small"
          sx={{ marginRight: 2, color: '#8f91a0' }}
        />
        <span id="logout">로그아웃</span>
      </div>
    </div>
  );
};

export default DropdownProfile;
