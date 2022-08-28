import {StyledChatContainer} from "./styles/ChatContainer.styled";
// import ChatLinkBar from "./ChatLinkBar";
// import ChatList from "./ChatList/ChatList"
// import ChatMain from "./ChatMain/ChatMain";
import styled from 'styled-components'
import {useEffect, useState} from "react";
import {authRequestOptions} from "../hooks/requestOptions";
import ProfileCreateForm from "./UserProfile/ProfileCreateForm";
import {BeatLoader} from "react-spinners";
import React, {lazy, Suspense} from "react";

const ChatMain = lazy(() => import("./ChatMain/ChatMain"))
const ChatList = lazy(() => import("./ChatList/ChatList"))
const ChatLinkBar = lazy(() => import("./ChatLinkBar"))

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
        // userProfileFilledOut === 'initial'
        //     ? <ChatBackground><BeatLoader color={loadingSpinnerColor}/></ChatBackground>
        //     :
            userProfileFilledOut
                ? <ChatBackground>
                    <Suspense fallback={<ChatBackground><BeatLoader color={"#404757"}/></ChatBackground>}>
                        <StyledChatContainer>
                            <ChatLinkBar/>
                            <ChatList/>
                            <ChatMain/>
                        </StyledChatContainer>
                    </Suspense>
                </ChatBackground>
                : <ProfileCreateForm setUserProfileFilledOut={setUserProfileFilledOut}/>

    )
}