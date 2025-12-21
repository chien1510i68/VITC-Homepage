import type { NextApiRequest, NextApiResponse } from 'next'
import SAMPLE_THU_VIEN from '../../../lib/thuVienData'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Content-Type', 'application/json')
  res.status(200).json({ items: SAMPLE_THU_VIEN })
}
