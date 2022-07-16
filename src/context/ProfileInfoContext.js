import {createContext, useState, useContext} from "react";

export const ProfileInfoContext = createContext()

export const ProfileInfoProvider = ({children}) => {
    const [profileInfo, setProfileInfo] = useState([])
    return (
        <ProfileInfoContext.Provider value={{profileInfo, setProfileInfo}}>
            {children}
        </ProfileInfoContext.Provider>
    )
}

export const useProfileInfo = () => useContext(ProfileInfoContext)