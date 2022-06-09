import {ProfileBackground, ProfileMainContainer} from "../styles/Profile.styled";
import ProfileEditForm from "./ProfileEditForm";

export default function ProfileCreateForm() {
    const firstTimeFillingProfile = true
    return (
        <ProfileBackground>
            <ProfileMainContainer>
                <ProfileEditForm
                firstTimeFillingProfile={firstTimeFillingProfile}
                />
            </ProfileMainContainer>
        </ProfileBackground>
    )
}
