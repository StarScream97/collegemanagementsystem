<template>
    <div>
        <div class="container">
            <div class="postType">
                <a class="waves-effect waves-light btn" @click.prevent="post.postWithImage=!post.postWithImage"><i class="fas fa-image" ></i>Post With Image</a>
                <a class="waves-effect waves-light btn"  @click.prevent="post.postWithImage=!post.postWithImage"><i class="fas fa-align-left" ></i>Post Without Image </a>
            </div>
            <div class="row" v-if="post.postWithImage">
                <form class="col s12" enctype="multipart/form-data" >
                        <div class="row">
                             <div class="input-field col s12">
                                <input id="title" type="text" v-model="post.title">
                                <label for="title">Title</label>
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col s12">
                                <textarea name="body" id="body" placeholder="Body" v-model="post.body"></textarea>
                                <!-- <label for="body">Body</label> -->
                            </div>
                        </div>
                         <div class="row">
                            <div class="input-field col s12">
                                <input id="postImage" type="file" @change="onFileChanged">
                            </div>
                        </div>
                        <a class="waves-effect waves-light btn-small" @click.prevent="createPost">Create Post</a>
                       
                </form>
        </div>
    </div>
        
    </div>
</template>


<script>

import axios from 'axios';

export default {
    data() {
        return {
            showForm:false,
            post:{
                title:'',
                body:'',
                postImage:null,
                authorId:'',
                onModel:'',
                postWithImage:false,

            }
        }
    },
    methods: {
     onFileChanged (event) {
        //   console.log(event.target.files[0])
        this.post.postImage = event.target.files[0]
      },  
      createPost(){
          const formData=new FormData();
          formData.set('title',this.post.title);
          formData.set('body',this.post.body);
          formData.set('authorId',this.post.authorId);
          formData.set('onModel',this.post.onModel);
          formData.set('postWithImage',this.post.postWithImage);
          formData.set('postImage',this.post.postImage);

          if(this.post.title!==''&& this.post.body && this.post.authorId && this.post.postWithImage && this.post.postImage){
                axios({
                    method: 'post',
                    url: 'http://localhost:3000/posts',
                    data: formData,
                    config: { headers: {'Content-Type': 'multipart/form-data' }}
                    })
                    .then(function (res) {
                        this.$route.push('/posts');
                    })
                    .catch(function (err) {
                        
                    });
            }else{
                alert('Please Fill All The Required Details')
            }
      }
    },
    computed: {
        fetchUserFromLocalStorage(){
            const user=JSON.parse(localStorage.getItem('user'));
            this.post.authorId=user._id;
            this.post.onModel=user.status;
        }
    },
    created(){
        this.fetchUserFromLocalStorage;
    }
}
</script>


<style scoped>
.input-field input{
    margin:  0;
}
form{
    margin-top: 8px;
}
textarea{
    height: 8rem;
}
    
</style>