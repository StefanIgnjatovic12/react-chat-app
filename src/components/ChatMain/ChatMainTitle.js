import {useActiveConvo} from "../../context/ActiveConvoContext";
import {
    StyledChatMainTitle,
    StyledChatMainTitleContainer,
    StyledChatMainTitleText,
    StyledChatMainTitleAvatar,
    StyledChatMainTitleSubtext,
    StyledChatMainTitleRevealButton,
    StyledChatMainTitlePopup
} from "../styles/ChatMainTitle.styled";
import {useState} from "react";
import {useCurrentUser} from "../../context/CurrentUserContext";
import {authRequestOptions} from "../../hooks/requestOptions";


export default function ChatMainTitle() {
    const {fetchCurrentUser} = useCurrentUser()
    const {headerConvo, activeConvo} = useActiveConvo()

    const [showPopup, setShowPopup] = useState(false)

    const handleClick = () => {
        let payload = {
            //if active convo is set, use the ID of that convo, else use the id of the convo for the header convo

            conversation: activeConvo ? activeConvo : headerConvo.conv_id
        }
        fetch(`http://127.0.0.1:5000/api/reveal-profile/`, authRequestOptions('POST', payload))
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.log(error))
    }
    // const handleMouseEnter = () => {
    //     console.log('mouse over')
    //     setShowPopup(true);
    // }
    //
    // const handleMouseLeave = () => {
    //     console.log('mouse out')
    //     setShowPopup(false);
    // }
    return (
        <StyledChatMainTitle>
            <StyledChatMainTitleContainer>
                {/*{newestConvo.avatar != null && <StyledChatMainTitleAvatar avatar={newestConvo.avatar}/>}*/}

                <StyledChatMainTitleText>
                    {headerConvo &&
                        <>
                            <div >
                                {headerConvo.conv_partner}
                            </div>
                            <StyledChatMainTitleSubtext>
                                {headerConvo.last_message}
                            </StyledChatMainTitleSubtext>


                        </>
                    }


                </StyledChatMainTitleText>

                <StyledChatMainTitleRevealButton
                    onClick={handleClick}
                    // onMouseEnter={() => setShowPopup(true)}
                    // onMouseLeave={() => setShowPopup(false)}
                >
                    Reveal profile

                </StyledChatMainTitleRevealButton>
                {showPopup && <StyledChatMainTitlePopup/>}

            </StyledChatMainTitleContainer>
        </StyledChatMainTitle>

    )
}