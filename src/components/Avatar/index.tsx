import { User } from '@phosphor-icons/react'
import { AvatarImageProps } from '@radix-ui/react-avatar'
import { AvatarFallback, AvatarImage, AvatarRoot, Container } from './styles'

export type AvatarProps = AvatarImageProps

export function Avatar(props: AvatarProps) {
  return (
    <Container>
      <AvatarRoot>
        <AvatarImage {...props} />

        <AvatarFallback delayMs={600}>
          <User />
        </AvatarFallback>
      </AvatarRoot>
    </Container>
  )
}
