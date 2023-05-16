import { NextApiRequest, NextApiResponse } from 'next'
import { createRating } from './createRating'
import { getAllRatings } from './getAllRatings'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') {
    return await getAllRatings(req, res)
  }

  if (req.method === 'POST') {
    return await createRating(req, res)
  }

  return res.status(405).end()
}
