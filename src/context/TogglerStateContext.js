import {createContext, useState, useContext} from "react";
import useLocalStorage from "use-local-storage";

export const TogglerStateContext = createContext()

export const TogglerStateProvider = ({children}) => {
    const [togglerStateArray, setTogglerStateArray] = useLocalStorage('togglerStateArray', [])
    // console.log(profileReveal)
    return (
        <TogglerStateContext.Provider value={{togglerStateArray, setTogglerStateArray}}>
            {children}
        </TogglerStateContext.Provider>
    )
}

export const useTogglerState = () => useContext(TogglerStateContext)