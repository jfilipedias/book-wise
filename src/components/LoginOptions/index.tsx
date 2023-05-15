import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { signIn } from 'next-auth/react'
import GoogleIcon from '@/assets/icons/google-icon.svg'
import GitHubIcon from '@/assets/icons/github-icon.svg'
import RocketIcon from '@/assets/icons/rocket-icon.svg'
import { Container } from './styles'

export function LoginOptions() {
  const router = useRouter()

  const callbackUrl = router.asPath

  function handleSignIn(provider: 'google' | 'github') {
    signIn(provider, { callbackUrl })
  }

  return (
    <Container>
      <button onClick={() => handleSignIn('google')}>
        <Image src={GoogleIcon} alt="Icone do Google" />
        Entrar com o Google
      </button>

      <button onClick={() => handleSignIn('github')}>
        <Image src={GitHubIcon} alt="Icone do GitHub" />
        Entrar com o GitHub
      </button>

      <Link href="/">
        <Image src={RocketIcon} alt="Icone de foguete" />
        Acessar como visitante
      </Link>
    </Container>
  )
}
