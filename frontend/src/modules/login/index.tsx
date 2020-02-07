import * as React from 'react'
import { Card, Form, Input, Button } from 'antd'

import styled from 'styled-components'
import { StyledLayout } from '../style/layout'

import { formatMessage } from '../../utils'

const CardWrapper = styled.div`
  width: 55%;
  margin: 0 auto;
`

const CardTitle = styled.div`
  
`

const Login = Form.create()(() => {
  const login = () => {

  }

  return (
    <StyledLayout>
      <CardWrapper>
        <Card title={
          <CardTitle>欢迎登陆</CardTitle>
        }>
          <Form>
            <Form.Item>
              <Input size="large" />
            </Form.Item>
            <Form.Item>
              <Input size="large" />
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