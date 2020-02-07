import * as React from 'react'
import { Card, Form, Input, Button } from 'antd'

import { StyledLayout } from '../style/layout'

import { formatMessage } from '../../utils'

const Login = Form.create()(() => {
  console.log('666', formatMessage('system.add'))

  return (
    <StyledLayout>
      <Card title={null}>
        <Form>
          <Form.Item>
            <Input />
          </Form.Item>

          <Form.Item>
            <Input />
          </Form.Item>

          <Form.Item>
            <Button>{formatMessage('system.loading')}</Button>
          </Form.Item>
        </Form>
      </Card>
    </StyledLayout>
  )
})

export default Login