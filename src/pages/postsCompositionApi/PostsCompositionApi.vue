<template>
  <div>
    <h1>Page with posts</h1>
    <my-input v-focus v-model="searchQuery" type="text" placeholder="Search..." />
    <div class="app__btns">
      <my-select v-model="selectedSort" :options="sortOptions" />
    </div>
    <posts-list v-if="!isPostLoading" :posts="sortedAndSearchPosts" />
    <div v-else>loading...</div>
  </div>
</template>
<script>
import PostForm from '../../components/postForm/PostForm.vue';
import PostsList from '../../components/postsList/PostsList.vue';
import MySelect from '../../components/UI/MySelect.vue';
import {usePosts} from "../../hooks/usePosts";
import {useSortedPosts} from "../../hooks/useSortedPosts"
import {useSortedAndSearchPosts} from "../../hooks/useSortedAndSearchPosts"
export default {
  components: {
    PostForm,
    PostsList,
    MySelect,
  },
  data() {
    return {
      dialogVisible: false,
      sortOptions: [
        { value: "title", name: "По названию" },
        { value: "body", name: "По содержаюнию" },
      ],
    }
  },
  methods: {
  },
  setup(props) {
    const {posts, totalPages, isPostLoading} = usePosts(10);
    const {sortedPosts, selectedSort} = useSortedPosts(posts);
    const {searchQuery, sortedAndSearchPosts} = useSortedAndSearchPosts(sortedPosts)

    return {
      posts, totalPages, isPostLoading,
      sortedPosts, selectedSort,
      searchQuery, sortedAndSearchPosts,
    }
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