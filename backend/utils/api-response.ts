import { HTTP_STATUS } from './constants';

class ApiResponse<T> {
  status: number;
  data: T;
  message: string;
  success: boolean;

  constructor(status: number, data: T, message: string = 'Success') {
    this.status = status;
    this.data = data;
    this.message = message;
    this.success = status < HTTP_STATUS.BAD_REQUEST;
  }
}

export { ApiResponse };
