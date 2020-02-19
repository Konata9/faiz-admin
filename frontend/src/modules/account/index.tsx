import React from 'react'
import { Card } from 'antd'
import { inject, observer } from 'mobx-react'
import { IStore, UserStore, GlobalStore } from '@store'
import { formatMessage } from '@utils'

import { UserInfoWrapper, AvatarWrapper, UserInfoList, InfoTitle, InfoContent } from './style'

interface IProps {
  global?: GlobalStore
  userStore?: UserStore
}

const Account = inject((stores: IStore) => {
  return {
    global: stores.global as GlobalStore,
    userStore: stores.userStore as UserStore
  }
})(
  observer(
    ({ global, userStore }: IProps) => {
      const { userInfo: { nickname, avatar, phone, email } } = userStore as UserStore

      return (
        <Card>
          <UserInfoWrapper>
            <AvatarWrapper>
              <img src={avatar} alt={nickname} />
            </AvatarWrapper>
            <UserInfoList>
              <li>
                <InfoTitle>{formatMessage('username')}</InfoTitle>
                <InfoContent>{nickname}</InfoContent>
              </li>
              <li>
                <InfoTitle>{formatMessage('phone')}</InfoTitle>
                <InfoContent>{phone}</InfoContent>
              </li>
              <li>
                <InfoTitle>{formatMessage('email')}</InfoTitle>
                <InfoContent>{email}</InfoContent>
              </li>
            </UserInfoList>
          </UserInfoWrapper>
        </Card>
      )
    }
  )
)

export default Account