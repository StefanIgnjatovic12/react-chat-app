import {StyledChatLinkBar} from "./styles/ChatContainer.styled";
import styled from 'styled-components'
import {Link, useNavigate} from "react-router-dom";
import {authRequestOptions, requestOptions} from "../hooks/requestOptions";
import {useCreateNewChat} from "../context/CreateNewChatContext";
import {usePopper} from "react-popper";
import {StyledChatMainTitlePopup} from "./styles/ChatMainTitle.styled";
import {useState} from "react";

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

                        fetch(`http://127.0.0.1:5000/api/create-new-chat/`, authRequestOptions('GET'))
                            .then(response => response.json())
                            .then(data => {
                                console.log(data)
                                //state in context that will be used to tell
                                //other components to re-render once a new chat is created
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

                        fetch(`http://127.0.0.1:5000/api/test/`, requestOptions('POST'))
                            .then(response => console.log(response.json()))
                            .then(data => {
                                console.log(data)
                                //state in context that will be used to tell
                                //other components to re-render once a new chat is created

                            })
                            .catch(error => console.log(error))


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