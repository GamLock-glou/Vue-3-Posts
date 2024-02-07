<template>
  <div>
    <h1>Page with posts</h1>
    <my-input v-focus :model-value="searchQuery" @update:model-value="setSearchQuery" type="text" placeholder="Search..." />
    <div class="app__btns">
      <my-button @click="showDialog">
        Create post
      </my-button>
      <my-select :model-value="selectedSort" @update:model-value="setSelectedSort" :options="sortOptions" />
    </div>
    <my-dialog v-model:show="dialogVisible">
      <post-form @create="createPost" />
    </my-dialog>
    <posts-list v-if="!isPostLoading" @remove="removePost" :posts="sortedAndSearchPosts" />
    <div v-else>loading...</div>
    <div v-intersection="loadMorePosts" class="observer"></div>
  </div>
</template>
<script>
import PostForm from '../../components/postForm/PostForm.vue';
import PostsList from '../../components/postsList/PostsList.vue';
import MySelect from '../../components/UI/MySelect.vue';
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
export default {
  components: {
    PostForm,
    PostsList,
    MySelect,
  },
  data() {
    return {
      dialogVisible: false,
    }
  },
  methods: {
    ...mapMutations({
      setPage: "post/setPage",
      setSearchQuery: "post/setSearchQuery",
      setSelectedSort: "post/setSelectedSort"
    }),
    ...mapActions({
      loadMorePosts: "post/loadMorePosts",
      fetchPosts: "post/fetchPosts"
    }),
    createPost(post) {
      this.posts.push(post);
      this.dialogVisible = false
    },
    removePost(id) {
      this.posts = this.posts.filter(post => post.id !== id)
    },
    showDialog() {
      this.dialogVisible = true;
    },
  },
  mounted() {
    this.fetchPosts()
  },
  computed: {
    ...mapState({
      posts: state => state.post.posts,
      isPostLoading: state => state.post.isPostLoading,
      page: state => state.post.page,
      limit: state => state.post.limit,
      totalPages: state => state.post.totalPages,
      sortOptions: state => state.post.sortOptions,
      selectedSort: state => state.post.selectedSort,
      searchQuery: state => state.post.searchQuery,
    }),
    ...mapGetters({
      sortedPosts: 'post/sortedPosts',
      sortedAndSearchPosts: 'post/sortedAndSearchPosts'
    })
  },
  watch: {
  }
}
</script>

<style scoped>
.app__btns {
  display: flex;
  justify-content: space-between;
}

.page__wrapper {
  display: flex;
  margin-top: 15px;
}

.page {
  border: 1px solid teal;
  padding: 10px;
}

.current-page {
  border: 2px solid teal;
  color: teal;
  font-size: 18px;
  font-weight: bold;
}

.observer {
  height: 30px;
  width: 100%;
  background-color: blueviolet;
}
</style>