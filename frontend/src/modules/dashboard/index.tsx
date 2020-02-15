import React from 'react'
import { Card } from 'antd'
import { inject, observer } from 'mobx-react'

import { IStore } from '@store'
import { IUserStore } from '@store/user'

interface IProps {
  userStore?: IUserStore
}

const Dashboard = inject((stores: IStore) => {
  return {
    userStore: stores.userStore
  }
})(
  observer(
    ({ userStore }: IProps) => {
      const { userInfo } = userStore as IUserStore

      return (
        <Card>
          This is dashboard
        </Card>
      )
    }
  )
)

export default Dashboard