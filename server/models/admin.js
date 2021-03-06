const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const admin=new Schema({
    name:{
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
        required:true
    },
    profileImage:{
        type:String,
        default:''
    },
    age:{
        type:Number,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        default:"Admin"
    },
    posts:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Post'
        }
    ]
})
module.exports= mongoose.model('Admin',admin);