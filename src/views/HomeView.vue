<script setup>
import ArticleEditor from '@/components/Article.vue';


import { storeToRefs } from 'pinia';

import { useAuthStore, useArticlesStore } from '@/stores';

const authStore = useAuthStore();
const { user: authUser } = storeToRefs(authStore);

const articlesStore = useArticlesStore();
const { articles } = storeToRefs(articlesStore);

articlesStore.getAll();
</script>

<template>
    <div>
        <h1>Hi {{authUser?.firstName}}!</h1>
        <ul v-if="articles.length" class="mainList">
            <li>
                <ArticleEditor/>
            </li>
        </ul>
        <div v-if="articles.loading" class="spinner-border spinner-border-sm"></div>
        <div v-if="articles.error" class="text-danger">Error loading articles: {{articles.error}}</div>
    </div>
</template>
<style>

.mainList li {
    list-style-type: none;
}
</style>
