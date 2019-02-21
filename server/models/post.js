const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const post=new Schema({
    title:{
        type:String
    },
    body:{
        type:String
    },
    postImage:{
        type:String
    },
    postWithImage:{
        type:Boolean,
        default:false
    }
    ,
    authorId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        refPath:'onModel'
    },
    onModel:{
        type:String,
        required:true,
        enum:['Teacher','Admin','Student']
    }
});

module.exports=mongoose.model('Post',post);