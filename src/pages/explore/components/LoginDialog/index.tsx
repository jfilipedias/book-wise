import { ReactNode } from 'react'
import { Nunito_Sans } from 'next/font/google'
import Image from 'next/image'
import { X } from '@phosphor-icons/react'
import GoogleIcon from '@/assets/icons/google-icon.svg'
import GitHubIcon from '@/assets/icons/github-icon.svg'
import {
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
  LoginOptions,
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

          <LoginOptions>
            <button>
              <Image src={GoogleIcon} alt="Icone do Google" />
              Entrar com o Google
            </button>

            <button>
              <Image src={GitHubIcon} alt="Icone do GitHub" />
              Entrar com o GitHub
            </button>
          </LoginOptions>
        </DialogContent>
      </DialogPortal>
    </DialogRoot>
  )
}
