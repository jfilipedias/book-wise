import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/lib/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') {
    return res.status(405).end()
  }

  const id = String(req.query.id)

  const ratings = await prisma.rating.findMany({
    where: {
      book_id: id,
    },
  })

  if (!ratings) {
    return res.status(204).end()
  }

  return res.status(200).json(ratings)
}
