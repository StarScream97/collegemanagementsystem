const express=require('express');
const TeacherSchema=require('../models/teacher');
const StudentSchema=require('../models/student');
const Router=express.Router();
const studentValidator=require('../validation/studentValidation');
const fs=require('fs');


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


// Student Login
Router.post('/login',async(req,res)=>{
    const {email,password}=req.body;
    
    try {
        const student=await StudentSchema.find({'email':email});        
        if(student){
            const passwordMatches=bcrypt.compareSync(password,student.password);
            console.log(passwordMatches)
            if(passwordMatches){
                return res.status(200).send(student);
            } else{
                return res.status(400).send({
                    error:"Invalid Credentials! Please try again"
                })
            }
        }
        else{
            return res.status(400).send({
                error:"Invalid Credentials! Please try again"
            })
        }
    } catch (error) {
        
    }
})

// Add Student
Router.post('/signup',upload.single('profileImage'),async(req,res)=>{
    const {name,email,password,phone,age,address,semester} = req.body;
    const profileImage=req.file;
        
    const {error}=studentValidator(req.body);
    if(error) return res.send(error.details[0].message);
    
    const alreadyPresentEmail=await StudentSchema.findOne({'email':email});


    if(alreadyPresentEmail){
        return res.status(400).send("User with that email already exists! Please choose different email");
    }
    else{
        const salt=bcrypt.genSaltSync(12);
        const hashedPassword=bcrypt.hashSync(password,salt);
        const student=new StudentSchema({
            name,
            email,
            password:hashedPassword,
            profileImage:req.file.path,
            age,
            address,
            phone,
            semester
        });

        student.save(function(err){
            if(err){
                return res.status(400).send(err);
            }
            return res.status(200).send({
                data:student
            })
        })
    }
    


})

// Fetch Students
Router.get('/',async(req,res)=>{
    const students=await StudentSchema.find({});
    return res.status(200).send(students);
})


// Fetch Single Student
Router.get('/fetch/:id',async(req,res)=>{
    const student=await StudentSchema.findById(req.params.id);
    if(student){
        return res.status(200).send(student);
    }
    return res.status(400).send("Couldn't find the student with that Id");
})



// Update Student
Router.post('/update',upload.single('profileImage'),async(req,res)=>{
    const {studentId,password,newPassword,age,address,phone}=req.body;
    const profileImage=req.file.originalname;
    try {
        let student=await StudentSchema.findById(studentId);
        if(student){
            const passwordMatched=bcrypt.compareSync(password,student.password);
            if(passwordMatched){
                const salt=bcrypt.genSaltSync(12);
                const hashedPassword=bcrypt.hashSync(newPassword,salt);
                
                student.password=hashedPassword;
                if(profileImage){
                    if(student.profileImage===''){
                        student.profileImage=req.file.path
                    }else{
                        fs.unlinkSync(student.profileImage);
                        student.profileImage=req.file.path;
                    }
                }
                
                if(age) student.age=age;
                if(address) student.address=address;
                if(phone) student.phone=phone;
                
                const result=await student.save();
                return res.status(200).send(result);
            }
            
        }
    } catch (error) {
        console.log(error)
    }
    

})



module.exports=Router;