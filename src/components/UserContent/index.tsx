import { ChangeEvent, useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import {
  BookOpen,
  BookmarkSimple,
  Books,
  MagnifyingGlass,
  UserList,
} from '@phosphor-icons/react'
import { useQuery } from '@tanstack/react-query'
import { Avatar } from '@/components/Avatar'
import { Card } from '@/components/Card'
import { TextInput } from '@/components/Forms/TextInput'
import { RatingStars } from '@/components/RatingStars'
import { useDebounce } from '@/hooks/useDebounce'
import { api } from '@/lib/axios'
import { formatDateDistanceToNow, formatDateToString } from '@/utils/date'
import {
  BookContainer,
  BookInfos,
  Container,
  RatingContainer,
  RatingContent,
  RatingsList,
  Separator,
  StatsContainer,
  UserInfo,
  UserPersonalData,
  UserRatings,
  UserStats,
} from './styles'

interface Rating {
  id: string
  createdAt: string
  rate: number
  description: string
  book: {
    coverURL: string
    name: string
    author: string
  }
}
interface UserContentProps {
  userInfo: {
    name: string
    createdAt: string
    avatarURL: string
    totalPages: number
    totalBooks: number
    totalAuthors: number
    mostReadCategory: string
  }
  ratings: Rating[]
}

export function UserContent({ userInfo, ratings }: UserContentProps) {
  const router = useRouter()

  const userId = String(router.query?.id)
  const searchQuery = String(router.query?.search || '')
  console.log({ userId })

  const [search, setSearch] = useState(searchQuery)
  const [debouncedSearch, setDebouncedSearch] = useState(searchQuery)

  const { data } = useQuery<Rating[]>({
    queryKey: ['ratings', 'user', userId, debouncedSearch],
    queryFn: async () => {
      const params = getQueryParams()
      const response = await api.get(`/ratings/user/${userId}`, { params })
      return response.data
    },
    initialData: ratings,
  })

  const handleDebouncedSearchChange = useDebounce((value: string) =>
    setDebouncedSearch(value),
  )

  function handleSearchChange(event: ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value)
    handleDebouncedSearchChange(event.target.value)
  }

  function getQueryParams() {
    const params = new URLSearchParams()

    if (!!debouncedSearch) {
      params.set('search', debouncedSearch)
    }

    return params
  }

  useEffect(() => {
    const params = getQueryParams()

    router.replace({
      pathname: `/user/${userId}`,
      query: params.toString(),
    })
  }, [debouncedSearch])

  return (
    <Container>
      <UserRatings>
        <TextInput.Root>
          <TextInput.Input
            placeholder="Buscar por livro ou autor avaliado"
            value={search}
            onChange={handleSearchChange}
          />
          <TextInput.Icon>
            <MagnifyingGlass />
          </TextInput.Icon>
        </TextInput.Root>

        <RatingsList>
          {data.map((rating) => (
            <RatingContainer key={rating.id}>
              <time
                title={formatDateToString(new Date(rating.createdAt))}
                dateTime={new Date(rating.createdAt).toISOString()}
              >
                {formatDateDistanceToNow(new Date(rating.createdAt))}
              </time>

              <Card>
                <RatingContent>
                  <BookContainer>
                    <Image
                      src={rating.book.coverURL}
                      alt={rating.book.name}
                      width={108}
                      height={152}
                    />

                    <BookInfos>
                      <strong>{rating.book.name}</strong>
                      <span>{rating.book.author}</span>
                      <RatingStars rate={rating.rate} />
                    </BookInfos>
                  </BookContainer>

                  <p>{rating.description}</p>
                </RatingContent>
              </Card>
            </RatingContainer>
          ))}
        </RatingsList>
      </UserRatings>

      <UserInfo>
        <UserPersonalData>
          <Avatar src={userInfo.avatarURL} alt={userInfo.name} size="lg" />

          <strong>{userInfo.name}</strong>
          <span>{`membro desde ${new Date(
            userInfo.createdAt,
          ).getFullYear()}`}</span>
        </UserPersonalData>

        <Separator />

        <UserStats>
          <StatsContainer>
            <BookOpen />

            <div>
              <strong>{userInfo.totalPages}</strong>
              <span>Páginas lidas</span>
            </div>
          </StatsContainer>

          <StatsContainer>
            <Books />

            <div>
              <strong>{userInfo.totalBooks}</strong>
              <span>Livros avaliados</span>
            </div>
          </StatsContainer>

          <StatsContainer>
            <UserList />

            <div>
              <strong>{userInfo.totalAuthors}</strong>
              <span>Autores lidos</span>
            </div>
          </StatsContainer>

          <StatsContainer>
            <BookmarkSimple />

            <div>
              <strong>{userInfo.mostReadCategory}</strong>
              <span>Categoria mais lida</span>
            </div>
          </StatsContainer>
        </UserStats>
      </UserInfo>
    </Container>
  )
}
