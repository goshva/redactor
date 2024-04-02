<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

import ArticleEditor from '@/components/Article.vue';
import { storeToRefs } from 'pinia';
import { useAuthStore, useArticlesStore } from '@/stores';

const authStore = useAuthStore();
const { user: authUser } = storeToRefs(authStore);

const articlesStore = useArticlesStore();
const { articles,articlesList } = storeToRefs(articlesStore);


/*
const fetchData = async () => {
    isFetching.value = true;
    const response = await fetch('https://tender.one/api/?id=' + currentPage.value);

    const result = await response.json();
    //articles.append(result);// = [...data.value, ...result];
    articlesStore.appendNewArticles(result);
    isFetching.value = false;
    currentPage.value++;
};
*/
const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        articlesStore.appendNewArticle();

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
</script>

<template>
    <div>
        <a href="/" class="btn btn-primary">На главную</a>
        {{ articles }}
        <ul v-if="articles.length" class="mainList" id="observerElement">
            <li v-for="article in articles"  :key="article.id">
                {{ article.name }}
                <ArticleEditor :name="article.name" :ArrayId="article.id" :contentArrays="article"/>
            </li>
        </ul>
        <div v-if="articles.loading" class="spinner-border spinner-border-sm"></div>
        <div v-if="articles.error" class="text-danger">Error loading articles: {{ articles.error }}</div>
    </div>
</template>
<style>
.mainList li {
    list-style-type: none;
}
</style>
