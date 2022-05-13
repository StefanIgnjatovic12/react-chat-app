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

export default function SignIn() {

    const {register, handleSubmit, watch, formState: {errors}} = useForm()
    const navigate = useNavigate()
    const {setActiveConvo} = useActiveConvo()


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

        signInUser(data)


    }

    const demoAccount = () => console.log('test')

    return (
        <Background>
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