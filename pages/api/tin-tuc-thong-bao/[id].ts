import type { NextApiRequest, NextApiResponse } from 'next';
import SAMPLE_NEWS from '../../../lib/newsData';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const item = SAMPLE_NEWS.find(n => n.id === String(id));

  if (!item) {
    return res.status(404).json({ error: 'Not found' });
  }

  // Simulate network latency for local dev
  setTimeout(() => {
    res.status(200).json(item);
  }, 250);
}
