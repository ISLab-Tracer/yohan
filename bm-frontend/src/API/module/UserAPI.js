import { APIManager } from 'Utils';
import APIConstant from '../APIConstant';
const $http = new APIManager();

const UserApi = {
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
};

export default UserApi;
