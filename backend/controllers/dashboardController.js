const Income = require("../models/Income");
const Expense = require("../models/Expense");
const {isValidObjectId , Types} = require("mongoose");

exports.getDashboardData = async (req,res) =>{
    try{
        const userId = req.user.id;
        const userObjectId = new Types.ObjectId(String(userId));
        
        const totalIncome = await Income.aggregate([//like SQL's GROUP BY + calculation
            {$match:{userId:userObjectId}},//Filters documents (like SQL's WHERE clause)
            {$group:{_id:null,total:{$sum:"amount"}}},//Groups documents by a specified _id and applies accumulator operations (like SQL's GROUP BY + SUM())
            //null-> all documents
        ]);

        console.log("totalIncome",{totalIncome,userId:isValidObjectId(userId)});

        const totalExpense = await Expense.aggregate([
            {$match:{userId:userObjectId}},
            {$group:{_id:null,total:{$sum:"amount"}}},
        ]);

        const last60daysIncome = await Income.find({
            userId,
            date: {$gte: new Date(Date.now() - 60*24*60*60*1000)},
        }).sort({date:-1});

        const totalIncomelast60days = last60daysIncome.reduce(
            (sum,transaction) => sum + transaction.amount,0
        );

        const last30daysExpense = await Expense.find({
            userId,
            date: {$gte: new Date(Date.now() - 30*24*60*60*1000)},
        }).sort({date:-1});
        
        const totalexpenselast30days = last30daysExpense.reduce(
            (sum,transaction) => sum+transaction.amount,0
        );

        const lastTransaction= [
            ...(await Income.find({userId}).sort({date:-1}).limit(5)).map(
                (txn)=>({
                    ...txn.toObject(),// Converts Mongoose doc to plain JS object.//The spread operator (...) is used to Create a New Object with Added Properties
                    type:"income", // Adds transaction type
                })
            ),
            ...(await Expense.find({userId}).sort({date:-1}).limit(5)).map(
                (txn)=>({
                    ...txn.toObject(),
                    type:"expense",
                })
            )
        ].sort((a,b)=> b.date - a.date);

        res.json({
            totalBalance:
                (totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),
            totalIncome: totalIncome[0]?.total || 0,
            totalExpenses:totalExpense[0]?.total || 0,
            last30daysExpenses:{
                total:totalexpenselast30days,
                transactions:last30daysExpense,
            },
            last60daysIncome:{
                total:totalIncomelast60days,
                transactions:last60daysIncome,
            },
            recentTransactions:lastTransaction,
        });
        
    }catch(err){
        res.status(500).json({message:"Server issue !!!"});
    }
}