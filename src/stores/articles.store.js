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
                    this.articlesList = articlesListServer.map(item => item.id);
                })
                .catch(error => this.articlesList = { error })
        },
        
        async appendNewArticle() {
          const getNextArticle = async (id) => {
              try {
                  const article = await fetchWrapper.get(APIUrl + "?id=" + id);
                  this.articles.push(article);
                  this.lastArticle = id + 1;
              } catch (error) {
                  await getNextArticle(id + 1);
              }
          };
      
          await getNextArticle(this.lastArticle);
      }
    }
});
