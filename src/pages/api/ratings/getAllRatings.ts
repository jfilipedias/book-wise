import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/lib/prisma'

export async function getAllRatings(req: NextApiRequest, res: NextApiResponse) {
  const ratings = await prisma.rating.findMany({
    include: {
      book: {
        select: {
          cover_url: true,
          name: true,
          author: true,
        },
      },
      user: {
        select: {
          id: true,
          avatar_url: true,
          name: true,
        },
      },
    },
    orderBy: {
      created_at: 'desc',
    },
  })

  const ratingsOutput = ratings.map((rating) => ({
    id: rating.id,
    createdAt: rating.created_at,
    rate: rating.rate,
    description: rating.description,
    book: {
      coverURL: rating.book.cover_url,
      name: rating.book.name,
      author: rating.book.author,
    },
    user: {
      id: rating.user.id,
      avatarURL: rating.user.avatar_url,
      name: rating.user.name,
    },
  }))

  return res.status(200).json(ratingsOutput)
}
