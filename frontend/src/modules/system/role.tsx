import React, { useState, useEffect } from 'react'
import { Form, Input, Button, Card, Table, Divider } from 'antd'
import { FormComponentProps } from 'antd/lib/form'
import { inject, observer } from 'mobx-react'
import { formatMessage, formatTime } from '@utils'

import { IStore, RoleStore, GlobalStore } from '@store'
import { SearchbarWrapper, TableHeaderWrapper } from './style'
import { ActionLink } from '@modules/style/layout'

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
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: formatMessage('time.createTime'),
    dataIndex: 'createTime',
    key: 'createTime',
    render: (time: string) => (
      <>{formatTime({ time, formatter: 'YYYY-MM-DD HH:mm' })}</>
    )
  },
  {
    title: formatMessage('time.updateTime'),
    dataIndex: 'updateTime',
    key: 'updateTime',
    render: (time: string) => (
      <>{formatTime({ time, formatter: 'YYYY-MM-DD HH:mm' })}</>
    )
  },
]

const TableHeader = () => {
  return (
    <TableHeaderWrapper>
      <span>{formatMessage('modules.roleList')}</span>
      <Button type="primary" icon="plus">
        {formatMessage('role_create')}
      </Button>
    </TableHeaderWrapper>
  )
}

const RoleList = ({ data }: { data: Array<any> }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const colAction = {
    title: formatMessage('table.action'),
    key: 'action',
    render: (_: any, record: any) => {
      return (
        <>
          <ActionLink>{formatMessage('button.edit')}</ActionLink>
          <Divider type="vertical" />
          <ActionLink>{formatMessage('button.delete')}</ActionLink>
        </>
      )
    }
  }
  const tableColumn = [...columns, colAction]

  return (
    <Table
      title={TableHeader}
      columns={tableColumn}
      rowKey="id"
      dataSource={data}
      pagination={{
        current: currentPage,
        pageSize
      }}
    />
  )
}

interface IProps {
  global?: GlobalStore
  roleStore?: RoleStore
}

const Role = inject((stores: IStore) => {
  return {
    global: stores.global as GlobalStore,
    roleStore: stores.roleStore as RoleStore
  }
})(
  observer(
    ({ global, roleStore }: IProps) => {
      const { roleList, getRoles } = roleStore as RoleStore
      useEffect(() => {
        getRoles()
      }, [])

      return (
        <Card>
          <Searchbar />
          <RoleList data={roleList} />
        </Card>
      )
    }
  )
)
export default Role