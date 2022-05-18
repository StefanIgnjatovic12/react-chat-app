import {createContext, useState, useContext} from "react";

export const ProfileRevealContext = createContext()

export const ProfileRevealProvider = ({children}) => {
    const [profileReveal, setProfileReveal] = useState([])
    // console.log(profileReveal)
    return (
        <ProfileRevealContext.Provider value={{profileReveal, setProfileReveal}}>
            {children}
        </ProfileRevealContext.Provider>
    )
}

export const useProfileReveal = () => useContext(ProfileRevealContext)