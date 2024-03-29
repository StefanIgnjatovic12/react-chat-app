import {useForm} from "react-hook-form";
import {ErrorMessage} from '@hookform/error-message';
import {requestOptions} from "../../hooks/requestOptions";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {
    Background,
    InputField,
    Form,
    Button,
    Icon,
    InputWrapper,
    HaveAccount,
    ButtonWrapper,
    FormTitle,
    ErrorMessageText,
    ButtonDemoAccount
} from "../styles/UserAuth.styled";
import {useActiveConvo} from "../../context/ActiveConvoContext";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {StyledToastContainer} from "../styles/ToastContainer.styled";
import {useEffect} from "react";

export default function SignIn() {

    const {register, handleSubmit, formState: {errors}, setError, clearErrors} = useForm()
    const navigate = useNavigate()
    const {setActiveConvo} = useActiveConvo()
    const {state: showAlert, pathname: path} = useLocation()
    //alert when redirected from sign up page
    const openAlert = () => toast('You have succesfuly registered, please sign in.', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });

    useEffect(() => {
        //don't show the alert if the user came from the chat url
        if (path === '/') {
            console.log('alert not shown')
        } else if (showAlert) {
            openAlert()
        }
    }, [showAlert])


    const signInUser = async (body) => {
        let response = await fetch('https://drf-react-chat-backend.herokuapp.com/dj-rest-auth/signin/', requestOptions('POST', body))
        if (response.status === 200 || response.status === 201) {
            localStorage.setItem('userIsSignedIn', true)
            response.json().then(data => {
                localStorage.setItem('token', data.access_token)
                setActiveConvo('')
                navigate('/chat')
            })
        } else if (response.status === 400) {
            setError('server', {
                type: "server", message: 'Incorrect credentials, please try again',
            })
        }
    }


    const onSubmit = data => {
        signInUser(data)
    }

    const demoAccount = async () => {
        let response = await fetch(`https://drf-react-chat-backend.herokuapp.com/api/demo-account-signin/`, requestOptions('POST'))
        if (response.status === 200 || response.status === 201) {
            localStorage.setItem('userIsSignedIn', true)
            response.json().then(data => {
                localStorage.setItem('token', data.access_token)
                setActiveConvo('')
                navigate('/chat')
            })
        } else if (response.status === 400) {
            setError('server', {
                type: "server", message: 'Incorrect credentials, please try again',
            })
        }
    }


    return (
        <Background>
            {/*alert component*/}
            <StyledToastContainer style={{width: '25%'}}/>
            <Form
                onSubmit={handleSubmit(onSubmit)}
                min_height="30vh"
                onClick={() => clearErrors(['server', 'username', 'password'])}

            >
                <FormTitle>Sign in</FormTitle>
                <ErrorMessage
                    errors={errors}
                    name="server"
                    render={({message}) => <ErrorMessageText
                        message_length={message.length}>{message}</ErrorMessageText>}
                />
                <ErrorMessage
                    errors={errors}
                    name="username"
                    render={({message}) => <ErrorMessageText
                        message_length={message.length}>{message}</ErrorMessageText>}
                />
                <ErrorMessage
                    errors={errors}
                    name="password"
                    render={({message}) => <ErrorMessageText
                        message_length={message.length}>{message}</ErrorMessageText>}
                />
                <InputWrapper>
                    <Icon icon={'/username.png'}/>
                    <InputField
                        {...register("username", {required: "Please enter your username"})}
                        placeholder='Username'
                    />
                </InputWrapper>


                <InputWrapper>

                    <Icon icon={'/password.png'}/>
                    <InputField
                        {...register("password", {required: "Please enter your password."})}
                        placeholder='Password'
                        type='password'
                    />
                </InputWrapper>

                <ButtonWrapper>
                    <Button
                        type="submit"
                        value="Submit"
                    />
                    {/*different component and type so it wont trigger errors due to empty fields*/}
                    <ButtonDemoAccount
                        // type='submit'
                        onClick={demoAccount}
                        type="reset"
                    >
                        Sample account
                    </ButtonDemoAccount>
                </ButtonWrapper>


                <HaveAccount>
                    Don't have an account?
                    <Link to='/signup' style={{textDecoration: 'none'}}>
                        <span>Sign up!</span>
                    </Link>
                </HaveAccount>
            </Form>
        </Background>)
}