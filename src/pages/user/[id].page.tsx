import { CaretLeft } from '@phosphor-icons/react'
import { UserContent } from '@/components/UserContent'
import { DefaultLayout } from '@/layout/DefaultLayout'
import { BackButton, Container } from './styled'
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'

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
  params,
}: GetServerSidePropsContext) => {
  const userId = String(params?.id)

  const userInfoResponse = await fetch(
    `http://localhost:3000/api/users/${userId}`,
  )
  const userInfo = (await userInfoResponse.json()) as UserInfo

  const ratingsResponse = await fetch(
    `http://localhost:3000/api/ratings/user/${userId}`,
  )
  const ratings = (await ratingsResponse.json()) as Rating[]

  return {
    props: {
      userInfo,
      ratings,
    },
  }
}

export default function User({
  userInfo,
  ratings,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <DefaultLayout>
      <Container>
        <BackButton>
          <CaretLeft />
          Voltar
        </BackButton>

        <UserContent userInfo={userInfo} ratings={ratings} />
      </Container>
    </DefaultLayout>
  )
}
