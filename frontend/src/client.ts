import { ApolloClient, ApolloLink, HttpLink, from, InMemoryCache, DocumentNode } from 'apollo-boost'
import global from '@store/global'
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

const cleanTypeName = new ApolloLink((operation, forward) => {
  if (operation.variables) {
    console.log('fucked in ', operation)
    const omitTypename = (key: any, value: any) => (key === '__typename' ? undefined : value);
    operation.variables = JSON.parse(JSON.stringify(operation.variables), omitTypename);
  }
  return forward(operation).map((data) => {
    return data;
  });
});

const client = new ApolloClient({
  link: from([authMiddleware, httpLink]),
  cache: new InMemoryCache({
    addTypename: false
  })
})

interface IQuery {
  query: DocumentNode
  variables?: any
  caller?: string | null
}

export const queryGQL = async ({
  query,
  variables = {},
  caller = null
}: IQuery) => {
  try {
    caller && global.switchLoadingStatus(caller, true)
    const { data } = await client.query({ query, variables })
    // const cleanedData = 
    caller && global.switchLoadingStatus(caller, false)

    return data
  } catch (error) {
    console.error(error)
  }
}

export default client