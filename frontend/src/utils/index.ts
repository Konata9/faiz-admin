import * as intl from 'react-intl-universal'

export const formatMessage = (id: string, value: any = null) => {
  return intl.get(id, value)
}

export const formatHTMLMessage = (id: string, value: any = null) => {
  return intl.getHTML(id, value)
}