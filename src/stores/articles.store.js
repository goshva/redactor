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
                this.articlesList = uniqueIds.slice(0, 138);
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
                
                if (lastId >= 138) {
                    return;
                }
                
                const article = await fetchWrapper.get(APIUrl + "?id=" + (lastId + 1));
                
                if (!article) {
                    console.error('Меню с id ' + (lastId + 1) + ' не найдена.');
                    return;
                }
                
                this.articles.push(article);
                this.articlesList.push(article.id);
            } catch (error) {
            }
        }
        
    }
});
