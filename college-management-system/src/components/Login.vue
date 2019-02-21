<template>
  <div class="login-wrapper">
      <div class="container">
            <div class="row">
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
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  props: {
    msg: String
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
        
      }
  },
};
</script>




<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .login-wrapper{
        max-width: 50vw;
        margin: 0 auto;
    }

</style>
