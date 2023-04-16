import { Html, Head, Main, NextScript } from 'next/document'
import { getCssText } from '@/styles/stitches.config'

export default function Document() {
  return (
    <Html lang="pt-BR">
      <Head>
        <link rel="icon" type="image/x-icon" href="/favicon.svg" />
        <style
          id="stitches"
          dangerouslySetInnerHTML={{ __html: getCssText() }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
