<template>
  <div class="dashboard">
      <div class="left-panel  grey darken-3 white-text z-depth-3">
          <div class="dashboard-items">
              <router-link to="/dashboard" class="dashboard-item" >
                 <i class="fas fa-chart-bar"></i>
                  <a href="#" >Dashboard</a>
              </router-link>
               <router-link to="/posts" class="dashboard-item" >
                   <i class="fas fa-blog"></i>
                  <a href="#">Blog</a>
              </router-link>
               <router-link to="/students" class="dashboard-item" >
                   <i class="fas fa-user-graduate"></i>
                  <a href="#" >Students</a>
               </router-link>
               <router-link to="/teachers" class="dashboard-item"  >
                   <i class="fas fa-user-circle"></i>
                  <a href="">Teachers</a>
              </router-link>
              <router-link to="/posts/create" class="dashboard-item" >
                   <i class="fas fa-blog"></i>
                  <a href="#">Create Post</a>
              </router-link>
               <router-link to="/pending" class="dashboard-item">
                   <i class="fas fa-user-circle"></i>
                  <a href="#" >Pending Requests</a>
              </router-link>

               <router-link to="/settings" class="dashboard-item">
                   <i class="fas fa-cogs"></i>
                  <a href="#">Settings</a>
               </router-link>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  name: "Dashboard",
  data() {
      return {
          isLoggedIn:false
      }
  },
  methods: {

  },
  created() {
    const user=JSON.parse(localStorage.getItem('user'));
    if(user){
      this.user=user;
      this.isLoggedIn=true;
    }
  }
};
</script>

<style scoped>

.router-link-exact-active, .router-link-active{
    background: rgb(44, 43, 43);
}
.dashboard-item i{
    color: white;
}
.left-panel{
    height: 90.1vh;
    position: fixed;
    width: 16vw;
    top: 0;
    left: 0;
    margin-top: 4.2rem;
    padding-top: 2rem;
}
   
/*    
   .left-panel{
       min-width:20vw;
       max-height: 90vh;
   }
   .right-panel{
       min-width:80vw;
       height: 90vh;
   } */
   .dashboard-items{
       display: flex;
       flex-direction: column;
   }

   .dashboard-item{
       width: 100%;
       padding: 1rem 10px;
       margin-bottom: 2px;
       display:flex;
       align-items: center;
       cursor: pointer;
   }
   .dashboard-item:hover{
       background: rgb(56, 55, 55);
   }
   .dashboard-item a{
       text-decoration: none;
       color: white;
   }
   .dashboard-item i{
       margin-right: 12px;
   }
</style>



