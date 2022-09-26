import React, { useState, useRef, useEffect} from "react";

const Avatar = props => {

    const [file, setFile] = useState();
    const [previewUrl, setPreviewUrl] = useState();
    const [isValid, setIsValid] = useState(false);
    const filePickerRef = useRef();

    useEffect(() => {
        if (!file) {
            return;
        }

        const fileReader = new FileReader();
        fileReader.onload = () => {
            setPreviewUrl(fileReader.result);
        };
        fileReader.readAsDataURL(file);

    }, [file]);

    const pickedHandler = event => {
        let pickedFile;
        let fileIsValid = isValid;
        if (event.target.files && event.target.files.length === 1) {
            pickedFile = event.target.files[0];
            setFile(pickedFile);
            setIsValid(true);
            fileIsValid = true;
        } else {
            setIsValid(false);
            fileIsValid = false;
        }

        props.onInput(props.id, pickedFile, fileIsValid);
    }

    const pickImageHandler = () => {
        filePickerRef.current.click();
    };

    return (
        <div className="relative">

            <input
                id={props.id}
                ref={filePickerRef}
                type="file" 
                style={{display:"none"}}
                accept=".png,.jpg,.jpeg"
                onChange={pickedHandler}
            />

            <img 
                src={previewUrl || props.src} 
                alt={props.alt || "profile"}
                className={`${props.className}`} 
            />
            {props.isEditable 
                && 
                    <div 
                        onClick={pickImageHandler}
                        className={`group absolute w-full bottom-0 left-0 right-0 bg-black bg-opacity-40 ${props.hoverClasses} h-1/2 hover:h-full cursor-pointer`}
                    >
                        <div className="h-full w-full text-white font-bold flex justify-center">
                            <div className="relative top-1/3 group-hover:top-1/2">
                                {props.title}
                            </div>
                        </div>
                    </div>
            }
        </div>
    );
};

export default Avatar;