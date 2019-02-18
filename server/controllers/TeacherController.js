const express=require('express');
// const mongoose=require('mongoose');
const fs=require('fs');
const TeacherSchema=require('../models/teacher');
const StudentSchema=require('../models/student');
const TeacherValidator=require('../validation/teacherValidation');

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


const Router=express.Router();


Router.get('/',async(req,res)=>{
    // res.send('Hello Users');
    const teachers=await TeacherSchema.find({});
    res.send(teachers);
})

// Teacher Login
Router.post('/login',async(req,res)=>{
    const {email,password}=req.body;
        
    
    try {
        const teacher=await TeacherSchema.findOne({'email':email});
        if(teacher){
            console.log(teacher)
            const passwordMatches=bcrypt.compareSync(password,teacher.password);
            console.log(passwordMatches)
            if(passwordMatches){
                return res.status(200).send(teacher);
            } else{
                return res.status(400).send("Invalid Credentials! Please try again")
            }
        }
        else{
            return res.status(400).send("Invalid Credentials! Please try again");
        }
    } catch (error) {
        console.log(error)
    }

})

// Signup new teacher
Router.post('/signup',upload.single('profileImage'),async(req,res)=>{
    let {name, email , password, profileImage, age, address, phone, teachingExperience, levelOfStudy}=req.body;
    const {error}=TeacherValidator(req.body);
    if(error) return res.send(error.details[0].message);

    const alreadyPresentTeacher=await TeacherSchema.findOne({'email':email});
    if(alreadyPresentTeacher){
        return res.status(400).send("User with that email already exists! Please choose different email");
    }
    else{
        const salt=await bcrypt.genSaltSync(12);
        const hashedPassword=bcrypt.hashSync(password,salt);

        let teacher=new TeacherSchema({
            name,
            email,
            password:hashedPassword,
            profileImage:req.file.path,
            age,
            address,
            phone,
            teachingExperience,
            levelOfStudy
        })
        const result=await teacher.save();
        return res.status(200).send(result);
    }
    


})

// Fetch Teacher Detail
Router.get('/fetch/:email',async(req,res)=>{
    let teacher=await TeacherSchema.findOne({'email':req.params.email});
    if(teacher){
        return res.status(200).send(teacher);
    }else{
        return res.status(400).send("Couldn't find anyone with the provided email");
    }
})

// Fetch all teachers
Router.get('/',async(req,res)=>{
    const teachers=await TeacherSchema.find({});
    return res.send(teachers);
})

// Update Teacher Detail
Router.post('/update',upload.single('profileImage'),async(req,res)=>{
    const {teacherId,email,password,newPassword,age,address,phone}=req.body;
    const profileImage=req.file;
    try {
        let teacher=await TeacherSchema.findById(teacherId);
        if(teacher){
            const passwordMatches=bcrypt.compareSync(password,teacher.password);
            if(passwordMatches){
                // if(profileImage) {
                //     fs.unlink(teacher.profileImage,(err)=>{
                //         if(err)
                //             console.log(err);
                //     })
                //     teacher.profileImage=req.file.path;
                // }

                if(profileImage){
                    if(teacher.profileImage===''){
                        teacher.profileImage=req.file.path
                    }else{
                        fs.unlinkSync(teacher.profileImage);
                        teacher.profileImage=req.file.path;
                    }
                }

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
        
        }
    } catch (error) {
        // return res.status(400).send("Couldn't Update. Please Try Again Later");        
        console.log(error)
    }
    
    
})

// Fetch All Students
Router.get('/students',async(req,res)=>{
    const students=await StudentSchema.find({});
    return res.status(200).send(students);
})

// Assign subject to Students
Router.post('/addstudents',async(req,res)=>{
    const {teacherId,studentIds,subjectId}=req.body;
    const teacher=await TeacherSchema.findById(teacherId);
   

    Promise.all(studentIds.map(function(id) { 
        StudentSchema.findById(id).then((val)=>{
            val.subjects.push(subjectId);
            addStudentInTeacher(val,teacher)
        });
    }))
    return res.status(200).send('Subjects assigned to students successfully!');            
})

async function addStudentInTeacher(student,teacher){
    try {
        teacher.students.push(student._id);
        await teacher.save();
        await student.save();
    } catch (error) {
        
    }

    
    
}



module.exports=Router;