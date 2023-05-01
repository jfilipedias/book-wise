import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/lib/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') {
    return res.status(405).end()
  }

  const search = req.query.search ? String(req.query.search) : ''
  const categoryId = req.query.categoryId ? String(req.query.categoryId) : ''

  const where = {
    AND: [{}],
  }

  if (search) {
    where.AND.push({
      OR: [
        {
          name: {
            contains: search,
          },
        },
        {
          author: {
            contains: search,
          },
        },
      ],
    })
  }

  if (categoryId) {
    where.AND.push({
      categories: {
        some: {
          category: {
            id: categoryId,
          },
        },
      },
    })
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
    },
    where,
  })

  return res.status(200).json(books)
}
