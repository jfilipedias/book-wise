import { User } from '@phosphor-icons/react'
import { AvatarImageProps } from '@radix-ui/react-avatar'
import { AvatarFallback, AvatarImage, AvatarRoot, Container } from './styles'

export interface AvatarProps extends AvatarImageProps {
  size?: 'sm' | 'md' | 'lg'
}

export function Avatar({ size = 'md', ...props }: AvatarProps) {
  return (
    <Container size={size}>
      <AvatarRoot size={size}>
        <AvatarImage {...props} />

        <AvatarFallback delayMs={600}>
          <User />
        </AvatarFallback>
      </AvatarRoot>
    </Container>
  )
}
