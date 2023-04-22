import { ComponentProps, ElementRef, ReactElement, forwardRef } from 'react'
import { FieldContainer, Input } from './styles'

export interface TextInputProps extends ComponentProps<typeof Input> {
  leftIcon?: ReactElement
}

export const TextInput = forwardRef<ElementRef<typeof Input>, TextInputProps>(
  function TextInput({ leftIcon, ...props }, ref) {
    return (
      <FieldContainer>
        <Input {...props} ref={ref} />
        {!!leftIcon && leftIcon}
      </FieldContainer>
    )
  },
)
