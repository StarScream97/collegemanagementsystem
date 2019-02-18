const mongoose=require('mongoose');
const Schema=mongoose.Schema;


const student=new Schema({
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
        type:String,
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
    isAccepted:{
        type:Boolean,
        default:false
    },
    semester:{
        type:String
    },
    subjects:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Subject'
        }
    ],
    teachers:[
        {
            type:mongoose.Schema.Types.ObjectId,            
            ref:'Teacher'
        }
    ]
})
module.exports=mongoose.model('Student',student);
