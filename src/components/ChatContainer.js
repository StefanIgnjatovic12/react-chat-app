import {StyledChatContainer} from "./styles/ChatContainer.styled";
import ChatLinkBar from "./ChatLinkBar";
import ChatList from "./ChatList/ChatList"
import ChatMain from "./ChatMain/ChatMain";

import styled from 'styled-components'

export const ChatBackground = styled.div`
  display: flex;
  height: 100vh;
  background-color: #A2A9C0;
  justify-content: center;
  align-items: center;
`

export default function ChatContainer() {
    return (
        <ChatBackground>
            <StyledChatContainer>
                <ChatLinkBar/>
                <ChatList/>
                <ChatMain/>
            </StyledChatContainer>
        </ChatBackground>

    )
}