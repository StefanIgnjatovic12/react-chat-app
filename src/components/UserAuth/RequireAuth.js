import {useLocation, Navigate, Outlet} from "react-router";
import {useCurrentUser} from "../../context/CurrentUserContext";
import {useState} from "react";

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

// const useAuth=()=>{
// 	  const user=localStorage.getItem('user')
// 	  if(user){
// 	    return true
// 	  } else {
// 	    return false
// 	  }
// 	}
//
//
// 	const  PublicRoutes=(props:any) =>{
//
//
// 	  const auth=useAuth()
//
//
// 	  return auth?<Navigate to="/dashboard"/>: <Outlet/>
// 	}
//
//
// 	export default PublicRoutes;;
