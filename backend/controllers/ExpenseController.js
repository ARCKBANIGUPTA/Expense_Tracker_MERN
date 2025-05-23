const User = require("../models/Users");
const Expense = require("../models/Expense");
const xlsx = require('xlsx');
exports.addExpense = async(req,res) =>{
    const userID = req.user.id;
    try{
        const {icon,category,amount,date} = req.body;
        if(!category || !amount || !date){
            return res.status(400).json({message:"All fields are Mandatory"});
        }

        const newExpense = new Expense({
            userID,
            icon,
            category,
            amount,
            date: new Date(date)
        });
        await newExpense.save();
        res.status(200).json({message:"New Expense added succesfully"});
    }catch(err){
        res.status(500).json({message:"Server error!"});
    }

};

exports.getAllExpense = async (req,res) =>{   
    const userID = req.user.id;
    console.log(userID);
    console.log(typeof userID);
    try{
        const expense = await Expense.find({userID: userID}).sort({date:-1});
        console.log(expense);
        res.json(expense);
    }catch(err){
        res.status(500).json({message:"Server error!"});
    }
};

exports.deleteExpense = async (req,res)=>{
    try{
        await Expense.findByIdAndDelete(req.params.id);
        res.json({message:"Expense deleted Successfully"});
    }catch(err){
        res.status(500).json({message:"Server error!"});
    }
};

exports.downloadExpenseExcel = async(req,res)=>{
        const userID = req.user.id;
        try{
            const exExpense = await Expense.find({userID}).sort({date:-1});
    
            const data = exExpense.map((item)=>({
                Category:item.category,
                Amount:item.amount,
                Date:item.date,
            }));
            const wb = xlsx.utils.book_new();//Creates a new Excel workbook (a container for sheets).Like opening a new Excel file.
            const ws = xlsx.utils.json_to_sheet(data);// Converts an array of JSON objects into an Excel worksheet,I/P: array of objects, where keys = column headers, values = cell data
            xlsx.utils.book_append_sheet(wb,ws,"Expense");//Adds a worksheet to the workbook.wb->the workboob || ws-> worksheet to add
            xlsx.writeFile(wb,'expense_details.xlsx');//Saves the workbook as an Excel file on the server.
            res.download('expense_details.xlsx');//Sends the file to the client for download (Express.js method).
    
        }catch(err){
            res.status(500).json({message:"Server Issue!"});
        }
};

