// import {StyledChatInput} from "./styles/ChatMainInput.styled";
import styled from 'styled-components'
import {useState} from "react";


const StyledChatInputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: auto;
  width: 80%
`
const StyledChatInput = styled.input`
  font-size: 14px;
  padding: 10px;
  background-color: #4E5566;
  border: none;
  border-radius: 25px;
  width: 80%

`
export default function ChatMainInput() {
    const [message, setMessage] = useState('')
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('Submitted')
        console.log(message)
    }

    const handleChange = (e) => {
        setMessage(e.target.value)

    }
    return (
        <StyledChatInputContainer>
            <StyledChatInput type="text" value={message} onChange={handleChange}/>
            <input type="image" src="/send-message.png" onClick={handleSubmit}/>
        </StyledChatInputContainer>
    )
}