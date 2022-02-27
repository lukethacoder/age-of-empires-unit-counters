import NextLink from 'next/link'
import { Box, List, ListItem, useColorModeValue } from '@chakra-ui/react'

export function Layout({ children }) {
  const color = useColorModeValue('gray.300', 'gray.900')
  return (
    <Box
      minHeight='100vh'
      display='flex'
      flexDirection='column'
    >
      <Box as='header' width='100%' backgroundColor={color}>
        <Box as='nav' padding='4' maxWidth='container.lg' margin='auto' >
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
      <Box as='main' width='100%' maxWidth='container.lg' margin='auto' padding='4' flex='1'>
        {children}
      </Box>
      <Box as='footer' width='100%' backgroundColor={color} display='flex' justifyContent='center' py='4'>
        Made by&nbsp;
        <a href='https://github.com/lukethacoder' target='_blank'>
          luke.
        </a>
      </Box>
    </Box>
  )
}
