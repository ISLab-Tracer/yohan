import APIConstant from 'API/APIConstant';

const { default: ApiManager } = require('Utils/APIManager');

const $http = new ApiManager();

const EquipAPI = {
  /**
   * 장비 등록
   * --
   * @param {*} equipInfo
   * @returns
   */
  createEquip: async (equipInfo) => {
    try {
      const url = APIConstant.CREATE_EQUIPMENT;
      const result = await $http.multipart(url, equipInfo);
      const { status, message, data } = result;
      if (status === 200) {
        return data;
      }
      throw message;
    } catch (e) {
      console.log(e);
      return false;
    }
  },
  /**
   * 장비 목록 조회
   * --
   * @returns
   */
  getEquipList: async () => {
    try {
      const url = APIConstant.GET_EQUIPMENT_LIST;
      const result = await $http.get(url);
      const { status, message, data } = result;
      if (status === 200) {
        return data;
      }
      throw message;
    } catch (e) {
      console.log(e);
      return false;
    }
  },
};

export default EquipAPI;
