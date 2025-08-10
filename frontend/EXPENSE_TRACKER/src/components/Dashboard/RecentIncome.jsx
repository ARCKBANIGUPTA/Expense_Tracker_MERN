import React from "react";
import {LuArrowRight} from "react-icons/lu";
import moment from 'moment';
import TransactionInfoCard from '../Cards/TransactionInfoCard';
const RecentIncome = ({transactions,onSeeMore}) => {
    return(
        <div className='card'>
                    <div className='flex expenses-center justify-between'>
                        <h5 className='text-lg'>Recent Income </h5>
                        <button onClick={onSeeMore} className='card-btn'> See All <LuArrowRight/> </button>
                    </div>
                    <div className='mt-6'>
                        {transactions?.slice(0,5)?.map((income)=> (
                            <TransactionInfoCard
                                key={income._id}
                                title={income.source}
                                icon={income.icon}
                                date={moment(income.date).format("Do MMM YYYY")}
                                amount={income.amount}
                                type="income"
                                hideDeleteBin
                            />
                        ))}
                    </div>
                </div>
    )
}

export default RecentIncome;