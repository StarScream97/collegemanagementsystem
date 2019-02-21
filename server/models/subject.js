const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const subject=new Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    description:{
        type:String
    },
    semester:{
        type:String,
        required:true
    },
    fullMarks:{
        type:Number,
        required:true
    },
    passMarks:{
        type:Number,
        required:true
    },
    teacherId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Teacher'
    }
});

module.exports=mongoose.model('Subject',subject);