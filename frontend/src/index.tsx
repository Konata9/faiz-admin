import 'react-hot-loader'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'
import { Provider } from 'react-redux'

import store from './store/index'
import CONFIG from '../config/index'
import App from './modules/app'

const { apollo: { host, port } } = CONFIG

const client = new ApolloClient({
  uri: `http://${host}:${port}`
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