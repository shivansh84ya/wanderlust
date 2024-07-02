import { createClient, RedisClient } from 'redis';
import { REDIS_URL } from '../config/utils.js';

let redis: RedisClient | null = null;

export async function connectToRedis(): Promise<void> {
  try {
    if (REDIS_URL) {
      redis = await createClient({
        url: REDIS_URL,
        disableOfflineQueue: true,
      });

      redis.on('connect', () => {
        console.log('Redis Connected: ' + REDIS_URL);
      });

      redis.on('error', (error) => {
        console.error('Error connecting to Redis:', error.message);
      });
    } else {
      console.log('Redis not configured, cache disabled.');
    }
  } catch (error) {
    console.error('Error connecting to Redis:', error.message);
  }
}

export function getRedisClient(): RedisClient | null {
  return redis;
}
