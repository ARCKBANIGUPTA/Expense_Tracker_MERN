import React, { useContext } from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Inputs from "../../components/Inputs/Inputs.jsx"
import { Link } from "react-router-dom";
import { validateEmail } from "../../utils/helper.js";
import axiosInstance from "../../utils/axiosInstance.js";
import { API_PATHS } from "../../utils/apiPaths.js";
import { UserContext } from "../../context/userContext.jsx";
const Login = () =>{
    const [email,setEmail] = useState("");
    const[password,setPassword] = useState("");
    const[error,setError] = useState(null);
    const navigate = useNavigate();
    const { updateuser} = useContext(UserContext);
    const handleLogin= async(e)=>{
        e.preventDefault();

        if(!validateEmail(email)){
            setError("Please Enter the valid email address");
            return;
        }
        if(!password){
            setError("Please enter the password");
            return;
        }
        setError("");

        //login api call 
        try{
            const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN,{
                email,
                password,
            });
            const {token,user} = response.data;

            if(token){
                localStorage.setItem("token",token);
                updateuser(user);
                navigate("/dashboard");
            }

        }catch(error){
            if(error.response && error.response.data.message){
                setError(error.response.data.message);

            }
            else{
                console.log(error);
                setError("Some error has occured!!!");
            }
        }

    }
    
    return(
        <AuthLayout>
            <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
                <h3 className="text-xl font-semibold text-black">Welcome Back</h3>
                <p className="text-xs text-slate-700 mt-[5px] mb-6">Please enter your details for Login :</p>

                <form onSubmit={handleLogin}>
                    <Inputs type="text" value={email} onChange={({target})=> setEmail(target.value)} //whenever there is change in the input by the user OnChange event will trigerr
                    //target refers to the DOM element that triggered the event. Specifically, it is a property of the event object that is automatically passed to the event handler function.
                    label="Email Address"
                    placeholder="johny@example.com"
                    />
                     <Inputs type="password" value={password} onChange={({target})=> setPassword(target.value)} //whenever there is change in the input by the user OnChange event will trigerr
                    //target refers to the DOM element that triggered the event. Specifically, it is a property of the event object that is automatically passed to the event handler function.
                    label="Password"
                    placeholder="At least 8 characters"
                    />
                    {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

                    <button type="submit" className="btn-primary">Login</button>

                    <p className="text-[13px] text-slate-800 mt-3">
                        Don't have an account?{" "}
                        <Link className="font-medium text-purple underline" to="/signup">SignUP</Link>
                    </p>
                </form>
            </div>
        </AuthLayout>
    )
}

export default Login;
// how Inputs component is working
// When the user types in the email input field:

// The onChange event is triggered.

// The onChange handler (({ target }) => setEmail(target.value)) extracts the new value from the input field (target.value).

// The setEmail function updates the email state in the Login component.

// The updated email value is passed back to the Inputs component as the value prop, ensuring the input field displays the current value.


