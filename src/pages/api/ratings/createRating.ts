import { NextApiRequest, NextApiResponse } from 'next'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'

const createRatingBodySchema = z.object({
  rate: z.number().positive().max(5),
  description: z.string().min(3),
  userId: z.string(),
  bookId: z.string(),
})

export async function createRating(req: NextApiRequest, res: NextApiResponse) {
  const { rate, description, userId, bookId } = createRatingBodySchema.parse(
    req.body,
  )

  await prisma.rating.create({
    data: {
      rate,
      description,
      created_at: new Date(),
      user_id: userId,
      book_id: bookId,
    },
  })

  return res.status(201).end()
}
