import { GetServerSidePropsContext } from 'next'
import { getServerSession } from 'next-auth'
import { buildNextAuthOptions } from '@/pages/api/auth/[...nextauth].api'
import { Home } from './home/index.page'

interface Rating {
  id: string
  rate: number
  description: string
  createdAt: string
  book: {
    coverURL: string
    name: string
    author: string
  }
  user: {
    id: string
    avatarURL: string
    name: string
  }
}

interface Recommendation {
  id: string
  author: string
  coverURL: string
  name: string
  averageRate: number
}

export const getServerSideProps = async ({
  req,
  res,
}: GetServerSidePropsContext) => {
  const session = await getServerSession(
    req,
    res,
    buildNextAuthOptions(req, res),
  )

  console.log({ session })

  let userLastRating: Rating | null = null

  try {
    const ratingsResponse = await fetch('http://localhost:3000/api/ratings')
    const ratings = (await ratingsResponse.json()) as Rating[]

    const recommendationsResponse = await fetch(
      'http://localhost:3000/api/books/recommendation',
    )
    const recommendations =
      (await recommendationsResponse.json()) as Recommendation[]

    if (session) {
      const userRatingsResponse = await fetch(
        `http://localhost:3000/api/ratings/user/${session.user.id}`,
      )

      const userRatings = (await userRatingsResponse.json()) as Rating[]

      if (userRatings.length > 0) {
        userLastRating = userRatings[0]
      }
    }

    return {
      props: {
        userLastRating,
        ratings,
        recommendations,
      },
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error('Ocorreu o seguinte erro: ' + error.message)
    }
  }
}

export default Home
