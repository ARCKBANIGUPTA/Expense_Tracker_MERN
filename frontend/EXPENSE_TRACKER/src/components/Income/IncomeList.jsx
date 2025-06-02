import React from "react";
import { LuDownload } from "react-icons/lu";
import TransactionInfoCard from "../Cards/TransactionInfoCard";
import moment from "moment";
const IncomeList=({transactions,onDelete,onDownload})=>{
    return(
        <div className="card">
            <div className="flex items-center justify-between"></div>
            <h5 className="text-lg">Income Sources</h5>
            <br />
            <button onClick={onDownload} className="card-btn">
                <LuDownload className="text-base"/> Download
            </button>
            <br />
            <div className="grid grid-cols-1 md:grid-cols-2">
                  {transactions?.map((income)=> (
                    <TransactionInfoCard
                        key={income._id}
                        title={income.category}
                        icon={income.icon}
                        date={moment(income.date).format("Do MMM YYYY")}
                        amount={income.amount}
                        type="income"
                        onDelete={()=> onDelete(income._id)}
                    />
                ))}
            </div>
        </div>
   
    )
} 

export default IncomeList;