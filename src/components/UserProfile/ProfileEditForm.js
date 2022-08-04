import {useForm} from "react-hook-form";
import {v4 as uuidv4} from "uuid"
import
{
    InputField,
    Button,
    InputWrapper, ButtonWrapper, FormTitle, ErrorMessageText
}
    from "../styles/UserAuth.styled";
import {useLocation} from "react-router-dom";
import {
    AvatarSelectModalButton, AvatarSelectModalButtonWrapper,
    AvatarSelectModalContainer,
    AvatarSelectModalImage,
    EditForm, ImageUploadWrapper,
    LargeInputField,
    LargeInputWrapper,
    SelectDropdown,
    SelectOption
} from "../styles/ProfileEditForm.styled";
import {authRequestOptions} from "../../hooks/requestOptions";
import ImageUpload from "./ImageUpload";
import {useImageUploadData} from "../../context/ImageUploadDataContext";
import {useProfileInfo} from "../../context/ProfileInfoContext";
import {ErrorMessage} from "@hookform/error-message";
import {useState} from "react";
import imageToBase64 from 'image-to-base64/browser';
import {avatarSelectedData, avatarFileArray} from "../../DefaultAvatars";
import Modal from 'react-modal';
import {ImageUploadMainText} from "../styles/ImageUpload.styled";

Modal.setAppElement(document.getElementById('root'));

const modalStyle = {
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
        padding: '1%',
        border: '0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '35vh',
        width: '22vw',
        // overflowY: 'auto'
    }
}
export default function ProfileEditForm({handleModalClose, firstTimeFillingProfile, setUserProfileFilledOut}) {
    const {register, handleSubmit, formState: {errors}, setError, clearErrors} = useForm()
    const {uploadedImage} = useImageUploadData()
    const location = useLocation().pathname

    const {profileInfo} = useProfileInfo()
    const [modalOpen, setModalOpen] = useState(false)
    const [avatarSelectedArray, setAvatarSelectedArray] = useState(avatarSelectedData)
    const [avatarFilePath, setAvatarFilePath] = useState(null)
    const [avatarBase64, setAvatarBase64] = useState(null)

    const onSubmit = (formData) => {
        //check if user edited at least 1 field of form
        if ((Object.values(formData).every(value => value === '') && !uploadedImage && !avatarBase64)) {
            setError('all_fields_empty', {
                type: "server",
                message: 'Please edit at least 1 field before submitting'
            })
        }
            //ADD IF STATEMENT FOR PROFILE CREATION >
        //get base64 of image uploaded within the form from the ImageUploadDataContext
        else {
            let formDataFinal = {avatar: avatarBase64, real_avatar: uploadedImage, ...formData}
            fetch(`https://drf-react-chat-backend.herokuapp.com/api/edit-profile/`,
                authRequestOptions('PATCH', formDataFinal))
                .then(response => response.json())
                .then(data => {
                        console.log(data)
                        console.log(location)
                        if (location === '/profile') {
                            handleModalClose()
                            // navigate('/chat')
                        } else if (location === '/chat') {
                            setUserProfileFilledOut(true)
                        }
                    }
                )
                .catch(error => console.log(error))

        }
    }

    return (
        <EditForm
            onSubmit={handleSubmit(onSubmit)}
            onClick={() => clearErrors(['all_fields_empty'])}

            min_height="50vh"

        >
            {/*DEFAULT AVATAR SELECTION MODAL*/}
            <Modal
                isOpen={modalOpen}
                // onRequestClose={handleModalClose}
                style={modalStyle}
            >

                <FormTitle>
                    Select a default avatar

                </FormTitle>
                <AvatarSelectModalContainer>
                    {avatarFileArray.map((avatar, index) =>
                        <AvatarSelectModalImage
                            key={uuidv4()}
                            avatar={avatar}
                            index={index}
                            avatarSelectedArray={avatarSelectedArray}
                            onClick={() => {
                                setAvatarSelectedArray(
                                    //using avatarSelectedData (selected: false for all items) to avoid the need to map
                                    // over previous state and
                                    // clear previously selected avatar
                                    avatarSelectedData.map((avatar) => {
                                        if (avatar.index === index) {
                                            console.log(avatarFileArray[index])
                                            setAvatarFilePath(avatarFileArray[index])
                                        }
                                        return avatar.index === index ? {
                                            index: index,
                                            selected: !avatar.selected
                                        } : avatar
                                    })
                                )


                            }}
                        />
                    )}
                </AvatarSelectModalContainer>

                <AvatarSelectModalButtonWrapper>

                    <AvatarSelectModalButton type="submit"
                                             value="Cancel"
                                             onClick={() => {
                                                 setModalOpen(false)
                                             }}
                    />

                    <AvatarSelectModalButton type="submit"
                                             value="Select"
                                             onClick={() => {
                                                 setModalOpen(false)
                                                 imageToBase64(avatarFilePath) // Path to the image
                                                     .then(
                                                         (response) => {
                                                             setAvatarBase64(`data:image/jpeg;base64,${response}`)
                                                             // console.log(response); // "cGF0aC90by9maWxlLmpwZw=="
                                                         }
                                                     )
                                                     .catch(
                                                         (error) => {
                                                             console.log(error); // Logs an error if there was one
                                                         }
                                                     )
                                             }}
                    />

                </AvatarSelectModalButtonWrapper>

            </Modal>
            <FormTitle>
                {
                    firstTimeFillingProfile
                        ? 'Please fill out your profile'
                        : 'Edit your profile'
                }
            </FormTitle>

            <ErrorMessage
                errors={errors}
                name="all_fields_empty"
                render={({message}) => <ErrorMessageText message_length={message.length}>{message}</ErrorMessageText>}
            />
            {location === '/profile' &&
                <InputWrapper>
                    <InputField
                        {...register("username")}
                        placeholder={
                            firstTimeFillingProfile
                                ? 'Username:'
                                : `Username: ` + profileInfo.username

                        }
                    />
                </InputWrapper>
            }


            <InputWrapper margin_top={'1.5rem'}>
                <InputField
                    {...register("real_name")}
                    placeholder={
                        firstTimeFillingProfile
                            ? 'Real name:'
                            : `Real name: ` + profileInfo.real_name
                    }
                />
            </InputWrapper>

            <InputWrapper margin_top={'1.5rem'}>
                <InputField
                    {...register("age")}
                    placeholder={
                        firstTimeFillingProfile
                            ? 'Age'
                            : `Age: ` + profileInfo.age
                    }
                />
            </InputWrapper>

            <InputWrapper margin_top={'1.5rem'}>

                <InputField
                    {...register("location")}
                    placeholder={
                        firstTimeFillingProfile
                            ? 'Location:'
                            : `Location: ` + profileInfo.location
                    }
                />
            </InputWrapper>

            <SelectDropdown  {...register("gender")} required>
                <SelectOption value="" disabled selected hidden>Gender</SelectOption>
                <SelectOption value="Male">Male</SelectOption>
                <SelectOption value="Female">Female</SelectOption>
                <SelectOption value="Other">Other</SelectOption>

            </SelectDropdown>

            <SelectDropdown {...register("reason")} required>
                <SelectOption value="" disabled selected hidden>Reason for using chat</SelectOption>
                <SelectOption value="to meet friends">To meet friends</SelectOption>
                <SelectOption value="to kill time">To kill time</SelectOption>
                <SelectOption value="to test out the chat app">To test out the chat app</SelectOption>
                <SelectOption value="Other">Other</SelectOption>
            </SelectDropdown>

            <LargeInputWrapper height={'6rem'}>
                <LargeInputField
                    {...register("description")}
                    placeholder={
                        firstTimeFillingProfile
                            ? 'Description:'
                            : `Description: ` + profileInfo.description
                    }/>
            </LargeInputWrapper>

            <LargeInputWrapper height={'6rem'}>
                <LargeInputField
                    {...register("interests")}
                    placeholder={
                        firstTimeFillingProfile
                            ? 'Interests:'
                            : `Interests: ` + profileInfo.interests
                    }
                />
            </LargeInputWrapper>
            <ImageUploadWrapper
                onClick={() => setModalOpen(true)}
            >
                <ImageUploadMainText>
                    {
                        //avatarBase64 is state that is only set if an avatar is selected
                        avatarBase64
                            ? avatarFilePath.substring(avatarFilePath.indexOf("A"), avatarFilePath.indexOf("."))
                            : 'Select a default avatar'
                    }
                </ImageUploadMainText>
            </ImageUploadWrapper>
            <ImageUpload/>


            <ButtonWrapper>
                <Button type="submit"
                        value="Save profile"
                        onClick={handleSubmit(onSubmit)}
                    // margin_top='1.25rem'
                />
                <Button type="submit"
                        value="Cancel"
                        onClick={handleSubmit(handleModalClose)}
                    // onClick={
                    //     firstTimeFillingProfile
                    //     ? navigate('/signout')
                    //     : handleSubmit(handleModalClose)
                    // }
                    // margin_top='0.05rem'
                />
            </ButtonWrapper>

        </EditForm>
    )
}