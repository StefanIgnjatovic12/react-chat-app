import {StyledChatList} from "../styles/ChatContainer.styled";
import ChatListItems from "./ChatListItems";

export default function ChatList(){
    const demoData = [
        {
            name: "John",
            subtext: "Say hello",
            avatar: "/users-1.svg"

        },

        {
            name: "Mike",
            subtext: "Say hello",
            avatar: "/users-2.svg"


        },

        {
            name: "Julia",
            subtext: "Say hello",
            avatar: "/users-3.svg"


        }
    ]
    return (
        <StyledChatList>
            {demoData.map(user => (
                <ChatListItems
                    name={user.name}
                    text={user.subtext}
                    avatar={user.avatar}

                />
            ))}


        </StyledChatList>
    )
}