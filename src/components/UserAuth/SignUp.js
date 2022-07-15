import {useForm} from "react-hook-form";
import {requestOptions} from "../../hooks/requestOptions";
import {Link, useNavigate} from "react-router-dom";

import {
    Background, InputField, Form, Button, Icon, InputWrapper, HaveAccount, ButtonWrapper, FormTitle, ErrorMessageText
} from "../styles/UserAuth.styled";
import {useActiveConvo} from "../../context/ActiveConvoContext";
import {ErrorMessage} from "@hookform/error-message";


export default function SignUp() {

    const {register, handleSubmit, watch, formState: {errors}, reset, setError, clearErrors} = useForm()
    const {setActiveConvo} = useActiveConvo()
    const navigate = useNavigate()

    const registerUser = async (body) => {

        let response = await fetch('http://127.0.0.1:5000/dj-rest-auth/register/', requestOptions('POST', body))
        console.log(response.status)
        response.json().then(data => {
            if (response.status === 400) {
                // console.log('its 400')
                let response_message = Object.values(data)[0][0]
                console.log(typeof (response_message))
                setError('server', {
                    type: "server",
                    message: `${response_message === 'This password is too short. It must contain at least 8' +
                    ' characters.' ? 'Your password must contain at least 8 characters.' : response_message}`,
                })
            }
        })


    }

    //  const signInUser = async (body) => {
    //     let response = await fetch('http://127.0.0.1:5000/dj-rest-auth/signin/', requestOptions('POST', body))
    //     response.json().then(data => {
    //             console.log(JSON.parse(response.text()))
    //             localStorage.setItem('token', data.access_token)
    //             //reset active convo to default
    //             setActiveConvo('')
    //         }
    //     )
    //
    //     if (response.status === 200) {
    //         navigate('/chat')
    //     }
    //     // else console.log(console.log(response.text()))
    // }
    const onSubmit = data => {
        registerUser(data)

        // console.log(`username: ${data.username}, pass: ${data.password}`)

        reset({username: '', email: '', password1: '', password2: ''})
        //after user fills out initial profile data, send them to fill out additional ones
        // navigate('/set-profile-details')
        navigate('/signin', {state: true})
    }

    const demoAccount = () => console.log('test')

    return (<Background>
            <Form
                onSubmit={handleSubmit(onSubmit)}
                onClick={() => clearErrors(['server', 'username', 'email', 'password1', 'password2'])}
                min_height="45vh"
            >
                <FormTitle>Sign up</FormTitle>
                <ErrorMessage
                    errors={errors}
                    name="server"
                    render={({message}) => <ErrorMessageText message_length={message.length}>{message}</ErrorMessageText>}
                />
                <ErrorMessage
                    errors={errors}
                    name="username"
                    render={({message}) => <ErrorMessageText message_length={message.length}>{message}</ErrorMessageText>}
                />
                <ErrorMessage
                    errors={errors}
                    name="email"
                    render={({message}) => <ErrorMessageText message_length={message.length}>{message}</ErrorMessageText>}
                />
                <ErrorMessage
                    errors={errors}
                    name="password1"
                    render={({message}) => <ErrorMessageText message_length={message.length}>{message}</ErrorMessageText>}
                />
                <ErrorMessage
                    errors={errors}
                    name="password2"
                    render={({message}) => <ErrorMessageText message_length={message.length}>{message}</ErrorMessageText>}
                />
                <InputWrapper margin_bottom='1rem'>
                    <Icon icon={'/username.png'}/>
                    <InputField
                        {...register("username", {required: "Enter your username"})}
                        placeholder='Username'
                    />
                </InputWrapper>

                <InputWrapper margin_bottom='1rem'>

                    <Icon icon={'/email.png'}/>
                    <InputField
                        {...register("email", {required: "Enter your email"})}
                        placeholder='Email'
                    />
                </InputWrapper>


                <InputWrapper margin_bottom='1rem'>

                    <Icon icon={'/password.png'}/>
                    <InputField
                        {...register("password1", {required: "Enter your password"})}
                        placeholder='Password'
                        type='password'
                    />
                </InputWrapper>

                <InputWrapper>
                    <Icon icon={'/password.png'}/>
                    <InputField
                        {...register("password2", {required: "Please enter your password"})}
                        placeholder='Confirm password'
                        type='password'
                    />
                </InputWrapper>
                <ButtonWrapper>
                    <Button type="submit"
                            value="Sign Up"
                    />
                    <Button type="submit"
                            value="Sample account"
                            onClick={handleSubmit(demoAccount)}/>
                </ButtonWrapper>
                <HaveAccount>
                    Already have an account?
                    <Link to='/signin' style={{textDecoration: 'none'}}>
                        <span>Sign in!</span>
                    </Link>
                </HaveAccount>
            </Form>
        </Background>)

}