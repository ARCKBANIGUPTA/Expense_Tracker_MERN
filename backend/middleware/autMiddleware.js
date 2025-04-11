const jwt =require("jsonwebtoken");
const User = require("../models/Users");

exports.protect = async (req,res,next)=>{
    let token = req.headers.authorization?.split(" ")[1];
    if(!token) return res.status(401).json({message:"Not authorized, no token"});

    try{
        const decode = jwt.verify(token,process.env.JWT_SECRET);//Verify the token using the JWT secret stored in .env
        req.user = await User.findById(decode.id).select("-password");//Fetch the user from the database (excluding the password) and attach it to req.user
        next();
    }
    catch(err){
        res.status(500).json({message:"Not authorized, token failed"})
    }
};