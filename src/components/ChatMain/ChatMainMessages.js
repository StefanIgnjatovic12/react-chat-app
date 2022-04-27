import styled from 'styled-components'
import {useChat} from '../../hooks/useChat'
import {useState} from "react"
import {v4 as uuidv4} from "uuid"
import {
    StyledChatMainMessages,
    ChatInputContainer,
    ChatInputBox,
    ChatMessageContainer,
    ChatMessageList,
    ChatMyMessage,
    ChatReceivedMessage
} from '../styles/ChatMainMessages.styled'


export default function ChatMainMessages() {
    const {roomId} = 'test' // Gets roomId from URL
    const {messages, sendMessage} = useChat(roomId); // Creates a websocket and manages messaging
    const [newMessage, setNewMessage] = useState(""); // Message to be sent

    const handleChange = (e) => {
        setNewMessage(e.target.value)
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        sendMessage(newMessage)
        setNewMessage("")
    };
    return (
        <>

            <StyledChatMainMessages>

                <ChatMessageContainer>

                    <ChatMessageList>

                        {messages.map((message, i) => (
                            message.ownedByCurrentUser
                                ?
                                <ChatMyMessage
                                    key={uuidv4()}
                                >
                                    {message.body}
                                </ChatMyMessage>
                                :
                                <ChatReceivedMessage
                                    key={uuidv4()}
                                >
                                    {message.body}
                                </ChatReceivedMessage>
                        ))}
                    </ChatMessageList>

                </ChatMessageContainer>

            </StyledChatMainMessages>

            <ChatInputContainer>

                <ChatInputBox type="text" value={newMessage} onChange={handleChange}/>
                <input type="image" src="/send-message.png" onClick={handleSubmit}/>

            </ChatInputContainer>
        </>
    )
}