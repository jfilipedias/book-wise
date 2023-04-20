import { Star } from '@phosphor-icons/react'
import { Container } from './styles'

export function RatingStart({ rate }: { rate: number }) {
  return (
    <Container>
      {Array.from({ length: 5 }, (_, i) => i + 1).map((index) => (
        <Star
          key={index}
          size={16}
          color="#8381D9"
          weight={rate >= index ? 'fill' : 'regular'}
        />
      ))}
    </Container>
  )
}
