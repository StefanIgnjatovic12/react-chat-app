import {useCurrentUser} from "../../context/CurrentUserContext";
import {useEffect, useState} from "react";

import {
    ProfileBackground,
    ProfileMainContainer,
    ProfileTextBoxHeading,
    ProfileAvatar,
    ProfileNameTextBox,
    ProfileSmallTextBox,
    ProfileSmallContainer,
    ProfileLargeTextBox, ProfileSmallTextColored
} from "../styles/Profile.styled";

import {StyledChatMainTitleButton} from "../styles/ChatMainTitle.styled";

import Modal from 'react-modal';
import ProfilePopup from "./ProfilePopup";
import ProfileEditForm from "./ProfileEditForm";
import {ButtonWrapper} from "../styles/UserAuth.styled";
import {useNavigate} from "react-router-dom";

Modal.setAppElement(document.getElementById('root'));
const editProfileModalStyle = {
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

export default function Profile() {
    const {fetchCurrentUser} = useCurrentUser()
    const [profileInfo, setProfileInfo] = useState([])
    const [modalOpen, setModalOpen] = useState(false)
    const navigate = useNavigate()
    //modalOpen in dep. array so that profile data is refreshed on modalClose
    useEffect(() => {
        fetchCurrentUser().then(id => {
            id !== undefined && fetch(`http://127.0.0.1:5000/api/user-profile/${id}`)
                .then(response => response.json())
                .then(data => {
                    setProfileInfo(data[0])
                })
                .catch(error => console.log(error))
        })
    }, [modalOpen])

    const handleModalOpen = () => {
        setModalOpen(true)
    }

    const handleModalClose = () => {
        setModalOpen(false)
    }
    return (
        <ProfileBackground>
            <ProfileMainContainer>
                <Modal
                    isOpen={modalOpen}
                    // onAfterOpen={afterOpenModal}
                    onRequestClose={handleModalClose}
                    style={editProfileModalStyle}
                    contentLabel="Example Modal"
                >
                    <ProfileEditForm
                        handleModalClose={handleModalClose}
                    />
                </Modal>
                <ProfileSmallContainer>

                    <ProfileAvatar
                        avatar={profileInfo.real_avatar}
                    />
                    <ProfileNameTextBox>{profileInfo.real_name}, {profileInfo.age}, {profileInfo.gender}</ProfileNameTextBox>

                    <ProfileSmallTextBox>
                        Lives in <ProfileSmallTextColored>{profileInfo.location}</ProfileSmallTextColored>
                    </ProfileSmallTextBox>

                    <ProfileSmallTextBox>
                        Here <ProfileSmallTextColored>{profileInfo.reason}</ProfileSmallTextColored>
                    </ProfileSmallTextBox>

                </ProfileSmallContainer>

                <ProfileTextBoxHeading>Description</ProfileTextBoxHeading>
                <ProfileLargeTextBox>{profileInfo.description}</ProfileLargeTextBox>

                <ProfileTextBoxHeading>Interests</ProfileTextBoxHeading>
                <ProfileLargeTextBox>{profileInfo.interests}</ProfileLargeTextBox>

                {/*<ProfileTextBoxHeading>Reason</ProfileTextBoxHeading>*/}
                {/*<ProfileLargeTextBox>{profileInfo.reason}</ProfileLargeTextBox>*/}

                <ButtonWrapper>
                    <StyledChatMainTitleButton onClick={handleModalOpen}>
                        Edit your profile
                    </StyledChatMainTitleButton>
                    <StyledChatMainTitleButton
                        onClick={() => navigate('/chat')}
                        margin_top={'10px'}
                        margin_bottom={'10px'}
                    >
                        Return to chat
                    </StyledChatMainTitleButton>
                </ButtonWrapper>
            </ProfileMainContainer>
        </ProfileBackground>

    )
}