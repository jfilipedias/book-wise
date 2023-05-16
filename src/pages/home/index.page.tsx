import { CaretRight, ChartLineUp } from '@phosphor-icons/react'
import { useSession } from 'next-auth/react'
import { ActionLink } from '@/components/ActionLink'
import { DefaultLayout } from '@/layout/DefaultLayout'
import { RatingsList } from './components/RatingList'
import { RecommendationsList } from './components/RecommendationList'
import {
  Content,
  Feed,
  Header,
  SideList,
  SectionTitle,
  Container,
  FeedSection,
  UserRating,
} from './styles'
import { InferGetServerSidePropsType } from 'next'
import { RatingContainer } from '../../components/UserContent/styles'

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

export const getServerSideProps = async () => {
  try {
    const ratingsResponse = await fetch('http://localhost:3000/api/ratings')
    const ratings = (await ratingsResponse.json()) as Rating[]

    const recommendationsResponse = await fetch(
      'http://localhost:3000/api/books/recommendation',
    )
    const recommendations =
      (await recommendationsResponse.json()) as Recommendation[]

    return {
      props: {
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

export function Home({
  ratings,
  recommendations,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const session = useSession()

  return (
    <DefaultLayout>
      <Container>
        <Header>
          <ChartLineUp size={32} color="#50B2C0" /> <h1>Início</h1>
        </Header>

        <Content>
          <Feed>
            {!!session && (
              <FeedSection>
                <SectionTitle>
                  <h2>Sua última avaliação</h2>

                  <ActionLink href="/profile">
                    Ver todas <CaretRight />
                  </ActionLink>
                </SectionTitle>

                <UserRating></UserRating>
              </FeedSection>
            )}
            <FeedSection>
              <SectionTitle>
                <h2>Avaliações mais recentes</h2>
              </SectionTitle>

              <RatingsList ratings={ratings} />
            </FeedSection>
          </Feed>

          <SideList>
            <SectionTitle>
              <h2>Livros populares</h2>

              <ActionLink href="/explore">
                Ver todos <CaretRight />
              </ActionLink>
            </SectionTitle>

            <RecommendationsList recommendations={recommendations} />
          </SideList>
        </Content>
      </Container>
    </DefaultLayout>
  )
}
