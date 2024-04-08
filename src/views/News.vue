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

<style scoped>
[data-tooltip] {
  position: relative;
}

[data-tooltip]::after {
  content: attr(data-tooltip);
  position: absolute;
  max-width: 300px;
  left: 0;
  top: 0;
  background: rgba(66, 181, 255, 0.85);
  color: black;
  padding: 5px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
  pointer-events: none;
  opacity: 0;
  transition: 0.5s;
}

[data-tooltip]:hover::after {
  opacity: 1;
  left: 100px;
  font-weight: bold;
  font-size: 24px;
}

ul {
  padding: 0;
  margin: 0;
}


.container {
  max-width: 1920px;
  background-color: #f8f9fa;
  margin: 0 auto;
}

.list-container {
  padding: 0;
  max-width: 1660px;
}

.one-arr {
  margin-bottom: 20px;
  border: 3px solid gray;
  border-radius: 20px;
  padding: 15px 20px;
  background: linear-gradient(135deg, rgba(66, 181, 255, 0.85) 0%, rgba(161, 59, 133, 0.85) 100%);
  color: #fff;
}

.arr-list {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
  gap: 20px;
  width: 100%;
}

.arr-item {
  display: flex;
  align-items: center;
  width: 100%;
}

.inp {
  border: 1px solid rgba(66, 181, 255, 0.85);
  display: block;
  padding: 10px 30px;
  min-width: 850px;
  height: 100%;
  border-radius: 20px 0 0 20px;
}

.inp-content {
  border: 1px solid rgba(161, 59, 133, 0.85);
}

.keydn {
  display: none;
}

.key {
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
  text-align: center;
  height: 100%;
  width: 144px;
  text-wrap: wrap;
  background-color: rgba(66, 181, 255, 0.85);
  border-radius: 0 20px 20px 0;
}

.key-h {
  height: 60%;
}

.key-content {
  background-color: rgba(161, 59, 133, 0.85);
}


.btn-wrapp {
  display: flex;
  flex-direction: row-reverse;
}

.btn-show {
  font-size: 50px;
  background-color: unset;
  border: unset;
  cursor: pointer;
}

.link {
  display: flex;
  font-size: 30px;
  font-weight: bold;
  border: 2px dashed #fff;
  color: #fff;
  background-color: transparent;
  margin-right: 40px;
}

.num-block {
  display: inline-block;
  font-size: 32px;
  color: #fff;
  font-weight: bold;
  background-color: transparent;
}

.btn-save {
  background-color: transparent;
  border: unset;
  font-size: 40px;
}
.btn-save:focus {
  outline: unset;
  font-size: 46px;
}
</style>