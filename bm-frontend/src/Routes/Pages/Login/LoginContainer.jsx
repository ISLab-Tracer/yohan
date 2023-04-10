import React, { useCallback, useLayoutEffect, useState } from 'react';
import LoginPresenter from './LoginPresenter';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { RegId } from '../../../Utils';
import { useLoading } from '../../../Utils/LoadingManager';
import { UserAPI } from 'API';
import { useSession } from 'Hooks/SessionManager';

const LoginContainer = () => {
  const { handleLoading, handleLoadingTimer } = useLoading();
  const { session, handleSession } = useSession();
  /* Router */
  const navigate = useNavigate();
  const { login_id } = useParams();

  /* State */
  const initialState = {
    user_id: '',
  };

  const [userInfo, setUserInfo] = useState(initialState);
  const [idCheck, setIdCheck] = useState(false);
  const [isSend, setIsSend] = useState(false);

  /* Functions */
  const handleUserInfo = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
    const checkEmail = RegId(e.target.value);
    if (checkEmail) {
      setIdCheck(true);
    } else {
      setIdCheck(false);
    }
  };

  const handleSendMail = async () => {
    if (!idCheck) {
      return;
    }
    handleLoading(true);
    const result = await UserAPI.createSignin(userInfo);
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
          존재하지 않는 아이디입니다. <br />
          <Link to="/register">회원가입</Link> 후에 이용해주세요.
        </div>
      );
    });
    return true;
  };

  const handleLoginAction = useCallback(async () => {
    if (!login_id) {
      navigate('/');
      return;
    }

    const postData = {
      login_id,
    };
    handleLoading(true);
    const result = await UserAPI.requestSignin(postData);
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
      idCheck={idCheck}
      handleLoginAction={handleLoginAction}
      handleUserInfo={handleUserInfo}
      handleLogin={handleSendMail}
    />
  );
};

export default LoginContainer;
