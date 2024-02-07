<template>
  <div class="navbar">
    <div class="navbar__btns">
      <my-button @click="$router.push('/posts')">Posts</my-button>
      <my-button @click="$router.push('/about')">About</my-button>
      <my-button @click="$router.push('/post-store')">Posts With Store</my-button>
      <my-button @click="$router.push('/post-composition-api')">Posts Composition Api</my-button>
      <!-- <router-link to="/posts">Posts</router-link>
      <router-link to="/about">About</router-link> -->
    </div>
  </div>
</template>

<script>
</script>

<style scoped>
.navbar {
  height: 50px;
  background-color: lightblue;
  box-shadow: 2px 2px 4px gray;
  display: flex;
  align-items: center;
  padding: 10px;
}

.navbar__btns {
  margin-left: auto;
}

.navbar__btns > button {
  margin-left: 20px;
}
</style>