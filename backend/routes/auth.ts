import { Router, Request, Response, NextFunction } from 'express';
import { authMiddleware } from '../middlewares/auth-middleware.js';
import {
  signUpWithEmail,
  signInWithEmailOrUsername,
  signOutUser,
  isLoggedIn,
} from '../controllers/auth-controller.js';

const router = Router();

//REGULAR EMAIL PASSWORD STRATEGY
router.post('/email-password/signup', signUpWithEmail as RequestHandler);
router.post('/email-password/signin', signInWithEmailOrUsername as RequestHandler);

//SIGN OUT
router.post('/signout', authMiddleware as RequestHandler, signOutUser as RequestHandler);

//CHECK USER STATUS
router.get('/check/:_id', isLoggedIn as RequestHandler);

export default router;

// Define RequestHandler type for middleware and controller functions
type RequestHandler = (req: Request, res: Response, next: NextFunction) => Promise<void> | void;
