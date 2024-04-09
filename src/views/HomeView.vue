<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
import ArticleEditor from '@/components/Article.vue';
import { storeToRefs } from 'pinia';
import { useAuthStore, useArticlesStore } from '@/stores';

const authStore = useAuthStore();
const { user: authUser } = storeToRefs(authStore);

const articlesStore = useArticlesStore();
const { articles, articlesList } = storeToRefs(articlesStore);

const searchQuery = ref('');
const isFetching = ref(false);
const filteredArticles = ref([]);

const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        isFetching.value = true;
        articlesStore.appendNewArticle().then(() => {
            isFetching.value = false;
        });
    }
};

onMounted(() => {
    articlesStore.getAllList().then(() => {
        articlesStore.appendNewArticle();
    })
    window.addEventListener('scroll', handleScroll);
});

onBeforeUnmount(() => {
    window.removeEventListener('scroll', handleScroll);
});

watch(searchQuery, () => {
  if (searchQuery.value.length > 2) {
    searchArticles();
  }
});

const searchArticles = () => {
  if (searchQuery.value) {
    filteredArticles.value = articles.value.filter(article => {
      let match = false;
      for (const [key, value] of Object.entries(article)) {
        if (value && value.toString().toLowerCase().includes(searchQuery.value.toLowerCase())) {
          match = true;
          break;
        }
      }
      return match;
    });
  } else {
    filteredArticles.value = articles.value;
  }
};
</script>

<style>
ul {
  list-style-type: none;

}
.mainList li {
    list-style-type: none;
}
.flex {
  display: flex;
}
</style>