import { ReactNode, useState } from 'react'
import { Nunito_Sans } from 'next/font/google'
import Image from 'next/image'
import { BookOpen, BookmarkSimple, X } from '@phosphor-icons/react'
import { DialogContentProps } from '@radix-ui/react-dialog'
import { useQuery } from '@tanstack/react-query'
import { Avatar } from '@/components/Avatar'
import { Card } from '@/components/Card'
import { RatingStars } from '@/components/RatingStars'
import { api } from '@/lib/axios'
import { formatDateDistanceToNow, formatDateToString } from '@/utils/date'
import {
  DialogRoot,
  DialogTrigger,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogTitle,
  DialogClose,
  BookSection,
  BookContent,
  BookInfos,
  BookTitle,
  BookRating,
  BookAbout,
  BookStats,
  StatsContent,
  RatingsSection,
  RatingsTitle,
  RatingsList,
  RatingContainer,
  RatingHeader,
  UserData,
} from './styles'
import { LoginDialog } from '../LoginDialog'

const nunitoSans = Nunito_Sans({ subsets: ['latin'], weight: ['400', '700'] })

interface Book {
  name: string
  author: string
  coverURL: string
  totalPages: number
  categories: string[]
  ratings: {
    id: string
    rate: number
    description: string
    createdAt: string
    user: {
      id: string
      avatarURL: string
      name: string
    }
  }[]
}

interface BookDrawerContentProps extends DialogContentProps {
  bookId: string
  children: ReactNode | ReactNode[]
  defaultOpen?: boolean
  onOpen?: () => void
  onClose?: () => void
}

export function BookDrawer({
  bookId,
  children,
  defaultOpen,
  onOpen,
  onClose,
}: BookDrawerContentProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  const { data } = useQuery<Book>({
    queryKey: ['books', bookId],
    queryFn: async () => {
      const response = await api.get(`/books/${bookId}`)
      return response.data
    },
  })

  let averageRate = 0

  if (data) {
    averageRate =
      data?.ratings.reduce((acc, rating) => acc + rating.rate, 0) /
      data?.ratings.length
  }

  function handleOpenChange(open: boolean) {
    setIsOpen(open)

    if (typeof onClose !== 'undefined' && !open) {
      onClose()
    }

    if (typeof onOpen !== 'undefined' && open) {
      onOpen()
    }
  }

  return (
    <DialogRoot open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogPortal>
        <DialogOverlay />

        <DialogContent className={nunitoSans.className}>
          <DialogClose>
            <X aria-label="Close" />
          </DialogClose>

          <BookSection>
            <BookContent>
              <Image
                src={data?.coverURL || ''}
                alt={data?.name || ''}
                width={172}
                height={242}
              />

              <BookInfos>
                <BookTitle>
                  <DialogTitle asChild>
                    <h2>{data?.name}</h2>
                  </DialogTitle>

                  <span>{data?.author}</span>
                </BookTitle>

                <BookRating>
                  <RatingStars rate={averageRate} />
                  <span>
                    {data?.ratings.length === 1
                      ? '1 avaliação'
                      : `${data?.ratings.length} avaliações`}
                  </span>
                </BookRating>
              </BookInfos>
            </BookContent>

            <BookAbout>
              <BookStats>
                <BookmarkSimple />

                <StatsContent>
                  <span>Categoria</span>
                  <strong>{data?.categories.join(', ')}</strong>
                </StatsContent>
              </BookStats>

              <BookStats>
                <BookOpen />

                <StatsContent>
                  <span>Páginas</span>
                  <strong>{data?.totalPages}</strong>
                </StatsContent>
              </BookStats>
            </BookAbout>
          </BookSection>

          <RatingsSection>
            <RatingsTitle>
              <h3>Avaliações</h3>

              <LoginDialog>
                <button>Avaliar</button>
              </LoginDialog>
            </RatingsTitle>

            <RatingsList>
              {data?.ratings.map((rating) => (
                <Card key={rating.id}>
                  <RatingContainer href={`/user/${rating.user.id}`}>
                    <RatingHeader>
                      <Avatar
                        src={rating.user.avatarURL}
                        alt={rating.user.name}
                      />

                      <UserData>
                        <span>{rating.user.name}</span>
                        <time
                          title={formatDateToString(new Date(rating.createdAt))}
                          dateTime={new Date(rating.createdAt).toISOString()}
                        >
                          {formatDateDistanceToNow(new Date(rating.createdAt))}
                        </time>
                      </UserData>

                      <RatingStars rate={rating.rate} />
                    </RatingHeader>

                    <p>{rating.description}</p>
                  </RatingContainer>
                </Card>
              ))}
            </RatingsList>
          </RatingsSection>
        </DialogContent>
      </DialogPortal>
    </DialogRoot>
  )
}
