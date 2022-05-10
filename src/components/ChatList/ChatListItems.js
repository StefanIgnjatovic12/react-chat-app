import {
    StyledChatListItemsText,
    StyledChatListItemsContainer,
    StyledChatListItemsAvatar,
    StyledChatChatListSubtext
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
                <StyledChatChatListSubtext>
                    {text}
                </StyledChatChatListSubtext>
            </StyledChatListItemsText>
        </StyledChatListItemsContainer>
    )
}