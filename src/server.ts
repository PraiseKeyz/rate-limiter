import express from 'express';
import rateLimitRoutes from './routes/rateLimiterRouter';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(rateLimitRoutes);

app.listen(PORT, () => {
  console.log(`Rate Limiter API running on ${PORT}`);
});
