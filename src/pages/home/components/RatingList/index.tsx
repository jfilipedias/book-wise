import Image from 'next/image'
import { useQuery } from '@tanstack/react-query'
import { Avatar } from '@/components/Avatar'
import { Card } from '@/components/Card'
import { api } from '@/lib/axios'
import { Container } from './styles'

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

export function RatingList() {
  const { data } = useQuery<Rating[]>(['ratings'], async () => {
    const response = await api.get('/ratings')
    return response.data
  })

  return (
    <Container>
      {data?.map((rating) => (
        <Card key={rating.id}>
          <div>
            <div>
              <Avatar
                src={rating.user.avatar_url}
                alt={rating.user.name}
                width={40}
                height={40}
              />
              <div>
                <span>{rating.user.name}</span>
                <span>{rating.created_at}</span>
              </div>
            </div>

            <span>{rating.rate}</span>
          </div>

          <div></div>
        </Card>
      ))}
    </Container>
  )
}
