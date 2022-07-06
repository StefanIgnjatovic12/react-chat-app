import {createContext, useState, useContext} from "react";


export const CreateNewChatContext = createContext()

export const CreateNewChatProvider = ({ children }) => {
  const [newChatCreated, setNewChatCreated] = useState(0)


  return (
    <CreateNewChatContext.Provider value={{ newChatCreated, setNewChatCreated}}>
      {children}
    </CreateNewChatContext.Provider>
  )
}

export const useCreateNewChat = () => useContext(CreateNewChatContext)
