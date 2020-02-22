import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import { StyledLayout } from '@src/pages/style/layout'
import { SideBar, Container } from './style'

import { IRouter } from '@src/pages/routes'
import { IStore, RootStore } from '@store'
import { UserStore } from '@store/user'

import Menu from './menu'
import Header from './header'
import Content from './content'

interface IProps {
  routes: IRouter[]
  rootStore?: RootStore,
  userStore?: UserStore
}

const Layout = inject((stores: IStore) => {
  return {
    rootStore: stores.rootStore as RootStore,
    userStore: stores.userStore as UserStore
  }
})(
  observer(
    ({ routes, userStore, rootStore }: IProps) => {
      const history = useHistory()
      const { getMenuList } = rootStore as RootStore
      const checkToken = () => {
        const { token } = userStore as UserStore
        if (!token) {
          history.push('/login')
        }
      }

      useEffect(() => {
        checkToken()
        const { id: userId, getUserInfo } = userStore as UserStore
        getUserInfo(userId)
        getMenuList()
      }, [])

      return (
        <StyledLayout>
          <SideBar>
            <Menu />
          </SideBar>

          <Container>
            <Header />
            <Content routes={routes} />
          </Container>
        </StyledLayout >
      )
    }
  )
)

export default Layout