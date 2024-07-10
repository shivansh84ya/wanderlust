import mongoose, { ConnectOptions } from 'mongoose';
import { MONGODB_URI } from './utils';

export default async function connectDB(): Promise<void> {
  try {
    await mongoose.connect(MONGODB_URI, {
      dbName: 'wanderlust',
    } as ConnectOptions);
    console.log(`Database connected: ${MONGODB_URI}`);
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
    } else {
      console.error('Unknown error');
    }
    process.exit(1);
  }

  const dbConnection = mongoose.connection;

  dbConnection.on('error', (err) => {
    console.error(`connection error: ${err}`);
  });
}
