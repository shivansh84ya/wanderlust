import { RESPONSE_MESSAGES } from './constants';

class ApiError extends Error {
  status: number;
  data: null;
  message: string;
  success: boolean;
  errors: any[];

  constructor(
    status: number,
    message: string = RESPONSE_MESSAGES.COMMON.SOMETHING_WRONG,
    errors: any[] = [],
    stack: string = ''
  ) {
    super(message);
    this.status = status;
    this.data = null;
    this.message = message;
    this.success = false;
    this.errors = errors;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { ApiError };
import { RESPONSE_MESSAGES } from './constants';

class ApiError extends Error {
  status: number;
  data: null;
  message: string;
  success: boolean;
  errors: any[];

  constructor(
    status: number,
    message: string = RESPONSE_MESSAGES.COMMON.SOMETHING_WRONG,
    errors: any[] = [],
    stack: string = ''
  ) {
    super(message);
    this.status = status;
    this.data = null;
    this.message = message;
    this.success = false;
    this.errors = errors;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { ApiError };
