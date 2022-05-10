import {StyledChatList} from "../styles/ChatContainer.styled";
import ChatListItems from "./ChatListItems";
import {v4 as uuidv4} from "uuid"
import {useEffect, useState} from "react";
import {requestOptions} from "../../hooks/requestOptions";
import {useCurrentUser} from "../../context/CurrentUserContext";
import {useNewestConvo} from "../../context/NewestConvoContext";

export default function ChatList() {
    const [sideBarMessages, setSideBarMessages] = useState(null)
    const [loading, setLoading] = useState(null)
    const {fetchCurrentUser} = useCurrentUser()
    const {setNewestConvo} = useNewestConvo()

    //fetch data to populate sidebar with convos, convo partner and last message in convo
    useEffect(() => {
        fetchCurrentUser().then(id => {
            id !== undefined && fetch(`http://127.0.0.1:5000/api/user-conversation-brief/${id}`, requestOptions('GET'))
                .then(response => response.json())
                .then(data => {
                    setSideBarMessages(data)
                    //set newest convo to be used as the chat header
                    setNewestConvo(data[0])
                    setLoading(true)
                })
                .catch(error => console.log(error))
        })
    }, [])

    // useEffect(() => {
    //     fetch(`http://127.0.0.1:5000/api/user-conversation-brief/${state}`, requestOptions('GET'))
    //         .then(response => response.json())
    //         .then(data => {
    //             setSideBarMessages(data)
    //             setLoading(true)
    //         })
    //         .catch(error => console.log(error))
    // }, [state])

    return (
        loading &&
        <StyledChatList>
            {sideBarMessages.map(convo => (
                <ChatListItems
                    key={uuidv4()}
                    name={convo.conv_partner}
                    text={convo.last_message}
                    avatar={convo.avatar}

                />
            ))}
        </StyledChatList>


    )
}