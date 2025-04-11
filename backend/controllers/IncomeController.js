const User = require("../models/Users");
const Income = require("../models/Income");
const xlsx = require('xlsx');
exports.addIncome=async(req,res)=>{
    const userId = req.user.id;
    try{
        

    const {icon,source,amount,date} = req.body;
    if(!source || !amount || !date){
        return res.status(400),json({message:"All fields are Mandatory"});
    }
    const newIncome = new Income({
        userId,
        icon,
        source,
        amount,
        date: new Date(date)
    });

    await newIncome.save();
    res.status(200).json({message:"New Income added succesfully"});
    }catch(err){
        res.status(500).json({message:"Server error!"});
    }

};

exports.getAllIncome=async(req,res)=>{
    const userId = req.user.id;
    try{
        const income = await Income.find({userId}).sort({date:-1});
        res.json(income);
    }catch(err){
        res.status(500).json({message:"Server Issue !"});
    }

};

exports.donwloadIncomeExcel=async(req,res)=>{
    const userId = req.user.id;
    try{
        const exIncome = await Income.find({userId}).sort({date:-1});

        const data = exIncome.map((item)=>({
            Source:item.source,
            Amount:item.amount,
            Date:item.date,
        }));
        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb,ws,"Income");
        xlsx.writeFile(wb,'income_details.xlsx');
        res.download('income_details.xlsx');

    }catch(err){
        res.status(500).json({message:"Server Issue!"});
    }
};

exports.deleteIncome=async(req,res)=>{
    try{
        await Income.findByIdAndDelete(req.params.id);
        res.json({message:"Income deleted successfully!"});
    }catch(err){
        res.status(500).json({message:"Server Issue !"});
    }
};

