import { AuthAPI, TeamAPI } from 'API';
import React, { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { RegEmail, setCookie } from 'Utils';
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
  const [teamList, setTeamList] = useState([]);
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
    const result = await AuthAPI.getSignup(signup_id);
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

  const handleTeamList = useCallback(async () => {
    if (teamList.length >= 1) {
      return;
    }
    const result = await TeamAPI.getTeamList();
    if (result) {
      setTeamList(result);
    }
  }, [teamList]);

  /**
   * 회원가입 이메일 전송 및 회원가입 요청
   * --
   * @returns
   */
  const handleSignup = async () => {
    // 회원가입 요청시 해당 분기
    if (signup_id) {
      if (
        !userInfo.team_id ||
        userInfo.team_id === '0' ||
        !userInfo.user_password
      ) {
        return false;
      }
      handleLoading(true);
      const postData = {
        user_email: userInfo.user_email,
        user_nm: userInfo.user_nm,
        team_id: userInfo.team_id,
        user_password: userInfo.user_password,
      };
      const result = await AuthAPI.requestSignup(postData);
      if (result) {
        handleLoading(false);
        const { access_token, ...user } = result;
        setCookie('ISLAB_TRACER', access_token);
        setCookie('TRACER_USER', JSON.stringify(user));
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
    const result = await AuthAPI.createSignup(userInfo);
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
      handleTeamList();
    }
  }, [signup_id, handleSignupInfo, handleTeamList]);

  useEffect(() => {
    const checkEmail = RegEmail(userInfo.user_email);

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
      teamList={teamList}
    />
  );
};

export default SignUpContainer;
