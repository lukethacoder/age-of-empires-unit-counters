// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import units from '../../data/units.json'
import { Unit } from '../../types'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Unit[]>
) {
  res.status(200).json(units)
}
