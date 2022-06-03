import {createContext, useState, useContext} from "react";

export const ImageUploadDataContext = createContext()

export const ImageUploadDataProvider = ({children}) => {
    const [uploadedImage, setUploadedImage] = useState(null)
    return (
        <ImageUploadDataContext.Provider value={{uploadedImage, setUploadedImage}}>
            {children}
        </ImageUploadDataContext.Provider>
    )
}

export const useImageUploadData = () => useContext(ImageUploadDataContext)