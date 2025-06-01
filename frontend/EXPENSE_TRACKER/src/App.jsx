import React from "react";
import UserProvider from "./context/userContext";
import {
  BrowserRouter as Router,// It manages the navigation history using the browser’s built-in history API (like the back and forward buttons).//
  Routes,//This component is used to define all the possible routes in the application.
  Route,//Each <Route> component defines a mapping between a URL path and a React component.
  Navigate,
  createSessionStorage,//Iska use redirects ya automatic navigation ke liye hota hai.

} from "react-router-dom";
import {Toaster} from 'react-hot-toast';
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";

import Home from "./pages/Dashboard/Home";
import Income from "./pages/Dashboard/Income";
import Expense from "./pages/Dashboard/Expense";



const App = () =>{
  return ( 
    <UserProvider>
      <div>
      <Router>
        <Routes>
          <Route path="/" element={<Root></Root>}></Route>
          <Route path="/login" exact element={<Login/>}></Route> 
          {/* Matches Login route to react Login component */}
          <Route path="/signup" exact element={<Signup/>}></Route> 
          {/* Matches signup route to react signup component */}
          <Route path="/dashboard" exact element={<Home/>}></Route> 
          <Route path="/income" exact element={<Income/>}></Route> 
          <Route path="/expense" exact element={<Expense/>}></Route> 
          {/* exact is used in earlier version of react so that route only Matches to the given path */}
        </Routes>
      </Router>
      </div>
      <Toaster 
        toastOptions={{
          className:"",
          style:{
            fontSize:'13px'
          },
        }}
      />
    </UserProvider>
  )
}

export default App;

const Root = () =>{
  //check if token exists or not
  const isAuthenticated = !!localStorage.getItem("token");
  // "!!" is used to convert a value in boolean values
  // If token exists (truthy value), "!!" converts it to true.
  // If token does not exist (null or undefined), "!!" converts it to false.

  return isAuthenticated ? (<Navigate to="/dashboard"/>) : (<Navigate to="/login"/>);

}