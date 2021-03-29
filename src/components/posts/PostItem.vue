<template>
  <li>
    <header class="header">
      <router-link :to="postLink"
        ><h3>{{ title }}</h3></router-link
      >
      <div>
      <router-link v-for="cat in category" :key="cat" :to='"/category/"+cat' class="category">{{ cat }}</router-link>
      
      </div>
    </header>
    <router-link v-if="!isProfile" :to="userLink" class="writer">
      <img src="@/assets/images/avatar.png" alt="Avatar" class="avatar" />
      <h4>{{ creatorName }}</h4>
    </router-link>
    <div>
      {{ postContent }}
    </div>
    <div class="actions">
      <div v-if="del" class="delete" @click="$emit('del',id)">delete</div>
      <!-- <base-button :to="contactLink" link mode="outline">contact </base-button>
      <base-button :to="detailsLink" link>details</base-button> -->
    </div>
  </li>
</template>

<script>
export default {
  props: [
    "id",
    "title",
    "content",
    "imageUrl",
    "createdAt",
    "category",
    "creatorName",
    "creatorId",
    "isProfile",
    "del"
  ],
  computed: {
    // categoryLink() {
    //   return "/category/";
    // },
    postContent() {
      return this.content.slice(0, 100) + " ...";
    },
    postLink(){
        return "/post/"+ this.id
    },
    userLink(){
      if(this.creatorId==this.$store.getters['auth/getUserId']){
        return '/profile'
      }else{
        return '/user/'+this.creatorId
      }
    }
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
li {
  margin: 1rem 0;
  border: 1px solid #424242;
  border-radius: 12px;
  padding: 1rem;
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

div {
  margin: 0.5rem 0;
}

.actions {
  display: flex;
  justify-content: flex-end;
}
.header {
  display: flex;
  justify-content: space-between;
}
.writer {
  display: flex;
}
.category{
  padding: 2px;
  margin: 2px;
  border: 1px solid;
  border-radius: 5px;
  background-color: rgb(172, 188, 238);
  font-size: 0.75rem;
}

.delete{
  font-size: 0.75rem;
  padding: 5px;
  border: 1px solid ;
  background-color: rgba(243, 8, 8, 0.644);
  border-radius: 5px;
  cursor:pointer;
}

</style>