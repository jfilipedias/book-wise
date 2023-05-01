import { InferGetStaticPropsType } from 'next'
import Image from 'next/image'
import { ChangeEvent, useState } from 'react'
import { Binoculars, MagnifyingGlass } from '@phosphor-icons/react'
import { useQuery } from '@tanstack/react-query'
import { Card } from '@/components/Card'
import { RadioGroup } from '@/components/Forms/RadioGroup'
import { TextInput } from '@/components/Forms/TextInput'
import { RatingStart } from '@/components/RatingStars'
import { DefaultLayout } from '@/layout/DefaultLayout'
import { api } from '@/lib/axios'
import {
  BookContainer,
  BookContent,
  BookInfos,
  Container,
  Header,
  ListContainer,
  Search,
} from './styles'

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

interface Book {
  id: string
  author: string
  cover_url: string
  name: string
  ratings: {
    rate: number
  }[]
}

export default function Explore({
  categories,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const allCategoriesValue = 'Todos'

  const [selectedCategory, setSelectedCategory] = useState(allCategoriesValue)
  const [search, setSearch] = useState('')

  const { data } = useQuery<Book[]>(
    ['books', selectedCategory, search],
    async () => {
      const params = new URLSearchParams()

      if (selectedCategory !== allCategoriesValue) {
        params.append('categoryId', selectedCategory)
      }

      if (!!search) {
        params.append('search', search)
      }

      const response = await api.get('/books', { params })
      return response.data
    },
  )

  function handleSelectedCategoryChange(value: string) {
    setSelectedCategory(value)
  }

  function handleSearchChange(event: ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value)
  }

  return (
    <DefaultLayout>
      <Container>
        <Header>
          <Search>
            <Binoculars size={32} color="#50B2C0" />

            <h1>Explorar</h1>

            <TextInput.Root>
              <TextInput.Input
                placeholder="Buscar livro ou autor"
                value={search}
                onChange={handleSearchChange}
              />
              <TextInput.Icon>
                <MagnifyingGlass />
              </TextInput.Icon>
            </TextInput.Root>
          </Search>

          <RadioGroup.Root
            defaultValue={allCategoriesValue}
            onValueChange={handleSelectedCategoryChange}
          >
            <RadioGroup.Item value={allCategoriesValue}>
              {allCategoriesValue}
            </RadioGroup.Item>

            {categories.map((category) => (
              <RadioGroup.Item key={category.id} value={category.id}>
                {category.name}
              </RadioGroup.Item>
            ))}
          </RadioGroup.Root>
        </Header>

        <ListContainer>
          {data?.map((book) => (
            <Card key={book.id} size="sm">
              <BookContainer>
                <Image
                  src={book.cover_url}
                  alt={book.name}
                  width={108}
                  height={152}
                />

                <BookContent>
                  <BookInfos>
                    <strong>{book.name}</strong>
                    <span>{book.author}</span>
                  </BookInfos>

                  <RatingStart
                    rate={
                      book.ratings.reduce(
                        (acc, rating) => acc + rating.rate,
                        0,
                      ) / book.ratings.length
                    }
                  />
                </BookContent>
              </BookContainer>
            </Card>
          ))}
        </ListContainer>
      </Container>
    </DefaultLayout>
  )
}
