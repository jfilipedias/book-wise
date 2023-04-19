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

  const book = await prisma.book.findUnique({
    include: {
      categories: {
        select: {
          category: {
            select: {
              name: true,
            },
          },
        },
      },
    },
    where: {
      id,
    },
  })

  if (!book) {
    return res.status(404).end()
  }

  return res.status(200).json(book)
}
