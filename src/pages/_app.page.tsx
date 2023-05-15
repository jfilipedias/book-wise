import type { AppProps } from 'next/app'
import { Nunito_Sans } from 'next/font/google'
import { SessionProvider } from 'next-auth/react'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { queryClient } from '@/lib/react-query'
import { globalStyles } from '@/styles/global'

const nunitoSans = Nunito_Sans({ subsets: ['latin'], weight: ['400', '700'] })

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <div className={nunitoSans.className}>
          <Component {...pageProps} />
        </div>

        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </SessionProvider>
  )
}
