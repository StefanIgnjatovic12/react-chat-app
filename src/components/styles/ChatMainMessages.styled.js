import styled from "styled-components";

export const StyledChatMainMessages = styled.div`
  border-bottom-color: #575D6B;
  border-bottom-style: solid;
  border-bottom-width: 1px;
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
  padding: 10px;
  background-color: #4E5566;
  border: none;
  border-radius: 25px;
  width: 80%

`

export const ChatMessageContainer = styled.div`
  flex: 1;
  min-height: 100px;
  overflow: auto;
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
`

export const ChatReceivedMessage = styled.li`
  background-color: #525A6D;
  width: 55%;
  margin: 8px auto 8px 8px;
  padding: 12px 8px;
  word-break: break-word;
  border-radius: 15px;
  color: white;
`