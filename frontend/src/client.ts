import ApolloClient, { DocumentNode } from 'apollo-boost'

import CONFIG from '@config'

const { apollo: { host, port } } = CONFIG
const client = new ApolloClient({
  uri: `http://${host}:${port}/graphql`,
  fetchOptions: {
    credentials: 'include'
  },
})

export const queryGQL = async (query: DocumentNode) => {
  try {
    return await client.query({ query })
  } catch (error) {
    console.error(error)
  }
}

export default client