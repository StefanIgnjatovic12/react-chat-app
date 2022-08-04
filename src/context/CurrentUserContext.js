import {createContext, useState, useContext} from "react";
import {authRequestOptions} from "../hooks/requestOptions";
// import {authRequestOptions} from "../hooks/requestOptions";

export const CurrentUserContext = createContext()

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [userIsSignedIn, setUserIsSignedIn] = useState(false)
  const fetchCurrentUser = async () => {
    let response = await fetch("https://drf-react-chat-backend.herokuapp.com/dj-rest-auth/user/", authRequestOptions('GET'))
    const result = await response.json()
    return result.pk
  }

  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser, fetchCurrentUser, userIsSignedIn, setUserIsSignedIn }}>
      {children}
    </CurrentUserContext.Provider>
  )
}

export const useCurrentUser = () => useContext(CurrentUserContext)
