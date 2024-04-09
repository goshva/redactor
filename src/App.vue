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

<template>
  <div class="app-container bg-light">
      <nav v-show="authStore.user" class="navbar navbar-expand navbar-dark bg-dark">
          <div class="navbar-nav d-flex align-items-center ml-auto">
              <router-link to="/" class="nav-item nav-link d-flex align-items-center" style="font-size: 24px;">
                  <span class="d-inline-block">🏠</span>
              </router-link>
              <router-link to="/news" class="btn btn-success ml-2 d-flex align-items-center">Создать новость</router-link>
              <div class="search-container d-flex align-items-center">
                  <input v-model="searchQuery" type="search" class="form-control with-icon" placeholder="Поиск...">
                  <span class="search-icon">🔍</span>
              </div>
          </div>
          <div class="ml-auto d-flex align-items-center">
              <a @click="authStore.logout()" class="nav-item nav-link" style="font-size: 24px;">🚪</a>
          </div>
      </nav>
      <div class="container pt-4 pb-4">
          <ul>
              <li v-for="article in articles" :key="article.id">
                  <ArticleEditor :name="article.name" :ArrayId="article.id" :contentArrays="article" :searchQuery="searchQuery" @searchArticles="searchArticles" />
              </li>
          </ul>
      </div>
  </div>
</template>

<style>
@import '@/assets/base.css';

ul {
  list-style-type: none;
}

.flex {
  display: flex;
}
</style>
