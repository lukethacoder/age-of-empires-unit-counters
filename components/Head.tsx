import NextHead from 'next/head'

export function Head({
  title,
  description,
  favicon,
}: {
  title: string
  description: string
  favicon?: string
}) {
  return (
    <NextHead>
      <title>{title}</title>
      <meta
        name='viewport'
        content='width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no'
      />
      <meta name='description' content={description} />
      <meta property='og:title' content={title} key='title' />
      <meta property='og:description' content={description} />
      <link rel='manifest' href='/manifest.json' />
      <link rel='icon' href={favicon ? favicon : '/favicon.ico'} />
      <link
        rel='apple-touch-icon'
        sizes='180x180'
        href='/apple-touch-icon.png'
      />
      <link
        rel='icon'
        type='image/png'
        sizes='32x32'
        href='/favicon-32x32.png'
      />
      <link
        rel='icon'
        type='image/png'
        sizes='16x16'
        href='/favicon-16x16.png'
      />
      <meta name='theme-color' content='#000000' />
    </NextHead>
  )
}
