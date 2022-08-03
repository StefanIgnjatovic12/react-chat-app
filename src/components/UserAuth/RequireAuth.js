import {Navigate, Outlet} from "react-router";

const RequireAuth = () => {
    const userIsSignedIn = localStorage.getItem('userIsSignedIn')
    return (
        userIsSignedIn
            ? <Outlet/>
            : <Navigate
                to="signin"
                replace
            />
    )
}

export default RequireAuth;
