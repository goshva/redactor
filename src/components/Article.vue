<template>
  <div class="container">
    <h1>ТЕСТ</h1>
    <ul>
      <li class="one-arr" v-for="(array, index) in contentArrays" :key="index">
        <h3>Блок-массив {{ index }}</h3>
        <ul class="arr-list">
          <li class="arr-item" :style="{display: (key !== 'content' && key !== 'customContent') ? 'none' : 'flex' }" v-for="(item, key, idx) in array" :key="idx">
            <p class="key" v-if="key === 'content' || key === 'customContent'">{{ key }}: </p>
            <input class="inp" type="text" v-if="key === 'content' || key === 'customContent'" :value="item" @input="updateItem(index, key, idx, $event.target.value)">
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, watch } from 'vue';

export default {
  setup() {
    const contentArrays = ref([]);

    const fetchJsonFile = async (url) => {
      const response = await fetch(url);
      const jsonData = await response.json();
      contentArrays.value = jsonData;
    };

    watch(contentArrays, () => {
      localStorage.setItem('contentArrays', JSON.stringify(contentArrays.value));
    });

    fetchJsonFile('/public/contents.json');

    if (localStorage.getItem('contentArrays')) {
      contentArrays.value = JSON.parse(localStorage.getItem('contentArrays'));
    }

    const updateItem = (arrayIndex, key, itemIndex, value) => {
      contentArrays.value[arrayIndex][key][itemIndex] = value;
    };

    return {
      contentArrays,
      updateItem
    };
  }
};
</script>

<style scoped>
.container {
  max-width: 1440px;
  background-color: #f8f9fa;
  margin: 0 auto;
}

.one-arr {
  margin-bottom: 20px;
  border: 3px solid gray;
  border-radius: 20px;
  padding: 15px 20px;
  background-color: #dadada;
}

.arr-list {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
  gap: 30px;
}

.arr-item {
  display: flex;
  align-items: center;
  width: 100%;
}

.inp {
  border: 1px solid #dadada;
  display: block;
  height: 52px;
  padding: 10px 30px;
  width: 100%;
  height: 200px;
  border-radius: 0 20px 20px 0;
}

.key {
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
  text-align: center;
  border: 2px solid #dadada;
  height: 200px;
  width: 200px;
  text-wrap: wrap;
  background-color: lightgreen;
  border-radius: 20px 0 0 20px;
}

</style>
