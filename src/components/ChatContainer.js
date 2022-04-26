import {StyledChatContainer} from "./styles/ChatContainer.styled";
import ChatLinkBar from "./ChatLinkBar";
import ChatList from "./ChatList/ChatList"
import ChatMain from "./ChatMain/ChatMain";


export default function ChatContainer() {
    return(
        <StyledChatContainer>
            <ChatLinkBar/>
            <ChatList/>
            <ChatMain/>
        </StyledChatContainer>

    )
}