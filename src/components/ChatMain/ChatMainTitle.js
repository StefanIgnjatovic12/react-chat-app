import {useNewestConvo} from "../../context/NewestConvoContext";
import {
    StyledChatMainTitle,
    StyledChatMainTitleContainer,
    StyledChatMainTitleText,
    StyledChatMainTitleAvatar,
    StyledChatMainTitleSubtext
} from "../styles/ChatMaiNTitle.styled";


export default function ChatMainTitle() {
    const {newestConvo} = useNewestConvo()
    return (
        <StyledChatMainTitle>
            <StyledChatMainTitleContainer>
                <StyledChatMainTitleAvatar avatar={newestConvo.avatar}/>
                <StyledChatMainTitleText>
                    {newestConvo &&
                        <>
                            <div>
                                {newestConvo.conv_partner}
                            </div>
                            <StyledChatMainTitleSubtext>
                                {newestConvo.last_message}
                            </StyledChatMainTitleSubtext>


                        </>
                    }


                </StyledChatMainTitleText>
            </StyledChatMainTitleContainer>
        </StyledChatMainTitle>

    )
}