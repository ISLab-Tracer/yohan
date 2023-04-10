import {
  AUTH_SIGNUP_FAILURE,
  ENTITY_BAD_REQUEST,
  ErrorCode,
} from './error.code';

/**
 * 유효하지 않은 호출 오류 예외처리
 * --
 * @param message
 * @returns
 */
export const EntityBadRequestException = (
  message?: string,
): ServiceException => {
  return new ServiceException(ENTITY_BAD_REQUEST, message);
};

/**
 * 계정관련 오류 예외처리
 * --
 * @param message
 * @returns
 */
export const AuthSignupFailureException = (
  message?: string,
): ServiceException => {
  return new ServiceException(AUTH_SIGNUP_FAILURE, message);
};

export class ServiceException extends Error {
  readonly errorCode: ErrorCode;

  constructor(errorCode: ErrorCode, message?: string) {
    if (!message) {
      message = errorCode.message;
    }

    super(message);

    this.errorCode = errorCode;
  }
}
