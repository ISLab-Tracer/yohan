import { Buffer } from 'buffer';
import * as XLSX from 'xlsx';
export { default as APIManager } from './APIManager';
export { default as TypeManager } from './TypeManager';

export const BASE_URL = process.env.REACT_APP_BASE_URL;
export const HOST_DOMAIN = process.env.REACT_APP_HOST_DOMAIN;
export const BUCKET_URL = process.env.REACT_APP_BUCKET_URL;

/**
 * 세션 체크
 * --
 * @returns
 */
export const checkSession = () => {
  const s = getCookie('ISLAB_TRACER');
  if (s && s.length >= 0) {
    return true;
  }
  return false;
};

/**
 * 세션 정보 불러오기
 * @returns
 */
export const getSession = () => {
  const access_token = getCookie('ISLAB_TRACER');
  const s = JSON.parse(getCookie('TRACER_USER'));
  if (access_token && access_token.length >= 0) {
    return { access_token, ...s };
  }
  return false;
};

export const logout = () => {
  deleteCookie('ISLAB_TRACER', { path: '/', domain: HOST_DOMAIN });
  deleteCookie('TRACER_USER', { path: '/', domain: HOST_DOMAIN });
  const r = checkSession();
  if (r) {
    return false;
  }
  return true;
};

/**
 * 쿠키 가져오기
 * --
 * @param {String} name 쿠키명
 * @param {Object} options
 * @returns
 */
export const getCookie = (name, options = null) => {
  const value = window.document.cookie.match(
    '(^|;) ?' + name + '=([^;]*)(;|$)'
  );
  return value ? value[2] : null;
};

/**
 * 쿠키 저장하기
 * --
 * @param {String} name 저장할 쿠키명
 * @param {String} value 저장할 쿠키 내용
 * @param {Number} expires 저장할 기간(일)
 * @param {Function} callback 콜백함수
 */
export const setCookie = (name, value, expires = 1, callback = false) => {
  var date = new Date();
  date.setTime(date.getTime() + expires * 1000 * 60 * 60 * 24);
  window.document.cookie = `${name}=${value};expires=${date.toUTCString()}; path=/`;
  if (callback) callback();
};

/**
 * 쿠키 삭제
 * --
 * @param {String} name 쿠키명
 * @param {Object} param1 쿠키 주소, 도메인
 */
export const deleteCookie = (name, { path, domain }) => {
  if (getCookie(name)) {
    window.document.cookie =
      name +
      '=' +
      (path ? ';path=' + path : '') +
      (domain ? ';domain=' + domain : '') +
      ';expires=Thu, 01 Jan 1970 00:00:01 GMT';
  }
};

export const RegId = (id) => {
  // eslint-disable-next-line
  const regId = /^[A-Za-z0-9_\.\-]+/;
  const result = regId.test(id);
  return result;
};

export const ImgError = (e) => {
  return (e.target.src =
    'https://item.kakaocdn.net/do/c5c470298d527ef65eb52883f0f186c4d0bbab1214a29e381afae56101ded106');
};

/**
 * Buffer 쓰기
 * --
 * @param {string} str
 * @returns
 */
export const writeBuffer = (str, format = 'base64') => {
  return Buffer.from(str, 'utf8').toString(format);
};

/**
 * Buffer 읽기
 * --
 * @param {string} str
 * @returns
 */
export const readBuffer = (str, format = 'base64') => {
  return Buffer.from(str, format).toString('utf8');
};

/**
 * 금액포매터
 * --
 * @param {*} v
 * @param {*} unit
 * @returns
 */
export const stringToMoneyFormat = (v = 0, unit = '') => {
  // const value = String(isNull(v) ? 0 : v)
  // const value = String(v ? v : 0)
  //   .split('')
  //   .reverse()
  //   .join('');
  // const valueLength = value.length;
  // let result = '';
  // for (let ii in value) {
  //   result += String(value[ii]);
  //   if ((ii + 1) % 3 === 0 && ii < valueLength - 1) {
  //     result += ',';
  //   }
  // }
  // return `${result.split('').reverse().join('')}${unit}`;

  return comma(uncomma(v));
};

export const comma = (str) => {
  str = String(str);
  return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
};
export const uncomma = (str) => {
  str = String(str);
  return str.replace(/[^\d]+/g, '');
};
/*
 * @param {*} param0
 */
export const ExcelParsing = ({ setField, setRow, target }) => {
  const file = target.files[0];
  const reader = new FileReader();

  reader.onload = (e) => {
    const data = target.result;
    const workbook = XLSX.read(data, { type: 'binary' });

    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const rowData = XLSX.utils.sheet_to_json(worksheet, { header: 0 });
    const fieldHeader = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

    setField(fieldHeader);
    setRow(rowData);
  };
  reader.readAsBinaryString(file);
};
