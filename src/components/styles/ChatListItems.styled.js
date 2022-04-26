import styled from 'styled-components'

export const StyledChatListItemsContainer = styled.div`
  display: flex;
  background-color: #4E5566;
  padding: 2px 5px 2px 10px;
  margin-top: 10px;
  margin-left: 5px;
  border-radius: 12px;
  width: 85%;
  height: 10%;
  :hover {
    background-color: #726DFE;
  }
`
export const StyledChatListItemsText = styled.div`
  display:flex;
  flex-direction: column;
  justify-content: space-evenly;
`
export const StyledChatListItemsAvatar = styled.div`
    background-image: url(${props => props.avatar});
    width: 60px;
    height: 60px;
    background-size: cover;
    background-position: top center;
    border-radius: 50%;
`