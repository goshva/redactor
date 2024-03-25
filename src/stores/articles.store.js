import { defineStore } from 'pinia';

import { fetchWrapper } from '@/helpers';

const baseUrl = `${import.meta.env.VITE_API_URL}/articles`;

export const useArticlesStore = defineStore({
    id: 'articles',
    state: () => ({
        articles: {}
    }),
    actions: {
        async getAll() {
            this.articles = { loading: true };
            fetchWrapper.get(baseUrl)
                .then(articles => this.articles = articles)
                .catch(error => this.articles = { error })
        }
    }
});
