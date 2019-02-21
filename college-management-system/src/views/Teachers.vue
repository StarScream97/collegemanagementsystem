<template>
        <div class="teachers-container">
            <h5>All Teachers</h5>
            <div class="persons">
                <div class="person z-depth-3" v-for="person in teachers" :key="person.index">
                    <div class="person-image">
                        <img :src=" 'http://localhost:3000/' + person.profileImage" :alt="person.name + '-image'" class="responsive-image circle">
                    </div>
                    <div class="person-details">
                        <h6>{{person.email}}</h6>
                        <h5>{{person.name}}</h5>
                        <div class="view-details">
                            <i class="fas fa-info-circle"></i>
                        </div>
                    </div>
                </div>

            </div>
        </div>
</template>

<script>

import Navbar from '@/components/Navbar';
import axios from 'axios';


export default {
  name: "teachers",
  props: {
    msg: String
  },
  components:{
      Navbar
  },
  data() {
      return {
          teachers:[]
      }
  },
  computed:{
      fetchpersons(){
         
      }
  },
  created(){
    //   this.fetchpersons;
     axios.get('http://localhost:3000/teachers').then(res=>{
        this.teachers=res.data;
    })
  }
};
</script>

<style scoped>
    .teachers-container{
        padding: 0 1rem;
    }
   .persons{
       display: grid;
       grid-template-columns: repeat(12,1fr);
       grid-column-gap: 45px;
       grid-row-gap: 15px;
       
   }
   .person{
       grid-column: span 4;
       display: flex;
       /* width: 20rem; */
       height: 5rem;
       position: relative;
       cursor: pointer;
       background: rgb(236, 243, 234);
       border-radius: 6px;

   }
   .person:hover .view-details{
       transition: all .8s;
       right: 0;
       background: white;
       content: '';
       transform-origin: right;
       transform: skewX(3.7deg);
   }
   
   .person-image{
       display: flex;
       align-items: center;
       position: absolute;
       top: -6px;
       left: -2rem;
       border-radius: 50%;
       border: 2px solid #ddd;
       padding: 2px;
       background: white;
   }
   .person-image img{
       /* width: 100%; */
       /* height: auto; */
       width: 80px;
       height: 80px;
   }
   .person-details{
       padding: 5px 10px;
       display: flex;
       flex-direction: column;
       justify-content: center;
       margin-left: 4rem;
       overflow: hidden;
       position: relative;
       width: 100%;
   }
   .person-details h5{
       font-size: 1rem;
       margin: 4px 0;
   }
   .person-details h6{
       font-size: .7rem;
       margin: 4px 0;
       

   }

   .view-details{
       position: absolute;
       right: -10rem;
       display: flex;
       align-items: center;
       justify-content: center;
       transition: all .8s;
       min-width: 5rem;
       height: 100%;     
   }
   .view-details:before{
       content: '';
       transform-origin: right;
       transform: skewY(8deg);
   }
   .view-details:hover i{
       color: rgb(126, 145, 120);
       transition: all .8s;
   }
   .view-details i{
       transition: all .8s;
       font-size: 1.8rem;
      color:black;
   }
 
</style>



