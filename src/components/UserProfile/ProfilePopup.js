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
                    <ProfileNameTextBox>
                        {
                            profileInfo.real_name ? `${profileInfo.real_name}`: "Real name not" +
                        " provided"
                        }

                        {
                            profileInfo.age
                                ? `, ${profileInfo.age}`
                                : null
                        }

                    </ProfileNameTextBox>
                    {/*<ProfileSmallTextBox>Lives in {profileInfo.location}</ProfileSmallTextBox>*/}
                    <ProfileSmallTextBox>{
                        profileInfo.location
                            ? `Lives in ${profileInfo.location}`
                            : 'Location not provided'
                    }
                        </ProfileSmallTextBox>

                </ProfileSmallContainer>

                <ProfileTextBoxHeading>Description</ProfileTextBoxHeading>
                <ProfileLargeTextBox>
                    {
                        profileInfo.description
                            ? profileInfo.description
                            : 'None provided yet'
                    }
                </ProfileLargeTextBox>

                <ProfileTextBoxHeading>Interests</ProfileTextBoxHeading>
                <ProfileLargeTextBox>
                    {
                    profileInfo.interests
                        ? profileInfo.interests
                        : 'None provided yet'
                }
                </ProfileLargeTextBox>

                <ProfileTextBoxHeading>Reason</ProfileTextBoxHeading>
                <ProfileLargeTextBox>
                    {
                        profileInfo.reason
                            ? profileInfo.reason
                            : 'None provided yet'
                    }
                </ProfileLargeTextBox>
            </>
            :
            <AccessDeniedContainer>
                <AccessDeniedImage
                    image={'/oops2.png'}
                />
                <AccessDeniedMessage>One of the chat members has not revealed their profile yet.
                </AccessDeniedMessage>
            </AccessDeniedContainer>

    )
}