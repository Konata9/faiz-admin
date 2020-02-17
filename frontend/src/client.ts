import ApolloClient, { DocumentNode } from 'apollo-boost'

import { STORAGE_KEYS } from '@constants'
import CONFIG from '@config'

const { apollo: { host, port } } = CONFIG
const client = new ApolloClient({
  uri: `http://${host}:${port}/graphql`,
  fetchOptions: {
    credentials: 'include'
  },
  request: (operation) => {
    const token = localStorage.getItem(STORAGE_KEYS.TOKEN)
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    })
  }
})

export const queryGQL = async (query: DocumentNode) => {
  try {
    return await client.query({ query })
  } catch (error) {
    console.error(error)
  }
}

export default client