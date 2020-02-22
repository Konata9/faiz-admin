import gql from 'graphql-tag'

export const GET_ROLE = gql`
  query Role($id: String!){
    role{
      id
      name
      auths
      createTime
      updateTime
    }
  }
`

export const GET_ROLELIST = gql`
  query Roles($name: String){
    roles(name:$name){
      id
      name
      auths
      createTime
      updateTime
    }
  }
`

export const CREATE_ROLE = gql`
  mutation CreateRole($name: String!){
    createRole(name:$name){
      id
    }
  }
`