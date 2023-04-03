import APIConstant from 'API/APIConstant';

const { default: ApiManager } = require('Utils/APIManager');

const $http = new ApiManager();

const CommonAPI = {
  getCommonData: async () => {
    try {
      const url = APIConstant.GET_COMMON_DATA;
      const result = await $http.get(url);
      const { status, message, data } = result;
      if (status === 200) {
        return data;
      }
      throw message;
    } catch (e) {
      console.log(e);
      throw e;
    }
  },
};

export default CommonAPI;
