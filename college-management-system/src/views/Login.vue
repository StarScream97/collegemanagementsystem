<template>
  <div class="login">
    <!-- <Navbar /> -->
    <div class="login-wrapper">
        <!-- <div class="row"> -->
          <form class="col s12">
                <div class="row">
                    <div class="input-field col s12">
                        <input id="email" type="email" class="validate" v-model="email">
                        <label for="email">Email</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input id="password" type="password" class="validate" v-model="password">
                        <label for="password">Password</label>
                    </div>
                </div>
                <div class="row radio-buttons">
                    <label>
                       <input type="radio" id="one" value="students" v-model="userType" checked>
                        <span>Student</span>
                    </label>
                     <label>
                       <input type="radio" id="two" value="teachers" v-model="userType" checked>
                        <span>Teacher</span>
                    </label>
                     <label>
                       <input type="radio" id="three" value="admin" v-model="userType" checked>
                        <span>Admin</span>
                    </label>
                </div>
                <a href="#" class="waves-effect waves-light btn-small" @click.prevent="login">Login</a>           

                <div class="signup">
                    <h5>Don't have an account?</h5>
                    <a href="#" @click="goTo('signup')">Sign Up</a>
                </div>
          </form>
       <!-- </div> -->
  </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from "@/components/Navbar.vue";
import Login from "@/components/Login.vue";
import axios from 'axios';
export default {
  name: "login",
  components: {
    Navbar,
    Login
  },
  data() {
      return {
          email:'',
          password:'',
          userType:''
      }
  },
  methods: {
      goTo(link){
          this.$router.push(link);
      },
      login(){
        
        axios.post(`http://localhost:3000/${this.userType}/login`,{
          email:this.email,
          password:this.password
        }).then(res=>{
          // console.log(res.data);
          localStorage.setItem('user',JSON.stringify(res.data));
          if(this.userType==='teachers' || this.userType==='students')
            this.$router.push('/home');
          else
            this.$router.push('/dashboard');
        })
      }
  }
  
};
</script>
<style scoped>

    .login-wrapper{
      max-width: 40vw;
      margin: 5rem auto;
       /* width: 50vw;
    margin-left: auto; */
    }
    .signup{
      margin-top: 3rem;
      display: flex;
      align-items: center;
    }
    .signup a{
      margin-left: 2rem;
      text-decoration: none;
      color: rgb(8, 8, 187);
    }
    .input-field{
      margin-bottom: 1.2rem;
    }
    .radio-buttons label{
      margin-right: 15px;
    }
    .radio-buttons span{
      margin-left: -4px;
    }
    

</style>
