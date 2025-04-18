import React, { useContext } from 'react';
import { UserContext } from "../../context/userContext.jsx";
import Navbar from './Navbar.jsx';
import SideMenu from './SideMenu.jsx';

// DashboardLayout.jsx
const DashboardLayout = ({ children, activeMenu }) => {
    const {user} = useContext(UserContext);
  
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar activeMenu={activeMenu} />
        {user ? (
          <div className="flex flex-1">
            {/* SideMenu Container */}
            <div className="max-[1080px]:hidden">  
            {/* Permanent sidebar visible on screens wider than 1080px */}
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