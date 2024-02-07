<template>
  <div>
    <h1>Page with posts</h1>
    <my-input v-focus v-model="searchQuery" type="text" placeholder="Search..." />
    <div class="app__btns">
      <my-button @click="showDialog">
        Create post
      </my-button>
      <my-select v-model="selectedSort" :options="sortOptions" />
    </div>
    <my-dialog v-model:show="dialogVisible">
      <post-form @create="createPost" />
    </my-dialog>
    <posts-list v-if="!isPostLoading" @remove="removePost" :posts="sortedAndSearchPosts" />
    <div v-else>loading...</div>
    <div v-intersection="loadMorePosts" class="observer"></div>
    <!-- <div class="page__wrapper">
      <div
        v-for="pageNumber in totalPages"
        :key="pageNumber"
        class="page"
        :class="{ 'current-page': pageNumber === page }"
        @click="changePage(pageNumber)"
      >{{ pageNumber }}</div>
    </div> -->
  </div>
</template>
<script>
import PostForm from '../../components/postForm/PostForm.vue';
import PostsList from '../../components/postsList/PostsList.vue';
import MySelect from '../../components/UI/MySelect.vue';
import axios from "axios";
export default {
  props: {

  },
  components: {
    PostForm,
    PostsList,
    MySelect,
  },
  data() {
    return {
      posts: [],
      isPostLoading: false,
      dialogVisible: false,
      page: 1,
      limit: 10,
      totalPages: 0,
      sortOptions: [
        { value: "title", name: "По названию" },
        { value: "body", name: "По содержаюнию" },
      ],
      selectedSort: '',
      searchQuery: '',
    }
  },
  methods: {
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
    changePage(pageNumber) {
      this.page = pageNumber;
    },
    async fetchPosts() {
      try {
        this.isPostLoading = true;
        const response = await axios.get("https://jsonplaceholder.typicode.com/posts", {
          params: {
            _limit: this.limit,
            _page: this.page
          }
        })
        this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit);
        this.posts = response.data;

      } catch (e) {
        alert("fuck")
      } finally {
        this.isPostLoading = false
      }
    },

    async loadMorePosts() {
      try {
        this.page += 1;
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _page: this.page,
            _limit: this.limit
          }
        });
        this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
        this.posts = [...this.posts, ...response.data];
      } catch (e) {
        alert('Ошибка')
      }
    }
  },
  mounted() {
    this.fetchPosts()
  },
  computed: {
    sortedPosts() {
      return [...this.posts].sort((post1, post2) => {
        return post1[this.selectedSort]?.localeCompare(post2[this.selectedSort])
      })
    },
    sortedAndSearchPosts() {
      return this.sortedPosts.filter(post => post.title.toLowerCase().includes(this.searchQuery.toLowerCase()))
    }
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