import React, { useState, useEffect } from 'react'
import { Form, Input, Select, Button, Card, Table, Modal, Divider } from 'antd'
import { FormComponentProps } from 'antd/lib/form'
import { inject, observer } from 'mobx-react'
import { IStore, UserStore, GlobalStore } from '@store'
import { formatMessage, formatTime } from '@utils'
import { ActionLink } from '@src/pages/style/layout'
import { SearchbarWrapper, TableHeaderWrapper, RoleCell } from './style'

interface ISearchbarProps extends FormComponentProps {
  userStore?: UserStore
}

const Searchbar = Form.create()(
  inject((stores: IStore) => {
    return {
      userStore: stores.userStore as UserStore
    }
  })(
    observer(
      (({ form, userStore }: ISearchbarProps) => {
        const { getFieldDecorator, validateFields } = form
        const { getUserList } = userStore as UserStore
        const doSearch = () => {
          validateFields(async (error, values) => {
            const { searchName: username } = values
            await getUserList(username)
          })
        }

        return (
          <SearchbarWrapper>
            <Form layout="inline">
              <Form.Item label={formatMessage('username')}>
                {getFieldDecorator('searchName')(
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
    )
  )
)

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
    dataIndex: 'roles',
    key: 'roles',
    ellipsis: true,
    render: (roles: Array<any>) => (
      <>{
        roles.map(role => {
          const { name, id } = role
          return <RoleCell key={id}>{name}</RoleCell>
        })
      }</>
    )
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

const UserList = ({ data }: { data: Array<any> }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const tableColumn = [...columns]

  return (
    <Table
      title={() => <TableHeader />}
      rowKey="id"
      columns={tableColumn}
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
  userStore?: UserStore
}

const User = inject((stores: IStore) => {
  return {
    global: stores.global as GlobalStore,
    userStore: stores.userStore as UserStore
  }
})(
  observer(
    ({ global, userStore }: IProps) => {
      const { getUserList, userList } = userStore as UserStore

      useEffect(() => {
        getUserList()
      }, [])

      return (
        <Card>
          <Searchbar />
          <UserList data={userList} />
        </Card>
      )
    }
  )
)

export default User