import React from "react";
import {useRef, useState } from "react";
import {LuUser,LuUpload,LuTrash} from "react-icons/lu"//ask chatgpt
const ProfilePhotoSelector = ({image,setImage}) =>{
    const inputRef = useRef(null);//ask chatgpt
    const [previewURL,setPreviewURL] = useState(null);

    const handleImageChange=(e)=>{
        const file = e.target.files[0];
        if(file){
            //Update the image state
            setImage(file)
            const preview = URL.createObjectURL(file);
            setPreviewURL(preview);
        }//ask chatgpt

    }
    const handleImageRemove=()=>{
        setImage(null);
        setPreviewURL(null);
    };
    const onChooseFile = () => {
        inputRef.current.click();

    };

    return(<div className="flex justify-center mb-6">   
        <input 
            type="file"
            accept="image/*"
            ref={inputRef}
            onChange={handleImageChange}
            className="hidden"
        />
        {!image?(
            <div className="w-20 h-20 flex items-center justify-center bg-purple-100 rounded-full relative">
                <LuUser className="text-4xl text-primary"/>
                <button
                    type="button"
                    onClick={onChooseFile}
                    className="w-8 h-8 flex items-center justify-center bg-primary text-white rounded-full absolute -bottom-1 -right-1 "
                >
                    <LuUpload/>
                </button>    
            </div>
        ):(
            <div className="relative">
                <img src={previewURL} 
                alt="profile Photo"
                className="w-20 h-20 rounded-full object-cover "
                />
                <button
                type="button"
                onClick={handleImageRemove}
                className="w-8 h-8 flex items-center justify-center bg-red-500  text-white rounded-full absolute -bottom-1 -right-1 "
                >
                    <LuTrash/>
                </button>
            </div>
        )}
        

    </div>)
}

export default ProfilePhotoSelector;