import {StyledChatContainer} from "./styles/ChatContainer.styled";
import ChatLinkBar from "./ChatLinkBar";
import ChatList from "./ChatList/ChatList"
import ChatMain from "./ChatMain/ChatMain";
import styled from 'styled-components'
import {useEffect, useState} from "react";
import {authRequestOptions} from "../hooks/requestOptions";
import ProfileCreateForm from "./UserProfile/ProfileCreateForm";
import {BeatLoader} from "react-spinners";


export const ChatBackground = styled.div`
  display: flex;
  height: 100vh;
  background-color: #A2A9C0;
  justify-content: center;
  align-items: center;
`

export default function ChatContainer() {
    const [userProfileFilledOut, setUserProfileFilledOut] = useState(null)
    const [childComponentsLoadingCounter, setChildComponentsLoadingCounter] = useState(0)
    useEffect(() => {
        console.log('useEffect Ran')
        fetch(`https://drf-react-chat-backend.herokuapp.com/api/profile-check-first-signin/`,
            authRequestOptions('GET'))
            .then(response => response.json())
            .then(data => setUserProfileFilledOut(data.profile_filled_check))
            .catch(error => console.log(error))
    }, [])

    if (childComponentsLoadingCounter === 3) {
        return (

            userProfileFilledOut
                ?
                <ChatBackground>
                    <StyledChatContainer>
                        <ChatLinkBar
                            childComponentsLoadingCounter={childComponentsLoadingCounter}
                            setChildComponentsLoadingCounter={setChildComponentsLoadingCounter}
                        />
                        <ChatList
                            childComponentsLoadingCounter={childComponentsLoadingCounter}
                            setChildComponentsLoadingCounter={setChildComponentsLoadingCounter}

                        />
                        <ChatMain
                            childComponentsLoadingCounter={childComponentsLoadingCounter}
                            setChildComponentsLoadingCounter={setChildComponentsLoadingCounter}

                        />
                    </StyledChatContainer>
                </ChatBackground>

                : <ProfileCreateForm setUserProfileFilledOut={setUserProfileFilledOut}/>

        )
    }
    return (
        <BeatLoader/>
    )
}