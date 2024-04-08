<template>
  <div>
    <div v-for="(item, index) in items" :key="item.id">
      <textarea :id="'input_' + item.id" v-model="item.value" style="width: 1000px;"></textarea>
      <button @click="saveItem(item)">Сохранить</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: []
    };
  },
  mounted() {
    this.loadContents();
  },
  methods: {
    loadContents() {
      fetch('/contents.json') 
        .then(response => response.json())
        .then(data => {
          this.items = data;
        })
        .catch(error => {
          console.error('Ошибка загрузки данных из contents.json:', error);
        });
    },
    saveItem(item) {
      // Отправка изменений в базу данных или сохранение их в файл
      console.log('Сохранено', item);
    }
  }
};
</script>

