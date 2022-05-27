import {ProfileBackground, ProfileMainContainer} from "../styles/Profile.styled";
import ProfileEditForm from "./ProfileEditForm";

export default function ProfileCreateForm() {

    return (
        <ProfileBackground>
            <ProfileMainContainer>
                <ProfileEditForm/>
            </ProfileMainContainer>
        </ProfileBackground>
    )
}