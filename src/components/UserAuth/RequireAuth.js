import {useLocation, Navigate, Outlet} from "react-router";
import {useCurrentUser} from "../../context/CurrentUserContext";

const RequireAuth = () => {

    // const userIsSignedIn = localStorage.getItem('userIsSignedIn')
    // const userIsSignedIn = true
    const {userIsSignedIn} = useCurrentUser()
    // console.log(localStorage.getItem('userIsSignedIn'))
    const location = useLocation()
    return (

        // if allowedRole for that route is current role, ok
        // if not but is logged in user, redirect to unauthorized page
        // if not logged in,

        userIsSignedIn
            ? <Outlet/>
            : <Navigate
                to="signin"
                // state={location}
                replace
            />
    )
}

export default RequireAuth;


