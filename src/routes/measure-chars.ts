import { Router, Request, Response } from 'express';
import MeasureCharsService from '../services/measureCharsService';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.send('Hello measure chars');
});

router.post('/', async (req: Request, res: Response) => {
  const data = await MeasureCharsService.measureChars(req.body);
  res.json({
    message: 'Hello measure chars',
    data,
  });
});

export default router;