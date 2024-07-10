import { RequestHandler, Request, Response, NextFunction } from 'express';

export const asyncHandler = (func: RequestHandler): RequestHandler => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await Promise.resolve(func(req, res, next));
    } catch (err) {
      next(err);
    }
  };
};
