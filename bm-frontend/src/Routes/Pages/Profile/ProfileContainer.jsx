import { UserAPI } from 'API';
import { useSession } from 'Hooks/SessionManager';
import React, { useCallback } from 'react';
import ProfilePresenter from './ProfilePresenter';

const ProfileContainer = () => {
  const { session } = useSession();
  /* Router */
  /* State */
  /* Functions */
  const getUserInfo = useCallback(async () => {
    if (!session) {
      return;
    }
    const { user_id } = session;
    const result = await UserAPI.getUserInfo(user_id);
    if (result) {
      return result;
    }
    return false;
  }, [session]);

  /* Hooks */

  /* Render */
  return <ProfilePresenter getUserInfo={getUserInfo} />;
};

export default ProfileContainer;
