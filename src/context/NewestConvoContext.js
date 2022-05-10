import {createContext, useState, useContext} from "react";

export const NewestConvoContext = createContext()

export const NewestConvoProvider = ({children}) => {
    const [newestConvo, setNewestConvo] = useState(null)

    return (
        <NewestConvoContext.Provider value={{newestConvo, setNewestConvo}}>
            {children}
        </NewestConvoContext.Provider>
    )
}

export const useNewestConvo = () => useContext(NewestConvoContext)