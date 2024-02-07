import { createRouter, createWebHistory } from "vue-router"
import Main from "../pages/main/Main.vue";
import PostsPage from "../pages/posts/PostsPage.vue";
import About from "../pages/about/About.vue";
import PostPage from "../pages/post/PostPage.vue";
import PostsWithStore from "../pages/postsWithStore/PostsWithStore.vue";
import PostsCompositionApi from "../pages/postsCompositionApi/PostsCompositionApi.vue";

const routes = [
  {
    path: '/',
    component: Main,
  },
  {
    path: '/posts',
    component: PostsPage,
  },
  {
    path: '/about',
    component: About,
  },
  {
    path: '/posts/:id',
    component: PostPage,
  },

  {
    path: '/post-store',
    component: PostsWithStore,
  },
  {
    path: '/post-composition-api',
    component: PostsCompositionApi,
  },
]

const router = createRouter({
  routes,
  history: createWebHistory()
})

export default router