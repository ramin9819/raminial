<template>
  <li>
    <header class="header">
      <router-link :to="postLink"
        ><h3>{{ title }}</h3></router-link
      >
      <router-link :to="categoryLink">{{ category }}</router-link>
    </header>
    <router-link to="sd" class="writer">
      <img src="@/assets/images/avatar.png" alt="Avatar" class="avatar" />
      <h4>{{ creatorName }}</h4>
    </router-link>
    <div>
      {{ postContent }}
    </div>
    <div class="actions">
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
  ],
  computed: {
    categoryLink() {
      return "/category/" + this.category;
    },
    postContent() {
      return this.content.slice(0, 100) + " ...";
    },
    postLink(){
        return "/post/"+ this.id
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

</style>