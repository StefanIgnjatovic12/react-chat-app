import {
    StyledChatList,
    StyledNoChatsYetModalContainer, StyledNoChatsYetModalImage,
    StyledNoChatsYetModalText
} from "../styles/ChatContainer.styled";
import ChatListItems from "./ChatListItems";
import {v4 as uuidv4} from "uuid"
import {useEffect, useState} from "react";
import {authRequestOptions, requestOptions} from "../../hooks/requestOptions";
import {useCurrentUser} from "../../context/CurrentUserContext";
import {useActiveConvo} from "../../context/ActiveConvoContext";
import useLocalStorage from "use-local-storage";
import {useCreateNewChat} from "../../context/CreateNewChatContext";
import {BeatLoader, MoonLoader} from "react-spinners";
import {suspend} from 'suspend-react'
//Modal
import Modal from 'react-modal';
import {useTogglerState} from "../../context/TogglerStateContext";


Modal.setAppElement(document.getElementById('root'));
const modalStyle = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#404757',
        borderRadius: '25px',
        boxShadow: '0 2px 15px rgb(0 0 0 / 68%)',
        padding: '2%',
        border: '0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '20vh',
        width: '28vw',
    }
}
export default function ChatList() {
    const [sideBarMessages, setSideBarMessages] = useState(null)
    const [loading, setLoading] = useState(null)
    const {fetchCurrentUser} = useCurrentUser()
    const {setHeaderConvo, activeConvo, reloadSideBar, convoDeleteDone} = useActiveConvo()
    const [coloredArray, setColoredArray] = useState([]);
    const [convoIDArrayLocalStorage, setConvoIDArrayLocalStorage] = useLocalStorage('convoIDArrayLocalStorage', [])
    const {newChatCreated, setNewChatCreated} = useCreateNewChat()
    const [modalOpen, setModalOpen] = useState(false)
    const {togglerStateArray} = useTogglerState()


useEffect(() => {

    fetchCurrentUser().then(id => {
        id !== undefined && fetch(`https://drf-react-chat-backend.herokuapp.com/api/user-conversation-brief/${id}`, requestOptions('GET'))
            .then(response => response.json())
            .then(data => {
                // console.log(data)
                //if user has no existing convos on redirect to chat, open modal
                if (data.length == 0) {
                    setModalOpen(true)
                }
                //set localstorage with the IDs of all convos loaded
                let convoIDArray = []
                data.forEach(convo => convoIDArray.push(convo.conv_id))
                setConvoIDArrayLocalStorage(convoIDArray)

                //have an array of booleans that signify whether a chat on the left has been clicked
                // for the active chat on signin/page load, want the ChatListItem to be highlited purple by default
                let tempArray = []
                data.forEach(convo => {
                    if (convo.conv_id == activeConvo) {
                        tempArray.push({convo_id: convo.conv_id, colored: true})
                    } else {
                        tempArray.push({convo_id: convo.conv_id, colored: false})
                    }

                })
                setColoredArray(tempArray)
                setSideBarMessages(data)

                //if active conversation is set, it means a different convo than the default
                //one was selected so set headerConvo to that on page reload
                //if no activeConvo, set headerConvo to the convo with the newest message
                if (activeConvo) {
                    let filteredMessageArr = data.filter(convo => convo.conv_id == activeConvo)
                    setHeaderConvo(filteredMessageArr[0])
                } else {
                    console.log('no active convo')
                    // console.log(data[0])
                    setHeaderConvo(data[0])
                }
                setLoading(true)

            })
            .catch(error => console.log(error))

    })
}, [reloadSideBar, convoDeleteDone, newChatCreated, togglerStateArray])

    if (!loading) {
        return (
            <StyledChatList>
                <BeatLoader/>
            </StyledChatList>

        )
    }

return (
    loading &&
    <>
        <Modal
            isOpen={modalOpen}
            style={modalStyle}
        >
            <StyledNoChatsYetModalContainer>

                <StyledNoChatsYetModalText>
                    Welcome to AnonChat, please click below to start chatting with a random user!
                </StyledNoChatsYetModalText>

                <StyledNoChatsYetModalImage
                    image={'/newchat.png'}
                    onClick={() => {

                        fetch(`https://drf-react-chat-backend.herokuapp.com/api/create-new-chat/`, authRequestOptions('GET'))
                            .then(response => response.json())
                            .then(data => {
                                console.log(data)
                                //state in context that will be used to tell
                                //other components to re-render once a new chat is created
                                setNewChatCreated(newChatCreated + 1)
                            })
                            .catch(error => console.log(error))

                        setModalOpen(false)
                    }}
                >
                </StyledNoChatsYetModalImage>

            </StyledNoChatsYetModalContainer>
        </Modal>
        {sideBarMessages === null
            ? <StyledChatList/>
            : <StyledChatList>
                {sideBarMessages.map((convo, index) => (
                    <ChatListItems
                        key={uuidv4()}
                        name={convo.conv_partner}
                        conv_partner_real_name={convo.conv_partner_real_name}
                        conv_id={convo.conv_id}
                        text={convo.last_message}
                        real_avatar={convo.real_avatar}
                        avatar={convo.avatar}
                        index={index}
                        coloredArray={coloredArray}
                        is_online={convo.is_online}

                    />
                ))}
            </StyledChatList>

        }
        {/*<StyledChatList>*/}
        {/*    {sideBarMessages.map((convo, index) => (*/}
        {/*        <ChatListItems*/}
        {/*            key={uuidv4()}*/}
        {/*            name={convo.conv_partner}*/}
        {/*            conv_partner_real_name={convo.conv_partner_real_name}*/}
        {/*            conv_id={convo.conv_id}*/}
        {/*            text={convo.last_message}*/}
        {/*            real_avatar={convo.real_avatar}*/}
        {/*            avatar={convo.avatar}*/}
        {/*            index={index}*/}
        {/*            coloredArray={coloredArray}*/}
        {/*            is_online={convo.is_online}*/}

        {/*        />*/}
        {/*    ))}*/}
        {/*</StyledChatList>*/}
    </>

)
}