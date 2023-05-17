import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Binoculars, MagnifyingGlass } from '@phosphor-icons/react'
import { useQuery } from '@tanstack/react-query'
import { Card } from '@/components/Card'
import { TagGroup } from '@/components/TagGroup'
import { TextInput } from '@/components/Forms/TextInput'
import { RatingStars } from '@/components/RatingStars'
import { useDebounce } from '@/hooks/useDebounce'
import { DefaultLayout } from '@/layout/DefaultLayout'
import { api } from '@/lib/axios'
import { BookDrawer } from './components/BookDrawer'
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
  coverURL: string
  name: string
  averageRate: number
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
  const bookIdQuery = String(router.query?.bookId || '')

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

  const [selectedBook, setSelectedBook] = useState(bookIdQuery)

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

    if (!!selectedBook) {
      params.set('bookId', selectedBook)
    }

    return params
  }

  useEffect(() => {
    const params = getQueryParams()

    router.replace({
      pathname: '/explore',
      query: params.toString(),
    })
  }, [selectedCategory, debouncedSearch, selectedBook])

  return (
    <>
      <Head>
        <title>Explorar | Book Wise</title>
      </Head>

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

            <TagGroup.Root
              defaultValue={selectedCategory}
              onValueChange={handleSelectedCategoryChange}
            >
              <TagGroup.Item value="">Todos</TagGroup.Item>

              {categories.map((category) => (
                <TagGroup.Item key={category.id} value={category.id}>
                  {category.name}
                </TagGroup.Item>
              ))}
            </TagGroup.Root>
          </Header>

          <ListContainer>
            {data?.map((book) => (
              <BookDrawer
                key={book.id}
                bookId={book.id}
                defaultOpen={selectedBook === book.id}
                onOpen={() => setSelectedBook(book.id)}
                onClose={() => setSelectedBook('')}
              >
                <Card size="sm" as="button" css={{ cursor: 'pointer' }}>
                  <BookContainer>
                    <Image
                      src={book.coverURL}
                      alt={book.name}
                      width={108}
                      height={152}
                    />

                    <BookContent>
                      <BookInfos>
                        <strong>{book.name}</strong>
                        <span>{book.author}</span>
                      </BookInfos>

                      <RatingStars rate={book.averageRate} />
                    </BookContent>
                  </BookContainer>
                </Card>
              </BookDrawer>
            ))}
          </ListContainer>
        </Container>
      </DefaultLayout>
    </>
  )
}
