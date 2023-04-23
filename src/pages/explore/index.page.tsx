import { InferGetStaticPropsType } from 'next'
import { Binoculars, MagnifyingGlass, Radio } from '@phosphor-icons/react'
import { DefaultLayout } from '@/layout/DefaultLayout'
import { RadioGroup } from '@/components/Forms/RadioGroup'
import { TextInput } from '@/components/Forms/TextInput'
import { api } from '@/lib/axios'
import { Container, Header, SearchForm } from './styles'

interface Category {
  id: string
  name: string
}

export const getStaticProps = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/categories')
    const categories = (await response.json()) as Category[]

    return {
      props: {
        categories,
      },
    }
  } catch (error) {
    console.error("Couldn't get books categories.")

    if (error instanceof Error) {
      console.error('Ocorreu o seguinte erro: ' + error.message)
    }
  }
}

export default function Explore({
  categories,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <DefaultLayout>
      <Container>
        <SearchForm>
          <Header>
            <Binoculars size={32} color="#50B2C0" />

            <h1>Explorar</h1>

            <TextInput.Root>
              <TextInput.Input placeholder="Buscar livro ou autor" />
              <TextInput.Icon>
                <MagnifyingGlass />
              </TextInput.Icon>
            </TextInput.Root>
          </Header>

          <RadioGroup.Root defaultValue="todos">
            <RadioGroup.Item value="todos">Todos</RadioGroup.Item>
            {categories.map((category) => (
              <RadioGroup.Item key={category.id} value={category.id}>
                {category.name}
              </RadioGroup.Item>
            ))}
          </RadioGroup.Root>
        </SearchForm>
      </Container>
    </DefaultLayout>
  )
}
