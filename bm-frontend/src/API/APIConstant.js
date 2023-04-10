import { BASE_URL } from '../Utils';

const USER_API = {
  /**
   * @method GET
   * @param { string } user_id
   */
  GET_USERINFO: `${BASE_URL}/user/:user_id`,

  /**
   * @method POST
   * @param
   */
  VERIFY_TOKEN: `${BASE_URL}/user/verify`,
  /**
   * @method POST
   * @param
   */
  CREATE_SIGNUP: `${BASE_URL}/user/send/signup`,
  /**
   * @method POST
   * @param
   */
  CREATE_SIGNIN: `${BASE_URL}/user/send/signin`,
  /**
   * @method GET
   * @param {string}signup_id
   */
  GET_SIGNUP: `${BASE_URL}/user/u/:signup_id`,
  /**
   * @method GET
   * @param {string} signin_id
   */
  GET_SIGNIN: `${BASE_URL}/user/i/:signin_id`,
  /**
   * @method POST
   * @param
   */
  REQUEST_SIGNUP: `${BASE_URL}/user/signup`,
  /**
   * @method POST
   * @param
   */
  REQUEST_SIGNIN: `${BASE_URL}/user/signin`,
};

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
  ...USER_API,
  ...EQUIPMENT_API,
  /**
   * @method
   * @param
   */
  GET_COMMON_DATA: `${BASE_URL}/common`,
};

export default APIConstant;
