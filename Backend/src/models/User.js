import mongoose from "mongoose";
 
 const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true,
    },
    phone:{
        type:Number,
        trim:true,
        default:+920000000001
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum:["admin","user"],
        default:"user",
    },
    address: [{
        city: {type:String,default:"XXXXXX"},
        postalCode: {type:Number,default:"XXXX"},
        country: {type:String,default:"XXXXXX"},
    }],
    createdAt:{
        type:Date,
        default:Date.now,
    },
    updatedAt:{
        type:Date,
        default:Date.now,
    },
 },{timestamps:true});
 
 const User = mongoose.model("User",userSchema);
 export default User;   