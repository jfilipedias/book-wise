import Image from 'next/image'
import { useQuery } from '@tanstack/react-query'
import { Avatar } from '@/components/Avatar'
import { Card } from '@/components/Card'
import { RatingStart } from '@/components/RatingStars'
import { api } from '@/lib/axios'
import { formatDateDistanceToNow, formatDateToString } from '@/utils/date'
import {
  BookInfos,
  ListContainer,
  RatingBody,
  RatingBodyContent,
  RatingContainer,
  RatingHeader,
  UserData,
} from './styles'

interface Rating {
  id: string
  rate: number
  description: string
  created_at: string
  book_id: string
  user_id: string
  book: {
    cover_url: string
    name: string
    author: string
  }
  user: {
    avatar_url: string
    name: string
  }
}

interface RatingsListProps {
  ratings: Rating[]
}

export function RatingsList({ ratings }: RatingsListProps) {
  const { data } = useQuery<Rating[]>({
    queryKey: ['ratings'],
    queryFn: async () => {
      const response = await api.get('/ratings')
      return response.data
    },
    initialData: ratings,
  })

  return (
    <ListContainer>
      {data?.map((rating) => (
        <Card key={rating.id}>
          <RatingContainer>
            <RatingHeader>
              <Avatar
                src={rating.user.avatar_url}
                alt={rating.user.name}
                width={40}
                height={40}
              />

              <UserData>
                <span>{rating.user.name}</span>
                <time
                  title={formatDateToString(new Date(rating.created_at))}
                  dateTime={new Date(rating.created_at).toISOString()}
                >
                  {formatDateDistanceToNow(new Date(rating.created_at))}
                </time>
              </UserData>

              <RatingStart rate={rating.rate} />
            </RatingHeader>

            <RatingBody>
              <Image
                src={rating.book.cover_url}
                alt={rating.book.name}
                width={108}
                height={152}
              />

              <RatingBodyContent>
                <BookInfos>
                  <strong>{rating.book.name}</strong>
                  <span>{rating.book.author}</span>
                </BookInfos>

                <p>{rating.description}</p>
              </RatingBodyContent>
            </RatingBody>
          </RatingContainer>
        </Card>
      ))}
    </ListContainer>
  )
}
