import React from 'react';
import { LuArrowRight } from "react-icons/lu";
import TransactionInfoCard from '../Cards/TransactionInfoCard';
import moment from 'moment';
const ExpenseTransactions=({transactions,OnSeeMore})=>{
    return(
        <div className='card'>
            <div className='flex expenses-center justify-between'>
                <h5 className='text-lg'>Expense Transactions</h5>
                <button onClick={OnSeeMore} className='card-btn'> See All <LuArrowRight/> </button>
            </div>
            <div className='mt-6'>
                {transactions?.slice(0,5)?.map((expense)=> (
                    <TransactionInfoCard
                        key={expense._id}
                        title={expense.category}
                        icon={expense.icon}
                        date={moment(expense.date).format("Do MMM YYYY")}
                        amount={expense.amount}
                        type="expense"
                        hideDeleteBin
                    />
                ))}
            </div>
        </div>
        
    )
}

export default ExpenseTransactions;