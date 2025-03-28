const mongoose = require("mongoose");

const connectDB = async () =>{
    try{
        await mongoose.connect(process.env.MONGO_URL, {});
        console.log("MongoDB has been connected!!!");
    } catch(err){
        console.error("MongoDB is not connecting !!!",err);
        process.exit(1);
    }

};

module.exports=connectDB;