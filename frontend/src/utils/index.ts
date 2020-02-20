import intl from 'react-intl-universal'
import CryptoJS from 'crypto-js'
import moment, { Moment } from 'moment'
import CONFIG from '@config'

const { crypto: { secret } } = CONFIG
const frontEndSecret = CryptoJS.enc.Utf8.parse(secret)

interface ITime {
  time: string | Date | Moment
  formatter: string
}

export const formatMessage = (id: string, value: any = null) => {
  return intl.get(id, value) || id
}

export const formatHTMLMessage = (id: string, value: any = null) => {
  return intl.getHTML(id, value) || id
}

export const generateSign = (rawValue: any) => {
  return CryptoJS.MD5(JSON.stringify(rawValue)).toString()
}

export const encryptedValue = (rawValue: any) => {
  const encryptedValue = CryptoJS.DES.encrypt(rawValue, frontEndSecret, {
    mode: CryptoJS.mode.CBC,
    iv: frontEndSecret,
    padding: CryptoJS.pad.ZeroPadding
  })

  return encryptedValue.toString()
}

export const decryptValue = (encryptedValue: any) => {
  const decryptedValue = CryptoJS.DES.decrypt(encryptedValue, frontEndSecret, {
    mode: CryptoJS.mode.CBC,
    iv: frontEndSecret,
    padding: CryptoJS.pad.ZeroPadding
  })

  return CryptoJS.enc.Utf8.stringify(decryptedValue)
}

export const formatTime = ({ time, formatter = 'YYYY-MM-DD HH:mm:ss' }: ITime) => {
  const formattedTime = moment(time).format(formatter)
  return formattedTime
}