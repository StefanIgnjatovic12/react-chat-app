import {StyledChatLinkBar} from "./styles/ChatContainer.styled";
import styled from 'styled-components'
import {useNavigate} from "react-router-dom";
import {authRequestOptions} from "../hooks/requestOptions";
import {useCreateNewChat} from "../context/CreateNewChatContext";
import {usePopper} from "react-popper";
import {StyledChatMainTitlePopup} from "./styles/ChatMainTitle.styled";
import {useState} from "react";
import {useActiveConvo} from "../context/ActiveConvoContext";

const StyledChatLinkIcon = styled.div`
  background-image: url(${props => props.icon});
  height: 1.875rem;
  width: 1.875rem;
  background-size: cover;
  background-position: top center;
  margin-top: 75%;
  cursor: pointer;

  :hover {
    filter: invert(69%) sepia(23%) saturate(126%) hue-rotate(185deg) brightness(84%) contrast(83%);
  }

  //  #B1B4BB
`

const StyledChatLinkIconContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 60%;
  justify-content: flex-start;
  align-items: center;
`
export default function ChatLinkBar() {
    const {newChatCreated, setNewChatCreated} = useCreateNewChat()
    const {setActiveConvo, setMessages} = useActiveConvo()
    const navigate = useNavigate()
    const [elementHoveredOn, setElementHoveredOn] = useState(null)
    const [referenceElement, setReferenceElement] = useState()
    const [popperElement, setPopperElement] = useState()
    const [showPopper, setShowPopper] = useState(false)
    let {styles, attributes} = usePopper(referenceElement, popperElement, {placement: "top"})
    const handleMouseEnter = (e) => {
        setElementHoveredOn(e.target.getAttribute('name'))
        setShowPopper(true)
    }
    const handleMouseLeave = () => {
        setElementHoveredOn(null)
        setShowPopper(false)
    }
    return (
        <StyledChatLinkBar>
            <StyledChatLinkIconContainer>
                {showPopper && <StyledChatMainTitlePopup
                    ref={setPopperElement}
                    style={styles.popper}
                    {...attributes.popper}
                >
                    {
                        elementHoveredOn === 'profile'
                            ? "Profile"
                            : elementHoveredOn === "newchat"
                                ? 'Create new chat'
                                : elementHoveredOn === "github"
                                    ? 'Github'
                                    : elementHoveredOn === "signout"
                                        ? 'Sign Out'
                                        : null

                    }
                </StyledChatMainTitlePopup>}
                <StyledChatLinkIcon
                    icon={'/profile.png'}
                    onClick={() => navigate('/profile')}
                    ref={elementHoveredOn === 'profile' ? setReferenceElement : null}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    name={'profile'}
                />
                <StyledChatLinkIcon
                    icon={'/newchatgray.png'}
                    onClick={() => {

                        fetch(`https://drf-react-chat-backend.herokuapp.com/api/create-new-chat/`, authRequestOptions('GET'))
                            .then(response => response.json())
                            .then(data => {
                                console.log(data)
                                //state in context that will be used to tell
                                //other components to re-render once a new chat is created
                                setActiveConvo(data[0].convo_id)
                                setMessages(data[0].messages)
                                setNewChatCreated(newChatCreated + 1)
                            })
                            .catch(error => console.log(error))


                    }}
                    ref={elementHoveredOn === 'newchat' ? setReferenceElement : null}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    name={'newchat'}
                />
                <StyledChatLinkIcon
                    icon={'/github.png'}
                    ref={elementHoveredOn === 'github' ? setReferenceElement : null}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    name={'github'}
                    onClick={() => {
                        navigate('//github.com/StefanIgnjatovic12/')
                    }}
                />


                <StyledChatLinkIcon
                    icon={'/log-out.png'}
                    onClick={() => navigate('/signout')}
                    ref={elementHoveredOn === 'signout' ? setReferenceElement : null}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    name={'signout'}

                />


            </StyledChatLinkIconContainer>
        </StyledChatLinkBar>
    )
}