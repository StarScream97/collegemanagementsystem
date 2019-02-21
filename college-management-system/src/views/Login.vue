<template>
  <div class="login">
    <!-- <Navbar /> -->
    <!-- <Login> </Login> -->
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
                <a class="waves-effect waves-light btn-small" @click.prevent="login">Login</a>           

                <div class="signup">
                    <h5>Don't have an account?</h5>
                    <a href="" @click="goTo('signup')">Sign Up</a>
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
          password:''
      }
  },
  methods: {
      goTo(link){
          this.$router.push(link);
      },
      login(){
        // console.log(this.email,this.password)

        axios.post('http://localhost:3000/students/login',{
          email:this.email,
          password:this.password
        }).then(res=>{
          // console.log(res);
          localStorage.setItem('user',JSON.stringify(res.data));
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
    

</style>
