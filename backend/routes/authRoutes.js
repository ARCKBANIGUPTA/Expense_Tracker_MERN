const express = require("express");
const upload = require("../middleware/uploadMiddleware");
const {protect} = require("../middleware/autMiddleware");
const{
    registerUser,
    loginUser,
    getUserInfo

} = require("../controllers/authController");

const router = express.Router();


router.post("/register",registerUser);

router.post("/login", loginUser);

router.get("/getuser",protect, getUserInfo);

router.post("/upload-image",upload.single("image") , (req,res)=>{
    if(!req.file){
        res.status(400).json({message:"No image is uploaded!"});
    }
    const imageURL = `${req.protocol}://${req.get("host")}/uploads/${
        req.file.filename
    }`;
    res.status(200).json({imageURL});
})

module.exports=router;