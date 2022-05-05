import {StyledChatMain} from "../styles/ChatContainer.styled";
import ChatMainTitle from "./ChatMainTitle";
import ChatMainMessages from "./ChatMainMessages";
import {useCurrentUser} from "../../context/CurrentUserContext";
import {useEffect} from "react";

export default function ChatMain(){
    const { currentUser, fetchCurrentUser } = useCurrentUser()
    useEffect(() => {
        fetchCurrentUser()
    },[])
    return (
        <StyledChatMain>
            <ChatMainTitle/>
            <ChatMainMessages/>
            {/*<ChatMainInput/>*/}
        </StyledChatMain>
    )
}