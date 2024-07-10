import { ACCESS_COOKIE_MAXAGE, NODE_ENV } from '../config/utils';

interface CookieOptions {
  httpOnly: boolean;
  sameSite: 'lax' | 'none';
  secure: boolean;
  maxAge: number;
}

export const cookieOptions: CookieOptions = {
  httpOnly: true,
  sameSite: NODE_ENV === 'Development' ? 'lax' : 'none',
  secure: NODE_ENV === 'Development' ? false : true,
  maxAge: ACCESS_COOKIE_MAXAGE,
};
