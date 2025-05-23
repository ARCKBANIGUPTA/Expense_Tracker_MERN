import React from 'react';
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";
const CustomPieChart = ({data,label,totalAmount,colors,showTextAnchor}) => {
    return(
        <ResponsiveContainer width="100%" height={380}>
            <PieChart>
                <Pie 
                data={data}
                dataKey = "amount" // Specifies which field contains the numeric values for the chart
                nameKey="name" //Specifies which field contains the labels/names for each slice
                cx="50%"
                cy="50%"
                outerRadius={130}
                innerRadius={100}
                labelLine={false}
                >
                    {data.map((entry,index) => (
                        <Cell key={`cell-${index}`} fill={colors[index % colors.length]}/>
                    ))}
                    //	•	Maps through data to assign colors to each slice
	                //  •	Uses modulo operator (`%`) to cycle through colors if there are more data points than colors

                </Pie>
                <Tooltip /> // Shows data on hover
                <Legend/>  // Shows legend with labels //uses dataKey and nameKey to identify the legends
                {showTextAnchor && (
                    <>
                        <text x="50%" y="50%" dy={-25} textAnchor='middle' fill="#666" fontSize="14px">{label}</text>
                         <text x="50%" y="50%" dy={8} textAnchor='middle' fill="#333" fontSize="24px" fontWeight="semi-bold">{totalAmount}</text>

                    </>
                )}
            </PieChart>
        </ResponsiveContainer>
    )
};

export default CustomPieChart;