import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useLazyQuery } from '@apollo/react-hooks'
import { inject, observer } from 'mobx-react'
import { StyledLayout } from '@modules/style/layout'
import { SideBar, Container } from './style'

import { IRouter } from '@modules/routes'
import { IStore } from '@store'
import { IUserStore } from '@store/user'

import Menu from './menu'
import Header from './header'
import Content from './content'

import { GET_USERINFO } from '@service/user'
import { STORAGE_KEYS } from '@src/constants'

interface IProps {
  routes: IRouter[]
  userStore?: IUserStore
}

const Layout = inject((stores: IStore) => {
  return {
    userStore: stores.userStore as IUserStore
  }
})(
  observer(
    ({ routes, userStore }: IProps) => {
      const { id, checkTokenInStore = () => { } } = userStore || {}
      const history = useHistory()
      const [getUerInfo, { loading, data }] = useLazyQuery(GET_USERINFO)

      if (data) {
        console.log(data)
      }

      const checkToken = () => {
        const { token } = userStore || {}
        if (!token) {
          history.push('/login')
        }
      }

      useEffect(() => {
        checkTokenInStore()
        checkToken()
        getUerInfo({ variables: { userId: id } })
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
        </StyledLayout>
      )
    }
  )
)

export default Layout