import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import { StyledLayout } from '@modules/style/layout'
import { SideBar, Container } from './style'

import { IRouter } from '@modules/routes'
import { IStore } from '@store'
import { UserStore } from '@store/user'

import Menu from './menu'
import Header from './header'
import Content from './content'

interface IProps {
  routes: IRouter[]
  userStore?: UserStore
}

const Layout = inject((stores: IStore) => {
  return {
    userStore: stores.userStore as UserStore
  }
})(
  observer(
    ({ routes, userStore }: IProps) => {
      const history = useHistory()
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