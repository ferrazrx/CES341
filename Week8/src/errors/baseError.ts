import { httpStatusCode } from './httpStatusCodes';

export class BaseError extends Error {
  constructor(
    public name: string,
    public statusCode: httpStatusCode,
    public isOperational: boolean = true,
    public message: string = '',
  ) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this);
  }
}
