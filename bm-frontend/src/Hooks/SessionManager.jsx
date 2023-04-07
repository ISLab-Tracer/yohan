import React, { createContext, useContext, useEffect, useState } from 'react';

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
    return true;
  };

  /**
   * 백엔드 세션 체크
   * --
   * @returns
   */
  const handleCheckToken = async () => {
    return true;
  };

  /**
   * 로그인 처리
   * --
   * @param {*} sessionInfo
   * @returns
   */
  const handleSession = (sessionInfo) => {
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
