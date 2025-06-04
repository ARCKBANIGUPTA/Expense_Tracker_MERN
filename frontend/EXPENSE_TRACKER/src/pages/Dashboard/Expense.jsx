import React, {useState,useEffect, createElement} from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useUserAuth } from "../../hooks/useUserAuth";
import { API_PATHS } from "../../utils/apiPaths";
import axiosInstance from "../../utils/axiosInstance";
import ExpenseOverview from "../../components/Expense/ExpenseOverview"
import Modal from "../../components/layouts/Modal";
import AddExpenseForm from "../../components/Expense/AddExpenseForm";
import DeleteAlert from "../../components/layouts/DeleteAlert";
import ExpenseList from "../../components/Expense/ExpenseList";

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
        const {icon,category,amount,date}=expense;
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
    const DownloadExpense=async()=>{
        try{
            const response = await axiosInstance.get(`${API_PATHS.EXPENSE.DOWNLOAD_EXPENSE}`,
                {
                    responseType:"blob",
                }
            );
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href=url;
            link.setAttribute("download","expense_details.xlsx");
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch(error){
            console.error("Error downloading expense details:",error);
            toast.error("Failed to Download the details")
        }
    };

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
                    <ExpenseList 
                        transactions={ExpenseData}
                        onDelete={(id)=>{
                            setopenDeleteAlert({show:true,data:id});
                        }}
                        onDownload={DownloadExpense}
                    />
                </div>
                <Modal
                    isOpen={OpenAddExpenseModal}
                    onClose={()=>setOpenAddExpenseModal(false)}
                    title="Add Expense"
                >
                    <AddExpenseForm onAddExpense={handleAddExpense}/>
                </Modal>

                <Modal
                isOpen={openDeleteAlert.show}
                onClose={()=>setopenDeleteAlert({show:false, data:null})}
                title="Delete Expense"
                >
                    <DeleteAlert content="Are you sure you want to delete this expense ?" onDelete={()=>DeleteExpense(openDeleteAlert.data)}/>
                </Modal>
            </div>
        </DashboardLayout>
    )
}

export default Expense;