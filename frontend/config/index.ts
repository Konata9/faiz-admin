const { env: { SERVER_HOST, SERVER_PORT, APOLLO_HOST, APOLLO_PORT, APOLLO_PATH } } = process

export default {
  api: {
    host: SERVER_HOST || '127.0.0.1',
    port: SERVER_PORT || 3333,
  },
  apollo: {
    host: APOLLO_HOST || '127.0.0.1',
    port: APOLLO_PORT || 3333,
    graphqlPath: APOLLO_PATH || '/graphql'
  },
  crypto: {
    secret: 'y3ySJqXv'
  }
}