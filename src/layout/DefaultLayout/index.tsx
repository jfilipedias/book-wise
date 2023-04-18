import { ReactNode } from 'react'
import { Sidebar } from '@/components/Sidebar'
import { Container } from './styles'

interface DefaultLayoutProps {
  children: ReactNode | ReactNode[]
}

export function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <Container>
      <Sidebar />
      <main>{children}</main>
    </Container>
  )
}
