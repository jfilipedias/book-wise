import { ReactNode } from 'react'
import { LinkProps } from 'next/link'
import { useRouter } from 'next/router'
import { Indicator, LinkContainer } from './styles'

interface NavLinkProps extends LinkProps {
  children: ReactNode | ReactNode[]
}

export function NavLink({ children, ...props }: NavLinkProps) {
  const router = useRouter()
  const isActive = router.pathname === props.href

  return (
    <LinkContainer isActive={isActive} {...props}>
      {isActive && <Indicator />}
      {children}
    </LinkContainer>
  )
}
