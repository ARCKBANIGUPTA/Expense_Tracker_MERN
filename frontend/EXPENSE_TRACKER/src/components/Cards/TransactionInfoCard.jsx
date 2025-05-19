import React from 'react';
import {
    LuUtensils,
    LuTrendingUp,
    LuTrendingDown,
    LuTrash2
} from "react-icons/lu";

const TransactionInfoCard = ({title,icon,date,amount, type,hideDeleteBin}) => {
    return(
        <div className="group relative flex items-center gap-4 mt-2 p-3 rounded-lg hover:bg-gray">
            <div className="">
                {icon ? (
                    <img src={icon} alt={title} className=''/>
                ) : (
                    <LuUtensils/>
                )}
            </div>
        </div>
    )
}

export default TransactionInfoCard;