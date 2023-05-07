import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Binoculars, MagnifyingGlass } from '@phosphor-icons/react'
import { useQuery } from '@tanstack/react-query'
import { Card } from '@/components/Card'
import { RadioGroup } from '@/components/Forms/RadioGroup'
import { TextInput } from '@/components/Forms/TextInput'
import { RatingStart } from '@/components/RatingStars'
import { useDebounce } from '@/hooks/useDebounce'
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

interface Book {
  id: string
  author: string
  cover_url: string
  name: string
  ratings: {
    rate: number
  }[]
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const categoriesResponse = await fetch(
      'http://localhost:3000/api/categories',
    )
    const categories = (await categoriesResponse.json()) as Category[]

    const search = String(ctx.params?.search)
    const categoryId = String(ctx.params?.categoryId)

    const url = new URL('http://localhost:3000/api/books')

    if (categoryId !== 'all') {
      url.searchParams.set('categoryId', categoryId)
    }

    if (!!search) {
      url.searchParams.set('search', search)
    }

    const booksResponse = await fetch(url)
    const books = (await booksResponse.json()) as Book[]

    return {
      props: {
        categories,
        books,
      },
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error('Ocorreu o seguinte erro: ' + error.message)
    }
  }
}

export default function Explore({
  categories,
  books,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter()
  const categoryIdQuery = String(router.query?.categoryId || '')
  const searchQuery = String(router.query?.search || '')

  const [selectedCategory, setSelectedCategory] = useState(() => {
    if (categoryIdQuery) {
      return (
        categories.find((category) => category.id === categoryIdQuery)?.id || ''
      )
    }

    return ''
  })

  const [search, setSearch] = useState(searchQuery)
  const [debouncedSearch, setDebouncedSearch] = useState(searchQuery)

  const handleDebouncedSearchChange = useDebounce((value: string) =>
    setDebouncedSearch(value),
  )

  const { data } = useQuery<Book[]>({
    queryKey: ['books', selectedCategory, debouncedSearch],
    queryFn: async () => {
      const params = getQueryParams()
      const response = await api.get('/books', { params })
      return response.data
    },
    initialData: books,
  })

  function handleSelectedCategoryChange(value: string) {
    setSelectedCategory(value)
  }

  function handleSearchChange(event: ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value)
    handleDebouncedSearchChange(event.target.value)
  }

  function getQueryParams() {
    const params = new URLSearchParams()

    if (!!selectedCategory) {
      params.set('categoryId', selectedCategory)
    }

    if (!!debouncedSearch) {
      params.set('search', debouncedSearch)
    }

    return params
  }

  useEffect(() => {
    const params = getQueryParams()

    router.replace({
      pathname: '/explore',
      query: params.toString(),
    })
  }, [selectedCategory, debouncedSearch])

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
            defaultValue={selectedCategory}
            onValueChange={handleSelectedCategoryChange}
          >
            <RadioGroup.Item value="">Todos</RadioGroup.Item>

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
