import styled from 'styled-components'
import {useChat} from '../../hooks/useChat'
import {useEffect, useState, useRef} from "react"
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

        fetchCurrentUser()
            .then(id => {
                    localStorage.setItem('currentUserID', id)
                    fetch(`http://127.0.0.1:5000/api/user-conversation/${id}`,
                        authRequestOptions(('GET')))
                        .then(response => response.json())
                        .then(data => {
                            console.log(data[0])
                            //set the state with messages from the first convo because it will have the newest message ergo it will be the chat opened by default upon loading
                            setOldMessages(data[0].messages)
                        })
                        .catch(error => console.log(error))
                }
            )
    }, [])
    return (
        <>

            <StyledChatMainMessages>
                    <ChatMessageContainer>
                        <ChatMessageList>
                            {/*Map over messages saved in database and load them in chat*/}
                            {oldMessages && oldMessages.map((message, i) => (
                                message.created_by == localStorage.getItem('currentUserID')
                                    ?
                                    <ChatMyMessage
                                        key={uuidv4()}
                                    >
                                        {message.message}
                                    </ChatMyMessage>
                                    :
                                    <ChatReceivedMessage
                                        key={uuidv4()}
                                    >
                                        {message.message}

                                    </ChatReceivedMessage>
                            ))}
                            {/*Map over new messages sent since the chat has been reopened */}
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