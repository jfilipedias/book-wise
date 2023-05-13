import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/lib/prisma'

interface UserData {
  name: string
  createdAt: string
  avatarURL: string
  totalPages: BigInt | number
  totalBooks: BigInt | number
  totalAuthors: BigInt | number
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') {
    return res.status(405).end()
  }

  const id = String(req.query.id)

  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  })

  if (!user) {
    return res.status(404).json({ message: 'User does not exist.' })
  }

  const userInfo = await prisma.$queryRaw<UserData[]>`
    SELECT 
      U.name, 
      U.created_at AS createdAt,
      U.avatar_url AS avatarURL,
      SUM(total_pages) AS totalPages,
      COUNT(B.id) AS totalBooks,
      COUNT(DISTINCT B.author) AS totalAuthors
    FROM users AS U
    INNER JOIN ratings AS R
      ON R.user_id = U.id
    INNER JOIN books AS B 
      ON R.book_id = B.id
    WHERE U.id = ${user.id}
    GROUP BY U.name, U.created_at
    LIMIT 1
  `

  const mostReadCategories = await prisma.$queryRaw<{ name: string }[]>`
    SELECT 
      C.name as name, 
      COUNT(*) AS frequency
    FROM ratings AS R
    INNER JOIN books AS B 
      ON R.book_id = B.id
    INNER JOIN CategoriesOnBooks AS COB
      ON B.id = COB.book_id
    INNER JOIN categories AS C
      ON COB.categoryId = C.id
    WHERE R.user_id = ${user.id}
    GROUP BY C.name
    ORDER BY COUNT(*) DESC, B.total_pages DESC
    LIMIT 1
  `

  userInfo.forEach((row) => {
    row.totalPages = Number(row.totalPages)
    row.totalBooks = Number(row.totalBooks)
    row.totalAuthors = Number(row.totalAuthors)
  })

  const userInfoOutput = {
    name: userInfo[0].name,
    createdAt: userInfo[0].createdAt,
    avatarURL: userInfo[0].avatarURL,
    totalPages: userInfo[0].totalPages,
    totalBooks: userInfo[0].totalBooks,
    totalAuthors: userInfo[0].totalAuthors,
    mostReadCategory: mostReadCategories[0].name,
  }

  res.status(200).json(userInfoOutput)
}
