import dotenv from 'dotenv';
dotenv.config();

const PORT: string | undefined = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1/wanderlust';
const REDIS_URL: string | undefined = process.env.REDIS_URL;
const ACCESS_COOKIE_MAXAGE: string | undefined = process.env.ACCESS_COOKIE_MAXAGE;
const ACCESS_TOKEN_EXPIRES_IN: string | undefined = process.env.ACCESS_TOKEN_EXPIRES_IN;
const REFRESH_COOKIE_MAXAGE: string | undefined = process.env.REFRESH_COOKIE_MAXAGE;
const REFRESH_TOKEN_EXPIRES_IN: string | undefined = process.env.REFRESH_TOKEN_EXPIRES_IN;
const JWT_SECRET = process.env.JWT_SECRET || 'shiv123';
const FRONTEND_URL: string | undefined = process.env.FRONTEND_URL;
const NODE_ENV: string | undefined = process.env.NODE_ENV;

if (
  !PORT ||
  !MONGODB_URI ||
  !REDIS_URL ||
  !ACCESS_COOKIE_MAXAGE ||
  !ACCESS_TOKEN_EXPIRES_IN ||
  !REFRESH_COOKIE_MAXAGE ||
  !REFRESH_TOKEN_EXPIRES_IN ||
  !JWT_SECRET ||
  !FRONTEND_URL ||
  !NODE_ENV
) {
  throw new Error('One or more environment variables are missing or invalid');
}

export {
  MONGODB_URI,
  PORT,
  REDIS_URL,
  ACCESS_COOKIE_MAXAGE,
  ACCESS_TOKEN_EXPIRES_IN,
  REFRESH_COOKIE_MAXAGE,
  REFRESH_TOKEN_EXPIRES_IN,
  JWT_SECRET,
  FRONTEND_URL,
  NODE_ENV,
};
