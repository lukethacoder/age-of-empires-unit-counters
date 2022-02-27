import type { NextPage } from 'next'
import { Box, List, ListItem, Text } from '@chakra-ui/react'

import UNIT_JSON from '../data/units.json'
import { Card, Head, Layout } from '../components'
import { Unit } from '../types'
import { capitalize } from '../utils'

interface HomePageProps {
  unitsByCategory: {
    [key: string]: Unit[]
  }
}

const Home: NextPage<HomePageProps> = (props) => {
  const { unitsByCategory } = props

  return (
    <>
      <Head
        title="Age of Empires: Unit Counters"
        description="Age of Empires: Unit Counters"
      />
      <Layout>
        <Box minHeight='100vh' display='flex' flexDir='column'>
          <div>
            <Text fontSize='md' textAlign='center' marginTop='2' marginBottom='4'>
              Select a unit
            </Text>

            <List>
              {Object.keys(unitsByCategory).map((category) => {
                return (
                  <ListItem key={category}>
                    <Text fontSize='sm' marginBottom='2' fontWeight='semibold'>
                      {capitalize(category).replace('_', ' ')}
                    </Text>

                    {unitsByCategory[category].map((item: Unit) => (
                      <Box marginBottom='4' key={item.id}>
                        <Card unit={item} />
                      </Box>
                    ))}
                  </ListItem>
                )
              })}
            </List>
          </div>
        </Box>
      </Layout>
    </>
  )
}

export async function getStaticProps() {
  const unitsByCategory: { [key: string]: Unit[] } = UNIT_JSON.reduce(
    (acc: { [key: string]: Unit[] }, item: Unit) => {
      return {
        ...acc,
        [item.category]: [
          ...(acc[item.category] ? acc[item.category] : []),
          item,
        ].sort((a, b) => {
          if (a.is_unique && !b.is_unique) {
            return 1
          } else if (!a.is_unique && b.is_unique) {
            return -1
          } else if (a.is_unique && b.is_unique) {
            if (a.name < b.name) return -1;
            if (a.name > b.name) return 1;
            return 0
          } else {
            if (a.name < b.name) return -1;
            if (a.name > b.name) return 1;
            return 0;
          }
        }),
      }
    },
    {
      infantry: [],
      cavalry: [],
      archers: [],
      cavalry_archers: [],
      siege: [],
      naval: [],
    }
  )

  return {
    props: {
      unitsByCategory,
    },
  }
}

export default Home
