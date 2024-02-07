import { ref, computed } from "vue";

export function useSortedAndSearchPosts(sortedPosts) {
  const searchQuery = ref("");

  const sortedAndSearchPosts = computed( () => {
    return sortedPosts.value.filter(post => post.title.toLowerCase().includes(searchQuery.value.toLowerCase()))
  });

  return {
    searchQuery,
    sortedAndSearchPosts
  };
}