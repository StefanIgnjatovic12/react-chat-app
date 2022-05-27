import {StyledChatList} from "../styles/ChatContainer.styled";
import ChatListItems from "./ChatListItems";
import {v4 as uuidv4} from "uuid"
import {useEffect, useState} from "react";
import {requestOptions} from "../../hooks/requestOptions";
import {useCurrentUser} from "../../context/CurrentUserContext";
import {useActiveConvo} from "../../context/ActiveConvoContext";
import useLocalStorage from "use-local-storage";


export default function ChatList() {
    const [sideBarMessages, setSideBarMessages] = useState(null)
    const [loading, setLoading] = useState(null)
    const {fetchCurrentUser} = useCurrentUser()
    const {setHeaderConvo, activeConvo, reloadSideBar, convoDeleteDone} = useActiveConvo()
    const [coloredArray, setColoredArray] = useState([]);
    const [convoIDArrayLocalStorage, setConvoIDArrayLocalStorage] = useLocalStorage('convoIDArrayLocalStorage', [])
    //fetch data to populate sidebar with convos, convo partner and last message in convo
    useEffect(() => {
        fetchCurrentUser().then(id => {
            id !== undefined && fetch(`http://127.0.0.1:5000/api/user-conversation-brief/${id}`, requestOptions('GET'))
                .then(response => response.json())
                .then(data => {
                    //set localstorage with the IDs of all convos loaded
                    let convoIDArray = []
                    data.forEach(convo => convoIDArray.push(convo.conv_id))
                    setConvoIDArrayLocalStorage(convoIDArray)

                    //have an array of booleans that signify whether a chat on the left has been clicked
                    // start array with only false with the same length as the data
                    setColoredArray(Array(data.length).fill(false))

                    setSideBarMessages(data)

                    //if active conversation is set, it means a different convo than the default
                    //one was selected so set headerConvo to that on page reload
                    //if no activeConvo, set headerConvo to the convo with the newest message
                    if (activeConvo) {
                        let filteredMessageArr = data.filter(convo => convo.conv_id == activeConvo)
                        setHeaderConvo(filteredMessageArr[0])
                    } else {
                        console.log('no active convo')
                        console.log(data[0])
                        setHeaderConvo(data[0])
                    }
                    setLoading(true)
                })
                .catch(error => console.log(error))
        })
    }, [reloadSideBar, convoDeleteDone])

    return (
        loading &&
        <StyledChatList>
            {sideBarMessages.map((convo, index) => (
                <ChatListItems
                    key={uuidv4()}
                    name={convo.conv_partner}
                    text={convo.last_message}
                    avatar={convo.avatar}
                    index={index}
                    coloredArray={coloredArray}


                />
            ))}
        </StyledChatList>


    )
}