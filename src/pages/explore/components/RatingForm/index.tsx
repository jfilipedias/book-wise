import { useSession } from 'next-auth/react'
import { Check, Star, X } from '@phosphor-icons/react'
import { Avatar } from '@/components/Avatar'
import { TextArea } from '@/components/Forms/TextArea'
import {
  CancelButton,
  ConfirmButton,
  FormContainer,
  Heading,
  RadioGroupItem,
  RadioGroupRoot,
  SubmitContainer,
} from './styles'

export function RatingForm() {
  const { data: session } = useSession()

  return (
    <FormContainer>
      <Heading>
        <Avatar src={session?.user.avatar_url} alt={session?.user.name} />
        <strong>{session?.user.name}</strong>

        <RadioGroupRoot>
          {Array.from({ length: 5 }, (_, i) => i + 1).map((index) => (
            <RadioGroupItem key={index} value={String(index)}>
              <Star />
            </RadioGroupItem>
          ))}
        </RadioGroupRoot>
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
