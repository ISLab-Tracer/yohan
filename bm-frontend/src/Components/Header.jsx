import React, { useRef, useState } from 'react';
import Logo from '../Assets/img/logo.png';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useNavigate } from 'react-router-dom';
import DropdownProfile from './DropdownProfile';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { useSession } from 'Hooks/SessionManager';

const Header = () => {
  /* Router */
  /* State */
  const { session } = useSession();
  const { user_nm } = session;
  const navigate = useNavigate();
  const [info, setInfo] = useState(false);
  const drop = useRef();
  /* Hooks */
  /* Functions */
  /**
   * 이름에 따라 랜덤 색상
   * @param {*} string
   * @returns
   */
  const stringToColor = (string) => {
    let hash = 0;
    let i;

    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    return color;
  };
  /**
   * 이름만 추출.. 추후 이름 네글자일 경우 수정 필요?
   * @param {*} name
   * @returns
   */
  const stringAvatar = (name) => {
    return {
      sx: {
        bgcolor: stringToColor(name),
        width: 40,
        height: 40,
        fontSize: 18,
        cursor: 'pointer',
      },
      children: `${name.substr(1, 2)}`,
    };
  };
  /**
   * profile 메뉴 on/off
   */
  const changeInfo = () => {
    if (info) {
      setInfo(false);
    } else {
      setInfo(true);
    }
  };
  /* Render */
  return (
    <header className="header-container">
      <img
        src={Logo}
        alt="logo"
        style={{ width: 40, cursor: 'pointer' }}
        onClick={() => navigate('/')}
      />
      <div className="profile-container">
        <NotificationsIcon sx={{ marginRight: 3 }} />
        <Stack direction="row" spacing={2}>
          <Avatar {...stringAvatar(user_nm)} onClick={changeInfo} ref={drop} />
        </Stack>
        {info && <DropdownProfile info={info} setInfo={setInfo} drop={drop} />}
      </div>
    </header>
  );
};

export default Header;
