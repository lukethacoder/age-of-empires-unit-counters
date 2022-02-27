import NextHead from 'next/head';

export function Head({ title, description, favicon }: { title: string; description: string, favicon?: string }) {
  return (
    <NextHead>
      <title>{title}</title>
      <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />
      <meta name="description" content={description} />
      <meta property="og:title" content={title} key="title" />
      <meta property="og:description" content={description} />
      {/* <meta property="og:image" content="https://og-image.vercel.app/OnlySetups.png" /> */}
      <link rel="manifest" href="/manifest.json" />
      <link rel="icon" href={favicon ? favicon : "/favicon.ico"} />
      <meta name="theme-color" content="#000000" />
    </NextHead>
  );
}
