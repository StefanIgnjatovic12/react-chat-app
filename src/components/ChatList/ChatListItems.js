import {
    StyledChatListItemsText,
    StyledChatListItemsContainer,
    StyledChatListItemsAvatar,
    StyledChatChatListSubtext
}
    from "../styles/ChatListItems.styled";
import {authRequestOptions} from "../../hooks/requestOptions";
import {useActiveConvo} from "../../context/ActiveConvoContext";

export default function ChatListItems({name, text, avatar}) {
    const {activeConvo, setActiveConvo} = useActiveConvo()
    let id = localStorage.getItem('currentUserID')

    const handleClick = () => {

        fetch(`http://127.0.0.1:5000/api/user-conversation-partner/${id}/${name}`,
            authRequestOptions(('GET')))
            .then(response => response.json())
            .then(data => { console.log(data)

                //set the state with messages from the first convo because it will have the newest message ergo it will be the chat opened by default upon loading
                // setOldMessages(data[0].messages)
            })
            .catch(error => console.log(error))
    }
    return (
        <StyledChatListItemsContainer onClick={handleClick}>
            <StyledChatListItemsAvatar avatar={avatar}/>
            <StyledChatListItemsText>
                <div>
                    {name}
                </div>
                <StyledChatChatListSubtext>
                    {text}
                </StyledChatChatListSubtext>
            </StyledChatListItemsText>
        </StyledChatListItemsContainer>
    )
}