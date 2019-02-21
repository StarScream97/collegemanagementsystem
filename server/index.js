const express=require('express');
const mongoose=require('mongoose');
const app=express();
const bodyParser=require('body-parser');
const cors=require('cors');

// Controllers
const TeacherController=require('./controllers/TeacherController');
const StudentController=require('./controllers/StudentController');
const AdminController=require('./controllers/AdminController');
const PostController=require('./controllers/PostController');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use('/uploads',express.static('uploads'));




// Use Controllers for particular routes
app.use('/teachers',TeacherController);
app.use('/students',StudentController);
app.use('/admin',AdminController);
app.use('/posts',PostController);

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