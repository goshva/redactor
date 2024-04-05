import { defineStore } from 'pinia';
import { fetchWrapper } from '@/helpers';

const APIUrl = "https://tender.one/api/";

export const useArticlesStore = defineStore({
    id: 'articles',
    state: () => ({
        articles: [], 
        articlesList: [], 
        lastArticle: 1, 
    }),
    actions: {
        async getAllList() {
            try {
                const articlesListServer = await fetchWrapper.get(APIUrl);
                const uniqueIds = [...new Set(articlesListServer.map(article => article.id))];
                this.articlesList = uniqueIds.sort((a, b) => a - b);
                this.loadArticles();
            } catch (error) {
                console.error('Ошибка при загрузке списка идентификаторов:', error);
            }
        },
        async loadArticles() {
            try {
                this.articles = await Promise.all(
                    this.articlesList.map(id => fetchWrapper.get(APIUrl + "?id=" + id))
                );
            } catch (error) {
                console.error('Ошибка при загрузке меню:', error);
            }
        },
        async appendNewArticle() {
            try {
                const lastId = this.articlesList.length > 0 ? this.articlesList[this.articlesList.length - 1] : 0;
                const article = await fetchWrapper.get(APIUrl + "?id=" + (lastId + 1));
                this.articles.push(article);
                this.articlesList.push(article.id);
            } catch (error) {
                console.error('Ошибка при добавлении новой меню:', error);
            }
        }
    }
});
