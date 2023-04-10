import { UserAPI } from 'API';
import React, { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { RegId, setCookie } from 'Utils';
import { useLoading } from 'Utils/LoadingManager';
import SignUpPresenter from './SignUpPresenter';

const SignUpContainer = () => {
  /* Router */
  const { handleLoading, handleLoadingTimer } = useLoading();
  const navigate = useNavigate();
  const { signup_id } = useParams();

  /* State */
  const initialState = {
    user_email: '',
    user_nm: '',
  };

  const [userInfo, setUserInfo] = useState(initialState);
  const [inputCheck, setInputCheck] = useState(false);
  const [isSend, setIsSend] = useState(false);

  /* Functions */

  /**
   * 유저 정보 입력
   * --
   * @param {*} e
   */
  const handleUserInfo = (e, c = null) => {
    if (c) {
      setUserInfo(c);
      return;
    }
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleSignupInfo = useCallback(async () => {
    if (!signup_id) return;
    if (userInfo.signup_id) return;
    const result = await UserAPI.getSignup(signup_id);
    if (result) {
      const { signup_mail, signup_nm, signup_id } = result;
      setUserInfo({
        ...userInfo,
        user_email: signup_mail,
        user_nm: signup_nm,
        signup_id,
      });
    }
  }, [signup_id, userInfo]);

  /**
   * 회원가입 이메일 전송 및 회원가입 요청
   * --
   * @returns
   */
  const handleSignup = async () => {
    // 회원가입 요청시 해당 분기
    if (signup_id) {
      if (!userInfo.user_password) {
        return false;
      }
      handleLoading(true);
      const postData = {
        user_email: userInfo.user_email,
        user_nm: userInfo.user_nm,
        user_password: userInfo.user_password,
      };
      const result = await UserAPI.requestSignup(postData);
      if (result) {
        handleLoading(false);
        const { access_token, ...user } = result;
        setCookie('ISLAB_BOOKSTORE', access_token);
        setCookie('BOOKSTORE_USER', JSON.stringify(user));
        navigate('/');
        return true;
      }

      handleLoading(false);
      return false;
    }

    // 회원가입 이메일 전송시 해당 분기
    if (isSend) {
      return;
    }
    handleLoading(true);
    const result = await UserAPI.createSignup(userInfo);
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
          이미 회원가입 요청이 되었거나 회원가입 된 메일입니다.
          <br />
          메일을 다시 확인해주세요.
          <br />
          <Link to="/login">로그인</Link>
        </div>
      );
    });
    return false;
  };

  /* Hooks */
  useEffect(() => {
    if (signup_id) {
      handleSignupInfo();
    }
  }, [signup_id, handleSignupInfo]);

  useEffect(() => {
    const checkEmail = RegId(userInfo.user_email);

    if (!checkEmail || userInfo.user_nm.length < 2) {
      setInputCheck(false);
      return;
    }

    setInputCheck(true);
  }, [userInfo]);

  /* Render */
  return (
    <SignUpPresenter
      handleSignup={handleSignup}
      handleUserInfo={handleUserInfo}
      inputCheck={inputCheck}
      userInfo={userInfo}
      isSend={isSend}
      signup_id={signup_id}
    />
  );
};

export default SignUpContainer;
