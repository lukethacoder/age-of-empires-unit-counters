import NextLink from 'next/link'
import {
  Box,
  Container,
  Flex,
  Grid,
  Img,
  Link,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { IMAGE_BASE_PATH } from '../constants'
import { Unit } from '../types'

export function Card({
  unit,
  footerText,
}: {
  unit: Unit
  footerText?: string
}) {
  const cardColor = useColorModeValue('gray.100', 'gray.700')
  const footerColor = useColorModeValue('gray.300', 'gray.900')

  return (
    <NextLink href={`/${unit.slug.replace(/_/g, '-')}`} passHref>
      <Box
        as='a'
        backgroundColor={cardColor}
        borderRadius={['sm', null, 'md']}
        overflow='hidden'
        cursor='pointer'
        display='flex'
        flexDirection='column'
      >
        <Flex justifyContent='space-between'>
          <Flex px='4' py='2' w='100%' flexDirection='column'>
            <Flex align='center' justify='flex-start' w='100%'>
              <Text fontSize={['sm', null, 'md']}>{unit.name}</Text>
              {unit.is_unique && unit.civilization && (
                <Text
                  fontSize={['sm', null, 'md']}
                  color='gray.600'
                  fontWeight='semibold'
                >
                  &nbsp;- Unique to {unit.civilization.name}
                </Text>
              )}
            </Flex>
            {
              unit.units && unit.units.length > 1 ? (
                <Flex flexWrap='wrap'>
                  {
                    unit.units.map((item, key) => (
                      <Text
                        key={`${key}_${item.name}`}
                        fontSize={['xs', 'xs', 'sm']}
                        color='gray.500'
                        fontWeight='semibold'
                        whiteSpace='nowrap'
                      >
                        {key !== 0 && `/ `}{item.name}&nbsp;
                      </Text>
                    ))
                  }
                </Flex>
              ) : null
            }

          </Flex>
          {unit.units ? (
            <Flex>
              {unit.units.map((item) =>
                item.icon_url && item.icon_url !== '.png' ? (
                  <Box
                    key={item.id}
                    h={['56px', null, '64px']}
                    position='relative'
                    overflow='hidden'
                  >
                    <Img
                      w='100%'
                      h='100%'
                      objectFit='cover'
                      src={`${IMAGE_BASE_PATH}/${item.icon_url}`}
                    />
                  </Box>
                ) : null
              )}
            </Flex>
          ) : (
            unit.icon_url && (
              <Box h='240px' position='relative' overflow='hidden'>
                <Img
                  w='100%'
                  h='100%'
                  objectFit='cover'
                  src={`${IMAGE_BASE_PATH}/${unit.icon_url}`}
                />
              </Box>
            )
          )}
        </Flex>
        {footerText && (
          <Text
            backgroundColor={footerColor}
            fontSize={['xs', null, 'sm']}
            px='4'
            py='2'
          >
            {footerText}
          </Text>
        )}
      </Box>
    </NextLink>
  )
}
