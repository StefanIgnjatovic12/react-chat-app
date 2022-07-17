import {useForm} from "react-hook-form";
import
{
    InputField,
    Button,
    InputWrapper, HaveAccount, ButtonWrapper, FormTitle, ErrorMessageText
}
    from "../styles/UserAuth.styled";
import {useLocation, useNavigate} from "react-router-dom";

import {
    ColoredText,
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


export default function ProfileEditForm({handleModalClose, firstTimeFillingProfile, setUserProfileFilledOut}) {
    const {register, handleSubmit, watch, formState: {errors}, setError, clearErrors} = useForm()
    const {uploadedImage} = useImageUploadData()
    const location = useLocation().pathname
    const navigate = useNavigate()
    const {profileInfo, setProfileInfo} = useProfileInfo()
    const onSubmit = (formData) => {
       //check if user edited at least 1 field of form
        if (Object.values(formData).every(value => value === '')) {
            setError('all_fields_empty', {
                type: "server",
                message: 'Please edit at least 1 field before submitting'
            })
        }

        //get base64 of image uploaded within the form from the ImageUploadDataContext
        else {
            let formDataFinal = {real_avatar: uploadedImage, ...formData}
            fetch(`http://127.0.0.1:5000/api/edit-profile/`,
                authRequestOptions('PATCH', formDataFinal))
                .then(response => response.json())
                .then(data => {
                        console.log(data)
                        console.log(location)
                        if (location === '/profile') {
                            navigate('/chat')
                        } else if (location === '/chat') {
                            setUserProfileFilledOut(true)
                        }
                    }
                )
                .catch(error => console.log(error))

        }


        //for ChatContainer component so the proper info is shown
        // setUserProfileFilledOut(true)
    }


    return (
        <EditForm
            onSubmit={handleSubmit(onSubmit)}
            onClick={() => clearErrors(['all_fields_empty'])}

            min_height="50vh"

        >
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