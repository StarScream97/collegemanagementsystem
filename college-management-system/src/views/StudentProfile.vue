<template>
    <div>
        <div class="student">
            <div class="student-img z-depth-3">
                <img :src="'http://localhost:3000/'+student.profileImage" alt="" v-if="student.profileImage">
                <img v-else src="https://wallpaperplay.com/walls/full/2/c/4/277054.jpg" class="responsive-image circle" alt="">                                
            </div>
            <div class="student-details z-depth-4" v-if="!editMode">
                <div class="details">
                    <h5>{{student.name}}</h5>
                    <hr>
                    <div class="detail-holder">
                        <p>Email: </p> <p>{{student.email}}</p>
                    </div>
                    <div class="detail-holder">
                        <p>Phone: </p> <p>{{student.phone}}</p>
                    </div>
                    <div class="detail-holder">
                        <p>Adress: </p> <p>{{student.address}}</p>
                    </div>
                    <div class="detail-holder">
                        <p>Is Accepted: </p> <p>{{student.isAccepted}}</p>
                    </div>
                </div>
                <div class="buttons">
                    <a href="#" class="btn btn-small" v-if="!student.isAccepted" @click.prevent="acceptStudent(student._id)">Accept</a>
                    <a href="#" class="btn btn-small  blue darken-4" @click.prevent="editMode=true" >Update</a>                    
                    <a href="#" class="btn btn-small orange darken-4" @click.prevent="deleteStudent(student._id)" >Delete</a>                    
                </div>
            </div>

            <div class="student-details z-depth-4" v-if="editMode">
                <div class="details">
                    <h5>{{student.name}}</h5>
                    <hr>
                    <div class="detail-holder">
                        <p>Email: </p> <p>{{student.email}}</p>
                    </div>
                    <div class="detail-holder">
                        <p>Phone: </p> <p>{{student.phone}}</p>
                    </div>
                    <div class="detail-holder">
                        <p>Adress: </p> <p>{{student.address}}</p>
                    </div>
                    <div class="detail-holder">
                        <input type="text" v-model="semester" placeholder="Semester">
                        <!-- <p>Teaching Experience: </p> <p>{{student.teachingExperience}}</p> -->
                    </div>
                    <div class="detail-holder">
                        <p>Is Accepted: </p> <p>{{student.isAccepted}}</p>
                    </div>
                </div>
                <div class="buttons">
                    <a href="" class="btn btn-small " v-if="!student.isAccepted" @click.prevent="editMode=!editMode">Back</a>
                    <a href="" class="btn btn-small  blue darken-4" @click.prevent="updateStudent(student._id)" >Update</a>                                     

                </div>
            </div>
        </div>
        
    </div>
</template>


<script>

import axios from 'axios';

export default {
    data() {
        return {
            email:'',
            student:{},
            editMode:false,
            semester:''
        }
    },
    methods: {
        deleteStudent(studentId){
            // console.log(teacherId);
            axios.delete(`http://localhost:3000/students/delete/${studentId}`).then(res=>{
                this.$router.push('/students');
            }).catch(err=>{
                console.log(err)
            })
        },
        acceptStudent(studentId){
            // console.log(teacherId);
            axios.post(`http://localhost:3000/admin/students/accept/${studentId}`).then(res=>{
                this.$router.push('/students');
            }).catch(err=>{
                console.log(err)
            })
        },
        updateStudent(studentId){
            axios.post('http://localhost:3000/admin/students/update',{
               semester:this.semester,
                studentId,
            }).then(res=>{
                console.log(res.data);
            })
        }
    },
    created(){
        this.email=this.$route.params.email;
            axios.get(`http://localhost:3000/students/fetch/${this.email}`).then(res=>{
                this.student=res.data;
                // console.log(res.data)
            })
    } ,
    watch: {
        student(val){
            // console.log(val)
        }
    },
}
</script>


<style scoped>
    .student{
        display: flex;
        align-items: center;
        width: 95%;
        margin: 0 auto;
    }
    .student-img{
        height: 400px;
        width: 350px;
        overflow: hidden;
    }
    .student-img img{
        width: 100%;
        height: 100%;
        transition: all .8s;
    }
    .student-img:hover img{
        transform: scale(1.05);
        transition: all .8s;
    }
    .student-details{
        height: 450px;
        width:400px;
        padding: 1rem 2rem;
        background: #f5f5f5;
        position: relative;
    }
    .detail-holder{
        display: flex;
        justify-content: space-between;
    }
    .buttons{
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translate(-50%,0);
        width: 100%;
        display: flex;
        justify-content: space-around;
    }
    .buttons a{
        width: 50%;
    }
</style>