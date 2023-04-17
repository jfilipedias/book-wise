import { ReactNode } from 'react'
import { LinkProps } from 'next/link'
import { useRouter } from 'next/router'
import { LinkContainer } from './styles'

interface NavLinkProps extends LinkProps {
  children: ReactNode | ReactNode[]
}

export function NavLink({ children, ...props }: NavLinkProps) {
  const router = useRouter()
  const isActive = router.pathname === props.href

  return <LinkContainer {...props}>{children}</LinkContainer>
}
