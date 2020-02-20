import jsonwebtoken from 'jsonwebtoken'
import CryptoJS from 'crypto-js'
import CONFIG from '@config'

const { auth: { secret, experies }, cryptoFrontend, cryptoBackend } = CONFIG

const frontEndSecret = CryptoJS.enc.Utf8.parse(cryptoFrontend.secret)
const backEndSecret = CryptoJS.enc.Utf8.parse(cryptoBackend.secret)

export const generateJWT = (info: any) => {
  return jsonwebtoken.sign(info, secret, { expiresIn: experies })
}

export const verifyUser = (token: string) => {
  try {
    if (token) {
      const tokenContent = token.replace('Bearer ', '')
      return jsonwebtoken.verify(tokenContent, secret)
    }
  } catch (error) {
    console.error(error)
  }
}

export const encryptValue = (rawValue: any) => {
  const encryptedValue = CryptoJS.DES.encrypt(rawValue, backEndSecret, {
    mode: CryptoJS.mode.CBC,
    iv: backEndSecret,
    padding: CryptoJS.pad.ZeroPadding
  })

  return encryptedValue.toString()
}

export const decryptValue = (encryptedValue: any) => {
  const decryptedValue = CryptoJS.DES.decrypt(encryptedValue, backEndSecret, {
    mode: CryptoJS.mode.CBC,
    iv: backEndSecret,
    padding: CryptoJS.pad.ZeroPadding
  })
  return CryptoJS.enc.Utf8.stringify(decryptedValue)
}

export const decryptFrontendValue = (encryptedValue: any) => {
  const decryptedValue = CryptoJS.DES.decrypt(encryptedValue, frontEndSecret, {
    mode: CryptoJS.mode.CBC,
    iv: frontEndSecret,
    padding: CryptoJS.pad.ZeroPadding
  })

  return CryptoJS.enc.Utf8.stringify(decryptedValue)
}

export const encryptValeUseSHA = (rawValue: any) => {
  return CryptoJS.SHA256(rawValue).toString()
}