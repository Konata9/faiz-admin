import jsonwebtoken from 'jsonwebtoken'
import CONFIG from '@config'

const { auth: { secret, experies } } = CONFIG

export const generateJWT = (info: any) => {
  return jsonwebtoken.sign(info, secret, { expiresIn: experies })
}

export const verifyUser = (token: string) => {
  try {
    if (token) {
      return jsonwebtoken.verify(token, secret)
    }
  } catch (error) {
    console.error(error)
  }
}