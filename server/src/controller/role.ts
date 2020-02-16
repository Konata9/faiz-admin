import { RoleModel } from '@graphql/schema/role'

interface IRole {
  id?: string
  name: string
  auth: [string]
}

export const getRoles = async () => {
  try {
    return await RoleModel.find()
  } catch (error) {
    console.log(error)
  }
}

export const getRole = async (id: string) => {
  try {
    return await RoleModel.findOne({ _id: id })
  } catch (error) {
    console.log(error)
  }
}

export const createRole = async (roleInfo: IRole) => {
  try {
    return await RoleModel.create(roleInfo)
  } catch (error) {
    console.log(error)
  }
}

export const updateRole = async (roleInfo: IRole) => {
  try {
    const { id: _id, ...rest } = roleInfo
    return await RoleModel.updateOne({ _id }, { ...rest })
  } catch (error) {
    console.log(error)
  }
}

export const deleteRole = async (id: string) => {
  try {
    return await RoleModel.deleteOne({ _id: id })
  } catch (error) {
    console.log(error)
  }
}