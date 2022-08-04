import {useEffect} from "react";
import {authRequestOptions} from "../../hooks/requestOptions";
import {useNavigate} from "react-router-dom";
import {useProfileInfo} from "../../context/ProfileInfoContext";

export default function SignOut() {
    const navigate = useNavigate()
    const {setProfileInfo} = useProfileInfo()
    useEffect(() => {
        fetch('https://drf-react-chat-backend.herokuapp.com/dj-rest-auth/logout/', authRequestOptions('POST'))
            .then(response => response.json())
            .then(data => {
                // localStorage.setItem('token', '')
                localStorage.clear()
                setProfileInfo([])
                console.log(data)
            })
            .then(navigate('/signin'))
            .catch(error => console.log(error))
    }, [])


    return (
        <div></div>
    )
}