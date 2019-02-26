<template>
  <div class="home">
    <!-- <Navbar /> -->
    This is your home
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from "@/components/Navbar.vue";

export default {
  name: "home",
  components: {
    Navbar
  },
  created() {
    const user=JSON.parse(localStorage.getItem('user'));
    if(user){
      this.user=user;
      this.isLoggedIn=true;
      this.$emit('increment');
    }
  },
};
</script>
<style scoped>

</style>
