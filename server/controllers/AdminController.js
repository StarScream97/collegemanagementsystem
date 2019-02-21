const express=require('express');
const TeacherSchema=require('../models/teacher');
const StudentSchema=require('../models/student');
const AdminSchema=require('../models/student');
const SubjectSchema=require('../models/subject');
const adminValidation=require('../validation/adminValidation');
const subjectValidation=require('../validation/subjectValidation');
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
Router.post('/signup',upload.single('profileImage'),async(req,res)=>{
    const {name,email,password,age,address,phone}=req.body;
    const profileImage=req.file;

    const {error}=adminValidation(req.body);
    if(error) return res.send(error.details[0]);

    const salt=bcrypt.genSaltSync(12);
    const hashedPassword=await bcrypt.hashSync(password,salt);
    const admin=new AdminSchema({
        name,
        email,
        password:hashedPassword,
        profileImage:req.file.path,
        age,
        address,
        phone
    })

    try {
        const result=await admin.save();
        return res.status(200).send(result);
    } catch (error) {
        return res.send({error})
    }
})

// Fetch Admins
Router.get('/',async(req,res)=>{
    try {
        const admins=await AdminSchema.find({});
        return res.send(admins);
    } catch (error) {
        return res.send(error);
    }
})

// Update Admin
Router.post('/update',upload.single('profileImage'),async(req,res)=>{
    const {adminId,email,password,newPassword,age,address,phone}=req.body;
    const profileImage=req.file;
    try {
        let admin=await AdminSchema.findById(adminId);
        if(admin){
            const passwordMatches=bcrypt.compareSync(password,admin.password);
            if(passwordMatches){

                if(profileImage){
                    if(admin.profileImage===''){
                        admin.profileImage=req.file.path
                    }else{
                        fs.unlinkSync(admin.profileImage);
                        admin.profileImage=req.file.path;
                    }
                }

                if(age) admin.age=age;
                if(address) admin.address=address;
                if(email) admin.email=email;
                if(phone) admin.phone=phone;

                if(newPassword){
                    const salt=bcrypt.genSaltSync(12);      
                    const hashedPassword=bcrypt.hashSync(newPassword,salt);
                    admin.password=hashedPassword;
                }

                const result=await admin.save();
                return res.status(200).send(result);
            }
        
        }
    } catch (error) {
        console.log(error)
        // return res.status(400).send("Couldn't Update. Please Try Again Later");        
        return error;
    }
    
    
})

// Fetch Pending teacher Details
Router.get('/pending/teachers',async(req,res)=>{
    try {
        const teachers=await TeacherSchema.find({'isAccepted':false});
        return res.send(teachers);
    } catch (error) {
        return res.send(error);
    }
})

// Fetch Pending student Details
Router.get('/pending/students',async(req,res)=>{
    try {
        const students=await StudentSchema.find({'isAccepted':false});
        return res.send(students);
    } catch (error) {
        return res.send(error);
    }
})

// Create Subject
Router.post('/subject/create',async(req,res)=>{
    const {error}=subjectValidation(req.body);
    if(error) return res.send(error.details[0].message);

    const {name,semester,description,fullMarks,passMarks,teacherId}=req.body;
    
    const subject = new SubjectSchema({
        name,
        semester,
        fullMarks,
        passMarks,
        teacherId,
        description
    })

    try {
        const teacher=await TeacherSchema.findById(teacherId);
        const result=await subject.save();
        teacher.subjects.push(result._id);
        await teacher.save();
        return res.status(200).send(result);
    } catch (error) {
        return res.status(400).send(error)
    }
})

// Update Subject
Router.post('/subject/update',async(req,res)=>{


    try {
        const {name,semester,description,teacherId,subjectId}=req.body;
        const subject=await SubjectSchema.findById(subjectId);
        const oldTeacher=await TeacherSchema.findById(subject.teacherId);

        console.log(oldTeacher);

        // Update Subject Details
        if(name) subject.name=name;
        if(semester) subject.semester=semester;
        if(description) subject.description=description;
        
        if(teacherId){
            subject.teacherId=teacherId;
            const index=oldTeacher.subjects.indexOf(subjectId);
            oldTeacher.subjects.splice(index,1);
        }

        const teacher=await TeacherSchema.findById(teacherId);
        const result=await subject.save();
        teacher.subjects.push(result._id);

        await oldTeacher.save();
        await teacher.save();
        return res.status(200).send(result);
    } catch (error) {
        return res.status(400).send(error)
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