const express=require('express');
const TeacherSchema=require('../models/teacher');
const StudentSchema=require('../models/student');
const Router=express.Router();


const bcrypt=require('bcrypt-nodejs');


// Add Student
Router.post('/signup',async(req,res)=>{
    const {name,email,password,phone,profileImage,age,address,semester} = req.body;

    const salt=bcrypt.genSaltSync(12);
    const hashedPassword=bcrypt.hashSync(password,salt);
    const student=new StudentSchema({
        name,
        email,
        password:hashedPassword,
        profileImage,
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


})

// Fetch Students
Router.get('/fetch',async(req,res)=>{
    const students=await StudentSchema.find({});
    return res.status(200).send(students);
})


// Fetch Single Student
Router.get('/fetch/:id',async(req,res)=>{
    const student=await StudentSchema.findById(req.params.id);
    if(student){
        return res.status(200).send(student);
    }
    return res.status(400).send({
        error:"Couldn't find the student with that Id"
    })
})



// Update Student
Router.post('/update',async(req,res)=>{
    const {profileImage,name,email,password,newPassword,age,address,phone}=req.body;

    const student=await StudentSchema.findOne({'email':email});
    if(student){
        const passwordMatched=bcrypt.compareSync(password,student.password);
        if(passwordMatched){
            const salt=bcrypt.genSaltSync(12);
            const hashedPassword=bcrypt.hashSync(newPassword,salt);
            
            student.password=hashedPassword;
            if(profileImage) student.profileImage=profileImage;
            if(age) student.age=age;
            if(address) student.address=address;
            if(phone) student.phone=phone;
            
            const result=await student.save();
            res.status(200).send(result);
        }
        
    }

})



module.exports=Router;