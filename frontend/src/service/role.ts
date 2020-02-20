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
  query Roles{
    roles{
      id
      name
      auths
      createTime
      updateTime
    }
  }
`