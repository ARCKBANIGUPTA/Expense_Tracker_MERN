import React, { useContext } from "react";
import { SIDE_MENU_DATA } from "../../utils/data";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import CharAvatar from "../Cards/CharAvatar";
const SideMenu = ({ activeMenu }) => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleClick = (route) => {
    if (route === "logout") {
      localStorage.clear();
      clearUser();
      navigate("/login");
    } else {
      navigate(route);
    }
  };

  return (
    <div
      className="
        w-64
        h-[calc(100vh-61px)]
        bg-white
        border-r border-gray-200/50
        p-6
        flex flex-col
        sticky top-[61px] z-20
      "
    >
      {/* 1. Title at top, left-aligned */}
      <h2 className="text-2xl font-semibold text-gray-900 mb-8">
        Expense Tracker
      </h2>

      {/* 2. Profile (still centered) */}
      <div className="flex flex-col items-center mb-8">
        {user?.profileimageurl ? (
          <img
            src={user.profileimageurl}
            alt="Profile"
            className="w-20 h-20 rounded-full bg-slate-200"
          />
        ):(
            <CharAvatar fullname={user?.fullname} width="w-20" height="h-20" style="text-xl"/>
        )}
        <p className="mt-3 text-gray-800 font-medium">
          {user.fullname}
        </p>
      </div>

      {/* 3. Menu buttons (full width, left-aligned) */}
      <nav className="flex-1 flex flex-col justify-start space-y-3">
        {SIDE_MENU_DATA.map((item, i) => (
          <button
            key={i}
            onClick={() => handleClick(item.path)}
            className={`
              flex items-center gap-4
              w-full
              text-sm font-medium
              py-3 px-4 rounded-lg
              ${
                activeMenu === item.label
                  ? "bg-purple-600 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }
            `}
          >
            <item.icon className="text-xl" />
            {item.label}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default SideMenu;
