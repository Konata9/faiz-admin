import React, { useState, useEffect } from 'react'
import { Form, Input, Select, Button, Card, Table, Modal } from 'antd'
import { FormComponentProps } from 'antd/lib/form'
import { formatMessage } from '@utils'
import { SearchbarWrapper, TableHeaderWrapper } from './style'


const Searchbar = Form.create()(({ form }: FormComponentProps) => {
  const { getFieldDecorator } = form
  const doSearch = () => { }

  return (
    <SearchbarWrapper>
      <Form layout="inline">
        <Form.Item label={formatMessage('username')}>
          {getFieldDecorator('username')(
            <Input placeholder={formatMessage('placeholder.username_search')} />
          )}
        </Form.Item>
        <Form.Item>
          <Button
            icon="search"
            type="primary"
            onClick={doSearch}
          >
            {formatMessage('button.search')}
          </Button>
        </Form.Item>
      </Form>
    </SearchbarWrapper>
  )
})

interface IUserModal extends FormComponentProps {
  visible?: boolean
  confirmModal?: () => void
  closeModal?: () => void
}

const UserModal = Form.create<IUserModal>()(({
  form,
  visible = false,
  confirmModal = (() => { }),
  closeModal = (() => { })
}: IUserModal) => {
  const { getFieldDecorator } = form

  const doModalConfirm = async () => {
    confirmModal()
  }

  const doModalClose = () => {
    closeModal()
  }

  return (
    <Modal
      destroyOnClose
      okText={formatMessage('button.confirm')}
      cancelText={formatMessage('button.cancel')}
      visible={visible}
      onOk={doModalConfirm}
      onCancel={doModalClose}
    >
      <Form>
        <Form.Item label={formatMessage('username')}>
          {getFieldDecorator('username')(
            <Input placeholder={formatMessage('placeholder.username')} />
          )}
        </Form.Item>
        <Form.Item label={formatMessage('role')}>
          {getFieldDecorator('role')(
            <Input placeholder={formatMessage('placeholder.username')} />
          )}
        </Form.Item>
        <Form.Item label={formatMessage('password')}>
          {getFieldDecorator('password')(
            <Input placeholder={formatMessage('placeholder.password')} />
          )}
        </Form.Item>
      </Form>
    </Modal>
  )
})

const TableHeader = () => {
  const [modalVisible, setModalVisible] = useState(false)
  const openUserModal = () => {
    setModalVisible(true)
  }

  const closeModal = () => {
    setModalVisible(false)
  }

  return (
    <TableHeaderWrapper>
      <span>{formatMessage('modules.userList')}</span>
      <Button type="primary" icon="plus" onClick={openUserModal}>
        {formatMessage('account_create')}
      </Button>
      <UserModal visible={modalVisible} closeModal={closeModal} />
    </TableHeaderWrapper>
  )
}

const columns = [
  {
    title: formatMessage('username'),
    dataIndex: 'username',
    key: 'username'
  },
  {
    title: formatMessage('role'),
    dataIndex: 'role',
    key: 'role'
  },
]

const UserList = ({ data }: { data: Array<any> }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const colAction = {
    title: formatMessage('table.action'),
    key: 'action'
  }
  const tableColumn = [...columns, colAction]

  return (
    <Table
      title={() => <TableHeader />}
      columns={tableColumn}
      dataSource={data}
      pagination={{
        current: currentPage,
        pageSize
      }}
    />
  )
}

const User = () => {
  const data: any[] = []

  return (
    <Card>
      <Searchbar />
      <UserList data={data} />
    </Card>
  )
}

export default User