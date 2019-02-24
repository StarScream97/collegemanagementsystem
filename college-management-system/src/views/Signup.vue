<template>
  <div class="signup-wrapper">
      <div class="container">
            <div class="row">
                <form class="col s12" enctype="multipart/form-data" >
                        <div class="row">
                            <div class="input-field col s6">
                                <input id="name" type="text" v-model="name">
                                <label for="name">Name</label>
                            </div>
                            <div class="input-field col s6">
                                <input id="email" type="email" class="validate" v-model="email">
                                <label for="email">Email</label>
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col s6">
                                <input id="password" type="password"  class="validate" v-model="password">
                                <label for="password">Password</label>
                            </div>
                            <div class="input-field col s6">
                                <input id="repeat-password" required type="password" class="validate" v-model="repeatPassword">
                                <label for="repeat-password">Repeat Password</label>
                            </div>
                        </div>
                         <div class="row">
                            <div class="input-field col s12">
                                <input id="profileImage" type="file" @change="onFileChanged">
                                <!-- <label for="profileImage">Profile Picture</label> -->
                            </div>
                        </div>
                         <div class="row">
                            <div class="input-field col s6">
                                <input id="age" type="text"  class="validate" v-model="age">
                                <label for="age">Age</label>
                            </div>
                            <div class="input-field col s6">
                                <input id="address" type="text"  class="validate" v-model="address">
                                <label for="address">Address</label>
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col s6">
                                <input id="phone" type="text"  class="validate" v-model="phone">
                                <label for="phone">Phone</label>
                            </div>
                            <div class="input-field col s6">
                                <input id="semester" type="text"  class="validate" v-model="semester">
                                <label for="semester">Semester</label>
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
                            
                        </div>
                        <a class="waves-effect waves-light btn-small" @click.prevent="signup">Signup</a>
                        <div class="login">
                            <h5>Already have an account?</h5>
                            <a href="" @click.prevent="goTo('login')">Login</a>
                        </div>
                </form>
        </div>
    </div>
  </div>
</template>

<script>
const axios=require('axios');
export default {
  name: "Signup",
  props: {
    msg: String
  },
  data() {
      return {
          name:'',
          email:'',
          password:'',
          repeatPassword:'',
          age:'',
          address:'',
          phone:'',
          semester:'',
          profileImage:null,
          userType:''
      }
  },
  methods: {
      goTo(link){
          this.$router.push(link);
      },
      onFileChanged (event) {
        //   console.log(event.target.files[0])
        this.profileImage = event.target.files[0]
      },
      signup(){

          const formData=new FormData();
          formData.set('name',this.name);
          formData.set('email',this.email);
          formData.set('address',this.address);
          formData.set('phone',this.phone);
          formData.set('semester',this.semester);
          formData.set('age',this.age);
          formData.set('profileImage',this.profileImage);

  if(this.password!=='' && this.password===this.repeatPassword && this.email && this.age && this.address && this.phone){
    axios({
        method: 'post',
        url: `http://localhost:3000/${this.userType}/signup`,
        data: formData,
        config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
        .then(function (res) {
            //handle success
            // this.$route.push('/');
            console.log(res.data);
        })
        .catch(function (err) {
            //handle error
            // console.log(err);
        });
  }else{
      alert('Please fill all the details');
  }

        //   if(this.password!=='' && this.password===this.repeatPassword && this.email && this.age && this.address && this.phone){
        //       axios.post('http://localhost:3000/students/signup',{
        //           name:this.name,
        //           email:this.email,
        //           semester:this.semester,
        //           profileImage:this.profileImage,
        //           phone:this.phone,
        //           age:this.age,
        //           address:this.address
        //       }).then(res=>{
        //           console.log(res)
        //       })
        //   }

       
      }
  },
};
</script>




<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .signup-wrapper{
        /* max-width: 50vw; */
        margin: 0 auto;
        margin-top: -2rem;
    }
    form div{
        margin: 10px 0;
    }
    .login{
        margin-top: 10px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

</style>
