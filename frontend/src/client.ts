import ApolloClient from 'apollo-boost'

import CONFIG from '../config'

const { apollo: { host, port } } = CONFIG
const client = new ApolloClient({
  uri: `http://${host}:${port}/graphql`,
  fetchOptions: {
    credentials: 'include'
  },
})

export default client