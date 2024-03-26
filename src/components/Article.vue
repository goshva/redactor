<template>
  <div class="container">
    <h1>ТЕСТ</h1>
    <ul>
      <li class="one-arr" v-for="(array, index) in contentArrays" :key="index">
        <h3>Блок-массив {{ index }}</h3>
        <ul class="arr-list">
          <li class="arr-item" v-for="(item, key, idx) in array" :key="idx" :style="{display: showContentKeys ? 'flex' : (key !== 'content' && key !== 'customContent') ? 'none' : 'flex'}">
            <p class="key" v-if="key === 'content' || key === 'customContent'">{{ key }}: </p>
            <p class="key" v-else>{{ key }}: </p>
            <input class="inp" type="text" v-if="showContentKeys || (key === 'content' || key === 'customContent')" :value="item" @input="updateItem(index, key, idx, $event.target.value)">
          </li>
        </ul>
        <div class="btn-wrapp">
        <ButtonSave @click="saveChanges" />
        <button class="btn-show" @click="toggleShow(index)">    <svg viewBox="0 0 1024 1024" class="icon" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M582.4 384c0 14.08-11.52 25.6-25.6 25.6l-384 409.6c-14.08 0-25.6-11.52-25.6-25.6V192c0-14.08 11.52-25.6 25.6-25.6h230.4c14.08 0 25.6 11.52 25.6 25.6l153.6 192z" fill="#D3AC51"></path><path d="M177.92 832h-5.12c-21.76 0-38.4-16.64-38.4-38.4V192c0-21.76 16.64-38.4 38.4-38.4h230.4c19.2 0 35.84 14.08 38.4 33.28l153.6 192v5.12c0 19.2-14.08 34.56-32 38.4L177.92 832z m-5.12-652.8c-7.68 0-12.8 5.12-12.8 12.8v601.6c0 5.12 3.84 10.24 7.68 11.52L550.4 396.8h5.12c5.12 0 10.24-3.84 12.8-8.96l-153.6-190.72V192c0-7.68-5.12-12.8-12.8-12.8H172.8z" fill="#231C1C"></path><path d="M864 793.6c0 14.08-11.52 25.6-25.6 25.6h-665.6c-14.08 0-25.6-11.52-25.6-25.6l64-512c0-14.08 11.52-25.6 25.6-25.6h678.4c14.08 0 25.6 11.52 25.6 25.6l-76.8 512z" fill="#FAC546"></path><path d="M838.4 832h-665.6c-21.76 0-38.4-16.64-38.4-38.4v-1.28l64-510.72c0-20.48 17.92-37.12 38.4-37.12h678.4c21.76 0 38.4 16.64 38.4 38.4v1.28l-76.8 510.72c-1.28 20.48-17.92 37.12-38.4 37.12z m-678.4-37.12c0 6.4 6.4 11.52 12.8 11.52h665.6c7.68 0 12.8-5.12 12.8-12.8v-1.28l76.8-510.72c0-6.4-6.4-11.52-12.8-11.52h-678.4c-7.68 0-12.8 5.12-12.8 12.8v1.28l-64 510.72z" fill="#231C1C"></path></g></svg></button>
      </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, watch } from 'vue';
import ButtonSave from './ButtonSave.vue';

export default {
  components: {
    ButtonSave,
  },
  setup() {
    const contentArrays = ref([]);
    const showContentKeys = ref(false);

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

    const toggleShow = (index) => {
      showContentKeys.value = !showContentKeys.value;
      contentArrays.value[index] = contentArrays.value[index].map((item, key) => {
        if (key !== 'content' && key !== 'customContent') {
          return {
            ...item,
            show: showContentKeys.value
          }
        }
        return item;
      });
    };

    return {
      contentArrays,
      updateItem,
      showContentKeys,
      toggleShow
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
  height: 50px;
  border-radius: 0 20px 20px 0;
}

.key {
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
  text-align: center;
  border: 2px solid #dadada;
  height: 50px;
  width: 200px;
  text-wrap: wrap;
  background-color: lightgreen;
  border-radius: 20px 0 0 20px;
}

.btn-wrapp {
  display: flex;
  flex-direction: row-reverse;
}

.btn-show {
  width: 60px;
  height: 40px;
  background-color: unset;
  border: unset;
  cursor: pointer;
}

</style>
