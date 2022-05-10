import {useActiveConvo} from "../../context/ActiveConvoContext";
import {
    StyledChatMainTitle,
    StyledChatMainTitleContainer,
    StyledChatMainTitleText,
    StyledChatMainTitleAvatar,
    StyledChatMainTitleSubtext
} from "../styles/ChatMainTitle.styled";


export default function ChatMainTitle() {
    const {activeConvo} = useActiveConvo()

    return (
        <StyledChatMainTitle>
            <StyledChatMainTitleContainer>
                {/*{newestConvo.avatar != null && <StyledChatMainTitleAvatar avatar={newestConvo.avatar}/>}*/}

                <StyledChatMainTitleText>
                    {activeConvo &&
                        <>
                            <div>
                                {activeConvo.conv_partner}
                            </div>
                            <StyledChatMainTitleSubtext>
                                {activeConvo.last_message}
                            </StyledChatMainTitleSubtext>


                        </>
                    }


                </StyledChatMainTitleText>
            </StyledChatMainTitleContainer>
        </StyledChatMainTitle>

    )
}