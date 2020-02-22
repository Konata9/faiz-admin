import gql from 'graphql-tag'

export const GET_MENUS = gql`
  query GetMenu{
    menu{
      id
      name
      link
      submenu{
        name
        link
      }
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