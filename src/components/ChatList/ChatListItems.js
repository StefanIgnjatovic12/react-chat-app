import {
    StyledChatListItemsText,
    StyledChatListItemsContainer,
    StyledChatListItemsAvatar
}
    from "../styles/ChatListItems.styled";

export default function ChatListItems({name, text, avatar}) {
    return (
        <StyledChatListItemsContainer>
            <StyledChatListItemsAvatar avatar={avatar}/>
            <StyledChatListItemsText>
                <div>
                    {name}
                </div>
                <div>
                    {text}
                </div>
            </StyledChatListItemsText>
        </StyledChatListItemsContainer>
    )
}