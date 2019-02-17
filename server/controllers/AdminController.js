const express=require('express');
const TeacherSchema=require('../models/teacher');
const StudentSchema=require('../models/student');
const AdminSchema=require('../models/student');
const SubjectSchema=require('../models/subject');

const Router=express.Router();


const bcrypt=require('bcrypt-nodejs');

// Edit Teacher
Router.post('/teachers/update',async(req,res)=>{
    const {adminId,teacherId,salary,teachingExperience,isAccepted,adminPassword}=req.body;
    const admin=await AdminSchema.findById(adminId);

    if(admin){
        const passwordMatched=bcrypt.compareSync(adminPassword,admin.password);
        console.log(passwordMatched);
        if(passwordMatched){
            const teacher=await TeacherSchema.findById(teacherId);
            teacher.salary=salary;
            teacher.teachingExperience=teachingExperience;
            teacher.isAccepted=isAccepted;

            try {
                const result=await teacher.save();
                return res.status(200).send(result);
            } catch (error) {
                return res.send({error})
            }

        }else{
            return res.send({
                error:"The provided credentials do not match with our database"
            })
        }
       
    }
    else{
        return res.send({
            error:"Cannot find anyone with that ID"
        })
    }
})


// Admin Signup
Router.post('/signup',async(req,res)=>{
    const {name,email,password,profileImage,age,address,phone}=req.body;
    const salt=bcrypt.genSaltSync(12);
    const hashedPassword=await bcrypt.hashSync(password,salt);
    const admin=new AdminSchema({
        name,
        email,
        password:hashedPassword,
        profileImage,
        age,
        address,
        phone
    })
    // admin.save(function(err){
    //     if(err){
    //         return res.status(400).send(err);
    //     }
    //    return res.status(200).send({
    //         data:admin
    //     })
    // })

    try {
        const result=await admin.save();
        return res.status(200).send(result);
    } catch (error) {
        return res.send({error})
    }
})

// Create Subject
Router.post('/subject/create',async(req,res)=>{
    const {name,semester,fullMarks,passMarks,teacher}=req.body;
    
    const subject = new SubjectSchema({
        name,
        semester,
        fullMarks,
        passMarks,
        teacher
    })

    try {
        const result=await subject.save();
        return res.status(200).send(result);
    } catch (error) {
        return res.status(400).send({
            error
        })
    }
})

// Fetch Subjects
Router.get('/subjects',async(req,res)=>{
    const subjects=await SubjectSchema.find({});
    return res.status(200).send(subjects);
})

// Accept Teacher Signup Request
Router.post('/teachers/accept/:teacherId',async(req,res)=>{
    const teacher=await TeacherSchema.findById(req.params.teacherId);
    if(teacher){
        teacher.isAccepted=true;
        try {
            const result=await teacher.save();
            return res.status(200).send(result);
        } catch (error) {
            return res.status(400).send({
                error
            })
        }
    }
})



module.exports=Router;