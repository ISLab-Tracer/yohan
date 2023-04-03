const { default: APIConstant } = require('API/APIConstant');
const { APIManager } = require('Utils');

const $http = new APIManager();
const TeamAPI = {
  getTeamList: async () => {
    try {
      const url = APIConstant.GET_TEAM_LIST;
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

export default TeamAPI;
