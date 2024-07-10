import { Request, Response, NextFunction } from 'express'; // Assuming Express is used
import { retrieveDataFromCache } from './cache-posts';
import { HTTP_STATUS } from './constants';

export const cacheHandler =
  (key: string) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const cachedData = await retrieveDataFromCache(key);
      if (cachedData) {
        console.log(`Getting cached data for key: ${key}`);
        return res.status(HTTP_STATUS.OK).json(cachedData);
      }
      next(); // Proceed to the route handler if data is not cached
    } catch (err: any) {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: err.message });
    }
  };
