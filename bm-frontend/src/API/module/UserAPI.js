import { APIManager } from 'Utils';
import APIConstant from '../APIConstant';
const $http = new APIManager();

const UserAPI = {
  /**
   * 유저 상세정보 조회
   * --
   * @param {string} user_id
   * @returns
   */
  getUserInfo: async (user_id) => {
    try {
      const url = APIConstant.GET_USERINFO.replace(':user_id', user_id);
      const result = await $http.get(url);
      const { status, message, data } = result;
      if (status === 200) {
        return data;
      }
      throw message;
    } catch (e) {
      throw e;
    }
  },

  /**
   * 토큰 검증
   * --
   * @returns
   */
  verifyToken: async () => {
    try {
      const url = APIConstant.VERIFY_TOKEN;
      const result = await $http.post(url);
      const { status, message, data } = result;
      if (status === 200) {
        return data;
      }
      throw message;
    } catch (e) {
      return false;
    }
  },
  /**
   * 회원가입 메일 전송
   * --
   * @param { Object } userInfo
   * @returns
   */
  createSignup: async (userInfo) => {
    try {
      const url = APIConstant.CREATE_SIGNUP;
      const result = await $http.post(url, userInfo);
      const { status, message, data } = result;
      if (status === 200) {
        return data;
      }
      throw message;
    } catch (e) {
      return false;
    }
  },
  /**
   * 회원가입 정보 조회
   * --
   * @param {string} signup_id
   * @returns
   */
  getSignup: async (signup_id) => {
    try {
      const url = APIConstant.GET_SIGNUP.replace(':signup_id', signup_id);
      const result = await $http.get(url);
      const { status, message, data } = result;
      if (status === 200) {
        return data;
      }
      throw message;
    } catch (e) {
      throw e;
    }
  },

  /**
   * 회원가입 요청
   * --
   * @param {*} userInfo
   * @returns
   */
  requestSignup: async (userInfo) => {
    try {
      const url = APIConstant.REQUEST_SIGNUP;
      const result = await $http.post(url, userInfo);
      const { status, message, data } = result;
      if (status === 200) {
        return data;
      }
      throw message;
    } catch (e) {
      throw e;
    }
  },
  /**
   * 로그인 메일 전송
   * --
   * @param {*} userInfo
   * @returns
   */
  createSignin: async (userInfo) => {
    try {
      const url = APIConstant.CREATE_SIGNIN;
      const result = await $http.post(url, userInfo);
      const { status, message, data } = result;
      if (status === 200) {
        return data;
      }
      throw message;
    } catch (e) {
      return false;
    }
  },
  /**
   * 로그인 요청
   * --
   * @param {*} userInfo
   * @returns
   */
  requestSignin: async (userInfo) => {
    try {
      const url = APIConstant.REQUEST_SIGNIN;
      const result = await $http.post(url, userInfo);
      const { status, message, data } = result;
      if (status === 200) {
        return data;
      }
      throw message;
    } catch (e) {
      return false;
    }
  },
};

export default UserAPI;
