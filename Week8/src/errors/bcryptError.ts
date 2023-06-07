import { BaseError } from './baseError';
import { httpCodes, httpStatusCode } from './httpStatusCodes';

export class BcryptError extends BaseError {
  constructor(
    message = 'Bcrypt Error.',
    name = 'BcryptError',
    statusCode: httpStatusCode = httpCodes.INTERNAL_SERVER,
    isOperational = true,
  ) {
    super(name, statusCode, isOperational, message);
  }
}
