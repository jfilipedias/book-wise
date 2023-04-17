import Image from 'next/image'
import { Binoculars, ChartLineUp, SignIn } from '@phosphor-icons/react'
import LogoImage from '@/assets/logo.svg'
import { NavLink } from '@/components/NavLink'
import { Container, Login, Navbar } from './styles'

export function Sidebar() {
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

      <Login href="/login">
        Fazer login <SignIn size={20} color="#50B2C0" />
      </Login>
    </Container>
  )
}
