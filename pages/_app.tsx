import { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';

import { Head } from '../components';
import theme from '../styles/theme';

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  );
}