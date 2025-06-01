import React, { useState } from "react";
import Input from "../Inputs/Inputs";
import EmojiPickerPopUp from "../layouts/EmojiPickerPopUp";
const AddIncomeForm = ({onAddIncome}) => {
    const [income,setIncome] = useState({
        amount:"",
        source:"",
        date:"",
        icon:""

    });
    const handleChange=(key,value)=>{
        setIncome({...income,[key]:value});
    }
    return(
            <div>
                <EmojiPickerPopUp 
                    icon={income.icon}
                    onSelect={(selectedIcon)=>handleChange("icon",selectedIcon)}
                />
                <Input 
                    value={income.source}
                    onChange={({target})=>handleChange("source",target.value)}
                    label="Income Source" 
                    placeholder="Freelance,Investments etc."
                    type="text"
                />

                <Input 
                    value={income.amount}
                    onChange={({target})=>handleChange("amount",target.value)}
                    label="Amount"
                    placeholder="₹3000"
                    type="next"
                />
                <Input 
                    value={income.date}
                    onChange={({target})=>handleChange("date",target.value)}
                    label="Date"
                    placeholder="DD/MM/YYYY"
                    type="date"
                />
                <div className="flex justify-end mt-6">
                    <button
                        type="button"
                        className="add-btn add-btn-fill"
                        onClick={()=>onAddIncome(income)}
                    >
                        Add Income
                    </button>
                </div>
               

            </div>
        )
}

export default AddIncomeForm;