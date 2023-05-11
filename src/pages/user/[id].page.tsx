import { CaretLeft } from '@phosphor-icons/react'
import { UserContent } from '@/components/UserContent'
import { DefaultLayout } from '@/layout/DefaultLayout'
import { BackButton, Container } from './styled'

export default function User() {
  return (
    <DefaultLayout>
      <Container>
        <BackButton>
          <CaretLeft />
          Voltar
        </BackButton>

        <UserContent />
      </Container>
    </DefaultLayout>
  )
}
