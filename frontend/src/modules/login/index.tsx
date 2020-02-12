import React from 'react'
import { Card, Form, Input, Button, Icon } from 'antd'
import { FormComponentProps } from 'antd/lib/form'
import { inject, observer } from 'mobx-react'

import styled from 'styled-components'
import { StyledLayout } from '../style/layout'
import { fontDark } from '../style/color'

import { formatMessage } from '@utils'

import { IStore } from '@store'
import { IUserStore } from '@store/user'
import { IAccount } from '@interface/user'

const CardWrapper = styled.div`
  width: 600px;
  margin: 0 auto;
  margin-top: 15vh;
`

const CardTitle = styled.div`
  color: ${fontDark};
  font-size: 2rem;
  text-align: center;
`

type LoginForm = FormComponentProps

interface IProps extends FormComponentProps {
  userStore: IUserStore
}

const LoginForm = Form.create()(({ form, userStore }: IProps) => {

  const { getFieldDecorator, validateFields } = form
  const { login } = userStore

  const doUserLogin = () => {
    validateFields((error, values: IAccount) => {
      if (!error) {
        const { username, password } = values
        login({ username, password })
      }
    })
  }

  return (
    <StyledLayout>
      <CardWrapper>
        <Card title={
          <CardTitle>{formatMessage('system.logo')}</CardTitle>
        }>
          <Form hideRequiredMark>
            <Form.Item>
              {
                getFieldDecorator('username', {
                  rules: [
                    { required: true, message: formatMessage('validate.usernameIsNull') }
                  ]
                })(
                  <Input size="large" placeholder={formatMessage('placeholder.username')} prefix={<Icon type="user" />} />
                )
              }
            </Form.Item>
            <Form.Item>
              {
                getFieldDecorator('password', {
                  rules: [
                    { required: true, message: formatMessage('validate.passwordIsNull') }
                  ]
                })(
                  <Input size="large" placeholder={formatMessage('placeholder.password')} prefix={<Icon type="lock" />} />
                )
              }
            </Form.Item>
            <Form.Item>
              <Button type="primary" size="large" block onClick={doUserLogin}>{formatMessage('system.login')}</Button>
            </Form.Item>
          </Form>
        </Card>
      </CardWrapper>
    </StyledLayout>
  )
})

const Login = inject((stores: IStore) => {
  return {
    userStore: stores.userStore
  }
})(
  observer(LoginForm)
)

export default Login