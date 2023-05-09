import { ForwardRefRenderFunction, forwardRef, useEffect } from 'react'
import { Nunito_Sans } from 'next/font/google'
import Image from 'next/image'
import { BookOpen, BookmarkSimple, X } from '@phosphor-icons/react'
import { DialogContentProps } from '@radix-ui/react-dialog'
import { useQuery } from '@tanstack/react-query'
import { RatingStars } from '@/components/RatingStars'
import { api } from '@/lib/axios'
import {
  DialogRoot,
  DialogTrigger,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogTitle,
  DialogClose,
  BookContainer,
  BookContent,
  BookInfos,
  BookTitle,
  BookRating,
  BookAbout,
  BookStats,
  StatsContent,
} from './styles'

const nunitoSans = Nunito_Sans({ subsets: ['latin'], weight: ['400', '700'] })

interface Book {
  name: string
  author: string
  cover_url: string
  total_pages: number
  categories: {
    category: {
      name: string
    }
  }[]
  ratings: {
    id: string
    rate: number
    description: string
    created_at: string
    user: {
      avatar_url: string
      name: string
    }
  }[]
}

interface BookDrawerContentProps extends DialogContentProps {
  bookId: string
}

const BookDrawerContent: ForwardRefRenderFunction<
  HTMLDivElement,
  BookDrawerContentProps
> = ({ bookId, ...props }: BookDrawerContentProps, ref) => {
  const { data } = useQuery<Book>({
    queryKey: ['books', bookId],
    queryFn: async () => {
      const response = await api.get(`/books/${bookId}`)
      return response.data
    },
  })

  return (
    <DialogPortal>
      <DialogOverlay />

      <DialogContent ref={ref} {...props} className={nunitoSans.className}>
        <DialogClose>
          <X aria-label="Close" />
        </DialogClose>

        <BookContainer>
          <BookContent>
            <Image
              src={data?.cover_url || ''}
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
                <RatingStars rate={4} />
                <span>4 avaliações</span>
              </BookRating>
            </BookInfos>
          </BookContent>

          <BookAbout>
            <BookStats>
              <BookmarkSimple />

              <StatsContent>
                <span>Categoria</span>
                <strong>Computação, educação</strong>
              </StatsContent>
            </BookStats>

            <BookStats>
              <BookOpen />

              <StatsContent>
                <span>Páginas</span>
                <strong>160</strong>
              </StatsContent>
            </BookStats>
          </BookAbout>
        </BookContainer>
      </DialogContent>
    </DialogPortal>
  )
}

export const BookDrawer = {
  Root: DialogRoot,
  Trigger: DialogTrigger,
  Content: forwardRef(BookDrawerContent),
}
