import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/lib/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') {
    return res.status(405).end()
  }

  const books = await prisma.book.findMany({
    select: {
      id: true,
      author: true,
      cover_url: true,
      name: true,
      ratings: {
        select: {
          rate: true,
        },
      },
      _count: {
        select: {
          ratings: true,
        },
      },
    },
    orderBy: {
      ratings: {
        _count: 'desc',
      },
    },
  })

  return res.status(200).json(books)
}
