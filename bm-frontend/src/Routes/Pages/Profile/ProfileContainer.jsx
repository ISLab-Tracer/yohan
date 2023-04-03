import { TeamAPI, UserAPI } from 'API';
import { useSession } from 'Hooks/SessionManager';
import React, { useCallback, useEffect, useState } from 'react';
import ProfilePresenter from './ProfilePresenter';

const ProfileContainer = () => {
  const { session } = useSession();
  /* Router */
  /* State */
  const [teams, setTeams] = useState();
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

  const handleGetTeamInfo = useCallback(async () => {
    if (teams) {
      return;
    }

    const result = await TeamAPI.getTeamList();
    if (result) {
      setTeams(result);
      return true;
    }
    setTeams([]);
    return false;
  }, [teams]);

  /* Hooks */

  useEffect(() => {
    handleGetTeamInfo();
  }, [handleGetTeamInfo]);

  /* Render */
  return <ProfilePresenter getUserInfo={getUserInfo} teams={teams} />;
};

export default ProfileContainer;
