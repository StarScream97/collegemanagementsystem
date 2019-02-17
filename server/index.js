const express=require('express');
const mongoose=require('mongoose');
const app=express();
const bodyParser=require('body-parser');
const cors=require('cors');

// Controllers
const TeacherController=require('./controllers/TeacherController');
const StudentController=require('./controllers/StudentController');
const AdminController=require('./controllers/AdminController');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


// Use Controllers for particular routes
app.use('/teachers',TeacherController);
app.use('/students',StudentController);
app.use('/admin',AdminController);

mongoose.connect('mongodb://localhost/ims',{
    useNewUrlParser:true
}).then(()=>{
    console.log('Connected to MongoDB');
}).catch(err=>{
    console.log('Error:',err);
});

app.listen(3000,()=>{
    console.log('Server running on 3000');
})