import type { AppProps } from 'next/app'
import { Nunito_Sans } from 'next/font/google'
import { globalStyles } from '@/styles/global'

const nunitoSans = Nunito_Sans({ subsets: ['latin'], weight: ['400', '700'] })

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={nunitoSans.className}>
      <Component {...pageProps} />
    </div>
  )
}
