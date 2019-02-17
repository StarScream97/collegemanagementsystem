const express=require('express');
// const mongoose=require('mongoose');
const TeacherSchema=require('../models/teacher');
const StudentSchema=require('../models/student');

const bcrypt=require('bcrypt-nodejs');
const Router=express.Router();

Router.get('/',async(req,res)=>{
    // res.send('Hello Users');
    const teachers=await TeacherSchema.find({});
    res.send(teachers);
})

// Signup new teacher
Router.post('/signup',async(req,res)=>{
    let {name, email , password, profileImage, age, address, phone, teachingExperience, levelOfStudy}=req.body;

    const salt=await bcrypt.genSaltSync(12);
    const hashedPassword=bcrypt.hashSync(password,salt);



    let teacher=new TeacherSchema({
        name,
        email,
        password:hashedPassword,
        profileImage,
        age,
        address,
        phone,
        teachingExperience,
        levelOfStudy
    })
    const result=await teacher.save();
    return res.status(200).send(result);


})

// Fetch Teacher Detail
Router.get('/fetch/:email',async(req,res)=>{
    let teacher=await TeacherSchema.findOne({'email':req.params.email});
    if(teacher){
        return res.status(200).send(teacher);
    }else{
        return res.status(400).send({
            error:"Couldn't find anyone with the provided email"
        })
    }
})

// Update Teacher Detail
Router.post('/update',async(req,res)=>{
    let {profileImage,password,newPassword,age,address,email,phone}=req.body;
    let teacher=await TeacherSchema.findOne({'email':email});
    if(teacher){
        let passwordMatches=bcrypt.compareSync(password,teacher.password);
        if(passwordMatches){
            if(profileImage) teacher.profileImage=profileImage;
            if(age) teacher.age=age;
            if(address) teacher.address=address;
            if(email) teacher.email=email;
            if(phone) teacher.phone=phone;

            if(newPassword){
                const salt=bcrypt.genSaltSync(12);      
                const hashedPassword=bcrypt.hashSync(newPassword,salt);
                teacher.password=hashedPassword;
            }

            const result=await teacher.save();
            return res.status(200).send(result);
        }
      
    }else{
        return res.status(400).send({
            error:"Couldn't Update. Please Try Again Later"
        })
    }
    
})


// Add Students
Router.post('/addstudents',async(req,res)=>{
    const {teacherId,studentId,subjectIds}=req.body;

    const teacher=await TeacherSchema.findById(teacherId);
    studentIds.map(stdId=>{
        teacher.students.push(stdId);
        // const student=await StudentSchema.findById(stdId);
        StudentSchema.findById(stdId).then((err,student)=>{
            student.teachers.push(teacherId);
            student.subjects.push(subjectId);
            student.save().then(()=>{

            });
        });
        
    });

    // const result=await teacher.save();
    try {
        const result=await teacher.save();
        return res.status(200).send(result);
    } catch (error) {
        return res.send({error})
    }
    // return res.status(200).send('Students Added Successfully');
})



module.exports=Router;