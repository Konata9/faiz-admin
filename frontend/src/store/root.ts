import intl from 'react-intl-universal'
import { observable, action } from 'mobx'
import { queryGQL } from '@src/client'
import { LANGUAGE, LANGUAGE_STORE_KEY, STORAGE_KEYS } from '@constants'
import { GET_MENUS } from '@service/root'
import zh_CN from '@locale/zh_CN'

const DEFAULT_LANGUAGE = LANGUAGE.ZH_CN
const locales = {
  [LANGUAGE.ZH_CN]: zh_CN
}

export class RootStore {
  @observable
  languageInited: boolean = false

  @observable
  currentLanguage: string = DEFAULT_LANGUAGE

  @observable
  menuList: string[] = []

  @observable
  openKeys: string[] = localStorage.getItem(STORAGE_KEYS.OPEN_MENUS) ? <string[]>JSON.parse(<string>localStorage.getItem(STORAGE_KEYS.OPEN_MENUS)) : []

  @observable
  activeMenu: string = localStorage.getItem(STORAGE_KEYS.ACTIVE_MENU) || '/dashboard'

  constructor() {
    this.loadLocales()
  }

  private async loadLocales(): Promise<void> {
    this.languageInited = false
    await intl.init({
      currentLocale: this.currentLanguage,
      locales,
      localStorageLocaleKey: LANGUAGE_STORE_KEY
    })
    this.languageInited = true
  }

  @action.bound
  switchLanguage(language: string): void {
    this.currentLanguage = Object.values(LANGUAGE).includes(language) ? language : DEFAULT_LANGUAGE
    this.loadLocales()
  }

  @action.bound
  async getMenuList(): Promise<void> {
    try {
      const { menu } = await queryGQL({ query: GET_MENUS })
      this.menuList = menu
    } catch (error) {
      console.error(error)
    }
  }

  @action.bound
  setOpenMenus(openKeys: string[]): void {
    localStorage.setItem(STORAGE_KEYS.OPEN_MENUS, JSON.stringify(openKeys))
    this.openKeys = openKeys
  }

  @action.bound
  setActiveMenu(menuKey: string): void {
    localStorage.setItem(STORAGE_KEYS.ACTIVE_MENU, menuKey)
    this.activeMenu = menuKey
  }
}

const rootStore = new RootStore()
export default rootStore