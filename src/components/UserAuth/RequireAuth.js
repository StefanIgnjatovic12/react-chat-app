import {Navigate, Outlet} from "react-router";

const RequireAuth = () => {
    const userIsSignedIn = localStorage.getItem('userIsSignedIn')
    return (
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
