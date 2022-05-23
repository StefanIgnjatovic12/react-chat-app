import {useForm} from "react-hook-form";
import
{
    Background,
    InputField,
    Form,
    Button,
    Icon,
    InputWrapper, HaveAccount, ButtonWrapper
}
    from "../styles/UserAuth.styled";
import {Link} from "react-router-dom";
import {
    EditForm,
    LargeInputField,
    LargeInputWrapper,
    SelectDropdown,
    SelectOption
} from "../styles/ProfileEditForm.styled";
import {authRequestOptions} from "../../hooks/requestOptions";

export default function ProfileEditForm({handleModalClose}) {
    const {register, handleSubmit, watch, formState: {errors}} = useForm()

    const onSubmit = (formData) => {
        // console.log(formData)
        fetch(`http://127.0.0.1:5000/api/edit-profile/`,
            authRequestOptions('PATCH', formData))
            .then(response => response.json())
            .then(data => console.log(data)
            )
            .catch(error => console.log(error))

        handleModalClose()
    }


    return (
        <EditForm onSubmit={handleSubmit(onSubmit)} min_height="30vh">
            <InputWrapper>
                <InputField
                    {...register("username")}
                    placeholder='Username'
                />
            </InputWrapper>

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
                <SelectOption defaultValue="" value="" disabled selected hidden>Gender</SelectOption>
                <SelectOption defaultValue="" value="Male">Male</SelectOption>
                <SelectOption defaultValue="" value="Female">Female</SelectOption>
                <SelectOption defaultValue="" value="Other">Other</SelectOption>

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