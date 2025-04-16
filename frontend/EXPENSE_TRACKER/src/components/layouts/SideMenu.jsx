import React,{useContext}from "react";
import { SIDE_MENU_DATA } from "../../utils/data";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";


const SideMenu = ({activeMenu}) => {
    const {user,updateUser,clearUser} = useContext(UserContext);
    const navigate = useNavigate();
    
    const handleclick = (route) => {
        if(route==="logout"){
            handlelogout();
            return;

        }
        navigate(route);
    }
    const handlelogout = () =>{
        localStorage.clear();
        clearUser();
        navigate("/login");

    }
    return (
        <div className="">
            <div className="">

            </div>
        </div>
    );
  };

export default SideMenu;