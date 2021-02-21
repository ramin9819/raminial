<template>
  <base-card>
  <base-spinner v-if="isLoading"></base-spinner>
    <ul v-else>
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
      >
      </post-item>
    </ul>
  </base-card>
</template>

<script>
import PostItem from "../components/posts/PostItem";

export default {
  components: { PostItem },
  data(){
    return {
      isLoading:false
    }
  },
  computed: {
    posts() {
      console.log(this.$store.getters["posts/getPosts"])
      return this.$store.getters["posts/getPosts"];
    },
  },
  created() {
    this.setPosts()
  },
  methods:{
    async setPosts(){
      this.isLoading=true
      try{
        await this.$store.dispatch("posts/setPosts");
      }catch(error){
        console.log(error)
      }
      this.isLoading=false
    }
  }
};
</script>

<style scoped>
ul{
    list-style: none;
    padding: 0;
    margin: 0;
}
</style>