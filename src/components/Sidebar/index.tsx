import Image from 'next/image'
import { signOut, useSession } from 'next-auth/react'
import { Binoculars, ChartLineUp, SignIn, SignOut } from '@phosphor-icons/react'
import LogoImage from '@/assets/logo.svg'
import { NavLink } from '@/components/NavLink'
import { Avatar } from '@/components/Avatar'
import {
  Container,
  LoginLink,
  LogoutButton,
  Navbar,
  ProfileContainer,
  ProfileLink,
} from './styles'

export function Sidebar() {
  const { data: session } = useSession()

  return (
    <Container>
      <section>
        <Image src={LogoImage} alt="Logo do BookWise" width={128} height={32} />
        <Navbar>
          <NavLink href="/">
            <ChartLineUp size={24} /> Início
          </NavLink>

          <NavLink href="/explore">
            <Binoculars size={24} /> Explorar
          </NavLink>
        </Navbar>
      </section>

      {!!session ? (
        <ProfileContainer>
          <ProfileLink href="/profile">
            <Avatar
              src={session.user.avatar_url}
              alt={session.user.name}
              size="sm"
            />
            <span>{session.user.name.split(' ')[0]}</span>
          </ProfileLink>

          <LogoutButton title="Sair" onClick={() => signOut()}>
            <SignOut />
          </LogoutButton>
        </ProfileContainer>
      ) : (
        <LoginLink href="/login">
          Fazer login <SignIn size={20} color="#50B2C0" />
        </LoginLink>
      )}
    </Container>
  )
}
