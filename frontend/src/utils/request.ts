import axios, { AxiosResponse, AxiosRequestConfig } from 'axios'
import CONFIG from '@config'
import store from '@store'
import { generateSign } from '@utils'

const { api: { host, port } } = CONFIG

const request = axios.create({
  baseURL: `//${host}:${port}/api`,
  timeout: 1000 * 60 * 2,
})

request.interceptors.request.use((requestConfig: AxiosRequestConfig) => {
  const { headers, data, params } = requestConfig
  const sign = generateSign(JSON.stringify(`${params}_${data}`))
  const { userStore: { token } } = store
  return {
    ...requestConfig,
    headers: {
      ...headers,
      authorization: `Bearer ${token}` || '',
      sign
    }
  }
})

request.interceptors.response.use((response: AxiosResponse) => {
  return response
}, (error: any) => {
  // need to handle common error
  return error
})

export default request