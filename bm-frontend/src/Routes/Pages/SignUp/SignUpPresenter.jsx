import React from 'react';
import { TypeManager } from 'Utils';

const USER_RANK = TypeManager.getUserRankList();

const SignUpPresenter = (props) => {
  /* Router */

  /* State */
  const { userInfo, inputCheck, isSend, signup_id } = props;
  const { handleSignup, handleUserInfo } = props;
  const { user_email, user_nm, user_password } = userInfo;
  /* Hooks */
  /* Functions */
  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleSignup();
  };

  const handleSelect = (e) => {
    if (e.target.value === 0) {
      handleUserInfo(e, { ...userInfo, [e.target.name]: '' });
      return;
    }
    handleUserInfo(e);
  };

  /* Render */
  return (
    <div>
      <div className="login-page-commentbox">
        <h1 className="login-page-title">회원가입</h1>
      </div>
      <form className="login-page-form" onSubmit={handleSubmit}>
        <div className="input-wrap">
          <div className="input-item">
            <label className="label header">
              서비스를 가입하실 아이디와 이름을 입력해주세요.
            </label>
          </div>
          <div className="input-item">
            <label className="label">이메일 주소</label>
            <div className="content">
              <input
                id="input"
                type="email"
                className="login-page-email"
                name="user_email"
                placeholder="이메일 주소를 입력해주세요."
                onChange={handleUserInfo}
                value={user_email}
                disabled={isSend}
              />
              <p
                id="errorment"
                className="login-page-errorment"
                style={{ display: 'none' }}
              >
                올바른 형태의 이메일 주소를 입력해주세요.
              </p>
            </div>
          </div>
          <div className="input-item">
            <label className="label">이름</label>
            <div className="content">
              <input
                id="input"
                type="text"
                className="login-page-email"
                name="user_nm"
                placeholder="사용자 이름을 입력해주세요."
                onChange={handleUserInfo}
                value={user_nm}
                disabled={isSend}
              />
            </div>
          </div>
          {signup_id && (
            <>
              <div className="input-item">
                <label className="label">비밀번호</label>
                <div className="content">
                  <input
                    id="input"
                    type="password"
                    className="login-page-email"
                    name="user_password"
                    placeholder="사용자 비밀번호을 입력해주세요."
                    onChange={handleUserInfo}
                    value={user_password}
                    disabled={isSend}
                  />
                </div>
              </div>

              <div className="input-item">
                <label className="label">직급 정보</label>
                <div className="content">
                  <select
                    className="login-page-email"
                    onChange={handleSelect}
                    name="user_rank"
                  >
                    <option value={0}>직급 선택</option>
                    {USER_RANK.map((item) => {
                      const { id, title, value } = item;
                      return (
                        <option key={id} value={value}>
                          {title}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
            </>
          )}
        </div>
        <div className="btn-wrap">
          {isSend ? (
            isSend
          ) : (
            <button
              id="submit"
              type="submit"
              className={
                inputCheck ? 'login-page-submit' : 'login-page-submit-failed'
              }
            >
              보내기
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default SignUpPresenter;
