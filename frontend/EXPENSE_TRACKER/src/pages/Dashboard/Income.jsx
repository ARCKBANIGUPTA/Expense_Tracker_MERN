import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import IncomeOverview from "../../components/Income/IncomeOverview";
import Modal from "../../components/layouts/Modal";
const Income = () => {
    const [loading,setLoading]=useState(false);
    const [incomedata,setincomedata] =useState([]);
    const [OpenAddIncomeModal,setOpenAddIncomeModal]=useState(true);
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
    const handleAddIncome=async(income)=>{};

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
                    <div>Add income form</div>
                </Modal>
            </div>

        </DashboardLayout>
    )
}

export default Income;