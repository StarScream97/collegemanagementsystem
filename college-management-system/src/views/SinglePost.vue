<template>
    <div class="post">
        <div class="post-image">
            <img class="z-depth-4" v-if="post.postImage" :src="'http://localhost:3000/'+post.postImage" alt="">
            <img class="z-depth-4" v-else src="https://wallpaperplay.com/walls/full/2/c/4/277054.jpg" alt="">                                
        </div>
        <div class="post-content">
            <h5>{{post.title}}</h5>
            <hr>
            <p>{{post.body}}</p>
        </div>

    </div>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            postId:'',
            post:{}
        }
    },
    created() {
        this.postId=this.$route.params.postId;
        axios.get(`http://localhost:3000/posts/${this.postId}`).then(res=>{
            // console.log(res.data)
            this.post=res.data;
        })
    },
}
</script>

<style scoped>
    .post{
        padding: 1rem 2rem;
        width: 90%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .post-image img{
        border-radius: 15px;

    }
    .post-content{
        width: 95%;
        margin: 0 auto;
    }
    .post-content h5{
        font-family: "Open Sans";
        font-weight: 600;
        font-size: 1.5rem;
    }
    .post-content p{
        font-family: "Open Sans";
    }
</style>
