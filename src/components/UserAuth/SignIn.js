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

export default function SignIn() {

    const {register, handleSubmit, watch, formState: {errors}} = useForm()

    const signInUser = async (body) => {
        const response = await fetch('http://127.0.0.1:5000/dj-rest-auth/signin/', requestOptions('POST', body))
        console.log(response)
    }
    const onSubmit = data => {
        console.log(data)
        signInUser(data)
    }

    const demoAccount = () => console.log('test')

    return (
        <Background>
            <Form onSubmit={handleSubmit(onSubmit)} min_height="30vh">
                <FieldIconContainer>
                    <Icon icon={'/username.png'}/>
                    <InputField
                        {...register("username")}
                        placeholder='Username'
                    />
                </FieldIconContainer>


                <FieldIconContainer>

                    <Icon icon={'/password.png'}/>
                    <InputField
                        {...register("password")}
                        placeholder='Password'
                        type='password'
                    />
                </FieldIconContainer>


                <Button type="submit"
                        value="Sign In"
                        margin_top='1rem'
                />
                <Button type="submit"
                        value="Sample account"
                        onClick={handleSubmit(demoAccount)}/>

                />


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