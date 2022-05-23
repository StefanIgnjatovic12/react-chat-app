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
    ProfileLargeTextBox
} from "../styles/Profile.styled";
import {useActiveConvo} from "../../context/ActiveConvoContext";
import {authRequestOptions} from "../../hooks/requestOptions";
import {AccessDeniedContainer, AccessDeniedImage, AccessDeniedMessage, Test} from "../styles/ChatMainTitle.styled";

export default function ProfilePopup() {
    const {activeConvo, headerConvo} = useActiveConvo()
    const [profileInfo, setProfileInfo] = useState([])
    //checks if other convo member has also revealed their profile within convo
    const [otherUserNotRevealed, setOtherUserNotRevealed] = useState(false)
    useEffect(() => {
        fetch(`http://127.0.0.1:5000/api/revealed-profile-data/${activeConvo ? activeConvo : headerConvo.conv_id}`,
            authRequestOptions('GET'))
            .then(response => response.json())
            .then(data => {
                if (data == "1 or more members havent revealed their profile") {
                    console.log('Other member hasnt revealed')
                    setOtherUserNotRevealed(true)
                } else {
                    setProfileInfo(data[0])
                }

            })
            .catch(error => console.log(error))
    }, [activeConvo])
    return (
        !otherUserNotRevealed ?
            <>
                <ProfileSmallContainer>

                    <ProfileAvatar
                        avatar={profileInfo.real_avatar}
                    />
                    <ProfileNameTextBox>{profileInfo.real_name}, {profileInfo.age}</ProfileNameTextBox>
                    <ProfileSmallTextBox>Lives in {profileInfo.location}</ProfileSmallTextBox>

                </ProfileSmallContainer>

                <ProfileTextBoxHeading>Description</ProfileTextBoxHeading>
                <ProfileLargeTextBox>{profileInfo.description}</ProfileLargeTextBox>

                <ProfileTextBoxHeading>Interests</ProfileTextBoxHeading>
                <ProfileLargeTextBox>{profileInfo.interests}</ProfileLargeTextBox>

                <ProfileTextBoxHeading>Reason</ProfileTextBoxHeading>
                <ProfileLargeTextBox>{profileInfo.reason}</ProfileLargeTextBox>
            </>
            :
            <AccessDeniedContainer>
                <AccessDeniedImage
                    image={'/oops2.png'}
                />
                <AccessDeniedMessage>Your conversation partner has not revealed their profile to you
                    yet.
                </AccessDeniedMessage>
            </AccessDeniedContainer>

    )
}