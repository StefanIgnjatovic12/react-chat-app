import {useForm} from "react-hook-form";
import {requestOptions} from "../../hooks/requestOptions";
import {Link, useNavigate} from "react-router-dom";

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


export default function SignUp() {

    const {register, handleSubmit, watch, formState: {errors}, reset} = useForm()
    const {setActiveConvo} = useActiveConvo()
    const navigate = useNavigate()

    const registerUser = async (body) => {
        const response = await fetch('http://127.0.0.1:5000/dj-rest-auth/register/', requestOptions('POST', body))
        console.log(response)

    }
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
        registerUser(data)

        // console.log(`username: ${data.username}, pass: ${data.password}`)

        reset({username: '', email: '', password1: '', password2: ''})
        //after user fills out initial profile data, send them to fill out additional ones
        // navigate('/set-profile-details')
        navigate('/signin', {state : true})
    }

    const demoAccount = () => console.log('test')

    return (
        <Background>
            <Form onSubmit={handleSubmit(onSubmit)} min_height="45vh">
                <InputWrapper margin_bottom='1rem'>
                    <Icon icon={'/username.png'}/>
                    <InputField
                        {...register("username")}
                        placeholder='Username'
                    />
                </InputWrapper>

                <InputWrapper margin_bottom='1rem'>

                    <Icon icon={'/email.png'}/>
                    <InputField
                        {...register("email")}
                        placeholder='Email'
                    />
                </InputWrapper>


                <InputWrapper margin_bottom='1rem'>

                    <Icon icon={'/password.png'}/>
                    <InputField
                        {...register("password1")}
                        placeholder='Password'
                        type='password'
                    />
                </InputWrapper>

                <InputWrapper>
                    <Icon icon={'/password.png'}/>
                    <InputField
                        {...register("password2")}
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
        </Background>
    )

}