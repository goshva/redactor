
  
  <script setup>
  import { defineProps } from 'vue';
  import { storeToRefs } from 'pinia';
  import { useAuthStore, useUsersStore } from '@/stores';
  import ButtonSave from './ButtonSave.vue';
  
  const props = defineProps({
    title: String,
    message: String,
  });
  
  const authStore = useAuthStore();
  const usersStore = useUsersStore();
  const { users } = storeToRefs(usersStore);
  
  usersStore.getAll();
  </script>
  
  <template>
    <div class="jumbotron">
      <div class="article-header">
        <span class="span-header">Заголовок</span>
        <textarea class="form-control" :value="title"></textarea>
      </div>
      <div class="article-body">
        <span class="span-header">Текст</span>
        <textarea class="text form-control" :value="message"></textarea>
      </div>
      <ButtonSave @save-changes="saveChanges"/>
    </div>
  </template>

  <style>
  .jumbotron {
  background-color: #f2f2f2;
  padding: 2rem;
  border-radius: 0.3rem;
  }
  /* Style for the header of the article */
.article-body,
.article-header {
  width:100%;
  background-color: #f2f2f2;
  text-align: center;
  max-height: 200px;
}

textarea {
  width:100%;
  font-size: 24px;
  color: #333;
  resize: none;
  border-radius: 15px;
}

.article-body textarea {
  height: 150px;
}


  </style>
