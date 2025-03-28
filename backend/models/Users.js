const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,

    },
    profileimageurl:{
        type:String,
        default:null
    }

},{timestamps:true});

//Hashing the passwords , it is a mongoose middleware
//It automatically hashes the user's plaintext password only when it's new or modified (checked via isModified("password")).
//Ensures plaintext passwords are never stored in the database by replacing them with a bcrypt hash
UserSchema.pre("save",async function (next) {   
    if(!this.isModified("password")) return next();
    this.password=await bcrypt.hash(this.password,10);
    next();
});
// this.isModified("password") is a Mongoose document method that checks if the password field has been changed since the document was loaded or saved.

//it is custom method added to UserSchema, it matches the password entered by the user for login
UserSchema.methods.comparePasswords = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword,this.password);
    
};

module.exports = mongoose.model('User',UserSchema);