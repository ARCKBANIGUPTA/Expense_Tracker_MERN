import React ,{useState} from "react";
import Input from "../Inputs/Inputs";
import EmojiPickerPopUp from "../layouts/EmojiPickerPopUp";
const AddExpenseForm=({onAddExpense})=>{
    const [expense,setExpense] = useState({
            icon:"",
            category:"",
            amount:"",
            date:"",
            
        });
        const handleChange=(key,value)=>{
            setExpense({...expense,[key]:value});
        }
        return(
                <div>
                    <EmojiPickerPopUp 
                        icon={expense.icon}
                        onSelect={(selectedIcon)=>handleChange("icon",selectedIcon)}
                    />
                    <Input 
                        value={expense.category}
                        onChange={({target})=>handleChange("category",target.value)}
                        label="Expense Category" 
                        placeholder="Home rent,Households etc."
                        type="text"
                    />
    
                    <Input 
                        value={expense.amount}
                        onChange={({target})=>handleChange("amount",target.value)}
                        label="Amount"
                        placeholder="₹3000"
                        type="number"
                    />
                    <Input 
                        value={expense.date}
                        onChange={({target})=>handleChange("date",target.value)}
                        label="Date"
                        placeholder="DD/MM/YYYY"
                        type="date"
                    />
                    <div className="flex justify-end mt-6">
                        <button
                            type="button"
                            className="add-btn add-btn-fill"
                            onClick={()=>onAddExpense(expense)}
                        >
                            Add Expense
                        </button>
                    </div>
                   
    
                </div>
            )
}

export default AddExpenseForm;