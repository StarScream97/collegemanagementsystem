<template>
  <div id="app">
    <Navbar />
    <div class="router-view">
      <router-view />
    </div>
    <Dashboard />
  </div>
</template>

<script>
import Dashboard from "@/components/Dashboard.vue";
import Navbar from "@/components/Navbar.vue";

import Home from '@/views/Home.vue'
export default {
  components:{
    Dashboard,
    Home,
    Navbar
  },
  data() {
    return {

    }
  },
  methods:{
    
  }
 
  
}
</script>

<style scoped>

.router-view{
  max-width: 77vw;
  margin-left: auto;
}

</style>
