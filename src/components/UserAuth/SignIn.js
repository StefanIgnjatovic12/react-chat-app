import {useForm} from "react-hook-form";
import {requestOptions} from "../../hooks/requestOptions";
import {Link, useLocation, useNavigate} from "react-router-dom";
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
import {useActiveConvo} from "../../context/ActiveConvoContext";
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {StyledToastContainer} from "../styles/ToastContainer.styled";
import {useEffect} from "react";

export default function SignIn() {

    const {register, handleSubmit, watch, formState: {errors}} = useForm()
    const navigate = useNavigate()
    const {setActiveConvo} = useActiveConvo()
    const {state : showAlert} = useLocation()

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

    //checks if
    useEffect(() => {
        if (showAlert) {openAlert()}
    },[showAlert])


    const signInUser = async (body) => {
        let response = await fetch('http://127.0.0.1:5000/dj-rest-auth/signin/', requestOptions('POST', body))
        response.json().then(data => {
                localStorage.setItem('token', data.access_token)
                //reset active convo to default
                setActiveConvo('')
            }
        )

        if (response.status === 200) {
            navigate('/chat')
        }

    }
    const onSubmit = data => {
        console.log(data)
        signInUser(data)


    }

    const demoAccount = () => openAlert()

    return (
        <Background>
            {/*alert component*/}
            <StyledToastContainer style={{width: '25%'}}/>
            <Form onSubmit={handleSubmit(onSubmit)} min_height="30vh">
                <InputWrapper>
                    <Icon icon={'/username.png'}/>
                    <InputField
                        {...register("username")}
                        placeholder='Username'
                    />
                </InputWrapper>


                <InputWrapper>

                    <Icon icon={'/password.png'}/>
                    <InputField
                        {...register("password")}
                        placeholder='Password'
                        type='password'
                    />
                </InputWrapper>

                <ButtonWrapper>
                    <Button type="submit"
                            value="Sign In"
                        // margin_top='1.25rem'
                    />
                    <Button type="submit"
                            value="Sample account"
                            onClick={handleSubmit(demoAccount)}
                        // margin_top='0.05rem'
                    />
                </ButtonWrapper>


                <HaveAccount>
                    Don't have an account?
                    <Link to='/signup' style={{textDecoration: 'none'}}>
                        <span>Sign up!</span>
                    </Link>
                </HaveAccount>
            </Form>
        </Background>
    )
}