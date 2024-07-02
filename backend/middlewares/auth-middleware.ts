import { Request, Response, NextFunction } from 'express';
import { JWT_SECRET } from '../config/utils';
import { ApiError } from '../utils/api-error';
import { HTTP_STATUS, RESPONSE_MESSAGES } from '../utils/constants';
import jwt from 'jsonwebtoken';
import { Role } from '../types/role-type';

// Extend the JwtPayload interface to include your custom properties
interface CustomJwtPayload extends jwt.JwtPayload {
  _id: string;
  role: string;
}

interface CustomRequest extends Request {
  user?: {
    _id: string;
    role: string;
    [key: string]: any;
  };
}

export const authMiddleware = async (req: CustomRequest, res: Response, next: NextFunction) => {
  const token = req.cookies?.access_token;
  if (!token) {
    return next(new ApiError(HTTP_STATUS.BAD_REQUEST, RESPONSE_MESSAGES.USERS.RE_LOGIN));
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET) as CustomJwtPayload;
    req.user = payload;
    next();
  } catch (error) {
    next(new ApiError(HTTP_STATUS.FORBIDDEN, RESPONSE_MESSAGES.USERS.INVALID_TOKEN));
  }
};

export const isAdminMiddleware = async (req: CustomRequest, res: Response, next: NextFunction) => {
  const role = req.user?.role;
  if (role !== Role.Admin) {
    return next(new ApiError(HTTP_STATUS.UNAUTHORIZED, RESPONSE_MESSAGES.USERS.UNAUTHORIZED_USER));
  }
  next();
};
