import { Router, Request, Response, NextFunction } from 'express';
import {
  changeUserRoleHandler,
  deleteUserHandler,
  getAllUserHandler,
} from '../controllers/user-controller.js';
import { isAdminMiddleware, authMiddleware } from '../middlewares/auth-middleware.js';

const router = Router();

// Get all users
router.get(
  '/',
  authMiddleware as RequestHandler,
  isAdminMiddleware as RequestHandler,
  getAllUserHandler as RequestHandler
);

// Change user role
router.patch(
  '/:userId',
  authMiddleware as RequestHandler,
  isAdminMiddleware as RequestHandler,
  changeUserRoleHandler as RequestHandler
);

// Delete a user
router.delete(
  '/:userId',
  authMiddleware as RequestHandler,
  isAdminMiddleware as RequestHandler,
  deleteUserHandler as RequestHandler
);

// Define RequestHandler type for middleware and controller functions
type RequestHandler = (req: Request, res: Response, next: NextFunction) => Promise<void> | void;

export default router;
