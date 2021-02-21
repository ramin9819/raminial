<template>
  <base-card>
    <!-- <base-spinner v-if="isLoading"></base-spinner> -->
    <div>
      <header class="header">
        <h3>{{ title }}</h3>
        <router-link :to="categoryLink">{{ category }}</router-link>
      </header>
      <router-link to="sd" class="writer">
        <img src="@/assets/images/avatar.png" alt="Avatar" class="avatar" />
        <h4>{{ creatorName }}</h4>
      </router-link>
      <div class="content">
        {{ content }}
        <!-- {{ comments }} -->
      </div>
    </div>
  </base-card>
  <base-card>
    <h3>comments</h3>
    <h1>create comment</h1>
    <hr />
    <ul>
      <comment-item
        v-for="comment in comments"
        :key="comment._id"
        :creator="comment.creator"
        :createdAt="comment.createdAt"
        :content="comment.content"
      ></comment-item>
    </ul>
  </base-card>
</template>

<script>
import CommentItem from "../components/posts/CommentItem.vue";
import BaseCard from "../components/ui/BaseCard.vue";
export default {
  components: { BaseCard, CommentItem },
  props: ["postId"],
  date() {
    return {
      // postDetails: null,
      // comments: null,
      isLoading: false,
    };
  },
  computed: {
    title() {
      // console.log(this.$store.getters["posts/getPost"],'kjkj')
      return this.$store.getters["posts/getPost"].title;
    },

    content() {
      return this.$store.getters["posts/getPost"].content;
    },
    category() {
      return this.$store.getters["posts/getPost"].category;
    },
    creatorName() {
      // const creator = this.$store.getters["posts/getPost"].creator
      return "writer name//// error";
    },

    // post(){
    //   console.log('1')
    //     return this.$store.getters['posts/getPost']
    // },
    comments() {
      // return this.$store.getters['posts/getComments']
      return this.$store.getters["posts/getComments"];
    },
    categoryLink() {
      return "/category/" + this.$store.getters["posts/getPost"].category;
    },
  },
  async created() {
    await this.loadPost();
    console.log("cre");
  },
  methods: {
    loadPost() {
      // console.log("1");
      this.isLoading = true;
      return this.$store
        .dispatch("posts/setSinglePost", this.postId)
        .then(() => {
          console.log("method");
        });
      //   this.$store.dispatch("posts/setSinglePost", this.postId).then(re=>{
      //     this.isLoading=false
      //     console.log(re, 'response')
      //     console.log(this.isLoading,'load');
      //   })
      //   // console.log("2");
      //  .catch(err=>{
      //    console.log(err)
      //  })

      // this.postDetails = this.$store.getters["posts/getPost"];
      // this.comments = this.$store.getters["posts/getComments"];
      // console.log(this.postDetails.title)
    },
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
a {
  text-decoration: none;
  color: black;
}

h3 {
  font-size: 1.5rem;
}

h3 {
  margin: 0.5rem 0;
}
h4 {
  margin: 1rem 1rem;
}
.header {
  display: flex;
  justify-content: space-between;
}
.writer {
  display: flex;
}
.content {
  margin: 0.5rem 0;
}
ul{
    list-style: none;
    padding: 0;
    margin:1rem;
}
</style>