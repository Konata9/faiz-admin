import React, { useState, useEffect } from 'react'
import { Form, Input, Select, Button, Card, Table, Modal, message } from 'antd'
import { FormComponentProps } from 'antd/lib/form'
import { inject, observer } from 'mobx-react'
import { IStore, UserStore, GlobalStore, RoleStore } from '@store'
import { formatMessage, formatTime } from '@utils'
import { SearchbarWrapper, TableHeaderWrapper, RoleCell } from './style'
import { RESPONSE_STATUS } from '@src/constants'

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
  roleList?: []
  confirmModal?: (params?: any) => any
  closeModal?: (params?: any) => any
}

const UserModal = Form.create<IUserModal>()(({
  form,
  roleList = [],
  visible = false,
  confirmModal = (() => { }),
  closeModal = (() => { })
}: IUserModal) => {
  const { getFieldDecorator, validateFields } = form

  const doModalConfirm = async () => {
    validateFields(async (error, values) => {
      if (!error) {
        const { username, roles, password } = values
        const { status } = await confirmModal({
          username,
          roles,
          password
        })
        if (status === RESPONSE_STATUS.SUCCESS) {
          message.success(formatMessage('account_create_success'))
        } else {
          message.error(formatMessage('account_create_fail'))
        }
        doModalClose()
      }
    })
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
          {getFieldDecorator('roles')(
            <Select mode="multiple">
              {
                roleList.map(role => {
                  const { id, name } = role
                  return (
                    <Select.Option value={id} key={id}>{name}</Select.Option>
                  )
                })
              }
            </Select>
          )}
        </Form.Item>
        <Form.Item label={formatMessage('password')}>
          {getFieldDecorator('password')(
            <Input placeholder={formatMessage('placeholder.password')} type="password" />
          )}
        </Form.Item>
      </Form>
    </Modal>
  )
})

const TableHeader = ({ roleList, createUser }: any) => {
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
      <UserModal roleList={roleList} visible={modalVisible} closeModal={closeModal} confirmModal={createUser} />
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

interface IUserListProps {
  roleStore?: RoleStore
  userStore?: UserStore
}

const UserList = inject((stores: IStore) => {
  return {
    roleStore: stores.roleStore as RoleStore,
    userStore: stores.userStore as UserStore
  }
})(
  observer(
    ({ userStore, roleStore }: IUserListProps) => {
      const { getUserList, userList, createUser } = userStore as UserStore
      const { roleList, getRoles } = roleStore as RoleStore
      const [currentPage, setCurrentPage] = useState(1)
      const [pageSize, setPageSize] = useState(10)

      const tableColumn = [...columns]

      useEffect(() => {
        getUserList()
        getRoles()
      }, [])

      return (
        <Table
          title={() => <TableHeader roleList={roleList} createUser={createUser} />}
          rowKey="id"
          columns={tableColumn}
          dataSource={userList}
          pagination={{
            current: currentPage,
            pageSize
          }}
        />
      )
    }
  )
)

const User = () => {

  return (
    <Card>
      <Searchbar />
      <UserList />
    </Card>
  )
}

export default User