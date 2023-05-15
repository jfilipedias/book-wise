import { useSession } from 'next-auth/react'
import { Check, X } from '@phosphor-icons/react'
import { Avatar } from '@/components/Avatar'
import { TextArea } from '@/components/Forms/TextArea'
import {
  CancelButton,
  ConfirmButton,
  FormContainer,
  Heading,
  SubmitContainer,
} from './styles'

export function RatingForm() {
  const { data: session } = useSession()

  return (
    <FormContainer>
      <Heading>
        <Avatar src={session?.user.avatar_url} alt={session?.user.name} />
        <strong>{session?.user.name}</strong>
      </Heading>

      <TextArea />

      <SubmitContainer>
        <CancelButton type="button" title="Cancelar">
          <X />
        </CancelButton>

        <ConfirmButton type="submit" title="Confirmar">
          <Check />
        </ConfirmButton>
      </SubmitContainer>
    </FormContainer>
  )
}
