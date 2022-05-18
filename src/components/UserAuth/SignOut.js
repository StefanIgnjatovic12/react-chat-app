import {useEffect} from "react";
import {authRequestOptions} from "../../hooks/requestOptions";
import {useNavigate} from "react-router-dom";

export default function SignOut() {
    const navigate = useNavigate()
    useEffect(() => {
        fetch('http://127.0.0.1:5000/dj-rest-auth/logout/', authRequestOptions('POST'))
            .then(response => response.json())
            .then(data => {
                localStorage.setItem('token', '')
                console.log(data)
            })
            .then(navigate('/signin'))
            .catch(error => console.log(error))
    },[])


    return (
        <div></div>
    )
}