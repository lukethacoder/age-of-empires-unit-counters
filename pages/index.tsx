import { useState } from 'react'
import type { NextPage } from 'next'
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  List,
  ListItem,
  Text,
} from '@chakra-ui/react'
import Fuse from 'fuse.js'

import UNIT_JSON from '../data/units.json'
import { Card, Head, Layout } from '../components'
import { Unit, UnitsByType } from '../types'
import { capitalize } from '../utils'

interface HomePageProps {
  data: Unit[]
}

const Home: NextPage<HomePageProps> = (props) => {
  const { data } = props

  const [query, updateQuery] = useState('')

  const fuse = new Fuse(data, {
    keys: ['name', 'units.name', 'civilization.name'],
    threshold: 0.4,
    includeScore: true,
  })

  const results = fuse.search(query)
  const unitResults = convertToUnitsByType(
    query ? results.map((unit) => unit.item) : data,
  )

  function onSearch(e: React.ChangeEvent<HTMLInputElement>) {
    updateQuery(e.currentTarget.value)
  }

  return (
    <>
      <Head
        title='Age of Empires: Unit Counters'
        description='Age of Empires: Unit Counters'
      />
      <Layout>
        <Box minHeight='100vh' display='flex' flexDir='column'>
          <div>
            <FormControl id='search-name' marginTop='2' marginBottom='4'>
              <FormLabel
                htmlFor='search'
                style={{
                  visibility: 'hidden',
                  height: '0px',
                  position: 'absolute',
                }}
              >
                Search
              </FormLabel>
              <Input
                id='search'
                type='text'
                value={query}
                placeholder='Search for a unit or civilization'
                onChange={onSearch}
              />
            </FormControl>

            <List>
              {Object.keys(unitResults).map((category) => {
                const units = unitResults[category as keyof UnitsByType]

                return units.length > 0 ? (
                  <ListItem key={category}>
                    <Text fontSize='sm' marginBottom='2' fontWeight='semibold'>
                      {capitalize(category).replace('_', ' ')}
                    </Text>

                    {unitResults[category as keyof UnitsByType].map(
                      (item: Unit) => (
                        <Box marginBottom='4' key={item.id}>
                          <Card unit={item} />
                        </Box>
                      )
                    )}
                  </ListItem>
                ) : null
              })}
            </List>
          </div>
        </Box>
      </Layout>
    </>
  )
}

const convertToUnitsByType = (data: Unit[]): UnitsByType => data.reduce(
  (acc: UnitsByType, item: Unit) => {
    const category = item.category as keyof UnitsByType

    return {
      ...acc,
      [category]: [...(acc[category] ? acc[category] : []), item].sort(
        (a, b) => {
          if (a.is_unique && !b.is_unique) {
            return 1
          } else if (!a.is_unique && b.is_unique) {
            return -1
          } else if (a.is_unique && b.is_unique) {
            if (a.name < b.name) return -1
            if (a.name > b.name) return 1
            return 0
          } else {
            if (a.name < b.name) return -1
            if (a.name > b.name) return 1
            return 0
          }
        }
      ),
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

export async function getStaticProps() {
  return {
    props: {
      data: UNIT_JSON,
    },
  }
}

export default Home
