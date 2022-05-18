import styled from 'styled-components'

export const StyledChatContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  min-height: 70vh;
  max-height: 70vh;
  width: 55vw;
  border-radius: 25px;
  background-color: #404757;
  box-shadow: 0 2px 15px rgb(0 0 0 / 68%)
`

export const StyledChatLinkBar = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: #3A3F4D;
  width: 5%;
  border-right-color: #575D6B;
  border-right-style: solid;
  border-right-width: 1px;
  border-bottom-left-radius: 25px;
  border-top-left-radius: 25px;
`

export const StyledChatList = styled.div`
  width: 25%;
  border-right-color: #575D6B;
  border-right-style: solid;
  border-right-width: 1px;
  padding: 10px 0 10px 0
`

export const StyledChatMain = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  
`
