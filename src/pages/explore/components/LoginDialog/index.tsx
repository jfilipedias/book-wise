import { ReactNode } from 'react'
import { Nunito_Sans } from 'next/font/google'
import { X } from '@phosphor-icons/react'
import { LoginOptions } from '@/components/LoginOptions'
import {
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from './styles'

const nunitoSans = Nunito_Sans({ subsets: ['latin'], weight: ['400', '700'] })

interface LoginDialogProps {
  children: ReactNode | ReactNode[]
}

export function LoginDialog({ children }: LoginDialogProps) {
  return (
    <DialogRoot>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogPortal>
        <DialogOverlay />

        <DialogContent className={nunitoSans.className}>
          <DialogClose>
            <X />
          </DialogClose>

          <DialogTitle>Faça login para deixar sua avaliação</DialogTitle>

          <LoginOptions />
        </DialogContent>
      </DialogPortal>
    </DialogRoot>
  )
}
