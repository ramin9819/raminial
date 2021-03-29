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
        :creatorId="post.creator._id"
      >
      </post-item>
    </ul>
    <router-link v-if="isAuth" class="fab" to="/add-post"> + </router-link>
  </base-card>
</template>

<script>
import PostItem from "../components/posts/PostItem";

export default {
  components: { PostItem },
  data() {
    return {
      isLoading: false,
    };
  },
  computed: {
    posts() {
      console.log(this.$store.getters["posts/getPosts"], "sdsd");
      return this.$store.getters["posts/getPosts"];
    },
    isAuth() {
      return this.$store.getters["auth/isAuth"];
    },
  },
  created() {
    this.setPosts();
  },
  methods: {
    async setPosts() {
      this.isLoading = true;
      try {
        await this.$store.dispatch("posts/setPosts");
      } catch (error) {
        console.log(error);
      }
      this.isLoading = false;
    },
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.fab {
  text-decoration: none;
  width: 70px;
  height: 70px;
  background-color: rgb(57, 90, 88);
  border-radius: 50%;
  box-shadow: 0 6px 10px 0 rgb(201, 156, 156);
  transition: all 0.1s ease-in-out;

  font-size: 50px;
  color: white;
  text-align: center;
  line-height: 70px;

  position: fixed;
  right: 10%;
  bottom: 50px;
}

.fab:hover {
  box-shadow: 0 6px 14px 0 rgb(73, 74, 75);
  transform: scale(1.05);
}
</style>
