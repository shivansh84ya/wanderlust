import { getRedisClient } from '../services/redis';
import { REDIS_PREFIX } from './constants';

// Helper function to check if Redis is available
function isRedisEnabled(): boolean {
  return getRedisClient() !== null;
}

export async function retrieveDataFromCache(key: string): Promise<any | null> {
  if (!isRedisEnabled()) return null; // Skip cache if Redis is not available

  const cacheKey = `${REDIS_PREFIX}:${key}`;
  const cachedData = await getRedisClient().get(cacheKey);
  if (cachedData) {
    return JSON.parse(cachedData);
  }
  return null;
}

export async function storeDataInCache(key: string, data: any): Promise<void> {
  if (!isRedisEnabled()) return; // Skip cache if Redis is not available

  const cacheKey = `${REDIS_PREFIX}:${key}`;
  await getRedisClient().set(cacheKey, JSON.stringify(data));
}

export async function deleteDataFromCache(key: string): Promise<void> {
  if (!isRedisEnabled()) return; // Skip cache if Redis is not available

  const cacheKey = `${REDIS_PREFIX}:${key}`;
  await getRedisClient().del(cacheKey);
}
