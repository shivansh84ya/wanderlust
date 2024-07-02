import app from './app';
import connectDB from './config/db';
import { PORT } from './config/utils';
import { connectToRedis } from './services/redis';

const port: number = parseInt(PORT as string, 10) || 8080;

// Connect to redis
connectToRedis();

// Connect to MongoDB
connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error: Error) => {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1); // Exit process with failure
  });
