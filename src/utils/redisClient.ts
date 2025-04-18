import { createClient } from 'redis';
import dotenv from 'dotenv';

dotenv.config();
console.log(process.env.REDIS_URL)

export const redisClient = createClient({
    url : process.env.REDIS_URL,
    socket: {
      reconnectStrategy: retries => {
        console.log(`Reconnecting Redis... attempt ${retries}`);
        return Math.min(retries * 50, 2000); // Wait before retrying
      },
      keepAlive: 5000, // Keep socket alive
    },
});

redisClient.on('error', (err) => console.error('Redis Client Error', err));

export const connectRedis = async () => {
  if (!redisClient.isOpen) await redisClient.connect();
};
