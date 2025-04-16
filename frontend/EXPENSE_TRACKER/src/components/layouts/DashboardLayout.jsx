import React, { useContext } from 'react';
import { UserContext } from "../../context/userContext.jsx";
import Navbar from './Navbar.jsx';
import SideMenu from './SideMenu.jsx';

// DashboardLayout.jsx
const DashboardLayout = ({ children, activeMenu }) => {
    const {user} = useContext(UserContext);
    console.log("UserConetxt:",user);
  
    return (
      <div className="flex ">
        <Navbar activeMenu={activeMenu} />
        {user ? (
          <div className="flex">
            {/* SideMenu Container */}
            <div className="max-[1080px]:hidden">
              <SideMenu activeMenu={activeMenu} />
            </div>
  
            {/* Main Content */}    
            <div className="grow mx-5">
              {children}
            </div>
          </div>
        ):
        (
            <div><h6>User does not exist</h6></div>
        )}

      </div>
    );
  };

export default DashboardLayout;