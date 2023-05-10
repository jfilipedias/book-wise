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
      ratings: {
        select: {
          id: true,
          created_at: true,
          description: true,
          rate: true,
          user: {
            select: {
              avatar_url: true,
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

  const bookOutput = {
    id: book.id,
    name: book.name,
    author: book.author,
    summary: book.summary,
    coverURL: book.cover_url,
    totalPages: book.total_pages,
    createdAt: book.created_at,
    categories: book.categories.map((category) => category.category.name),
    ratings: book.ratings.map((rating) => ({
      id: rating.id,
      createdAt: rating.created_at,
      description: rating.description,
      rate: rating.rate,
      user: {
        avatarURL: rating.user.avatar_url,
        name: rating.user.name,
      },
    })),
  }

  return res.status(200).json(bookOutput)
}
