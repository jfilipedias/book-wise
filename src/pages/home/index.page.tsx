import Image from 'next/image'
import { Container, Hero, LoginContainer } from './styles'

export function Home() {
  return (
    <Container>
      <Hero>
        <Image
          src="/images/hero.png"
          alt="Imagem de uma pessoa loira deitada sobre almofadas em um sofá enquanto lê um livro"
          quality={100}
          fill
        />
      </Hero>

      <LoginContainer></LoginContainer>
    </Container>
  )
}
