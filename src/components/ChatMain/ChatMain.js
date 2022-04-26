import {StyledChatMain} from "../styles/ChatContainer.styled";
import ChatMainTitle from "./ChatMainTitle";
import ChatMainMessages from "./ChatMainMessages";
import ChatMainInput from "./ChatMainInput";
export default function ChatMain(){
    return (
        <StyledChatMain>
            <ChatMainTitle/>
            <ChatMainMessages/>
            <ChatMainInput/>
        </StyledChatMain>
    )
}