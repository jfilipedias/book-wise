import { ReactNode } from 'react'
import { LinkProps } from 'next/link'
import { LinkContainer } from './styles'

interface ActionLinkProps extends LinkProps {
  children: ReactNode | ReactNode[]
}

export function ActionLink({ children, ...props }: ActionLinkProps) {
  return <LinkContainer {...props}>{children}</LinkContainer>
}
