import { InferGetServerSidePropsType } from 'next'
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
import { debounce } from '@/utils/debounce'
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

interface Book {
  id: string
  author: string
  cover_url: string
  name: string
  ratings: {
    rate: number
  }[]
}

export const getServerSideProps = async () => {
  try {
    const categoriesResponse = await fetch(
      'http://localhost:3000/api/categories',
    )
    const categories = (await categoriesResponse.json()) as Category[]

    const booksResponse = await fetch('http://localhost:3000/api/books')
    const books = (await booksResponse.json()) as Book[]

    return {
      props: {
        categories,
        books,
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
  books,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const allCategoriesValue = 'Todos'

  const [selectedCategory, setSelectedCategory] = useState(allCategoriesValue)
  const [search, setSearch] = useState('')

  const { data } = useQuery<Book[]>({
    queryKey: ['books', selectedCategory, search],
    queryFn: () => {
      const debouncedFetchBooks = debounce(fetchBooks)
      return debouncedFetchBooks()
    },
    initialData: books,
  })

  async function fetchBooks(): Promise<Book[]> {
    const params = new URLSearchParams()

    if (selectedCategory !== allCategoriesValue) {
      params.append('categoryId', selectedCategory)
    }

    if (!!search) {
      params.append('search', search)
    }

    const response = await api.get('/books', { params })
    return response.data
  }

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
