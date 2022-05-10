import {createContext, useState, useContext} from "react";

export const ActiveConvoContext = createContext()

export const ActiveConvoProvider = ({children}) => {
    const [activeConvo, setActiveConvo] = useState(null)

    return (
        <ActiveConvoContext.Provider value={{activeConvo, setActiveConvo}}>
            {children}
        </ActiveConvoContext.Provider>
    )
}

export const useActiveConvo = () => useContext(ActiveConvoContext)