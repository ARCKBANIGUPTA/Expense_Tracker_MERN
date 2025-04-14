 import axios from "axios";
 import {BASE_URL} from "./apiPaths";

//Avoid repeating base configurations for every API call.
 const axiosInstance = axios.create({
    baseURL:BASE_URL,
    timeout:10000,
    headers:{
        "Content-Type":"application/json",//Specifies the format of the data sent to the server in the request body.The client is sending data to the server in JSON format.
        Accept:"application/json",//Tells the server what format the client expects to receive in the response.The client wants the server to return data in JSON format.
    },

 });

 //request interceptor(intercepts every request)
 //Automatically adds the JWT token from localStorage to the Authorization header of every request.
 axiosInstance.interceptors.request.use(
    (config)=>{
        const accessToken = localStorage.getItem("token");
        if(accessToken){
            config.headers.Authorization = `Bearer ${accessToken}`;//Bearer is an authentication scheme(HTTP HEADER) 
        }
        return config;
    },
    (error)=>{
        return Promise.reject(error);
    }
 );

 //response interceptor(intercepts every response)

 axiosInstance.interceptors.response.use(
    (response)=>{
        return response;
    },
    (error)=>{
        //handle common errors globally
        if(error.response){
            if(error.response.status === 401){
                //redirect to login page
                window.location.href = "/login";
            }else if(error.response.status === 500){
                console.error("Server error.Please try again!!!");
            }
        }else if(error.code==="ECONNABORTED"){
            console.error("Request timeout.Please try again.");
        }
        return Promise.reject(error);
    }
 );

 export default axiosInstance;

//how HTTP header bearer works
//Client (your app) sends a request with the Bearer token.
// Server validates the token:
// If valid → Grants access to protected resources.
// If invalid → Returns 401 Unauthorized.
// in my project token validation is done by "protect"
