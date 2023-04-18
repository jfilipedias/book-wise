import Link from 'next/link'
import { CaretRight, ChartLineUp } from '@phosphor-icons/react'
import { ActionLink } from '@/components/ActionLink'
import { DefaultLayout } from '@/layout/DefaultLayout'
import {
  Content,
  Feed,
  Header,
  SideList,
  SectionTitle,
  Container,
} from './styles'

export function Home() {
  return (
    <DefaultLayout>
      <Container>
        <Header>
          <ChartLineUp size={32} color="#50B2C0" /> <h1>Início</h1>
        </Header>

        <Content>
          <Feed>
            <SectionTitle>
              <h2>Avaliações mais recentes</h2>
            </SectionTitle>

            <div></div>
          </Feed>

          <SideList>
            <SectionTitle>
              <h2>Livros populares</h2>

              <ActionLink href="/explore">
                Ver todos <CaretRight size={16} color="#8381D9" />
              </ActionLink>
            </SectionTitle>

            <div></div>
          </SideList>
        </Content>
      </Container>
    </DefaultLayout>
  )
}
