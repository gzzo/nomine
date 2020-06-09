import { ApolloClient, HttpLink, InMemoryCache, split } from '@apollo/client'
import { WebSocketLink } from '@apollo/link-ws'
import { getMainDefinition } from '@apollo/client/utilities'

const httpLink = new HttpLink({
  uri: '/graphql/',
})

const wsLink = new WebSocketLink({
  uri: `ws://127.0.0.1:5000/graphql/`,
  options: {
    reconnect: true,
  },
})

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    )
  },
  // See https://github.com/apollographql/apollo-client/issues/6333
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  wsLink,
  httpLink
)

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: splitLink,
})
