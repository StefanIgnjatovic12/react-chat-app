import {createContext, useState, useContext} from "react";
import useLocalStorage from "use-local-storage";

export const ActiveConvoContext = createContext()

export const ActiveConvoProvider = ({children}) => {
    //set a default and then change it on click of left side chats
    const [activeConvo, setActiveConvo] = useLocalStorage('activeConvo', '')
    //used to determine data shown in the header portion
    const [headerConvo, setHeaderConvo] = useState(null)
    //used to load messages saved to database
    //set on page load and on click of chats on the left side
    const [messages, setMessages] = useState(null)
    //put into dependency array for ChatList. Increment it on new message sent
    //so that ChatList wil update
    const [reloadSideBar, setReloadSideBar] = useState(0)
    return (
        <ActiveConvoContext.Provider value={{
            activeConvo,
            setActiveConvo,
            messages,
            setMessages,
            headerConvo,
            setHeaderConvo,
            reloadSideBar,
            setReloadSideBar
        }}>
            {children}
        </ActiveConvoContext.Provider>
    )
}

export const useActiveConvo = () => useContext(ActiveConvoContext)