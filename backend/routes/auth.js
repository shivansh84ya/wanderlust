import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth-middleware.js';
import {
  signUpWithEmail,
  signInWithEmailOrUsername,
  signOutUser,
  isLoggedIn,
} from '../controllers/auth-controller.js';
import passport from '../config/passport.js';

const router = Router();

//REGULAR EMAIL PASSWORD STRATEGY
router.post('/email-password/signup', signUpWithEmail);
router.post('/email-password/signin', signInWithEmailOrUsername);

//SIGN OUT
router.post('/signout', authMiddleware, signOutUser);

//CHECK USER STATUS
router.get('/check/:_id', isLoggedIn);

// Twitter auth route
router.get('/twitter', passport.authenticate('twitter'));

// Twitter callback route
router.get(
  '/twitter/callback',
  passport.authenticate('twitter', { failureRedirect: '/signin' }),
  (req, res) => {
    // Successful authentication
    res.redirect('/'); // Redirect to home or any other page
  }
);

export default router;
