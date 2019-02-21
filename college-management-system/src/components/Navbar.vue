<template>
  <div>
      <nav class=" blue-grey darken-4">
        <div class="nav-wrapper max-container">
          <a href="#!" class="brand-logo"><i class="fab fa-drupal"></i><span>StarScream</span></a>
          <a href="#" data-target="mobile-demo" class="sidenav-trigger"><i class="material-icons">menu</i></a>
          <ul class="right hide-on-med-and-down">
            <li><a href="#" @click="goTo('/')">Home</a></li>
            <!-- <li><router-link to="/"></router-link> </li> -->
            <li><a href="#" @click="goTo('/discover')">Discover</a></li>
            <!-- <li><router-link to="/discover"></router-link> </li> -->
            <li><a href="#" @click="goTo('/signup')">Signup</a></li>
            <!-- <li><router-link to="/signup"></router-link> </li> -->
            <li><a href="#" @click="goTo('/login')">Login</a></li>
            <!-- <li><router-link to="/login"></router-link> </li> -->

          </ul>
        </div>
      </nav>

      <ul class="sidenav" id="mobile-demo">
        <li><a href="sass.html">Home</a></li>
        <li><a href="badges.html">Discover</a></li>
        <li><a href="collapsible.html">Signup</a></li>
        <li><a href="mobile.html">Login</a></li>
      </ul>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  props: {
    msg: String
  },
  data() {
    return {
      
    }
  },
  methods: {
    goTo(link){
      this.$router.push(link);
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.brand-logo{
  display: flex;
  align-items: center;
}
.brand-logo span{
  font-size: 1.2rem;
}
ul li a{
  color: white;
}
    

</style>
