import { Star } from '@phosphor-icons/react'
import { Container } from './styles'

export function RatingStars({ rate }: { rate: number }) {
  return (
    <Container>
      {Array.from({ length: 5 }, (_, i) => i + 1).map((index) => (
        <Star key={index} weight={rate >= index ? 'fill' : 'regular'} />
      ))}
    </Container>
  )
}
