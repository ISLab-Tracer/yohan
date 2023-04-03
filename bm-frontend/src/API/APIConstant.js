import { BASE_URL } from '../Utils';

const AUTH_API = {
  /**
   * @method POST
   * @param
   */
  CREATE_SIGNUP: `${BASE_URL}/auth/send/signup`,
  /**
   * @method POST
   * @param
   */
  CREATE_SIGNIN: `${BASE_URL}/auth/send/signin`,
  /**
   * @method GET
   * @param {string}signup_id
   */
  GET_SIGNUP: `${BASE_URL}/auth/u/:signup_id`,
  /**
   * @method GET
   * @param {string} signin_id
   */
  GET_SIGNIN: `${BASE_URL}/auth/i/:signin_id`,
  /**
   * @method POST
   * @param
   */
  REQUEST_SIGNUP: `${BASE_URL}/auth/signup`,
  /**
   * @method POST
   * @param
   */
  REQUEST_SIGNIN: `${BASE_URL}/auth/signin`,
  /**
   * @method POST
   * @param
   */
  VERIFY_TOKEN: `${BASE_URL}/auth/verify`,
};

const TEAM_API = {
  /**
   * @method GET
   * @param
   */
  GET_TEAM_LIST: `${BASE_URL}/team`,
};

const USER_API = {
  /**
   * @method GET
   * @param { string } user_id
   */
  GET_USERINFO: `${BASE_URL}/user/:user_id`,
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
  ...AUTH_API,
  ...USER_API,
  ...EQUIPMENT_API,
  ...TEAM_API,
  /**
   * @method
   * @param
   */
  GET_COMMON_DATA: `${BASE_URL}/common`,
};

export default APIConstant;
