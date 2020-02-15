import intl from 'react-intl-universal'
import { observable, action } from 'mobx'

import { LANGUAGE, LANGUAGE_STORE_KEY, STORAGE_KEYS } from '../constants'
import zh_CN from '../../locale/zh_CN'

const DEFAULT_LANGUAGE = LANGUAGE.ZH_CN

const locales = {
  [LANGUAGE.ZH_CN]: zh_CN
}

export interface IRootStore {
  languageInited: boolean
  currentLanguage: string
  menuList: Array<any>
  activeMenu: string
  switchLanguage: (language: string) => void
  getMenuList: () => void
  setActiveMenu: (menuKey: string) => void
}

class RootStore {

  @observable
  languageInited = false

  @observable
  currentLanguage = DEFAULT_LANGUAGE

  @observable
  menuList = []

  @observable
  activeMenu = localStorage.getItem(STORAGE_KEYS.ACTIVE_MENU) || 'dashboard'

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

  @action.bound
  switchLanguage(language: string) {
    this.currentLanguage = Object.values(LANGUAGE).includes(language) ? language : DEFAULT_LANGUAGE
    this.loadLocales()
  }

  @action.bound
  getMenuList() {
    this.menuList = []
  }

  @action.bound
  setActiveMenu(menuKey: string) {
    localStorage.setItem(STORAGE_KEYS.ACTIVE_MENU, menuKey)
    this.activeMenu = menuKey
  }
}

const rootStore = new RootStore()
export default rootStore