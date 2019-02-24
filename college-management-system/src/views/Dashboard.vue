<template>
<div>
  <div class="boards">
    <div class="board z-depth-3  light-blue darken-4 white-text">
      <div class="board-title">
        <h6> Total Students</h6>
      </div>
      <div class="board-count">
        <h5>{{students}}</h5>
      </div>
    </div>
    <div class="board z-depth-3 white-text  teal accent-4">
      <div class="board-title">
       <h6> Total Teachers</h6>
      </div>
      <div class="board-count">
       <h5>{{teachers}}</h5>
      </div>
    </div>
    <div class="board z-depth-3 orange darken-4 white-text">
      <div class="board-title">
       <h6> Total Posts</h6>
      </div>
      <div class="board-count">
        <h5>{{posts}}</h5>
      </div>
    </div>
    <div class="board z-depth-3  grey darken-4 white-text">
      <div class="board-title">
       <h6> Total Pending Students</h6>
      </div>
      <div class="board-count">
        <h5>{{pendingStudents}}</h5>
      </div>
    </div>
    <div class="board z-depth-3 yellow darken-4 white-text">
      <div class="board-title">
       <h6> Total Pending Teachers</h6>
      </div>
      <div class="board-count">
        <h5>{{pendingTeachers}}</h5>
      </div>
    </div>
    <div class="board z-depth-3 yellow darken-4 white-text">
      <div class="board-title">
       <h6> Total Teacher Salary</h6>
      </div>
      <div class="board-count">
        <h5>{{teacherSalary}}</h5>
      </div>
    </div>

  </div>
</div>
</template>

<script>
// @ is an alias to /src
import Navbar from "@/components/Navbar.vue";
import axios from 'axios'

export default {
  name: "home",
  components: {
    Navbar
  },
  data() {
    return {
      teachers:'',
      students:'',
      posts:'',
      pendingStudents:'',
      pendingTeachers:'',
      teacherSalary:''
    }
  },
  created() {
    axios.get('http://localhost:3000/admin/dashboard').then(res=>{
      this.teachers=res.data.teachers;
      this.posts=res.data.posts;
      this.students=res.data.students;
      this.pendingTeachers=res.data.pendingTeachers;
      this.pendingStudents=res.data.pendingStudents;
      this.teacherSalary=res.data.teacherSalary[0].total
    }).catch(err=>{
      console.log(err)
    })
  },
};
</script>
<style scoped>

.boards{
  width: 90%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(12,1fr);
  grid-gap: 1rem;
}
.board{
  grid-column: span 4;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.board-count h5{
  font-size: 3rem;
  font-family: "Open Sans";
}


</style>
