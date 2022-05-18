import {useCurrentUser} from "../../context/CurrentUserContext";
import {useEffect, useState} from "react";
import styled from "styled-components";

const ProfileBackground = styled.div`
  display: flex;
  height: 100vh;
  background-color: #A2A9C0;
  justify-content: center;
  align-items: center;
`

const ProfileMainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 70vh;
  max-height: 70vh;
  width: 30vw;
  border-radius: 25px;
  background-color: #404757;
  box-shadow: 0 2px 15px rgb(0 0 0 / 68%);
  padding: 1%;
  
`
const ProfileSmallContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  //height: 20%;
  width: 80%;
`
const ProfileAvatar = styled.div`
  background-image: url('data:image/png;base64,${props => props.avatar}');
  //width: 23%;
  //height: 80%;
  width: 12rem;
  height: 12rem;
  max-width: 100%;
  max-height: 100%;
  background-size: cover;
  background-position: top center;
  border-radius: 50%;
  align-self: center;
  margin-bottom: 5%;
`

const ProfileNameTextBox = styled.div`
  font-family: "Quicksand Medium", serif;
  font-size: 1.25rem;
  color: #F6F6F6;
  margin-bottom: 5%;
`
const ProfileTextBoxHeading = styled.div`
  font-family: "Quicksand Medium", serif;
  font-size: 1.25rem;
  color: #F6F6F6;

  text-shadow: 1px 1px 1px rgba(0, 0, 0, .45);

  display: flex;
  justify-content: center;
  align-items: center;

  &::before,
  &::after {
    content: '';
    display: block;
    height: 0.05em;
    min-width: 8vw;
  }

  &::before {
    background: linear-gradient(to right, rgba(240, 240, 240, 0), #F6F6F6);
    margin-right: 4vh;
  }

  &::after {
    background: linear-gradient(to left, rgba(240, 240, 240, 0), #F6F6F6);
    margin-left: 4vh;
  }
  //selects the "Description" component 
  :nth-child(2) {
    margin-top: 5%;
  }
  margin-top: 3%;
`
const ProfileLargeTextBox = styled.div`
  font-family: "Quicksand Medium", serif;
  min-height: 50px; // fix this
  width: 80%;
  margin-top: 10px;
  color: #B1B4BB; // same color as heading subtext
  //
`
const ProfileSmallTextBox = styled.div`
  font-family: "Quicksand Medium", serif;
  min-height: 30px; // fix this
  color: #B1B4BB; // same color as heading subtext
  
`
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