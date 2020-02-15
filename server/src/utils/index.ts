import jsonwebtoken from 'jsonwebtoken'
import CryptoJS from 'crypto-js'
import CONFIG from '@config'

const { auth: { secret, experies }, cryptoFrontend: { secret: secretFrontend }, cryptoBackend: { secret: secretBackend } } = CONFIG

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

export const encryptValue = (rawValue: any) => {
  return CryptoJS.DES.encrypt(JSON.stringify(rawValue), secretBackend)
}

export const decryptValue = (encryptedValue: any) => {
  return CryptoJS.DES.decrypt(encryptedValue, secretBackend)
}

export const decryptFrontendValue = (encryptedValue: any) => {
  return CryptoJS.DES.decrypt(encryptedValue, secretFrontend)
}

export const encryptValeUseSHA = (rawValue: any) => {
  return CryptoJS.SHA256(rawValue)
}