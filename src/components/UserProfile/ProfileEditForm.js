import {useForm} from "react-hook-form";
import
{
    InputField,
    Button,
    InputWrapper, HaveAccount, ButtonWrapper
}
    from "../styles/UserAuth.styled";
import {useLocation, useNavigate} from "react-router-dom";

import {
    EditForm, ImageUploadWrapper,
    LargeInputField,
    LargeInputWrapper,
    SelectDropdown,
    SelectOption
} from "../styles/ProfileEditForm.styled";
import {authRequestOptions} from "../../hooks/requestOptions";
import ImageUpload from "./ImageUpload";


export default function ProfileEditForm({handleModalClose}) {
    const {register, handleSubmit, watch, formState: {errors}} = useForm()
    const location = useLocation().pathname
    const navigate = useNavigate()
    const onSubmit = (formData) => {
        // console.log(formData)
        fetch(`http://127.0.0.1:5000/api/edit-profile/`,
            authRequestOptions('PATCH', formData))
            .then(response => response.json())
            .then(data => console.log(data)
            )
            .catch(error => console.log(error))
        //if location is profile, the user is editing their existing profile
        //otherwise they are setting profile details following signing up
        location === '/profile' ? handleModalClose() : navigate('/signin')
    }


    return (
        <EditForm onSubmit={handleSubmit(onSubmit)} min_height="30vh">

            {location === '/profile' &&
                <InputWrapper>
                    <InputField
                        {...register("username")}
                        placeholder='Username'
                    />
                </InputWrapper>
            }


            <InputWrapper margin_top={'1.5rem'}>
                <InputField
                    {...register("real_name")}
                    placeholder='Real name'
                />
            </InputWrapper>

            <InputWrapper margin_top={'1.5rem'}>
                <InputField
                    {...register("age")}
                    placeholder='Age'
                />
            </InputWrapper>

            <InputWrapper margin_top={'1.5rem'}>

                <InputField
                    {...register("location")}
                    placeholder='Location'
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
                <SelectOption value="To meet friends">To meet friends</SelectOption>
                <SelectOption value="To kill time">To kill time</SelectOption>
                <SelectOption value="To test out the chat app">To test out the chat app</SelectOption>
                <SelectOption value="Other">Other</SelectOption>
            </SelectDropdown>

            <LargeInputWrapper {...register("description")} height={'6rem'}>
                <LargeInputField placeholder="Description"/>
            </LargeInputWrapper>

            <LargeInputWrapper {...register("interests")} height={'6rem'}>
                <LargeInputField placeholder="Interests"/>
            </LargeInputWrapper>

            {/*<ImageUpload/>*/}


            <ButtonWrapper>
                <Button type="submit"
                        value="Save profile"
                        onClick={handleSubmit(onSubmit)}
                    // margin_top='1.25rem'
                />
                <Button type="submit"
                        value="Cancel"
                        onClick={handleSubmit(handleModalClose)}
                    // margin_top='0.05rem'
                />
            </ButtonWrapper>

        </EditForm>
    )
}