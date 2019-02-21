<template>
    <div class="posts-container">
       <div class="posts">
           <!-- <transition      leave-active-class="animated bounceOutRight" enter-active-class="animated fadeInUp">            -->
                <div class="post z-depth-4 white-text  indigo darken-3" v-for="(post, index) in posts" :key="index">
                    <div class="post-img z-depth-2"><img :src="'http://localhost:3000/' + post.postImage" alt=""></div>
                    <div class="post-content">
                        <p>Static Date: February 21</p>
                        <h5>{{post.title}}</h5>
                        <p>{{post.body}}</p>
                        <a href="">Read More</a>
                    </div>
                </div>
           <!-- </transition>             -->
       </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name:"Posts",
    components:{

    },
    data() {
        return {
            posts:[]
        }
    },
    computed: {
        fetchPosts(){
            axios.get('http://localhost:3000/posts').then(res=>{
                // console.log(res.data);
                this.posts=res.data;
            })
        }
    },
    created(){
        this.fetchPosts;
    }
}
</script>

<style scoped>
    h5,h6{
        font-family: "Open Sans";
    }
    h5{
        font-weight: 600;
    }
    p:first-child{
        color:#f5f5f5;
    }
    .posts-container{
        width: 80%;
    }
    .posts{
        display: flex;
        flex-direction: column;
        margin-top: 2rem;
    }
    .post{
        /* margin-bottom: 1rem; */
        width: 50vw;
        padding: 0 2rem;
        margin:  0 auto 1rem 0;
        min-height: 14rem;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        border-radius: 12px;
        transition: all .7s;
        cursor: pointer;

    }
    .post:hover{
        box-shadow: none;
        transition: all .7s;
    }
    .post:hover .post-img img{
        transform: scale(1.05);
        transition: all .8s;
    }
    .post-img{
        width: 12rem;
        height: 12rem;
        margin-left: -4rem;
        border-radius: 10px;
        overflow: hidden;
    }
    .post-img img{
        width: 100%;
        height: 100%;
        transition: all .8s;

    }
    .post-content{
        margin-left: 4rem;
    }
</style>
