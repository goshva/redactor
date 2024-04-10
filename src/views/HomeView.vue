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
  <nav v-show="authStore.user" class="navbar nav-wrap navbar-expand navbar-dark bg-dark mb-4">
          <div class="navbar-nav links-wrap align-items-center ">
              <router-link to="/" class="nav-item nav-link align-items-center link-home" >
                  <span class="d-inline-block">🏠</span>
              </router-link>
              <router-link to="/news" class="btn btn-success btn-news align-items-center">Создать новость</router-link>
              <div class="search-container align-items-center">
                  <input v-model="searchQuery" type="search" class="form-control search-inp with-icon" placeholder="Поиск...">
                  <span class="search-icon">🔍</span>
              </div>
          </div>
          <div class="log-wrap align-items-center">
              <a @click="authStore.logout()" class="nav-item nav-link link-home">🚪</a>
          </div>
      </nav>
  <div>
    <div class="container pt-0 pb-4">

    <ul>
      <li v-for="article in articles" :key="article.id">
        <ArticleEditor :name="article.name" :ArrayId="article.id" :contentArrays="article" :searchQuery="searchQuery" />
      </li>
    </ul>
  </div>

  </div>
</template>

<style>
@import '@/assets/base.css';

.nav-wrap {
  display: flex;
  justify-content: space-between;
}





ul {
  list-style-type: none;
margin: 0;
padding: 0;
}
.mainList li {
    list-style-type: none;
}
.flex {
  display: flex;
}
</style>
