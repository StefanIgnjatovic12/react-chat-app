import {ProfileBackground, ProfileMainContainer} from "../styles/Profile.styled";
import ProfileEditForm from "./ProfileEditForm";

export default function ProfileCreateForm() {
    const firstTimeFIllingProfile = true
    return (
        <ProfileBackground>
            <ProfileMainContainer>
                <ProfileEditForm
                firstTimeFIllingProfile={firstTimeFIllingProfile}
                />
            </ProfileMainContainer>
        </ProfileBackground>
    )
}