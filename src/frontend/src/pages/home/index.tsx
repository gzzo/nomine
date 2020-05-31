import React from 'react'
import { useSubscription, gql, useQuery } from '@apollo/client'

import Page from 'components/page'

const HELLO_WORLD = gql`
  subscription OnHelloWorld {
    counter
  }
`

const QUERY = gql`
  query GetHello {
    hello
  }
`

function Home(): JSX.Element {
  const { data, loading, error } = useSubscription(HELLO_WORLD)
  // const { data, loading, error } = useQuery(QUERY)
  console.log(data, loading, error)
  if (loading || error) {
    return null
  }

  return <Page>{data.counter}</Page>
}

export default Home
