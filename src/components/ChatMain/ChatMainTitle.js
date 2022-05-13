import {useActiveConvo} from "../../context/ActiveConvoContext";
import {
    StyledChatMainTitle,
    StyledChatMainTitleContainer,
    StyledChatMainTitleText,
    StyledChatMainTitleAvatar,
    StyledChatMainTitleSubtext
} from "../styles/ChatMainTitle.styled";


export default function ChatMainTitle() {
    const {headerConvo} = useActiveConvo()
    // console.log('headerConvo:')
    // console.log(headerConvo)
    return (
        <StyledChatMainTitle>
            <StyledChatMainTitleContainer>
                {/*{newestConvo.avatar != null && <StyledChatMainTitleAvatar avatar={newestConvo.avatar}/>}*/}

                <StyledChatMainTitleText>
                    {headerConvo &&
                        <>
                            <div>
                                {headerConvo.conv_partner}
                            </div>
                            <StyledChatMainTitleSubtext>
                                {headerConvo.last_message}
                            </StyledChatMainTitleSubtext>


                        </>
                    }


                </StyledChatMainTitleText>
            </StyledChatMainTitleContainer>
        </StyledChatMainTitle>

    )
}