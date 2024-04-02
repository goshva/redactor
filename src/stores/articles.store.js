import { defineStore } from 'pinia';

import { fetchWrapper } from '@/helpers';

//const APIUrl = `${import.meta.env.VITE_API_URL}/api/ids`;
const APIUrl = "https://tender.one/api/";

export const useArticlesStore = defineStore({
    id: 'articles',
    state: () => ({
        articles: [],
        articlesList: [],
        lastArticle: 1
    }),
    actions: {
        async getAllList() {
            //this.articles = { loading: true };
            fetchWrapper.get(APIUrl)
                .then(articlesListServer => {
                    console.log(articlesListServer)
                    this.articlesList = articlesListServer.map(item => item.id);
                    console.log(articlesListServer.map(item => item.id));
                    console.log(this.articlesList[6])
                })
                .catch(error => this.articlesList = { error })
        },
        async appendNewArticle() {
            console.log(this.articlesList)
            fetchWrapper.get(APIUrl+"?id="+this.lastArticle)
                .then(article => {
                    this.articles.push(article)
                })
                .catch(error => this.article = { error })
            this.lastArticle++
        }
    }
});
