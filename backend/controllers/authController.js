const User = require("../models/Users")
const jwt = require("jsonwebtoken");
const {protect} = require("../middleware/autMiddleware")
//generate the token
const generatetoken = (id)=>{
    return jwt.sign({id} , process.env.JWT_SECRET,{expiresIn:"1h"});
};

//register the user

exports.registerUser=async (req,res)=>{
    const {fullname,email,password,profileimageurl} = req.body;

    if(!fullname || !email || !password || !profileimageurl){
        return res.status(400).json({message:"All fields are mandatory"});
    }
    try{
        const existUser  = await User.findOne({email});
        if(existUser){
            return res.status(400).json({message:"This email ID already registered!"})
        }
        const user = await User.create({
            fullname,
            email,
            password,
            profileimageurl
        });
        res.status(201).json({
            id:user._id,
            user,
            token:generatetoken(User._id)
        });
    }catch(err){
        res
            .status(500)
            .json({message:"Error registering user",error:err.message})
    }
};

exports.loginUser = async(req,res)=>{
    const {email,password} = req.body;
    if(!email || !password){
        return res.status(400).json({message:"All fields are mandatory"});
    }
    try{
        const user = await User.findOne({email});
        if(!email || !(await user.comparePasswords(password))){
            return res.status(400).json({message:"Invalid Credentials!"});
        };
        res.status(200).json({
            id:user._id,
            user,
            token:generatetoken(user._id)
        })
    }catch(err){
        res.status(500).json({message:"Some problem has occured"})
    }
};

exports.getUserInfo =async (req,res)=>{
   try{
        const user = await User.findById(req.body.id).select("-password");
        if(!user){
            return res.status(400).json({message:"User not found!"});
        }
        res.status(200).json(user);
   }
   catch(err){
        res.status(500).json({message:"Error registering the user",error:err.message});
   }
};
