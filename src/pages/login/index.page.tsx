import Image from 'next/image'
import Link from 'next/link'
import GoogleIcon from '@/assets/icons/google-icon.svg'
import GitHubIcon from '@/assets/icons/github-icon.svg'
import RocketIcon from '@/assets/icons/rocket-icon.svg'
import {
  Container,
  Hero,
  LoginContainer,
  LoginOptions,
  WelcomeContainer,
} from './styles'

export default function Login() {
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

      <LoginContainer>
        <WelcomeContainer>
          <h1>Boas Vindas!</h1>
          <span>Faça seu login ou acesse como visitante.</span>
        </WelcomeContainer>

        <LoginOptions>
          <button>
            <Image src={GoogleIcon} alt="Icone do Google" />
            Entrar com o Google
          </button>

          <button>
            <Image src={GitHubIcon} alt="Icone do GitHub" />
            Entrar com o GitHub
          </button>

          <Link href="/">
            <Image src={RocketIcon} alt="Icone de foguete" />
            Acessar como visitante
          </Link>
        </LoginOptions>
      </LoginContainer>
    </Container>
  )
}
