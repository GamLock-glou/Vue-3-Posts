<template>
  <div class="post">
    <div>
      <div><strong>ID:</strong>{{ post.id }}</div>
      <div><strong>Name:</strong> {{ post.title }}</div>
      <div><strong>Description:</strong> {{ post.body }}</div>

    </div>
    <div class="post__btns">
      <my-button
        @click="$router.push(`/posts/${post.id}`)"
      >
        Open
      </my-button>
      <my-button
        @click="remove"
      >
        Delete
      </my-button>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    post: {
      type: Object,
      required: true,
    }
  },
  emits: ['remove'],
  methods: {
    remove() {
      this.$emit('remove', this.post.id)
    }
  }
}
</script>

<style scoped>
.post {
  padding: 15px;
  border: 2px solid teal;
  margin: 5px 0px;
  display: flex;
  justify-content: space-between;
}

.post__btns {
  display: flex;
}

</style>