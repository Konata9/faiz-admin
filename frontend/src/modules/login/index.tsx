import * as React from 'react'
import { Card, Form, Input, Button, Icon } from 'antd'
import { FormComponentProps } from 'antd/lib/form'

import styled from 'styled-components'
import { StyledLayout } from '../style/layout'
import { fontDark } from '../style/style'

import { formatMessage } from '../../utils'

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
const Login = Form.create()((props: LoginForm) => {

  const { form: { getFieldDecorator, validateFields } } = props

  const login = () => {
    validateFields((error, values) => {
      if (!error) {
        console.log(values)
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
              <Button type="primary" size="large" block onClick={login}>{formatMessage('system.login')}</Button>
            </Form.Item>
          </Form>
        </Card>
      </CardWrapper>
    </StyledLayout>
  )
})

export default Login