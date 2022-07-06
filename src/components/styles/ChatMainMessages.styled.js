import styled from "styled-components";

export const StyledChatMainMessages = styled.div`
  border-bottom-color: #575D6B;
  border-bottom-style: solid;
  border-bottom-width: 1px;
  padding-bottom: 2%;
  height: 75%;
  

`
export const ChatInputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: auto;
  width: 80%
`
export const ChatInputBox = styled.input`
  font-size: 14px;
  color: white;
  font-family: "Quicksand Medium", serif;
  padding: 10px;
  background-color: #4E5566;
  border: none;
  border-radius: 25px;
  width: 85%;
  //remove default styling 
  overflow: auto;
  outline: none;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
  resize: none;
  //
`

export const ChatMessageContainer = styled.div`
  flex: 1;
  min-height: 100px;
  max-height: 100%;
  overflow-y: auto;
  ::-webkit-scrollbar {
    width: 0.25vw;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #B1B4BB ;
  }
  ::-webkit-scrollbar-track {
    background-color: #525A6D;
  }
`
export const ChatMessageList = styled.ol`
  list-style-type: none;
  padding: 0;
`

export const ChatMyMessage = styled.li`
  background-color: #7076FF;
  width: 55%;
  margin: 8px 8px 8px auto;
  padding: 12px 8px;
  word-break: break-word;
  border-radius: 15px;
  color: white;
  font-family: "Quicksand Medium", serif;
`

export const ChatReceivedMessage = styled.li`
  background-color: #525A6D;
  width: 55%;
  margin: 8px auto 8px 8px;
  padding: 12px 8px;
  word-break: break-word;
  border-radius: 15px;
  color: white;
  font-family: "Quicksand Medium", serif;
`

export const ChatNoMessagesYetContainer = styled.div`
  font-size: 15px;
  font-family: "Quicksand Medium", serif;
  color: white;
  height: 100% ;
  display: flex;
  justify-content: center;
  align-items: center;
`