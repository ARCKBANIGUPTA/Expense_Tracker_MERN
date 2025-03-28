import React from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Inputs from "../../components/Inputs/Inputs.jsx"
import { Link } from "react-router-dom";
import { validateEmail } from "../../utils/helper.js";
import ProfilePhotoSelector from "../../components/Inputs/ProfilePhotoSelector.jsx";

const Signup = () =>{
    const [profilepic,setProfilepic] = useState(null);
    const [fullname,setFullName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [errors,setError] = useState(null);

    const navigate = useNavigate();


    //handle form submit
    const handleSignup = async (e) =>{
        e.preventDefault();

       
        if(!validateEmail(email)){
            setError("Please Enter the valid email address");
            return;
        }
        if(!fullname){
            setError("Please enter your name");
            return;
        }

        
        if(!password){
            setError("Please enter the password");
            return;
        }
       

        setError("");
    }
    return(
        <AuthLayout>
            <div className="lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center">
                <h3 className="text-xl font-semibold text-black">Create an account</h3>
                 <p className="text-xs text-slate-700 mt-[5px] mb-6">Join us today by entering your details :</p>
                 <form action="" onSubmit={handleSignup}>
                    <ProfilePhotoSelector image={profilepic} setImage={setProfilepic} />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Inputs type="text" value={email} onChange={({target})=> setEmail(target.value)} //whenever there is change in the input by the user OnChange event will trigerr
                            //target refers to the DOM element that triggered the event. Specifically, it is a property of the event object that is automatically passed to the event handler function.
                            label="Email Address"
                            placeholder="johny@example.com"
                        />
                       
                        <Inputs type="text" value={fullname} onChange={({target})=> setFullName(target.value)} //whenever there is change in the input by the user OnChange event will trigerr
                            //target refers to the DOM element that triggered the event. Specifically, it is a property of the event object that is automatically passed to the event handler function.
                            label="Please enter your Full Name "
                            placeholder="Walter White"
                        />
                        <div className="col-span-2">
                            <Inputs type="password" value={password} onChange={({target})=> setPassword(target.value)} //whenever there is change in the input by the user OnChange event will trigerr
                                //target refers to the DOM element that triggered the event. Specifically, it is a property of the event object that is automatically passed to the event handler function.
                                label="Password"
                                placeholder="At least 8 characters"
                            />
                        </div>
                        {errors && <p className="text-red-500 text-xs pb-2.5">{errors}</p>}
                         
                        <button type="submit" className="btn-primary col-span-2">SignUP</button>

                        <p className="text-[13px] text-slate-800 mt-3">
                            Already have an account{" "}
                            <Link className="font-medium text-purple underline" to="/login">Login</Link>
                        </p>


                    </div>
                 </form>
            </div>

        </AuthLayout>
    )
}

export default Signup;