import {StyledChatContainer} from "./styles/ChatContainer.styled";
import ChatLinkBar from "./ChatLinkBar";
// import ChatList from "./ChatList/ChatList"
// import ChatMain from "./ChatMain/ChatMain";
import styled from 'styled-components'
import {useEffect, useState} from "react";
import {authRequestOptions} from "../hooks/requestOptions";
import ProfileCreateForm from "./UserProfile/ProfileCreateForm";
import {BeatLoader} from "react-spinners";
import React, {Suspense} from "react";

const ChatList = React.lazy(() => import("./ChatList/ChatList"))
const ChatMain = React.lazy(() => import("./ChatMain/ChatMain"))
const Placeholder = styled.div`
  background-color: yellow;
`
export const ChatBackground = styled.div`
  display: flex;
  height: 100vh;
  background-color: #A2A9C0;
  justify-content: center;
  align-items: center;
`

export default function ChatContainer() {
    const [userProfileFilledOut, setUserProfileFilledOut] = useState('initial')
    useEffect(() => {
        console.log('useEffect Ran')
        fetch(`https://drf-react-chat-backend.herokuapp.com/api/profile-check-first-signin/`,
            authRequestOptions('GET'))
            .then(response => response.json())
            .then(data => setUserProfileFilledOut(data.profile_filled_check))
            .catch(error => console.log(error))
    }, [])


    return (
        userProfileFilledOut === 'initial'
            ? <ChatBackground><BeatLoader color={"#404757"}/></ChatBackground>
            : userProfileFilledOut
                ? <ChatBackground>
                    <StyledChatContainer>
                        <ChatLinkBar/>
                        <Suspense fallback={<Placeholder/>}>
                            <ChatList/>
                        </Suspense>
                        <Suspense fallback={<Placeholder/>}>
                            <ChatMain/>
                        </Suspense>
                    </StyledChatContainer>
                </ChatBackground>

                : <ProfileCreateForm setUserProfileFilledOut={setUserProfileFilledOut}/>

    )
}