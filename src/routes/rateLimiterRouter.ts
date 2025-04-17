import express, { Request, Response } from 'express';
import { checkRateLimit } from '../services/rateLimiter';

const router = express.Router();

router.post('/rate-limit/check', async (req: Request, res: Response) => {
  const { identifier, resource } = req.body;

  if (!identifier || !resource) {
    res.status(400).json({ error: 'Missing identifier or resource.' });
    return 
  }

  try {
    const result = await checkRateLimit(identifier, resource);

    if (result.allowed) {
      res.status(200).json(result);
      return
    } else {
    res.status(429).json(result); // HTTP semantic: Too Many Requests
    return
    }
  } catch (err) {
    console.error('Rate check error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
