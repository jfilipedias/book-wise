import { ChangeEvent, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { MagnifyingGlass } from '@phosphor-icons/react'
import { TextInput } from '@/components/Forms/TextInput'
import { useDebounce } from '@/hooks/useDebounce'
import { Container, RatingsList, UserInfo, UserRatings } from './styles'

export function UserContent() {
  const router = useRouter()

  const searchQuery = String(router.query?.search || '')
  const [search, setSearch] = useState(searchQuery)
  const [debouncedSearch, setDebouncedSearch] = useState(searchQuery)

  const handleDebouncedSearchChange = useDebounce((value: string) =>
    setDebouncedSearch(value),
  )

  function handleSearchChange(event: ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value)
    handleDebouncedSearchChange(event.target.value)
  }

  useEffect(() => {
    const params = new URLSearchParams()

    if (!!debouncedSearch) {
      params.set('search', debouncedSearch)
    }

    router.replace({
      pathname: `/user/${123}`,
      query: params.toString(),
    })
  }, [debouncedSearch])

  return (
    <Container>
      <UserRatings>
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

        <RatingsList></RatingsList>
      </UserRatings>

      <UserInfo></UserInfo>
    </Container>
  )
}
