import {useActiveConvo} from "../../context/ActiveConvoContext";
import {
    StyledChatMainTitle,
    StyledChatMainTitleContainer,
    StyledChatMainTitleAvatar,
    StyledChatMainTitleSubtext,
    StyledChatMainTitleButtonContainer,
    StyledChatMainTitleAvatarTextContainer,
    StyledChatMainTitleTextContainer,
    TogglerContainer, StyledChatMainTitlePopup, StyledChatMainTitleClickableIcon
} from "../styles/ChatMainTitle.styled";
import {useEffect, useState} from "react";
import {authRequestOptions} from "../../hooks/requestOptions";
import Modal from 'react-modal';
import ProfilePopup from "../UserProfile/ProfilePopup";
import ToggleButton from 'react-toggle-button'
import {usePopper} from 'react-popper';
import useLocalStorage from "use-local-storage";
import {useTogglerState} from "../../context/TogglerStateContext";
import {useCreateNewChat} from "../../context/CreateNewChatContext";
import {StyledOfflineIndicatorDot, StyledOnlineIndicatorDot} from "../styles/ChatListItems.styled";
import {BeatLoader} from "react-spinners";


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
    const {newChatCreated} = useCreateNewChat()


    //profileReveal is that same state but available globally
    const [elementHoveredOn, setElementHoveredOn] = useState(null)
    const [referenceElement, setReferenceElement] = useState()
    const [popperElement, setPopperElement] = useState()
    const [showPopper, setShowPopper] = useState(false)
    let {styles, attributes} = usePopper(referenceElement, popperElement, {placement: "top"})
    const [loading, setLoading] = useState(false)
    //filtered toggleStateArray to only contain the data for the active convo
    let revealed_status_individual_convo = togglerStateArray.filter(convo => convo.convo_id === activeConvo)

    useEffect(() => {
        // console.log(revealed_status_individual_convo)
        //Call to the check if partner in convo has revealed their profile for that convo
        if (activeConvo) {
            // console.log(`This is activeConvo: ${activeConvo}`)
            fetch(`https://drf-react-chat-backend.herokuapp.com/api/check-reveal-status/${activeConvo}`, authRequestOptions('GET'))
                .then(response => response.json())
                .then(data => {
                        setStoredRevealStatus(data)
                        //set the toggler on page load based on revealed status fetched from DB
                        setTogglerState(data.revealed)

                    }
                )
                .catch(error => console.log(error))

            fetch(`https://drf-react-chat-backend.herokuapp.com/api/reveal-status-for-all-user-convos/`, authRequestOptions('GET'))
                .then(response => response.json())
                .then(data => {
                    // console.log('togglerStateArray api call made')
                    // console.log(data.togglerStateArray.filter(convo => convo.convo_id === activeConvo))
                    setTogglerStateArray(data)
                })
                .catch(error => console.log(error))


        }
        setLoading(true)

    }, [activeConvo, newChatCreated, convoDeleteDone])

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
        fetch(`https://drf-react-chat-backend.herokuapp.com/api/reveal-profile/`, authRequestOptions('POST', payload))
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
        fetch(`https://drf-react-chat-backend.herokuapp.com/api/hide-profile/`, authRequestOptions('POST', payload))
            .then(response => response.json())
            .then(data => {
                console.log(data)
            })
            .catch(error => console.log(error))

    }
    const handleDelete = () => {
        fetch(`https://drf-react-chat-backend.herokuapp.com/api/delete-convo/${activeConvo ? activeConvo : headerConvo.conv_id}`, authRequestOptions('DELETE'))
            .then(response => response.json())
            .catch(error => console.log(error))
        setConvoDeleteDone(convoDeleteDone + 1)
        //once a convo is deleted, set the active convo to the first convo remaining
        //ie set the active convo to the first convo ID in the array in LS
        setActiveConvo((JSON.parse(localStorage.getItem('convoIDArrayLocalStorage')))[0])

    }

    if (!loading) {
        return (
            <StyledChatMainTitle>
                <StyledChatMainTitleContainer>
                    <BeatLoader/>
                </StyledChatMainTitleContainer>
            </StyledChatMainTitle>
        )
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
                    <StyledChatMainTitleAvatar

                        avatar={revealed_status_individual_convo?.[0]?.['partner_revealed'] && revealed_status_individual_convo?.[0]?.['revealed']
                            ? headerConvo?.real_avatar
                            : headerConvo?.avatar
                        }
                    />
                    <StyledChatMainTitleTextContainer>
                        {headerConvo &&
                            <>
                                <div>
                                    {/*only show partners real name if both user and partner have revealed their
                                     profiles*/}
                                    {revealed_status_individual_convo?.[0]?.['partner_revealed'] && revealed_status_individual_convo?.[0]?.['revealed'] && headerConvo?.conv_partner_real_name
                                        ? headerConvo?.conv_partner_real_name.substring(0, 10) + "..."
                                        : headerConvo?.conv_partner.length > 10
                                            ? headerConvo?.conv_partner.substring(0, 10) + "..."
                                            : headerConvo?.conv_partner
                                    }

                                    {headerConvo.is_online
                                        ? <StyledOnlineIndicatorDot> ●</StyledOnlineIndicatorDot>
                                        : <StyledOfflineIndicatorDot> ●</StyledOfflineIndicatorDot>}
                                    {/*{headerConvo.conv_partner_real_name} {headerConvo.is_online ?  <StyledOnlineIndicatorDot>●</StyledOnlineIndicatorDot> : <StyledOfflineIndicatorDot>●</StyledOfflineIndicatorDot>}*/}
                                </div>
                                <StyledChatMainTitleSubtext>
                                    {
                                        headerConvo.last_message.length > 25
                                            ? headerConvo?.last_message.substring(0, 40) + "..."
                                            : headerConvo?.last_message
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
                                                return {...toggler, 'revealed': !toggler.revealed}
                                            } else {
                                                return toggler
                                            }
                                        }
                                    )
                                )
                                // setProfileReveal(!value)
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
