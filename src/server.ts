import express from 'express';
import { connectRedis } from './utils/redisClient';
import rateLimitRoutes from './routes/rateLimiterRouter';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(rateLimitRoutes);

connectRedis().then(() => {
  app.listen(PORT, () => {
    console.log(`Rate Limiter API running on ${PORT}`);
  });
});
