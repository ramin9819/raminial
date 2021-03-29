<template>
  <base-card>
    <router-link to="/profile" class="writer">
      <img src="@/assets/images/avatar.png" alt="Avatar" class="avatar" />
      
    </router-link>
    <span class="name-email">
    <div class="name">
    <h3 v-if="!editMode">{{ name }}</h3>
    <input v-else type="text" class="edit-input" v-model="userName">
    <div v-if="editMode" class="edit-button" @click="nameSubmit">
    <img src="@/assets/images/tick.png" alt="mark" class="edit" />
    </div>
    <div class="edit-button" @click="edit">
    <img src="@/assets/images/edit.png" alt="edit" class="edit" />
    </div>
    </div>
    <div class="name">
      <h3>email: </h3>
      <h3 v-if="!emailEditMode">{{ email }}</h3>
    <input v-else type="text" class="edit-input" v-model="userEmail">
    <div v-if="emailEditMode" class="edit-button" @click="emailSubmit">
    <img src="@/assets/images/tick.png" alt="mark" class="edit" />
    </div>
    <div class="edit-button" @click="emailEdit">
    <img src="@/assets/images/edit.png" alt="edit" class="edit" />
    </div>
    </div>
    </span>
    <hr>
    <h3>liked category</h3>
    <div>
      <router-link
        v-for="cat in category"
        :key="cat"
        :to="'/category/' + cat"
        class="category"
        >{{ cat }}</router-link
      >
    </div>
    <hr>
    <h3>posts</h3>
    <ul>
    <post-item
        v-for="post in posts"
        :key="post._id"
        :id="post._id"
        :title="post.title"
        :content="post.content"
        :imageUrl="post.imageUrl"
        :createdAt="post.createdAt"
        :category="post.category"
        :creatorName="post.creator.name"
        isProfile="true"
        del="true"
        @del="deletePost"
      >
      </post-item>
      </ul>
  </base-card>
</template>

<script>
import PostItem from "../../components/posts/PostItem";

export default {
    components:{PostItem},
    data(){
      return{
      userName:null,
      userEmail:null,
      editMode : false,
      emailEditMode:false,
    }},
  computed: {
    name() {
      return this.$store.getters["user/getUser"].name;
    },
    email(){
      return this.$store.getters["user/getUser"].email
    },
    category(){
        return this.$store.getters["user/getUser"].likedCategory;
    },
    posts(){
        return this.$store.getters["user/getPosts"]
    }
  },
  methods:{
    edit(){
      this.userName=this.name
      this.editMode = !this.editMode
    },
    deletePost(id){
      this.$store.dispatch('user/deletePost',id)
    },
    emailEdit(){
      this.userEmail=this.email
      this.emailEditMode= !this.emailEditMode
    },
    async nameSubmit(){
      await this.$store.dispatch('user/changeName',this.userName)
      this.editMode=false
      await this.$store.dispatch('auth/setUser')
    },
    async emailSubmit(){
      try{
      await this.$store.dispatch('user/changeEmail',this.userEmail)
      this.emailEditMode=false
      }catch(error){
        console.log(error)
      }
    }
  },
  async created() {
    await this.$store.dispatch("user/getProfile");
  },
};
</script>

<style scoped>
.avatar {
  vertical-align: middle;
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.writer {
  display: flex;
  padding: 0;
  margin-bottom: 1rem;
}
.category{
  padding: 2px;
  margin: 2px;
  border: 1px solid;
  border-radius: 5px;
  background-color: rgb(172, 188, 238);
  font-size: 0.75rem;
}
a {
  text-decoration: none;
  color: black;
}
ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
.name{
  display: flex;
  padding: 0;
}

.edit {
  width: 20px;
  height: 20px;
}
.edit-button{
  text-decoration: none;
  padding: 0;
  background-color: transparent;
  border: none;
  cursor:pointer;
  margin:1rem 0.5rem;
}

.edit-input{
  padding: 0px;
  margin:1rem 0
}
.name-email{
  display: flex;
  justify-content: space-between;
  
}
</style>
