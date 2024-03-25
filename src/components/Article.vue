
  
  <script setup>
  import { defineProps } from 'vue';

  const props = defineProps({
  title: String,
  message: String,
  });

  import { storeToRefs } from 'pinia';
  
  import { useAuthStore, useUsersStore } from '@/stores';
  
  const authStore = useAuthStore();
  const { user: authUser } = storeToRefs(authStore);
  
  const usersStore = useUsersStore();
  const { users } = storeToRefs(usersStore);
  
  usersStore.getAll();
  
  </script>
  
  <template>
    <div class="jumbotron">
      <div class="article-header">
        <input :value="title">
      </div>
      <div class="article-body">  
        <input :value="message">
      </div>
    </div>
  </template>

  <style>
  .jumbotron {
  background-color: #f2f2f2;
  padding: 2rem;
  border-radius: 0.3rem;
  }
  /* Style for the header of the article */
.article-header {
  width:100%;
  background-color: #f2f2f2;
  padding: 20px;
  text-align: center;
}

.article-header input {
  width:100%;
  font-size: 24px;
  color: #333;
}

/* Style for the body of the article */
.article-body  input{
  width:100%;
  margin:5px 0;
  padding:3px;
  display: block;
}
  </style>