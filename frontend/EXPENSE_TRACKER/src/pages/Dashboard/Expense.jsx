import React, {useState,useEffect} from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useUserAuth } from "../../hooks/useUserAuth";
import { API_PATHS } from "../../utils/apiPaths";
import axiosInstance from "../../utils/axiosInstance";
import ExpenseOverview from "../../components/Expense/ExpenseOverview"
import Modal from "../../components/layouts/Modal";
import AddExpenseForm from "../../components/Expense/AddExpenseForm";
const Expense = () =>{
    useUserAuth();
    const [ExpenseData,setExpenseData] = useState([]);
    const [loading,setloading] = useState(false);
    const [OpenAddExpenseModal,setOpenAddExpenseModal]=useState(false);
    const [openDeleteAlert,setopenDeleteAlert]=useState({
        show:false,
        data:null,
    });
    const fetchExpenseDetails = async () => {
        if(loading) return;

        setloading(true);
        try{
            const response = await axiosInstance.get(`${API_PATHS.EXPENSE.GET_ALL_EXPENSE}`);

            if(response.data){
                setExpenseData(response.data);
            }
        }catch(err){
            console.log("Server Error !!!")
        }finally{
            setloading(false);
        }
    }

    // Handle add expense
    const handleAddExpense= async (expense)=>{
        const {amount,category,date,icon}=expense;
        //validation check
        if(!category.trim()){
            toast.error("Category is required!");
            return;
        }
        if(!amount || isNaN(amount) || Number(amount) <= 0){
            toast.error("Amount should be a valid number greater than 0!");
            return;
        }
        if(!date){
            toast.error("Date is required!");
            return;
        }
        try{
            const response = await axiosInstance.post(`${API_PATHS.EXPENSE.ADD_EXPENSE}`,{
                icon,
                category,
                amount,
                date,
            });

            setOpenAddExpenseModal(false);
            toast.success("expense added succesfully!");
            fetchExpenseDetails();
        }catch(error){
            console.error("Error in Adding the expense",error.response?.data?.message || error.message);
        }

    }
    

    //Delete expense
    const DeleteExpense=async(id)=>{
        try{
            await axiosInstance.delete(`${API_PATHS.EXPENSE.DELETE_EXPENSE(id)}`);

            setopenDeleteAlert({show:false,data:null});
            toast.success("expense deleted successfully!");
            fetchExpenseDetails();

        }catch(error){
            console.error("Error in deleting the expense",error?.response?.data?.message || error.message);
        }
         
    };

    // Handle expense download
    const DownloadExpense=async()=>{};

    useEffect(()=>{
            fetchExpenseDetails();
            return ()=>{};
    })

    return(
        <DashboardLayout activeMenu="Expense">
            <div className="my-5 mx-auto">
                <div className="grid grid-cols-1 gap-6">
                    <div>
                        <ExpenseOverview
                        transactions={ExpenseData}
                        onExpenseIncome={()=>setOpenAddExpenseModal(true)}
                        />
                    </div>
                </div>
                <Modal
                    isOpen={OpenAddExpenseModal}
                    onClose={()=>setOpenAddExpenseModal(false)}
                    title="Add Expense"
                >
                    <AddExpenseForm onAddExpense={handleAddExpense}/>
                </Modal>
            </div>
        </DashboardLayout>
    )
}

export default Expense;