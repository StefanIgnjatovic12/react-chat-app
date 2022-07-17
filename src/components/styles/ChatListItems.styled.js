import styled from 'styled-components'

export const StyledChatListItemsContainer = styled.div`
  display: flex;
  background-color: ${props => props.colored === true ? '#7076FF' : '#4E5566'};
  padding: 2px 5px 2px 10px;
  margin-top: 10px;
  margin-left: 5px;
  border-radius: 12px;
  width: 85%;
  height: 10%;

  :hover {
    background-color: ${props => props.colored === true ? '#666eff' : '#596073'}
  }

`
export const StyledChatListItemsText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  font-family: "Quicksand Medium", serif;
  color: #F6F6F6;
`

export const StyledChatChatListSubtext = styled.div`
  margin-top: 5%;
  font-size: 14px;
  color: #B1B4BB;
`
export const StyledChatListItemsAvatar = styled.div`
  background-image: url('data:image/png;base64,${props => props.avatar}');
  width: 23%;
  height: 80%;
  max-width: 100%;
  max-height: 100%;
  background-size: cover;
  background-position: top center;
  border-radius: 50%;
  align-self: center;
  margin-right: 5%;
  
`
export const StyledOnlineIndicatorDot = styled.span`
  color: #49A661;
`

export const StyledOfflineIndicatorDot = styled.span`
  color: #F5222D;
`