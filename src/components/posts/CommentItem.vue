<template>
    <li>
        <div class="writer">
        <img src="@/assets/images/avatar.png" alt="Avatar" class="avatar" />
        <h4>{{ creator }}</h4>
        </div>
        <p class="date">{{createdAt}}</p>
        <p class="content">{{content}}</p>
    </li>
</template>
<script>
export default {
    props:['creator','createdAt','content']
}
</script>
<style scoped>
.avatar {
  vertical-align: middle;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 0.5rem;
}
.writer{
    display: flex;
}
h4{
    margin:0.75rem 0;
}
.date{
    font-size: 0.75rem;
}
.content{
    margin:1rem;
}
li{
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    padding:0.5rem;
    margin: 0.5rem;
    border-radius: 10px
}
</style>