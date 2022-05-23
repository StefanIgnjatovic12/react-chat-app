import {useActiveConvo} from "../../context/ActiveConvoContext";
import {
    StyledChatMainTitle,
    StyledChatMainTitleContainer,
    StyledChatMainTitleText,
    StyledChatMainTitleAvatar,
    StyledChatMainTitleSubtext,
    StyledChatMainTitleRevealButton,
    Test
} from "../styles/ChatMainTitle.styled";
import {useEffect, useState} from "react";
import {useCurrentUser} from "../../context/CurrentUserContext";
import {authRequestOptions} from "../../hooks/requestOptions";
import Modal from 'react-modal';
import Profile from "../UserProfile/Profile";
import ProfilePopup from "../UserProfile/ProfilePopup";

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
    const {headerConvo, activeConvo} = useActiveConvo()
    //state for managing in-session clicks on reveal button ie locally and not from DB
    const [localRevealStatus, setLocalRevealStatus] = useState([])
    //state for managing reveal status for convo partner in the active convo from the DB
    const [storedRevealStatus, setStoredRevealStatus] = useState(false)
    //state for managing if the Modal is opened or not
    const [modalOpen, setModalOpen] = useState(false)

    useEffect(() => {
        //Call to the check if partner in convo has revealed their profile for that convo
        if (activeConvo) {
            fetch(`http://127.0.0.1:5000/api/check-reveal-status/${activeConvo}`, authRequestOptions('GET'))
                .then(response => response.json())
                .then(data => {
                        // console.log('State set')
                        // console.log(`Clicked: ${data.clicked}`)
                        // console.log(`Convo match: ${data.convo_id == activeConvo}`)
                        setStoredRevealStatus(data)
                    }
                )
                .catch(error => console.log(error))
        }

    }, [activeConvo])
    const handleModalOpen = () => {
        setModalOpen(true)
    }

    const handleModalClose = () => {
        setModalOpen(false)
    }
    const handleReveal = () => {
        //if there is 1 or more object in the array and if setLocalRevealStatus has already been done for the
        //current convo
        if (localRevealStatus.length > 0 && localRevealStatus.some(c => c.convo === activeConvo)) {
            //used for SEE PARTNERS PROFILE
            //if profile has been revealed, the click should fetch the partners profile data
            //temp, in future will just redirect to page where this data will be performed
            fetch(`http://127.0.0.1:5000/api/revealed-profile-data/${activeConvo ? activeConvo : headerConvo.conv_id}`, authRequestOptions('GET'))
                .then(response => response.json())
                .then(data => console.log('revealed profile data fetch'))
                .catch(error => console.log(error))
        } else {
            //used for REVEAL PROFILE
            //else perform the fetch to reveal the profile
            let payload = {
                //if active convo is set, use the ID of that convo, else use the id of the convo for the header convo
                conversation: activeConvo ? activeConvo : headerConvo.conv_id
            }
            fetch(`http://127.0.0.1:5000/api/reveal-profile/`, authRequestOptions('POST', payload))
                .then(response => response.json())
                .then(data => console.log(data))
                .catch(error => console.log(error))
            //set the revealed status on the 'local' state so as not to have to make another
            //call to get the updated reveal status after making the call to set it
            setLocalRevealStatus(revealClicked => [...revealClicked, {
                convo: activeConvo ? activeConvo : headerConvo.conv_id,
                clicked: true
            }])
        }


    }
    //Filter the revealClicked array to get a new array if there existed an object for the
    //convo in question within the original array
    let filteredRevealArray = localRevealStatus.filter(c => (c.convo === activeConvo && c.clicked === true) || (c.convo === headerConvo.conv_id && c.clicked === true))

    return (


        <StyledChatMainTitle>

            <StyledChatMainTitleContainer>
                {/*{newestConvo.avatar != null && <StyledChatMainTitleAvatar avatar={newestConvo.avatar}/>}*/}
                <Modal
                    isOpen={modalOpen}
                    // onAfterOpen={afterOpenModal}
                    onRequestClose={handleModalClose}
                    style={filteredRevealArray.length > 0 || (storedRevealStatus.revealed && storedRevealStatus.convo_id === activeConvo) ?  deniedModalStyle : profileModalStyle}
                    contentLabel="Example Modal"
                >
                    <ProfilePopup/>
                </Modal>
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

                <StyledChatMainTitleRevealButton
                    //
                    onClick={filteredRevealArray.length > 0 || (storedRevealStatus.revealed && storedRevealStatus.convo_id === activeConvo)
                        ? handleModalOpen : handleReveal}
                    // onMouseEnter={() => setShowPopup(true)}
                    // onMouseLeave={() => setShowPopup(false)}
                >
                    {filteredRevealArray.length > 0 || (storedRevealStatus.revealed && storedRevealStatus.convo_id === activeConvo) ? 'See partners' +
                        ' profile' : 'Reveal your profile'}

                </StyledChatMainTitleRevealButton>


            </StyledChatMainTitleContainer>
        </StyledChatMainTitle>

    )
}