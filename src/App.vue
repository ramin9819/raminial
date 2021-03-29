<template>
  <the-Header></the-Header>
  <router-view></router-view>
</template>

<script>
import TheHeader from "./components/layout/TheHeader";
export default {
  components: { TheHeader }, 
  created(){
    this.$store.dispatch('auth/setUser')
  }
};
</script>
<style>
* {
  box-sizing: border-box;
}

html {
  font-family: "Roboto", sans-serif;
}

body {
  margin: 0;
  
}
.route-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}

.route-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.route-enter-to,
.route-leave-from {
  opacity: 1;
  transform: translateY(0px);
}
.route-enter-active,
.route-leave-active {
  transition: all 0.3s ease-out;
}
</style>
