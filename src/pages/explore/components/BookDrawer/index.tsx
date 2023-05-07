import { X } from '@phosphor-icons/react'
import { DialogContentProps } from '@radix-ui/react-dialog'
import {
  DialogRoot,
  DialogTrigger,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogTitle,
  DialogClose,
  ContentContainer as BookInfos,
} from './styles'
import { ForwardRefRenderFunction, RefAttributes, forwardRef } from 'react'

interface Book {
  title: string
  author: string
  cover: string
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
  return (
    <DialogPortal>
      <DialogOverlay />

      <DialogContent ref={ref} {...props}>
        <DialogClose aria-label="Close">
          <X />
        </DialogClose>

        <BookInfos>
          <DialogTitle>{}</DialogTitle>
        </BookInfos>
      </DialogContent>
    </DialogPortal>
  )
}

export const BookDrawer = {
  Root: DialogRoot,
  Trigger: DialogTrigger,
  Content: forwardRef(BookDrawerContent),
}
