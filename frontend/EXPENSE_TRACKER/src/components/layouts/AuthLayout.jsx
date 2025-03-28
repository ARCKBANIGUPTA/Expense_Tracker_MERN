import React from "react";
import CARD_2 from "/Users/arckbanigupta/Documents/MAJOR_PROJECT/frontend/EXPENSE_TRACKER/src/assets/images/expense_tracker_cropped.png"
import {LuTrendingUpDown} from "react-icons/lu" // icon representing up and downs
const AuthLayout = ({children}) => {
    return(
        <div className="flex">
            <div className="w-screen h-screen md:w-[60vw] px-12 pt-8 pb-12">
                <h1 className="text-xl font-medium text-black">
                    Expense Tracker
                    {/* this part is representing the half page of login page */}
                </h1>
                {children}
            </div>

            <div className="hidden md:block w-[40vw] h-screen bg-violet-50 bg-auth-bg-img bg-cover bg-no-repeat bg-center overflow-hidden p-8 relative">
                <div className="w-48 h-48 rounded-[40px] bg-purple-600 absolute -top-7 -left-5"></div> 
                {/* this is for design, a solid rectangle color */}
                <div className="w-48 h-48 rounded-[40px] bg-violet-500 absolute -bottom-7 -left-5 "></div>
                {/* this is for design, a solid rectangle color */}
                <div className="w-48 h-56 rounded-[40px] border-[20px] border-pink-700 absolute top-[10%] right-[-5%]"></div>

                <div className="grid grid-cols-1 z-20">
                    <StatsInfoCard
                     icon={<LuTrendingUpDown/>}
                     label="Track your Income and expenses"
                     value="430,300"
                     color="bg-primary"
                    />
                    {/* this will send props(or argument{icons,label etc..}) to the function defined below */}
                 </div>

                <img src={CARD_2}  alt="Graph"  className="w-64 lg:w-[90%] absolute bottom-10 shadow-lg shadow-blue-400/15"/>
            </div>
        </div>
    )
}

export default AuthLayout;
//  desigend react reusable component The component renders a div with a flex layout, containing:
// A circular container for the icon, styled with the color prop.
//  A text section displaying the label and value.
const StatsInfoCard = ({icon,label,value,color}) =>{
    return(<div className="flex gap-6 bg-white p-4 rounded-xl shadow-md shadow-purple-400/10 border border-gray-200/50 z-1">
        <div className={`w-12 h-12 flex items-center justify-center text-[26px] text-white ${color} rounded-full drop-shadow`}>
            {icon}
        </div>
        <div>
        <h6 className="text-xs text-gray-500 mb-1">{label}</h6>
        <span className="text-[20px]">${value}</span>
        </div>
    </div>)
}