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
    ChatReceivedMessage,
    ChatNoMessagesYetContainer
} from '../styles/ChatMainMessages.styled'
import {authRequestOptions} from "../../hooks/requestOptions";
import {useCurrentUser} from "../../context/CurrentUserContext";
import {useActiveConvo} from "../../context/ActiveConvoContext";


export default function ChatMainMessages() {
    const {sendMessage} = useChat(); // Creates a websocket and manages messaging
    const [newMessage, setNewMessage] = useState(""); // Message to be sent
    // const [messages, setMessages] = useState([]) // Previous messages fetched from DB
    const {fetchCurrentUser} = useCurrentUser()
    const {
        messages, setMessages, activeConvo, setActiveConvo, convoDeleteDone,
    } = useActiveConvo()
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
                fetch(`https://drf-react-chat-backend.herokuapp.com/api/user-conversation/${id}`, authRequestOptions(('GET')))
                    .then(response => response.json())
                    .then(data => {
                        //if active conversation is set, it means a different convo than the default
                        //one was selected so set messages to that on page reload
                        //if no activeConvo, set messages to the convo with the newest message
                        if (activeConvo) {
                            let filteredMessageArr = data.filter(convo => convo.id == activeConvo)
                            setMessages(filteredMessageArr[0].messages)
                        } else {
                            setActiveConvo(data[0].id)
                            setMessages(data[0].messages)
                        }
                    })
                    .catch(error => console.log(error))
            })
    }, [convoDeleteDone])
    return (
        <>
            {messages == null || messages.length == 0 ? <StyledChatMainMessages>
                    <ChatNoMessagesYetContainer>
                        There are no messages in this chat yet...
                    </ChatNoMessagesYetContainer>
                </StyledChatMainMessages>

                : <StyledChatMainMessages>
                    <ChatMessageContainer>
                        <ChatMessageList>
                            {/*Map over messages saved in database and load them in chat*/}
                            {messages && messages.map((message) => (message.created_by == localStorage.getItem('currentUserID') ?
                                    <ChatMyMessage
                                        key={uuidv4()}
                                    >
                                        {message.message}
                                    </ChatMyMessage> : <ChatReceivedMessage
                                        key={uuidv4()}
                                    >
                                        {message.message}

                                    </ChatReceivedMessage>))}
                        </ChatMessageList>
                    </ChatMessageContainer>
                </StyledChatMainMessages>}

            <ChatInputContainer>

                <ChatInputBox type="text" value={newMessage} onChange={handleChange}/>
                <input
                    type="image"
                    src="/send-message-test.png"
                    onClick={handleSubmit}
                />

            </ChatInputContainer>
        </>)
}