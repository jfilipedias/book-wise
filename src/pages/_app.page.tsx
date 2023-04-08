import type { AppProps } from 'next/app'
import { Nunito } from 'next/font/google'
import { globalStyles } from '@/styles/global'

const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-nunito',
})

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${nunito.variable}`}>
      <Component {...pageProps} />
    </div>
  )
}
