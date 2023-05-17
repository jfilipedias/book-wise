import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import Head from 'next/head'
import { getServerSession } from 'next-auth'
import { User } from '@phosphor-icons/react'
import { UserContent } from '@/components/UserContent'
import { DefaultLayout } from '@/layout/DefaultLayout'
import { buildNextAuthOptions } from '@/pages/api/auth/[...nextauth].api'
import { Container, HeadingContainer } from './styles'

interface UserInfo {
  name: string
  createdAt: string
  avatarURL: string
  totalPages: number
  totalBooks: number
  totalAuthors: number
  mostReadCategory: string
}

interface Rating {
  id: string
  createdAt: string
  rate: number
  description: string
  book: {
    coverURL: string
    name: string
    author: string
  }
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

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  const userInfoResponse = await fetch(
    `http://localhost:3000/api/users/${session.user.id}`,
  )
  const userInfo = (await userInfoResponse.json()) as UserInfo

  const ratingsResponse = await fetch(
    `http://localhost:3000/api/ratings/user/${session.user.id}`,
  )
  const ratings = (await ratingsResponse.json()) as Rating[]

  return {
    props: {
      userInfo,
      ratings,
    },
  }
}

export default function Profile({
  userInfo,
  ratings,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <Head>
        <title>Perfil | Book Wise</title>
      </Head>

      <DefaultLayout>
        <Container>
          <HeadingContainer>
            <User />
            <h1>Perfil</h1>
          </HeadingContainer>

          <UserContent userInfo={userInfo} ratings={ratings} isProfile />
        </Container>
      </DefaultLayout>
    </>
  )
}
