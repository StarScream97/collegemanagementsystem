const express=require('express');
const TeacherSchema=require('../models/teacher');
const StudentSchema=require('../models/student');
const AdminSchema=require('../models/student');
const SubjectSchema=require('../models/subject');
const postValidation=require('../validation/postValidation');
const postSchema=require('../models/post');
const fs=require('fs');

const Router=express.Router();


const bcrypt=require('bcrypt-nodejs');

const multer=require('multer');

const fileStorage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'uploads');
    },
    filename:function(req,file,cb){
        cb(null, new Date().toISOString() + '-' + file.originalname);
    }
});

const fileFilter=(req,file,cb)=>{
    if(file.mimetype==='image/jpeg' || file.mimetype==='image/png'){
        cb(null,true);
    }else{
        cb(null,false);
    }
}

const upload=multer({
    storage:fileStorage,
    limits:{
        fileSize:1024*1024*4
    },
    fileFilter:fileFilter
});



// Fetch All Posts
Router.get('/',async(req,res)=>{
    try {
        const posts=await postSchema.find({});
        return res.send(posts);
    } catch (error) {   
        return res.send(error);
    }
})


// Create a Post
Router.post('/',upload.single('postImage'),async(req,res)=>{
    try {
        const {error}=postValidation(req.body);
        if(error) return res.send(error.details[0].message);

        const {title,body,postImage,authorId,onModel} =req.body;


        const post=new postSchema({
            title,
            body,
            authorId,
            onModel,
            postImage:req.file.path
        });

        const result=await post.save();
        await findWhoPosted(onModel,authorId,result);
        return res.send(result);

    } catch (error) {
        
    }
});

async function findWhoPosted(status,authorId,post){
    try { 
        if(status==='Student'){
            const result=await StudentSchema.findById(authorId);
            await result.posts.push(post._id);
            await result.save();
            return;
        }
        else if(status==='Admin'){
            const result=await AdminSchema.findById(authorId);
            await result.posts.push(post._id);
            await result.save();
            return;
        }
        else{
            const result=await TeacherSchema.findById(authorId);
            await result.posts.push(post._id);
            await result.save();
            return;
        }
    } catch (error) {
        console.log(error)
    }
    
}


// Update Post
Router.post('/update/',async(req,res)=>{

    const {title,body,postId}=req.body;

    try {
        const post=await postSchema.findById(postId);
        if(title) post.title=title;
        if(body) post.body=body;

        const result=await post.save();
        return res.send(result);
    } catch (error) {
        return res.send(error);
    }

})

// Delete Post
Router.delete('/delete/:postID',async(req,res)=>{
    try {
        const {postId}=req.body;
        const post=await postSchema.findOneAndDelete(postId);
        return res.send(post);
    } catch (error) {
        return res.send(error);
    }
})



module.exports=Router;