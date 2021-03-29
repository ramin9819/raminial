<template>
  <base-card>
  <span class="prof">
    <router-link to="/profile" class="writer">
      <img src="@/assets/images/avatar.png" alt="Avatar" class="avatar" />
      
    </router-link>
    <div class="follow">
    <button v-if="isFollowed" @click="follow" class="following-btn">following</button>
    <button v-else @click="follow" class="follow-btn">follow</button>
    <div>{{followersNum}} follower</div>
    </div>
    </span>
    <span class="name-email">
      <div class="name">
        <h3>{{ name }}</h3>
      </div>
    </span>
    <hr />
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
        
      >
      </post-item>
    </ul>
  </base-card>
</template>

<script>
import PostItem from "../../components/posts/PostItem";
export default {
  components: { PostItem },
  props: ["userId"],
  computed: {
    name() {
      return this.$store.getters["user/getSelectedUser"].name;
    },
    posts() {
      return this.$store.getters["user/getSelectedUserPosts"];
    },
    isFollowed(){
      return this.$store.getters['user/getIsFollowed']
    },
    followersNum(){
      return this.$store.getters['user/getuserFollowersNum']
    }
  },
  created() {
    this.$store.dispatch("user/getUserProfile", this.userId);
  },
  methods:{
    async follow(){
      try{
      await this.$store.dispatch('user/follow',this.userId)
      }catch(err){
        console.log(err)
      }
    }
  }
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
ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
.name {
  display: flex;
  padding: 0;
}
.prof{
    display: flex
}
.follow{
    margin-left: 1rem;
    
}
.follow-btn{
  background-color: cornsilk;
  padding: 0.25rem 1rem ;
  border-radius:10%
}
.following-btn{
  background-color: rgb(32, 161, 212);
  padding: 0.25rem 1rem ;
  border-radius:10%
}
</style>
