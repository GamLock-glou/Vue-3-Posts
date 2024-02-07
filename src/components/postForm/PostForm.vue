<template>
  <form @submit.prevent>
    <h4>Create post</h4>
    <my-input v-focus v-model="post.title" type="text" placeholder="Name" />
    <my-input v-model="post.body" type="text" placeholder="Description" />
    <my-button class="btn" @click="createPost">Create</my-button>
  </form>
</template>
<script>
export default {
  data() {
    return {
      post: {
        title: '',
        body: ''
      }
    }
  },
  emits: ['create'],
  methods: {
    createPost() {
      const newPost = {
        id: Date.now(),
        ...this.post
      }
      this.$emit('create', newPost)
      this.post = {
        title: "",
        body: ""
      };
    },
  }
}
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
}

.btn {
  margin-top: 10px;
}
</style>