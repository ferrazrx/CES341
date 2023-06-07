import { BaseError } from './baseError';
import { httpCodes, httpStatusCode } from './httpStatusCodes';

export class PasswordError extends BaseError {
  constructor(
    message = 'Password Error.',
    name = 'PasswordError',
    statusCode: httpStatusCode = httpCodes.BAD_REQUEST,
    isOperational = true,
  ) {
    super(name, statusCode, isOperational, message);
  }
}
