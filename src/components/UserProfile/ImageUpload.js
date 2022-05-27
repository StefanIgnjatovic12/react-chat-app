import {useState} from 'react';
import {ImageUploadWrapper} from "../styles/ProfileEditForm.styled";
import {Dropzone, FileItem} from "@dropzone-ui/react";

export default function ImageUpload() {
    const [files, setFiles] = useState([]);
    const updateFiles = (incomingFiles) => {
        console.log(incomingFiles)
        //do something with the files
        setFiles(incomingFiles);
        //even your own upload implementation
    };
    const removeFile = (id) => {
        setFiles(files.filter((x) => x.id !== id));
    };
    return (
        <ImageUploadWrapper height={'6rem'}>
            <Dropzone

                style={
                    {
                        maxWidth: '100%',
                        maxHeight: '100%',
                        backgroundColor: 'transparent',
                        border: 0,
                        fontSize: '12px',
                        fontFamily: '"Quicksand Medium", serif'
                    }
                }
                onChange={updateFiles}
                value={files}
                label={'Drag your avatar image here or click on this area'}
                header={false}
                footer={false}
            >
                {files.map((file) => (
                    <FileItem {...file} onDelete={removeFile} key={file.id} info/>
                ))}
            </Dropzone>
        </ImageUploadWrapper>

    )
}