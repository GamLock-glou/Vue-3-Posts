<template>
  <div v-if="posts.length > 0">
    <h3>List Posts</h3>
    <transition-group name="post-list">
      <post-item v-for="post in posts" :post="post" :key="post.id" @remove="remove" />
    </transition-group>
  </div>
  <h3 v-else>
    List is empty
  </h3>
</template>
<script>
import PostItem from '../postItem/PostItem.vue';
export default {
  components: {
    PostItem
  },
  emits: ['remove'],
  props: {
    posts: {
      type: Array,
      required: true,
    }
  },
  methods: {
    remove(id) {
      this.$emit('remove', id)
    }
  }
}
</script>

<style scoped>
.post-list-item {
  display: inline-block;
  margin-right: 10px;
}

.post-list-enter-active, .post-list-leave-active {
  transition: all 1s ease;
}

.post-list-enter-from, .post-list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.post-list-move {
  transition: transform 0.8s ease;
}
</style>