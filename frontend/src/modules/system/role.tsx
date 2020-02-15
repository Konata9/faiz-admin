import React, { useState, useEffect } from 'react'
import { Form, Input, Button, Card, Table } from 'antd'
import { FormComponentProps } from 'antd/lib/form'
import { formatMessage } from '@utils'

import { SearchbarWrapper, TableHeaderWrapper } from './style'

const Searchbar = Form.create()(({ form }: FormComponentProps) => {
  const { getFieldDecorator } = form

  return (
    <SearchbarWrapper>
      <Form layout="inline">
        <Form.Item label={formatMessage('role')}>
          {getFieldDecorator('role')(
            <Input placeholder={formatMessage('placeholder.username_search')} />
          )}
        </Form.Item>
        <Form.Item>
          <Button icon="search" type="primary">{formatMessage('button.search')}</Button>
        </Form.Item>
      </Form>
    </SearchbarWrapper>
  )
})

const columns = [
  {
    title: formatMessage('role'),
    dataIndex: 'role',
    key: 'role'
  },
]

const TableHeader = () => {
  return (
    <TableHeaderWrapper>
      <span>{formatMessage('modules.userList')}</span>
      <Button type="primary" icon="plus">
        {formatMessage('button.create')}
      </Button>
    </TableHeaderWrapper>
  )
}

const RoleList = ({ data }: { data: Array<any> }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const colAction = {
    title: formatMessage('table.action'),
    key: 'action'
  }
  const tableColumn = [...columns, colAction]

  return (
    <Table
      title={TableHeader}
      columns={tableColumn}
      dataSource={data}
      pagination={{
        current: currentPage,
        pageSize
      }}
    />
  )
}

const Role = () => {
  return (
    <Card>
      <Searchbar />
      <RoleList data={[]} />
    </Card>
  )
}

export default Role