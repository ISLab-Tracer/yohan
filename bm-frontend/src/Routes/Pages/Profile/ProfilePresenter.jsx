import React, { useCallback, useEffect, useState } from 'react';
import UserProfile from './Components/UserProfile';
import './profile.css';
const ProfilePresenter = ({ getUserInfo }) => {
  /* Router */
  /* State */
  const initialState = {
    user_nm: '',
    user_email: '',
  };
  const [userInfo, setUserInfo] = useState(initialState);

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

  return <UserProfile info={userInfo} />;
};

export default ProfilePresenter;
