import styled from 'styled-components'

export const UserInfoWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`

export const AvatarWrapper = styled.div`
  width: 100px;
  height: 100px;

  img {
    width: 100%;
    object-fit: contain; 
  }
`

export const UserInfoList = styled.ul`
  list-style: none;
  flex: 1;

  li {
    min-height: 40px;
    line-height: 40px;
    font-size: 14px;
    display: flex;
  }
`

export const InfoTitle = styled.div`
  min-width: 80px;
  font-weight: bold;
`

export const InfoContent = styled.div`
  margin-left: 15px;
`