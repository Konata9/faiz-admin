import 'react-hot-loader'
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'
import { Provider } from 'react-redux'

import CONFIG from '../config'

import store from './store'
import App from './modules/app'

const { apollo: { host, port } } = CONFIG
const client = new ApolloClient({
  uri: `http://${host}:${port}/graphql`
})

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById('app')
)