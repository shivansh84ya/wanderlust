import { Request, Response, NextFunction } from 'express';
import { HTTP_STATUS, RESPONSE_MESSAGES } from '../utils/constants';

interface ErrorWithStatus extends Error {
  status?: number;
  errors?: string[];
}

const errorMiddleware = (err: ErrorWithStatus, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(err.status || HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
    status: err.status || HTTP_STATUS.INTERNAL_SERVER_ERROR,
    message: err.message || RESPONSE_MESSAGES.COMMON.INTERNAL_SERVER_ERROR,
    errors: err.errors || [],
  });
};

export default errorMiddleware;
