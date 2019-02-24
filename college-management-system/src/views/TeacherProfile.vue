<template>
    <div>
        <div class="teacher">
            <div class="teacher-img z-depth-3">
                <img :src="'http://localhost:3000/'+teacher.profileImage" alt="">
            </div>
            <div class="teacher-details z-depth-4" v-if="!editMode">
                <div class="details">
                    <h5>{{teacher.name}}</h5>
                    <hr>
                    <div class="detail-holder">
                        <p>Email: </p> <p>{{teacher.email}}</p>
                    </div>
                    <div class="detail-holder">
                        <p>Phone: </p> <p>{{teacher.phone}}</p>
                    </div>
                    <div class="detail-holder">
                        <p>Adress: </p> <p>{{teacher.address}}</p>
                    </div>
                    <div class="detail-holder">
                        <p>Teaching Experience: </p> <p>{{teacher.teachingExperience}}</p>
                    </div>
                    <div class="detail-holder">
                        <p>Is Accepted: </p> <p>{{teacher.isAccepted}}</p>
                    </div>
                    <div class="detail-holder">
                        <p>Salary: </p> <p>{{teacher.salary}}</p>
                    </div>
                </div>
                <div class="buttons">
                    <a href="#" class="btn btn-small" v-if="!teacher.isAccepted" @click.prevent="acceptTeacher(teacher._id)">Accept</a>
                    <a href="#" class="btn btn-small  blue darken-4" @click.prevent="editMode=true" >Update</a>                    
                    <a href="#" class="btn btn-small orange darken-4" @click.prevent="deleteTeacher(teacher._id)" >Delete</a>                    
                </div>
            </div>

            <div class="teacher-details z-depth-4" v-if="editMode">
                <div class="details">
                    <h5>{{teacher.name}}</h5>
                    <hr>
                    <div class="detail-holder">
                        <p>Email: </p> <p>{{teacher.email}}</p>
                    </div>
                    <div class="detail-holder">
                        <p>Phone: </p> <p>{{teacher.phone}}</p>
                    </div>
                    <div class="detail-holder">
                        <p>Adress: </p> <p>{{teacher.address}}</p>
                    </div>
                    <div class="detail-holder">
                        <input type="text" v-model="teachingExperience" placeholder="Teaching Experience">
                        <!-- <p>Teaching Experience: </p> <p>{{teacher.teachingExperience}}</p> -->
                    </div>
                    <div class="detail-holder">
                        <p>Is Accepted: </p> <p>{{teacher.isAccepted}}</p>
                    </div>
                    <div class="detail-holder">
                        <!-- <p>Salary: </p> <p>{{teacher.salary}}</p> -->
                        <input type="text" v-model="salary" placeholder="Salary">
                    </div>
                </div>
                <div class="buttons">
                    <a href="" class="btn btn-small " v-if="!teacher.isAccepted">Accept</a>
                    <a href="" class="btn btn-small  blue darken-4" @click.prevent="updateTeacher(teacher._id)" >Update</a>                    
                    <a href="" class="btn btn-small" >Delete</a>                    

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
            teacher:{},
            editMode:false,
            salary:'',
            teachingExperience:''
        }
    },
    methods: {
        deleteTeacher(teacherId){
            // console.log(teacherId);
            axios.delete(`http://localhost:3000/teachers/delete/${teacherId}`).then(res=>{
                this.$router.push('/teachers');
            }).catch(err=>{
                console.log(err)
            })
        },
        acceptTeacher(teacherId){
            // console.log(teacherId);
            axios.post(`http://localhost:3000/admin/teachers/accept/${teacherId}`).then(res=>{
                this.$router.push('/teachers');
            }).catch(err=>{
                console.log(err)
            })
        },
        updateTeacher(teacherId){
            axios.post('http://localhost:3000/admin/teachers/update',{
                teachingExperience:this.teachingExperience,
                salary:this.salary,
                teacherId,
            }).then(res=>{
                // console.log(res.data);
            })
        }
    },
    created(){
        this.email=this.$route.params.email;
            axios.get(`http://localhost:3000/teachers/fetch/${this.email}`).then(res=>{
                this.teacher=res.data;
                // console.log(res.data)
            })
    } ,
    watch: {
        teacher(val){
            // console.log(val)
        }
    },
}
</script>


<style scoped>
    .teacher{
        display: flex;
        align-items: center;
        width: 95%;
        margin: 0 auto;
    }
    .teacher-img{
        height: 400px;
        width: 350px;
        overflow: hidden;
    }
    .teacher-img img{
        width: 100%;
        height: 100%;
        transition: all .8s;
    }
    .teacher-img:hover img{
        transform: scale(1.05);
        transition: all .8s;
    }
    .teacher-details{
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