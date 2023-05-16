import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Check, Star, X } from '@phosphor-icons/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Avatar } from '@/components/Avatar'
import { TextArea } from '@/components/Forms/TextArea'
import { api } from '@/lib/axios'
import {
  CancelButton,
  ConfirmButton,
  FormBody,
  FormContainer,
  FormErrors,
  FormHeading,
  RadioGroupItem,
  RadioGroupRoot,
  SubmitContainer,
} from './styles'

const createRatingSchema = z.object({
  rate: z
    .number()
    .positive({ message: 'Informe uma avaliação com um valor de 1 à 5.' })
    .max(5),
  description: z
    .string()
    .min(3, { message: 'Adicione uma descrição á sua avaliação.' }),
})

type CreateRatingFormData = z.infer<typeof createRatingSchema>

interface RatingFormProps {
  onClose: () => void
}

export function RatingForm({ onClose }: RatingFormProps) {
  const { data: session } = useSession()

  const router = useRouter()
  const bookId = String(router.query.bookId)

  const {
    control,
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<CreateRatingFormData>({
    resolver: zodResolver(createRatingSchema),
  })

  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async (data: CreateRatingFormData) => {
      await api.post('/ratings', {
        rate: data.rate,
        description: data.description,
        userId: session?.user.id,
        bookId,
      })

      onClose()
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['books', bookId] })
    },
  })

  async function handleCreateRating(data: CreateRatingFormData) {
    mutation.mutate(data)
  }

  return (
    <FormContainer onSubmit={handleSubmit(handleCreateRating)}>
      <FormHeading>
        <Avatar src={session?.user.avatar_url} alt={session?.user.name} />
        <strong>{session?.user.name}</strong>

        <Controller
          name="rate"
          control={control}
          defaultValue={0}
          render={({ field }) => (
            <RadioGroupRoot
              value={String(field.value)}
              onValueChange={(value: string) => field.onChange(Number(value))}
            >
              {Array.from({ length: 5 }, (_, i) => i + 1).map((index) => (
                <RadioGroupItem key={index} value={String(index)}>
                  <Star weight={field.value >= index ? 'fill' : 'regular'} />
                </RadioGroupItem>
              ))}
            </RadioGroupRoot>
          )}
        />
      </FormHeading>

      <FormBody>
        <TextArea
          placeholder="Escreva sua avaliação."
          {...register('description')}
        />

        {(errors.rate || errors.description) && (
          <FormErrors>
            <span>{errors.rate && errors.rate.message}</span>
            <span>{errors.description && errors.description.message}</span>
          </FormErrors>
        )}

        <SubmitContainer>
          <CancelButton type="button" title="Cancelar" onClick={onClose}>
            <X />
          </CancelButton>

          <ConfirmButton
            type="submit"
            title="Confirmar"
            disabled={isSubmitting}
          >
            <Check />
          </ConfirmButton>
        </SubmitContainer>
      </FormBody>
    </FormContainer>
  )
}
