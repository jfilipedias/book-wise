import Image from 'next/image'
import { useQuery } from '@tanstack/react-query'
import { Card } from '@/components/Card'
import { RatingStars } from '@/components/RatingStars'
import { api } from '@/lib/axios'
import {
  BookInfos,
  ListContainer,
  RecommendationContainer,
  RecommendationContent,
} from './styles'

interface Recommendation {
  id: string
  author: string
  coverURL: string
  name: string
  averageRate: number
}

interface RecommendationsListProps {
  recommendations: Recommendation[]
}

export function RecommendationsList({
  recommendations,
}: RecommendationsListProps) {
  const { data } = useQuery<Recommendation[]>({
    queryKey: ['books', 'recommendation'],
    queryFn: async () => {
      const response = await api.get('/books/recommendation')
      return response.data
    },
    initialData: recommendations,
  })

  return (
    <ListContainer>
      {data?.slice(0, 4).map((recommendation) => (
        <Card key={recommendation.id} size="sm">
          <RecommendationContainer
            href={`/explore?bookId=${recommendation.id}`}
          >
            <Image
              src={recommendation.coverURL}
              alt={recommendation.name}
              width={64}
              height={94}
            />

            <RecommendationContent>
              <BookInfos>
                <strong>{recommendation.name}</strong>
                <span>{recommendation.author}</span>
              </BookInfos>

              <RatingStars rate={recommendation.averageRate} />
            </RecommendationContent>
          </RecommendationContainer>
        </Card>
      ))}
    </ListContainer>
  )
}
