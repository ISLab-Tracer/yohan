import { AuthAPI } from 'API';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { getSession, logout, readBuffer, setCookie, writeBuffer } from 'Utils';

const SessionContext = createContext(null);

export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error('Cannot find SessionContext');
  }
  return context;
};

const SessionManager = ({ children }) => {
  /* Router */
  /* State */
  const [session, setSession] = useState(null);

  /* Functions */
  /**
   * 리레이아웃시, 세션 체크후 세션 주입
   * --
   * @returns
   */
  const checkSession = () => {
    const result = getSession();
    if (result) {
      const { user_nm, ...s } = result;
      const ss = {
        ...s,
        user_nm: readBuffer(user_nm),
      };
      setSession(ss);
      return true;
    }
    setSession(null);
    return false;
  };

  /**
   * 백엔드 세션 체크
   * --
   * @returns
   */
  const handleCheckToken = async () => {
    const s = getSession();
    if (!s) {
      return;
    }
    const result = await AuthAPI.verifyToken();
    if (result) {
      return true;
    }

    setSession(null);
    logout();
    return false;
  };

  /**
   * 로그인 처리
   * --
   * @param {*} sessionInfo
   * @returns
   */
  const handleSession = (sessionInfo) => {
    const { access_token, ...user } = sessionInfo;

    const s_user = {
      ...user,
      user_nm: writeBuffer(user.user_nm),
    };

    setSession(s_user);
    setCookie('ISLAB_TRACER', access_token);
    setCookie('TRACER_USER', JSON.stringify(s_user));
    checkSession();
    return true;
  };

  /* Hooks */
  useEffect(() => {
    checkSession();
  }, []);

  useEffect(() => {
    handleCheckToken();
  }, []);

  /* Render */
  return (
    <SessionContext.Provider value={{ session, handleSession }}>
      {children}
    </SessionContext.Provider>
  );
};

export default SessionManager;
