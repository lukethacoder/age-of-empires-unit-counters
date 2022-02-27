import NextLink from 'next/link'
import { Box, List, ListItem, Text, useColorModeValue } from '@chakra-ui/react'
import { ReactNode } from 'react'

export function Layout({ children }: { children: ReactNode }) {
  const color = useColorModeValue('gray.300', 'gray.900')
  return (
    <Box minHeight='100vh' display='flex' flexDirection='column'>
      <Box as='header' width='100%' backgroundColor={color}>
        <Box as='nav' padding='4' maxWidth='container.lg' margin='auto'>
          <List display='flex' justifyContent='space-between'>
            <ListItem fontWeight='semibold'>
              <NextLink href='/'>Age of Empires Unit Counters</NextLink>
            </ListItem>
            <ListItem>
              <NextLink href='/'>Home</NextLink>
            </ListItem>
          </List>
        </Box>
      </Box>
      <Box
        as='main'
        width='100%'
        maxWidth='container.lg'
        margin='auto'
        padding='4'
        flex='1'
      >
        {children}
      </Box>
      <Box as='footer' width='100%' backgroundColor={color}>
        <Box
          maxWidth='container.lg'
          margin='auto'
          display='flex'
          px='4'
          py='8'
          justifyContent='space-between'
        >
          <Text>
            Made by&nbsp;
            <a
              href='https://github.com/lukethacoder'
              target='_blank'
              rel='noreferrer'
            >
              luke.
            </a>
          </Text>
          <Text>
            <a
              href='https://github.com/lukethacoder/aoe-unit-counters'
              target='_blank'
              rel='noreferrer'
            >
              Github
            </a>
          </Text>
        </Box>
      </Box>
    </Box>
  )
}
