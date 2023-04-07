import { BASE_URL } from '../Utils';

const EQUIPMENT_API = {
  /**
   * @method POST
   * @param
   */
  CREATE_EQUIPMENT: `${BASE_URL}/equipment`,
  /**
   * @method GET
   * @param
   */
  GET_EQUIPMENT_LIST: `${BASE_URL}/equipment`,
  /**
   * @method GET
   * @param { string } equipment_id
   */
  GET_EQUIPMENT: `${BASE_URL}/equipment/:equipment_id`,
};

const APIConstant = {
  ...EQUIPMENT_API,
  /**
   * @method
   * @param
   */
  GET_COMMON_DATA: `${BASE_URL}/common`,
};

export default APIConstant;
