import { Box, Flex, Heading, Img, List, ListItem, Text } from '@chakra-ui/react'
import { Card, Head, Layout } from '../components'
import UNIT_JSON from '../data/units.json'

import { IMAGE_BASE_PATH } from '../constants'
import { Unit, UnitCountersEntity } from '../types'
import { capitalize } from '../utils'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'

interface UnitPageProps {
  units: Unit[]
  unitId: string
}

const Unit: NextPage<UnitPageProps> = (props) => {
  const { units, unitId } = props
  const unit: Unit | undefined = units.find((item: Unit) => `${item.slug}` === unitId)

  return (
    <>
      <Head
        title={`${unit?.name} | Age of Empires: Unit Counters`}
        description={`Counters for ${unit?.name} | Age of Empires: Unit Counters`}
        favicon={`${IMAGE_BASE_PATH}/${unit?.icon_url || unit?.units?.[0].icon_url }`}
      />
      <Layout>
        <Heading pb='1'>{unit?.name}</Heading>
        <Heading fontSize='sm' pb='3'>
          {unit?.category && capitalize(unit.category).replace('_', ' ')}
          {unit?.is_unique && unit?.civilization && ` - Unique to ${unit?.civilization.name}`}
        </Heading>

        <Box>
          {unit?.units ? (
            <Flex>
              {unit.units.map((item) =>
                item.icon_url && item.icon_url !== '.png' ? (
                  <Box
                    key={item.id}
                    h='56px'
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
            unit?.icon_url && (
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
        </Box>

        <Box>
          <Text fontSize='md' pt='4' pb='2'>Countered by: </Text>

          {unit?.unit_counters ? (
            <List>
              {unit.unit_counters.map((item: UnitCountersEntity | null) => {
                if (!item || item === null) {
                  return null
                }
                const unit_counter = units.find(
                  (unit_item: Unit) => `${unit_item.id}` === `${item.unit_id}`
                )
                if (!unit_counter) {
                  return null
                }

                return (
                  <ListItem key={item.unit_id} marginBottom='4'>
                    <Card unit={unit_counter} footerText={item.reason ? item.reason : ''}/>
                  </ListItem>
                )
              })}
            </List>
          ) : (
            <Text>No counters for unit</Text>
          )}
        </Box>

        {/* <Img */}
      </Layout>
    
    </>
  )
}

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// the path has not been generated.
export const getStaticPaths: GetStaticPaths = async () => {
  // Get external data from the file system, API, DB, etc.
  const data = UNIT_JSON

  // Get the paths we want to pre-render based on posts
  const paths = data.map((unit) => {
    return {
      params: { id: `${unit.slug.replaceAll('_', '-')}` },
    }
  })

  // We'll pre-render only these paths at build time.
  // { fallback: blocking } will server-render pages
  // on-demand if the path doesn't exist.
  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  return {
    props: {
      units: UNIT_JSON,
      unitId: (params?.id as string).replaceAll('-', '_'),
    },
  }
}

export default Unit
