import { ApolloClient, ApolloLink, HttpLink, from, InMemoryCache, QueryOptions, MutationOptions } from 'apollo-boost'
import { STORAGE_KEYS } from '@constants'
import CONFIG from '@config'

const { apollo: { host, port } } = CONFIG

const httpLink = new HttpLink({
  uri: `http://${host}:${port}/graphql`,
  headers: {

  }
})

const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {} }: any) => ({
    headers: {
      ...headers,
      authorization: `Bearer ${localStorage.getItem(STORAGE_KEYS.TOKEN)}` || null,
    }
  }));

  return forward(operation);
})

const client = new ApolloClient({
  link: from([authMiddleware, httpLink]),
  cache: new InMemoryCache()
})

export const queryGQL = async ({
  query,
  variables = {},
}: QueryOptions) => {
  try {
    const { data } = await client.query({ query, variables, fetchPolicy: 'no-cache' })
    return data
  } catch (error) {
    console.error(error)
  }
}

export const mutateGQL = async ({
  mutation,
  variables = {}
}: MutationOptions) => {
  try {
    const { data } = await client.mutate({
      mutation,
      variables,
      fetchPolicy: 'no-cache'
    })
    return data
  } catch (error) {
    console.log(error)
  }
}

export default client