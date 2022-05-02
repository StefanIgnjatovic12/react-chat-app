import {useForm} from "react-hook-form";
import {requestOptions} from "../../hooks/requestOptions";
import {Link} from "react-router-dom";

import
{
    Background,
    InputField,
    Form,
    Button,
    Icon,
    FieldIconContainer, HaveAccount
}
    from "../styles/UserAuth.styled";


export default function SignUp() {

    const {register, handleSubmit, watch, formState: {errors}} = useForm()

    const registerUser = async (body) => {
        const response = await fetch('http://127.0.0.1:5000/dj-rest-auth/register/', requestOptions('POST', body))
        console.log(response)
    }

    const onSubmit = data => {
        registerUser(data)
    }

    const demoAccount = () => console.log('test')

    return (
        <Background>
            <Form onSubmit={handleSubmit(onSubmit)} min_height="45vh">
                <FieldIconContainer margin_bottom='1rem'>
                    <Icon icon={'/username.png'}/>
                    <InputField
                        {...register("username")}
                        placeholder='Username'
                    />
                </FieldIconContainer>

                <FieldIconContainer margin_bottom='1rem'>

                    <Icon icon={'/email.png'}/>
                    <InputField
                        {...register("email")}
                        placeholder='Email'
                    />
                </FieldIconContainer>


                <FieldIconContainer margin_bottom='1rem'>

                    <Icon icon={'/password.png'}/>
                    <InputField
                        {...register("password1")}
                        placeholder='Password'
                        type='password'
                    />
                </FieldIconContainer>

                <FieldIconContainer>
                    <Icon icon={'/password.png'}/>
                    <InputField
                        {...register("password2")}
                        placeholder='Confirm password'
                        type='password'
                    />
                </FieldIconContainer>

                <Button type="submit"
                        value="Sign Up"
                        margin_top='2rem'
                />
                <Button type="submit"
                        value="Sample account"
                        margin_top='0.5rem'
                        onClick={handleSubmit(demoAccount)}/>

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