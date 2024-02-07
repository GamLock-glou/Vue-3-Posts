import axios from "axios"

export const postModule = {
  state: () => ({
    posts: [],
    isPostLoading: false,
    page: 1,
    limit: 10,
    totalPages: 0,
    sortOptions: [
      { value: "title", name: "По названию" },
      { value: "body", name: "По содержаюнию" },
    ],
    selectedSort: '',
    searchQuery: '',
  }),
  getters: {
    sortedPosts(state) {
      return [...state.posts].sort((post1, post2) => {
        return post1[state.selectedSort]?.localeCompare(post2[state.selectedSort])
      })
    },
    sortedAndSearchPosts(state, getters) {
      return getters.sortedPosts.filter(post => post.title.toLowerCase().includes(state.searchQuery.toLowerCase()))
    }
  },
  mutations: {
    setPosts(state, posts) {
      state.posts = posts;
    },
    setLoading(state, isLoad) {
      state.isPostLoading = isLoad;
    },
    setPage(state, page) {
      state.page = page;
    },
    setSelectedSort(state, selectedSort) {
      state.selectedSort = selectedSort
    },
    setTotalPages(state, totalPages) {
      state.totalPages = totalPages
    },
    setSearchQuery(state, searchQuery) {
      state.totalPages = searchQuery
    },
  },
  actions: {
    async fetchPosts({state, commit}) {
      try {
        commit('setLoading', true)
        const response = await axios.get("https://jsonplaceholder.typicode.com/posts", {
          params: {
            _limit: state.limit,
            _page: state.page
          }
        })
        commit("setTotalPages", Math.ceil(response.headers['x-total-count'] / state.limit));
        commit("setPosts", response.data);

      } catch (e) {
        console.log("fuck")
      } finally {
        commit('setLoading', false)
      }
    },
    async loadMorePosts({state, commit}) {
      try {
        commit("setPage", 1);
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _page: state.page,
            _limit: state.limit
          }
        });
        commit("setTotalPages", Math.ceil(response.headers['x-total-count'] / state.limit));
        commit("setPosts", [...state.posts, ...response.data]);
      } catch (e) {
        console.log("fuck")
      }
    }
  },
  namespaced: true,
}