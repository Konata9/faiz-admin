import React, { useState, useEffect } from 'react'
import { Form, Input, Button, Card, Table, Modal, message } from 'antd'
import { FormComponentProps } from 'antd/lib/form'
import { inject, observer } from 'mobx-react'
import { formatMessage, formatTime } from '@utils'

import { IStore, RoleStore, GlobalStore } from '@store'
import { SearchbarWrapper, TableHeaderWrapper } from './style'
import { ActionLink } from '@src/pages/style/layout'
import { RESPONSE_STATUS } from '@src/constants'

interface ISearchbarProps extends FormComponentProps {
  roleStore?: RoleStore
}

const Searchbar = Form.create()(
  inject((stores: IStore) => {
    return {
      roleStore: stores.roleStore as RoleStore
    }
  })(({ form, roleStore }: ISearchbarProps) => {
    const { getFieldDecorator, validateFields } = form
    const { getRoles } = roleStore as RoleStore

    const searchRoles = () => {
      validateFields((error, values) => {
        if (!error) {
          const { roleName } = values
          getRoles(roleName)
        }
      })
    }

    return (
      <SearchbarWrapper>
        <Form layout="inline">
          <Form.Item label={formatMessage('role')}>
            {getFieldDecorator('roleName')(
              <Input placeholder={formatMessage('placeholder.role')} />
            )}
          </Form.Item>
          <Form.Item>
            <Button icon="search" type="primary" onClick={searchRoles}>{formatMessage('button.search')}</Button>
          </Form.Item>
        </Form>
      </SearchbarWrapper>
    )
  })
)

interface IRoleModal extends FormComponentProps {
  visible?: boolean
  confirmModal?: (params?: any) => any
  closeModal?: (params?: any) => any
}

const RoleModal = Form.create<IRoleModal>()(({
  form,
  visible = false,
  confirmModal = (() => { }),
  closeModal = (() => { })
}: IRoleModal) => {
  const { getFieldDecorator, validateFields } = form

  const doModalConfirm = async () => {
    validateFields(async (error, values) => {
      if (!error) {
        const { name } = values
        const { status } = await confirmModal({ name })
        if (status === RESPONSE_STATUS.SUCCESS) {
          message.success(formatMessage('role_create_success'))
        } else {
          message.error(formatMessage('role_create_fail'))
        }
        closeModal()
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
        <Form.Item label={formatMessage('role')}>
          {getFieldDecorator('name')(
            <Input placeholder={formatMessage('placeholder.role')} />
          )}
        </Form.Item>
      </Form>
    </Modal>
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

const TableHeader = ({ createRole }: any) => {
  const [modalVisible, setModalVisible] = useState(false)
  const openUserModal = () => {
    setModalVisible(true)
  }

  const closeModal = () => {
    setModalVisible(false)
  }
  return (
    <TableHeaderWrapper>
      <span>{formatMessage('modules.roleList')}</span>
      <Button type="primary" icon="plus" onClick={openUserModal}>
        {formatMessage('role_create')}
      </Button>
      <RoleModal
        visible={modalVisible}
        confirmModal={createRole}
        closeModal={closeModal} />
    </TableHeaderWrapper>
  )
}

interface IRoleListProps {
  global?: GlobalStore
  roleStore?: RoleStore
}

const RoleList = inject((stores: IStore) => {
  return {
    global: stores.global as GlobalStore,
    roleStore: stores.roleStore as RoleStore
  }
})(
  observer(
    ({ global, roleStore }: IRoleListProps) => {
      const { loadingStatus } = global as GlobalStore
      const { getRoles, createRole, roleList } = roleStore as RoleStore

      const [currentPage, setCurrentPage] = useState(1)
      const [pageSize, setPageSize] = useState(10)

      useEffect(() => {
        getRoles()
      }, [])

      const tableColumn = [...columns]

      return (
        <Table
          title={() => <TableHeader createRole={createRole} />}
          columns={tableColumn}
          loading={loadingStatus['getRoles']}
          rowKey="id"
          dataSource={roleList}
          pagination={{
            current: currentPage,
            pageSize
          }}
        />
      )
    }
  )
)

const Role = () => {
  return (
    <Card>
      <Searchbar />
      <RoleList />
    </Card>
  )
}
export default Role