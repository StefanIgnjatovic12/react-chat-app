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
const customStyles = {
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
    },

};

export default function ChatMainTitle() {
    const {headerConvo, activeConvo} = useActiveConvo()
    const [revealClicked, setRevealClicked] = useState([])
    const [initialRenderRevealStatus, setInitialRenderRevealStatus] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)

    useEffect(() => {
        // console.log(`Header convo: ${headerConvo.conv_id}`)
        console.log(`useEffect ran, Active convo: ${activeConvo}`)
        if (activeConvo) {
            fetch(`http://127.0.0.1:5000/api/check-reveal-status/${activeConvo}`, authRequestOptions('GET'))
                .then(response => response.json())
                .then(data => {
                        console.log('State set')
                        console.log(`Clicked: ${data.clicked}`)
                        console.log(`Convo match: ${data.convo_id == activeConvo}`)
                        setInitialRenderRevealStatus(data)
                    }
                )
                .catch(error => console.log(error))
        }

    }, [activeConvo])
    const handleDialogOpen = () => {
        setModalOpen(true)
    }

    const handleDialogClose = () => {
        setModalOpen(false)
    }
    const handleClick = () => {
        //if there is 1 or more object in the array and if setRevealClicked has already been done for the
        //current convo
        if (revealClicked.length > 0 && revealClicked.some(c => c.convo === activeConvo)) {
            //if profile has been revealed, the click should fetch the partners profile data
            //temp, in future will just redirect to page where this data will be performed
            fetch(`http://127.0.0.1:5000/api/revealed-profile-data/${activeConvo ? activeConvo : headerConvo.conv_id}`, authRequestOptions('GET'))
                .then(response => response.json())
                .then(data => console.log('revealed profile data fetch'))
                .catch(error => console.log(error))
        } else {
            //else perform the fetch to reveal the profile
            let payload = {
                //if active convo is set, use the ID of that convo, else use the id of the convo for the header convo
                conversation: activeConvo ? activeConvo : headerConvo.conv_id
            }
            fetch(`http://127.0.0.1:5000/api/reveal-profile/`, authRequestOptions('POST', payload))
                .then(response => response.json())
                .then(data => console.log(data))
                .catch(error => console.log(error))

            setRevealClicked(revealClicked => [...revealClicked, {
                convo: activeConvo ? activeConvo : headerConvo.conv_id,
                clicked: true
            }])
        }


    }
    //Filter the revealClicked array to get a new array if there existed an object for the
    //convo in question within the original array
    let filteredRevealArray = revealClicked.filter(c => (c.convo === activeConvo && c.clicked === true) || (c.convo === headerConvo.conv_id && c.clicked === true))

    return (


        <StyledChatMainTitle>

            <StyledChatMainTitleContainer>
                {/*{newestConvo.avatar != null && <StyledChatMainTitleAvatar avatar={newestConvo.avatar}/>}*/}
                <Modal
                    isOpen={modalOpen}
                    // onAfterOpen={afterOpenModal}
                    onRequestClose={handleDialogClose}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    <ProfilePopup/>
                </Modal>
                <StyledChatMainTitleText>
                    {headerConvo &&
                        <>
                            <div onClick={handleDialogOpen}>
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
                    {filteredRevealArray.length > 0 || (initialRenderRevealStatus.revealed && initialRenderRevealStatus.convo_id === activeConvo) ? 'See partners' +
                        ' profile' : 'Reveal your profile'}

                </StyledChatMainTitleRevealButton>


            </StyledChatMainTitleContainer>
        </StyledChatMainTitle>

    )
}