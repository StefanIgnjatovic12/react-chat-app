import {createContext, useState, useContext} from "react";
import {authRequestOptions} from "../hooks/requestOptions";
// import {authRequestOptions} from "../hooks/requestOptions";

export const CurrentUserContext = createContext()

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const fetchCurrentUser = async () => {
    let response = await fetch("http://127.0.0.1:5000/dj-rest-auth/user/", authRequestOptions('GET'))
    const result = await response.json()
    return result.pk
  }

  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser, fetchCurrentUser }}>
      {children}
    </CurrentUserContext.Provider>
  )
}

export const useCurrentUser = () => useContext(CurrentUserContext)
