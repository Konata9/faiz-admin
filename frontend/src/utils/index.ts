import intl from 'react-intl-universal'
import CryptoJS from 'crypto-js'
import CONFIG from '@config'

const { crypto: { secret } } = CONFIG

export const formatMessage = (id: string, value: any = null) => {
  return intl.get(id, value) || id
}

export const formatHTMLMessage = (id: string, value: any = null) => {
  return intl.getHTML(id, value) || id
}

export const generateSign = (rawValue: any) => {
  return CryptoJS.MD5(JSON.stringify(rawValue))
}

export const encryptedValue = (rawValue: any) => {
  return CryptoJS.DES.encrypt(JSON.stringify(rawValue), secret)
}

export const decrypt = (encryptedValue: any) => {
  return CryptoJS.DES.decrypt(encryptedValue, secret)
}