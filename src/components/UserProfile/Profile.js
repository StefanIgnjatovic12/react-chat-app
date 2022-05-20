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

export default function Profile() {
    const {fetchCurrentUser} = useCurrentUser()
    const [profileInfo, setProfileInfo] = useState([])
    useEffect(() => {
        fetchCurrentUser().then(id => {
            id !== undefined && fetch(`http://127.0.0.1:5000/api/user-profile/${id}`)
                .then(response => response.json())
                .then(data => {
                    setProfileInfo(data[0])
                })
                .catch(error => console.log(error))
        })
    }, [])
    return (
        <ProfileBackground>
            <ProfileMainContainer>
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

            </ProfileMainContainer>
        </ProfileBackground>

    )
}