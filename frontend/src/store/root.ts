import intl from 'react-intl-universal'
import { observable, action } from 'mobx'

import { LANGUAGE, LANGUAGE_STORE_KEY } from '../constants'
import zh_CN from '../../locale/zh_CN'

const DEFAULT_LANGUAGE = LANGUAGE.ZH_CN

const locales = {
  [LANGUAGE.ZH_CN]: zh_CN
}

export interface IRootStore {
  languageInited: boolean
  currentLanguage: string
  menuList: Array<any>
  currentMenu: string
}

class RootStore {

  @observable
  languageInited = false

  @observable
  currentLanguage = DEFAULT_LANGUAGE

  @observable
  menuList = []

  @observable
  currentMenu = ''

  constructor() {
    this.loadLocales()
  }

  async loadLocales() {
    this.languageInited = false
    await intl.init({
      currentLocale: this.currentLanguage,
      locales,
      localStorageLocaleKey: LANGUAGE_STORE_KEY
    })
    this.languageInited = true
  }

  @action
  switchLanguage(language: string) {
    this.currentLanguage = Object.values(LANGUAGE).includes(language) ? language : DEFAULT_LANGUAGE
    this.loadLocales()
  }

  @action
  getMenuList() {
    this.menuList = []
  }
}

const rootStore = new RootStore()
export default rootStore