import {createContext, useState, useContext} from "react";


export const FinishedLoadingContext = createContext()

export const FinishedLoadingProvider = ({ children }) => {
  const [finishedLoadingArray,setFinishedLoadingArray] = useState([])


  return (
    <FinishedLoadingContext.Provider value={{ finishedLoadingArray, setFinishedLoadingArray }}>
      {children}
    </FinishedLoadingContext.Provider>
  )
}

export const useFinishedLoading = () => useContext(FinishedLoadingContext)
