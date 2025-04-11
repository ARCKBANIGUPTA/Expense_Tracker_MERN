const multer = require('multer');

//configure multer storage
const storage = multer.diskStorage({
    //Saves files to a specified directory
    destination:(req,file,cb)=>{
        cb(null,"/uploads");// (no error, save to /uploads)
        //cb --> Used to signal completion of an operation to Multer. cb means callback function
        // syntax -> cb(error, value) 
        

    },
    //Generates unique filenames, time at which created and it's original name
    filename:(req,file,cb) =>{
        cb(null,`${Date.now()}-${file.originalname}`);
    },
    //After processing, Multer attaches uploaded files to the req object
});

//file filter
const file_filter = (req,file,cb)=>{
    const allowedTypes = ["image/jpeg","image/png","image/jpg"];
    if(allowedTypes.includes(file.mimetype)){ //mimetype -> MIME type (Multipurpose Internet Mail Extensions),stores the format of the file
        cb(null,true);
    }
    else{
        cb(new Error("Only .jpeg , .jpg , .png files are allowed"),false);
        
    }
};

const upload = multer({storage,file_filter});//intializes multer 

module.exports = upload;