import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application, Request, Response, NextFunction } from 'express';
import { FRONTEND_URL } from './config/utils';
import authRouter from './routes/auth';
import postsRouter from './routes/posts';
import userRouter from './routes/user';
import errorMiddleware from './middlewares/error-middleware';

const app: Application = express();

app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compression());

// API routes
app.use('/api/posts', postsRouter);
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Yay!! Backend of wanderlust app is now accessible');
});

app.all('*', (req: Request, res: Response) => {
  res.status(404).json({
    status: 404,
    success: false,
    message: '!Oops page not found',
  });
});

app.use(errorMiddleware);

export default app;
