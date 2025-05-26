import React, { useEffect, useState } from "react";
import CustomPieChart from "../Charts/CustomPieChart";


const COLORS= ["#875cf5","#FA2C37","#FF6900","#4f39f6"];
const RecentIncomeChart=({data,totalIncome})=>{
    const [chartdata,setchartdata] = useState([]);

    const prepareChartData=()=>{
        const dataArr = data?.map((item)=> ({
            name:item?.source,
            amount : item?.amount,
        }))
        // console.log("this is tthe rcent income",dataArr);
        setchartdata(dataArr);
    }
    useEffect(()=>{
        prepareChartData();
       return  ()=>{}
    },[data]);
    
    return(
        <div className="card">
            <div className="flex items-center justify-between">
                <h5 className="text-lg"> Last 60 Days Income</h5>
            </div>
            <CustomPieChart
                data={chartdata}
                label="Total Income"
                totalAmount={`$${totalIncome}`}
                showTextAnchor
                colors={COLORS}
                />
        </div>
    )
}

export default RecentIncomeChart;