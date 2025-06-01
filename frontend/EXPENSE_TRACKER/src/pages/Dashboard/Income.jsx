import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import IncomeOverview from "../../components/Income/IncomeOverview";
import Modal from "../../components/layouts/Modal";
import AddIncomeForm from "../../components/Income/AddIncomeForm";

const Income = () => {
    const [loading,setLoading]=useState(false);
    const [incomedata,setincomedata] =useState([]);
    const [OpenAddIncomeModal,setOpenAddIncomeModal]=useState(false);
    const [openDeleteAlert,setopenDeleteAlert]=useState({
        show:false,
        data:null,
    });

    //Get all the income Details
    const fetchIncomeDetails = async () => {
        if(loading) return;

        setLoading(true);
        try{
            const response = await axiosInstance.get(`${API_PATHS.INCOME.GET_ALL_INCOME}`);

            if(response.data){
                setincomedata(response.data);
            }
        }catch(err){
            console.log("Server Error !!!")
        }finally{
            setLoading(false);
        }
    }

    // Handle add income
    const handleAddIncome= async (income)=>{
        const {amount,source,date,icon}=income;
        //validation check
        if(!source.trim()){
            toast.error("Source is required!");
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
            const response = await axiosInstance.post(`${API_PATHS.INCOME.ADD_INCOME}`,{
                icon,
                source,
                amount,
                date,
            });

            setOpenAddIncomeModal(false);
            toast.success("Income added succesfully!");
            fetchIncomeDetails();
        }catch(error){
            console.error("Error in Adding the income",error.response?.data?.message || error.message);
        }

    }
    

    //Delete income
    const DeleteIncome=async(id)=>{};

    // Handle income download
    const DownloadIncome=async()=>{};
    useEffect(()=>{
        fetchIncomeDetails();
        return ()=>{};
    })
    return(
        <DashboardLayout activeMenu="Income">
            <div className="my-5 mx-auto">
                <div className="grid grid-cols-1 gap-6">
                    <div>
                        <IncomeOverview
                            transactions={incomedata}
                            onAddIncome = {()=>setOpenAddIncomeModal(true)}
                        />

                    </div>
                </div>
                <Modal 
                    isOpen={OpenAddIncomeModal}
                    onClose={()=> setOpenAddIncomeModal(false)}
                    title="Add Income"
                >
                    <AddIncomeForm onAddIncome={handleAddIncome}/>
                </Modal>
            </div>

        </DashboardLayout>
    )
}

export default Income;