import React, { useCallback, useLayoutEffect, useState } from 'react';
import LoginPresenter from './LoginPresenter';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { RegEmail } from '../../../Utils';
import { useLoading } from '../../../Utils/LoadingManager';
import { AuthAPI } from 'API';
import { useSession } from 'Hooks/SessionManager';

const LoginContainer = () => {
  const { handleLoading, handleLoadingTimer } = useLoading();
  const { session, handleSession } = useSession();
  /* Router */
  const navigate = useNavigate();
  const { login_id } = useParams();

  /* State */
  const initialState = {
    user_email: '',
  };

  const [userInfo, setUserInfo] = useState(initialState);
  const [emailCheck, setEmailCheck] = useState(false);
  const [isSend, setIsSend] = useState(false);

  /* Functions */
  const handleUserInfo = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
    // 한호야 우선 지금 유저정보에 이메일만 다루고 있어서 바로 이렇게 유효성 검사 할게
    // 유저정보에 항목 추가되면 이게 이메일일 경우에만 사용해야해
    const checkEmail = RegEmail(e.target.value);
    if (checkEmail) {
      setEmailCheck(true);
    } else {
      setEmailCheck(false);
    }
  };

  const handleSendMail = async () => {
    if (!emailCheck) {
      return;
    }
    handleLoading(true);
    const result = await AuthAPI.createSignin(userInfo);
    if (result) {
      handleLoading(false);
      setIsSend(
        <div>
          위의 주소로 메일을 전송하였습니다. <br />
          메일을 확인해주세요
        </div>
      );
      return true;
    }

    handleLoadingTimer(1500, () => {
      setIsSend(
        <div>
          존재하지 않는 이메일입니다. <br />
          <Link to="/register">회원가입</Link> 후에 이용해주세요.
        </div>
      );
    });
    return false;
  };

  const handleLoginAction = useCallback(async () => {
    if (!login_id) {
      // 추후 404 페이지로 이동
      navigate('/');
      return;
    }

    const postData = {
      login_id,
    };
    handleLoading(true);
    const result = await AuthAPI.requestSignin(postData);
    if (result) {
      handleLoadingTimer(1000, () => {
        handleSession(result);
        navigate('/');
        return true;
      });
      return false;
    }

    if (session) {
      return;
    }

    handleLoadingTimer(3000, () => {
      navigate('/login');
    });
    return;
  }, [
    login_id,
    navigate,
    handleLoading,
    handleLoadingTimer,
    handleSession,
    session,
  ]);

  /* Hooks */
  useLayoutEffect(() => {
    if (login_id) {
      handleLoginAction();
    }
  }, [login_id, handleLoginAction]);

  /* Render */
  return (
    <LoginPresenter
      isSend={isSend}
      userInfo={userInfo}
      emailCheck={emailCheck}
      handleLoginAction={handleLoginAction}
      handleUserInfo={handleUserInfo}
      handleLogin={handleSendMail}
    />
  );
};

export default LoginContainer;
