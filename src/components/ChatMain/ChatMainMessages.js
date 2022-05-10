import styled from 'styled-components'
import {useChat} from '../../hooks/useChat'
import {useEffect, useState} from "react"
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
import {requestOptions} from "../../hooks/requestOptions";
import {authRequestOptions} from "../../hooks/requestOptions";
import {useCurrentUser} from "../../context/CurrentUserContext";

export default function ChatMainMessages() {
    const {roomId} = 'test' // Gets roomId from URL
    const {messages, sendMessage} = useChat(roomId); // Creates a websocket and manages messaging
    const [newMessage, setNewMessage] = useState(""); // Message to be sent
    const [oldMessages, setOldMessages] = useState([]) // Previous messages fetched from DB
    const {fetchCurrentUser} = useCurrentUser()


    const handleChange = (e) => {
        setNewMessage(e.target.value)
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        sendMessage(newMessage)
        setNewMessage("")
    }
    useEffect(() => {
        // Get current user ID and save it to localStorage
        fetchCurrentUser()
            .then(id => localStorage.setItem('currentUserID', id))
            .then(
                // Get all conversation data for current user to populate chats
                fetch(`http://127.0.0.1:5000/api/user-conversation/${localStorage.getItem('currentUserID')}`,
                    authRequestOptions(('GET')))
                    .then(response => response.json())
                    .then(data => console.log(data))
                    .catch(error => console.log(error))
            )
        // // Get all conversation data for current user to populate chats
        // fetch(`http://127.0.0.1:5000/api/user-conversation/${localStorage.getItem('currentUserID')}`,
        //     authRequestOptions(('GET')))
        //     .then(response => response.json())
        //     // .then(data => console.log(data))
        //     .catch(error => console.log(error))
    }, [])
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