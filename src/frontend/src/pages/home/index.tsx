import React from 'react'
import { useSubscription, gql } from '@apollo/client'

import Page from 'components/page'

const HELLO_WORLD = gql`
  subscription OnHelloWorld {
    counter
  }
`

function Home(): JSX.Element {
  const { data, loading, error } = useSubscription(HELLO_WORLD)
  console.log(data, loading, error)
  if (loading || error) {
    return null
  }

  return <Page>{data.counter}</Page>
}

export default Home
