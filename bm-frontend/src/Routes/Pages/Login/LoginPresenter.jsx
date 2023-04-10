import React from 'react';

const LoginPresenter = (props) => {
  /* Router */
  /* State */
  const { userInfo, idCheck, isSend } = props;
  const { handleLogin, handleUserInfo } = props;

  const { user_id } = userInfo;
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
        <h1 className="login-page-title">로그인</h1>
        <p className="login-page-ment">
          서비스를 가입하신 아이디로 로그인하세요.
        </p>
      </div>
      <form className="login-page-form" onSubmit={handleSubmit}>
        <label className="login-page-label">아이디</label>
        <div className="flex">
          <div className="flex login-page-inputbox">
            <input
              id="input"
              type="text"
              className={'login-page-email'}
              name="user_id"
              placeholder="아이디를 입력해주세요."
              onChange={handleUserInfo}
              value={user_id}
              disabled={isSend}
            />
            <p
              id="errorment"
              className="login-page-errorment"
              style={{ display: 'none' }}
            >
              올바른 형태의 아이디를 입력해주세요.
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
                  idCheck ? 'login-page-submit' : 'login-page-submit-failed'
                }
              >
                확인
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
