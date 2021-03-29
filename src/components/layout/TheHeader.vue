<template>
  <header>
    <nav>
      <router-link v-if="isAuth" to="/profile" class="writer">
      <img src="@/assets/images/avatar.png" alt="Avatar" class="avatar" />
      <h4>{{name}}</h4>
      </router-link>
      <h2><router-link to="/"> main page</router-link></h2>

      <ul>
          <li><router-link to = '/aboutUs'>about us</router-link></li>
          
          <li v-if="!isAuth"><router-link to = '/login'>login</router-link></li>
          <li v-if="!isAuth"><router-link to = '/signup'>signup</router-link></li>
         
          <li v-if="isAuth" ><base-button @click="logout">logout</base-button></li>
      </ul>
    </nav>
  </header>
</template>

<script>

export default {
  computed:{
    isAuth(){
      return this.$store.getters['auth/isAuth']
    },
    name() {
      return this.$store.getters["auth/getName"];
    }
  },
  methods:{
    logout(){
      this.$store.dispatch('auth/logout')
    }
  }
}

</script>

<style  scoped>
header {
  width: 100%;
  height: 4rem;
  background-color: #3d008d;
  display: flex;
  justify-content: center;
  align-items: center;
}

header a {
  text-decoration: none;
  color: #f391e3;
  display: inline-block;
  padding: 0.25rem 1rem;
  border: 1px solid transparent;
}

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
h4 {
  margin: 1rem 0.5rem;
}

a:active,
a:hover,
a.router-link-active {
  /* border: 1px solid #f391e3; */
  color: blue;
}

h1 {
  margin: 0;
}

h1 a {
  color: white;
  margin: 0;
}

h1 a:hover,
h1 a:active,
h1 a.router-link-active {
  border-color: transparent;
}

header nav {
  width: 90%;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

header ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

li {
  margin: 0 0.5rem;
}
</style>