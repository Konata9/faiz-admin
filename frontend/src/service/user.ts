import request from '@utils/request'
import { IAccount } from '@interface/user'

export const login = async (data: IAccount) => {
  const response = await request.post('/login', {
    data
  })

  return response
}