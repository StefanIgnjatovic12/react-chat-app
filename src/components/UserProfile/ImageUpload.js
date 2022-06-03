import {useCallback} from 'react';
import {ImageUploadWrapper} from "../styles/ProfileEditForm.styled";
import {useDropzone} from 'react-dropzone';
import {ImageUploadMainText} from "../styles/ImageUpload.styled";
import {useImageUploadData} from "../../context/ImageUploadDataContext";

export default function ImageUpload() {
    const {uploadedImage, setUploadedImage} = useImageUploadData()
    const onDrop = useCallback((acceptedFiles) => {
        acceptedFiles.forEach((file) => {
            const reader = new FileReader()

            reader.onabort = () => console.log('file reading was aborted')
            reader.onerror = () => console.log('file reading has failed')
            reader.onload = () => {
                // Do whatever you want with the file contents
                const avatarBase64 = reader.result
                //using context so the image data can be sent from the ProfileEditForm component
                setUploadedImage(avatarBase64)
                // console.log(binaryStr)
            }
            reader.readAsDataURL(file)
        })

    }, [])
    const {getRootProps, getInputProps, acceptedFiles} = useDropzone({onDrop})

    const files = acceptedFiles.map(file => (
        <li
            key={file.path}
            style={{listStyleType: 'none'}}
        >
            {file.path}
        </li>
    ));
    return (
        <ImageUploadWrapper height={'8rem'}>

            <div {...getRootProps({className: 'dropzone'})}>
                <input {...getInputProps()} />
                <ImageUploadMainText>
                    {
                        files.length !== 0
                            ? files
                            : 'Drag & drop or choose your avatar'
                    }

                </ImageUploadMainText>
            </div>
        </ImageUploadWrapper>

    )
}