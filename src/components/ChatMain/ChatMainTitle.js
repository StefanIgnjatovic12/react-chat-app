import {useActiveConvo} from "../../context/ActiveConvoContext";
import {
    StyledChatMainTitle,
    StyledChatMainTitleContainer,
    StyledChatMainTitleText,
    StyledChatMainTitleAvatar,
    StyledChatMainTitleSubtext,
    StyledChatMainTitleButton,
    Test,
    StyledChatMainTitleButtonContainer,
    StyledChatMainTitleAvatarTextContainer,
    StyledChatMainTitleTextContainer,
    TogglerContainer, StyledChatMainTitlePopup, StyledChatMainTitleClickableIcon
} from "../styles/ChatMainTitle.styled";
import {useEffect, useRef, useState} from "react";
import {useCurrentUser} from "../../context/CurrentUserContext";
import {authRequestOptions} from "../../hooks/requestOptions";
import Modal from 'react-modal';
import Profile from "../UserProfile/Profile";
import ProfilePopup from "../UserProfile/ProfilePopup";
import ToggleButton from 'react-toggle-button'
import {usePopper} from 'react-popper';
import {useProfileReveal} from "../../context/ProfileRevealContext";
import useLocalStorage from "use-local-storage";
import {useTogglerState} from "../../context/TogglerStateContext";

Modal.setAppElement(document.getElementById('root'));
//style to use for Modal when it contains the profile data
const profileModalStyle = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#404757',
        borderRadius: '25px',
        boxShadow: '0 2px 15px rgb(0 0 0 / 68%)',
        padding: '2%',
        border: '0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxheight: '70vh',
        width: '30vw',
        // overflowY: 'auto'
    }
}
//style to use for Modal when the convo partner hasn't revealed their profile
const deniedModalStyle = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#404757',
        borderRadius: '25px',
        boxShadow: '0 2px 15px rgb(0 0 0 / 68%)',
        padding: '2%',
        border: '0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '20vh',
        width: '28vw',
        // overflowY: 'auto'
    }
}
export default function ChatMainTitle() {
    const {headerConvo, activeConvo, setActiveConvo, convoDeleteDone, setConvoDeleteDone} = useActiveConvo()
    //state for managing in-session clicks on reveal button ie locally and not from DB
    const [localRevealStatus, setLocalRevealStatus] = useState([])
    //state for managing reveal status for convo partner in the active convo from the DB
    const [storedRevealStatus, setStoredRevealStatus] = useState(false)
    //state for managing if the Modal is opened or not
    const [modalOpen, setModalOpen] = useState(false)

    //togglerState is the state of the toggler within the component
    // which corresponds to the profile reveal status
    const [togglerState, setTogglerState] = useLocalStorage('togglerState', false)
    //Array which contains the toggler state and id of each of the conversations
    //required in order for the individual ChatListItems to know what the state
    //of their individual togglers is and for the name on there to change at the
    //same time as the name in the ChatMainTitle
    const {togglerStateArray, setTogglerStateArray} = useTogglerState()

    //profileReveal is that same state but available globally
    const {setProfileReveal} = useProfileReveal()

    const [elementHoveredOn, setElementHoveredOn] = useState(null)
    const [referenceElement, setReferenceElement] = useState()
    const [popperElement, setPopperElement] = useState()
    const [showPopper, setShowPopper] = useState(false)
    let {styles, attributes} = usePopper(referenceElement, popperElement, {placement: "top"})
    useEffect(() => {
        //Call to the check if partner in convo has revealed their profile for that convo
        if (activeConvo) {
            fetch(`http://127.0.0.1:5000/api/check-reveal-status/${activeConvo}`, authRequestOptions('GET'))
                .then(response => response.json())
                .then(data => {
                        setStoredRevealStatus(data)
                        //set the toggler on page load based on revealed status fetched from DB
                        setTogglerState(data.revealed)
                        //togglerStateArray is updated each time the user clicks on another convo
                        //from the ChatList. Function prevents duplicates from being added
                        setTogglerStateArray((prevState) => {
                            if (prevState && prevState.every((convo) => convo !== undefined)) {
                                if (prevState.some(({
                                                        user_id,
                                                        convo_id,
                                                        revealed
                                                    }) => user_id === data.user_id && convo_id === data.convo_id && revealed === data.revealed)) {
                                    return prevState
                                } else {
                                    return [...prevState, data]
                                }
                            }
                        })
                        setProfileReveal(data.revealed)
                    }
                )
                .catch(error => console.log(error))
        }

    }, [activeConvo])

    const handleMouseEnter = (e) => {
        setElementHoveredOn(e.target.getAttribute('name'))
        setShowPopper(true)
    }
    const handleMouseLeave = () => {
        setElementHoveredOn(null)
        setShowPopper(false)
    }
    const handleModalOpen = () => setModalOpen(true)
    const handleModalClose = () => setModalOpen(false)


    const handleReveal = () => {

        let payload = {
            //if active convo is set, use the ID of that convo, else use the id of the convo for the header convo
            conversation: activeConvo ? activeConvo : headerConvo.conv_id
        }
        fetch(`http://127.0.0.1:5000/api/reveal-profile/`, authRequestOptions('POST', payload))
            .then(response => response.json())
            .then(data => {
                console.log(data)
            })
            .catch(error => console.log(error))
        //set the revealed status on the 'local' state so as not to have to make another
        //call to get the updated reveal status after making the call to set it
        setLocalRevealStatus(revealClicked => [...revealClicked, {
            convo: activeConvo ? activeConvo : headerConvo.conv_id,
            clicked: true
        }])
        // }
    }
    //Filter the revealClicked array to get a new array if there existed an object for the
    //convo in question within the original array
    let filteredRevealArray = localRevealStatus.filter(c => (c.convo === activeConvo && c.clicked === true) || (c.convo === headerConvo.conv_id && c.clicked === true))

    const handleHide = () => {

        let payload = {
            //if active convo is set, use the ID of that convo, else use the id of the convo for the header convo
            conversation: activeConvo ? activeConvo : headerConvo.conv_id
        }
        fetch(`http://127.0.0.1:5000/api/hide-profile/`, authRequestOptions('POST', payload))
            .then(response => response.json())
            .then(data => {
                console.log(data)
            })
            .catch(error => console.log(error))

    }
    const handleDelete = () => {
        fetch(`http://127.0.0.1:5000/api/delete-convo/${activeConvo ? activeConvo : headerConvo.conv_id}`, authRequestOptions('DELETE'))
            .then(response => response.json())
            .catch(error => console.log(error))
        setConvoDeleteDone(convoDeleteDone + 1)
        //once a convo is deleted, set the active convo to the first convo remaining
        //ie set the active convo to the first convo ID in the array in LS
        setActiveConvo(localStorage.getItem('convoIDArrayLocalStorage')[1])

    }
    return (


        <StyledChatMainTitle>
            <StyledChatMainTitleContainer>
                {/*{newestConvo.avatar != null && <StyledChatMainTitleAvatar avatar={newestConvo.avatar}/>}*/}
                <Modal
                    isOpen={modalOpen}
                    // onAfterOpen={afterOpenModal}
                    onRequestClose={handleModalClose}
                    style={filteredRevealArray.length > 0 || (storedRevealStatus.revealed && storedRevealStatus.convo_id === activeConvo) ? profileModalStyle : deniedModalStyle}
                    contentLabel="Example Modal"
                >
                    <ProfilePopup/>
                </Modal>
                <StyledChatMainTitleAvatarTextContainer>
                    {/*<StyledChatMainTitleAvatar avatar={headerConvo.avatar}/>*/}
                    <StyledChatMainTitleTextContainer>
                        {headerConvo &&
                            <>
                                {/*finish this so the avatar also shows in the title*/}
                                {/*<div>*/}
                                {/*    {togglerState ? headerConvo.avatar : headerConvo.real_avatar}*/}

                                {/*</div>*/}
                                <div>
                                    {togglerState ? headerConvo.conv_partner_real_name : headerConvo.conv_partner}
                                </div>
                                <StyledChatMainTitleSubtext>
                                    {
                                        headerConvo.last_message.length > 25
                                            ? headerConvo.last_message.substring(0, 40) + "..."
                                            : headerConvo.last_message
                                    }
                                </StyledChatMainTitleSubtext>


                            </>
                        }


                    </StyledChatMainTitleTextContainer>
                </StyledChatMainTitleAvatarTextContainer>
                <StyledChatMainTitleButtonContainer>

                    {/*popper element*/}
                    {showPopper && <StyledChatMainTitlePopup
                        ref={setPopperElement}
                        style={styles.popper}
                        {...attributes.popper}
                    >
                        {
                            elementHoveredOn === 'toggleProfile'
                                ? "Show or hide your profile from conversation partner"
                                : elementHoveredOn === "seeProfile"
                                    ? 'See your conversation partners real profile details'
                                    : elementHoveredOn === "deleteChat"
                                        ? 'Delete chat'
                                        : "Show or hide your profile from conversation partner"

                        }
                    </StyledChatMainTitlePopup>}

                    {/*toggler element*/}
                    <TogglerContainer
                        //only setReferenceElement if ToggleContainer was the element that was hovered over
                        ref={elementHoveredOn === 'toggleProfile' ? setReferenceElement : null}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        name={'toggleProfile'}

                    >
                        <ToggleButton
                            value={togglerState}
                            onToggle={(value) => {
                                setTogglerState(!value)
                                //map through the array of togglers (1 for each convo) and match each to
                                //the active/header convo; if match found, change the revealed status for
                                //that convo
                                 setTogglerStateArray(
                                    togglerStateArray.map((toggler) => {
                                            if (toggler.convo_id === activeConvo || toggler.convo_id === headerConvo.conv_id) {
                                                return {...toggler, 'revealed': !toggler.revealed }
                                            } else {
                                                return toggler
                                            }
                                        }
                                    )
                                )
                                setProfileReveal(!value)
                                setShowPopper(false)
                                //if it says ON on the toggler, run handleReveal. If OFF, handleHide
                                if (!value) {
                                    handleReveal()
                                } else {
                                    handleHide()
                                }

                            }
                            }
                            colors={{
                                activeThumb: {
                                    base: '#F6F6F6',
                                },
                                inactiveThumb: {
                                    base: '#F6F6F6',
                                },
                                inactive: {
                                    base: '#636c83',
                                    hover: '#7c869c',
                                },
                                active: {
                                    base: '#7076FF',
                                    hover: '#7F7AF8',
                                }
                            }}


                        />
                    </TogglerContainer>


                    {/*see profile element*/}
                    <StyledChatMainTitleClickableIcon
                        //only setReferenceElement if seeProfile icon was the element that was hovered over
                        ref={elementHoveredOn === 'seeProfile' ? setReferenceElement : null}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        name={'seeProfile'}
                        icon={togglerState ? '/binoculars.png' : '/binocularscolored.png'}
                        onClick={() => {
                            //if toggler is showing ON then open the modal
                            handleModalOpen()
                            // togglerState && handleModalOpen()
                            // if (filteredRevealArray.length > 0 || (storedRevealStatus.revealed && storedRevealStatus.convo_id === activeConvo)) {
                            //     handleModalOpen()
                            // }
                        }}
                    />

                    {/*delete chat element*/}
                    <StyledChatMainTitleClickableIcon
                        //only setReferenceElement if deleteChat icon was the element that was hovered over
                        ref={elementHoveredOn === 'deleteChat' ? setReferenceElement : null}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        name={'deleteChat'}
                        icon={'/delete.png'}
                        onClick={handleDelete}
                    />


                </StyledChatMainTitleButtonContainer>
            </StyledChatMainTitleContainer>
        </StyledChatMainTitle>

    )
}
