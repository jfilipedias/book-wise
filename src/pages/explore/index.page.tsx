import { Binoculars, MagnifyingGlass } from '@phosphor-icons/react'
import { DefaultLayout } from '@/layout/DefaultLayout'
import { TextInput } from '@/components/Forms/TextInput'
import { Container, Header } from './styles'

export default function Explore() {
  return (
    <DefaultLayout>
      <Container>
        <Header>
          <Binoculars size={32} color="#50B2C0" />

          <h1>Explorar</h1>

          <TextInput leftIcon={<MagnifyingGlass weight="bold" />} />
        </Header>
      </Container>
    </DefaultLayout>
  )
}
