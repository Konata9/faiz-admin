import axios, { AxiosResponse } from 'axios'
import CONFIG from '@config'

const { api: { host, port } } = CONFIG

const request = axios.create({
  baseURL: `//${host}:${port}/api`,
  timeout: 1000 * 60 * 2
})

request.interceptors.response.use((response: AxiosResponse) => {
  return response
}, (error: any) => {
  // need to handle common error
  return error
})

export default request