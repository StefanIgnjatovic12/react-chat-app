import {ProfileBackground, ProfileMainContainer} from "../styles/Profile.styled";
import ProfileEditForm from "./ProfileEditForm";

export default function ProfileCreateForm({setUserProfileFilledOut}) {
    const firstTimeFillingProfile = true
    return (
        <ProfileBackground>
            <ProfileMainContainer>
                <ProfileEditForm
                    firstTimeFillingProfile={firstTimeFillingProfile}
                    setUserProfileFilledOut={setUserProfileFilledOut}
                />
            </ProfileMainContainer>
        </ProfileBackground>
    )
}
