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

  const booksOutput = books.map((book) => ({
    id: book.id,
    author: book.author,
    coverURL: book.cover_url,
    name: book.name,
    averageRate:
      book.ratings.reduce((acc, rating) => acc + rating.rate, 0) /
      book.ratings.length,
  }))

  return res.status(200).json(booksOutput)
}
