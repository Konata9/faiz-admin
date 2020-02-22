import 'react-hot-loader'
import 'normalize.css'
import 'antd/dist/antd.css';

import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { ApolloProvider } from '@apollo/react-hooks'
import { Provider } from 'mobx-react'

import client from './client'
import store from '@store'
import App from '@src/pages/app'

ReactDOM.render(
  <Provider {...store}>
    <BrowserRouter>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById('app')
)