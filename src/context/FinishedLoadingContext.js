import {createContext, useState, useContext} from "react";


export const FinishedLoadingContext = createContext()

export const FinishedLoadingProvider = ({ children }) => {
  const [finishedLoading, setFinishedLoading] = useState(false)


  return (
    <FinishedLoadingContext.Provider value={{ finishedLoading, setFinishedLoading}}>
      {children}
    </FinishedLoadingContext.Provider>
  )
}

export const useFinishedLoading = () => useContext(FinishedLoadingContext)
