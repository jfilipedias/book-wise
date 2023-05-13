import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/lib/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') {
    return res.status(405).end()
  }

  const userId = String(req.query.id)
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  })

  if (!user) {
    return res.status(404).json({ message: 'User does not exist.' })
  }

  const search = req.query.search ? String(req.query.search) : ''

  const where = {
    AND: [{}],
  }

  where.AND.push({ user_id: userId })

  if (search) {
    where.AND.push({
      book: {
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
      },
    })
  }

  const ratings = await prisma.rating.findMany({
    include: {
      book: {
        select: {
          cover_url: true,
          name: true,
          author: true,
        },
      },
    },
    where,
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
  }))

  return res.status(200).json(ratingsOutput)
}
