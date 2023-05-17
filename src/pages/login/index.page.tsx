import Head from 'next/head'
import Image from 'next/image'
import { LoginOptions } from '@/components/LoginOptions'
import { Container, Hero, LoginContainer, WelcomeContainer } from './styles'

export default function Login() {
  return (
    <>
      <Head>
        <title>Login | Book Wise</title>
      </Head>

      <Container>
        <Hero>
          <Image
            src="/images/hero.png"
            alt="Imagem de uma pessoa loira deitada sobre almofadas em um sofá enquanto lê um livro"
            quality={100}
            fill
          />
        </Hero>

        <LoginContainer>
          <WelcomeContainer>
            <h1>Boas Vindas!</h1>
            <span>Faça seu login ou acesse como visitante.</span>
          </WelcomeContainer>

          <LoginOptions />
        </LoginContainer>
      </Container>
    </>
  )
}
