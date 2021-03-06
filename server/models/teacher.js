const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const teacher=new Schema({
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
    salary:{
        type:Number,
        default:0
    },
    teachingExperience:{
        type:String,
    },
    levelOfStudy:{
        type:String,
        required:true
    },
    isAccepted:{
        type:Boolean,
        default:false
    },
    status:{
        type:String,
        default:"Teacher"
    },
    students:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Student'
    }],
    subjects:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Subject'
    }],
    posts:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Post'
        }
    ]
})

module.exports=new mongoose.model('Teacher',teacher);