import passport from 'passport';
import { Strategy as TwitterStrategy } from 'passport-twitter';
import { TWITTER_CONSUMER_KEY, TWITTER_CONSUMER_SECRET, TWITTER_CALLBACK_URL } from './config';

passport.use(
  new TwitterStrategy(
    {
      consumerKey: TWITTER_CONSUMER_KEY,
      consumerSecret: TWITTER_CONSUMER_SECRET,
      callbackURL: TWITTER_CALLBACK_URL,
    },
    // (token, tokenSecret, profile, done) => {
      // Handle user profile and token here
      // Find or create a user in your database
      // done(error, user)
    // }/
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

export default passport;
