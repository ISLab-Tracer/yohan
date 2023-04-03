import React from 'react';

const LoginPresenter = (props) => {
  /* Router */
  /* State */
  const { userInfo, emailCheck, isSend } = props;
  const { handleLogin, handleUserInfo } = props;

  const { user_email } = userInfo;
  /* Hooks */
  /* Functions */
  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleLogin();
  };
  /* Render */

  return (
    <div>
      <div className="login-page-commentbox">
        <h1 className="login-page-title">이메일로 로그인</h1>
        <p className="login-page-ment">
          서비스를 가입하신 이메일 주소로 로그인하세요.
        </p>
        <p className="login-page-ment">이메일로 로그인 코드를 보내드립니다.</p>
      </div>
      <form className="login-page-form" onSubmit={handleSubmit}>
        <label className="login-page-label">이메일 주소</label>
        <div className="flex">
          <div className="flex login-page-inputbox">
            <input
              id="input"
              type="email"
              className={'login-page-email'}
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

        {isSend ? (
          isSend
        ) : (
          <>
            <div className="flex">
              <button
                id="submit"
                type="submit"
                className={
                  emailCheck ? 'login-page-submit' : 'login-page-submit-failed'
                }
              >
                보내기
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default LoginPresenter;

LoginPresenter.DefaultProp = {};
