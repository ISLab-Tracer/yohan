import React, { useCallback, useEffect, useState } from 'react';
import TeamProfile from './Components/TeamProfile';
import UserProfile from './Components/UserProfile';
import './profile.css';
const ProfilePresenter = ({ teams, getUserInfo }) => {
  /* Router */
  /* State */
  const initialState = {
    user_nm: '',
    user_email: '',
    team_id: '',
    team: {
      team_id: '',
      team_nm: '',
    },
  };

  // TeamProfile의 테스트 값
  const initialTeamProfile = {
    team_name: 'Test',
    team_memo: 'Blockchain',
    team_time: '03:00',
    team_img: 'test',
    com_name: 'PNU',
    com_id: '12345677890',
    com_location: '부산광역시 금정구',
    com_boss: '조욱',
    com_phone: '010-0101-0101',
    set_money: '₩',
    set_set: '전체속성 + 가격',
  };

  const [userInfo, setUserInfo] = useState(initialState);

  const [teamInfo] = useState(initialTeamProfile);

  // 유저 설정(1) / 팀 설정(2) 모드( 렌더링 )
  const [mode] = useState('1');

  /* Functions */
  const handleGetUserInfo = useCallback(async () => {
    if (userInfo.user_id) {
      return;
    }
    const result = await getUserInfo();
    if (result) {
      setUserInfo(result);
      return true;
    }
    return false;
  }, [userInfo, getUserInfo]);

  /* Hooks */
  useEffect(() => {
    handleGetUserInfo();
  }, [handleGetUserInfo]);

  /* Render */

  return mode === '1' ? (
    <UserProfile info={userInfo} />
  ) : (
    <TeamProfile info={teamInfo} />
  );
};

export default ProfilePresenter;
