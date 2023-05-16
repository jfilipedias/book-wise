import { InferGetServerSidePropsType } from 'next'
import Image from 'next/image'
import { CaretRight, ChartLineUp } from '@phosphor-icons/react'
import { ActionLink } from '@/components/ActionLink'
import { RatingStars } from '@/components/RatingStars'
import { DefaultLayout } from '@/layout/DefaultLayout'
import { formatDateDistanceToNow, formatDateToString } from '@/utils/date'
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
  UserRatingInfo,
  UserRatingInfoHeading,
  UserRatingBook,
} from './styles'
import { getServerSideProps } from '../index.page'

export function Home({
  userLastRating,
  ratings,
  recommendations,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <DefaultLayout>
      <Container>
        <Header>
          <ChartLineUp size={32} color="#50B2C0" /> <h1>Início</h1>
        </Header>

        <Content>
          <Feed>
            {!!userLastRating && (
              <FeedSection>
                <SectionTitle>
                  <h2>Sua última avaliação</h2>

                  <ActionLink href="/profile">
                    Ver todas <CaretRight />
                  </ActionLink>
                </SectionTitle>

                <UserRating>
                  <Image
                    src={userLastRating.book.coverURL}
                    alt={userLastRating.book.name}
                    width={108}
                    height={152}
                  />

                  <UserRatingInfo>
                    <UserRatingInfoHeading>
                      <time
                        title={formatDateToString(
                          new Date(userLastRating.createdAt),
                        )}
                        dateTime={new Date(
                          userLastRating.createdAt,
                        ).toISOString()}
                      >
                        {formatDateDistanceToNow(
                          new Date(userLastRating.createdAt),
                        )}
                      </time>

                      <RatingStars rate={userLastRating.rate} />
                    </UserRatingInfoHeading>

                    <UserRatingBook>
                      <strong>{userLastRating.book.name}</strong>
                      <span>{userLastRating.book.author}</span>
                    </UserRatingBook>

                    <span>{userLastRating.description}</span>
                  </UserRatingInfo>
                </UserRating>
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
