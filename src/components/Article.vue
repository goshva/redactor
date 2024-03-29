<template>
  <div class="container">
    <h1>ТЕСТ</h1>
    <ul class="list-container">
      <li class="one-arr" v-for="(array, index) in contentArrays" :key="index">
        <p>{{ index + 1 }}</p>
        <button class="link" @click="switchTo(generateUrl(index))">{{ generateUrl(index) }}</button>
        <p class="num-block"> Номер блока: {{ generateNumberBlock(index) }}</p>
        <ul class="arr-list">
          <li class="arr-item" v-for="(item, key, idx) in array" :key="index"
            :style="{ display: showContentKeys ? 'flex' : (key !== 'content' && key !== 'customContent') ? 'none' : 'flex' }">
            <p class="keydn" v-if="key === 'content' || key === 'customContent'"></p>
            <p class="key" v-else>{{ key }}: </p>
            <div v-if="key === 'content'">
              <ul class="arr-list">
                <li class="arr-item">
                  <p class="key">title</p>
                  <input  v-if="JSON.parse(item)" :value="JSON.parse(item)['title']" class="inp" type="text">
                  <ButtonSave :age=item :name=index />


                </li>
                <li class="arr-item">
                  <p class="key">text</p>
                  <input  v-if="JSON.parse(item)"  :value="JSON.parse(item)['text']" class="inp" type="text">
                  <ButtonSave :age=item :name=index />


                </li>
                
              </ul>
            </div>
            <div v-else-if="key === 'customContent'">
              <ul class="arr-list">
                  <SubArticle :name=item :age=index />
              </ul>
            </div>
            <input v-else class="inp stuff" type="text" :value="item" @input="updateItem(index, key, idx, $event.target.value)">
            
          </li>
        </ul>
        <ButtonShow
          :key="index"
          :contentArrays="contentArrays"
          @click="toggleShow(index)"
        />

      </li>
    </ul>
  </div>
</template>

<script>
import { ref } from 'vue';
import ButtonSave from './ButtonSave.vue';
import SubArticle from './SubArticle.vue';
import ButtonShow from './ButtonShow.vue';

export default {
  components: {
    ButtonSave,
    SubArticle,
    ButtonShow
  },
  setup() {
    const contentArrays = ref([]);
    const showContentKeys = ref(false);

    const fetchJsonFile = async (url) => {
      const response = await fetch(url);
      const jsonData = await response.json();
      contentArrays.value = jsonData;
    };

    fetchJsonFile('/contents.json');

    const toggleShow = (index) => {
      showContentKeys.value = !showContentKeys.value;
      contentArrays.value[index] = contentArrays.value[index].map((it, key) => {
        if (key !== 'content' && key !== 'customContent') {
          console.log(showContentKeys.value)
          return {
            ...it,
            show: showContentKeys.value
          }
        }
        return it;
      });
    };

    const JSONconverter = (string) => {
     const newString = string
      console.log(newString)
     return newString
    }

    const generateNumberBlock = (index) => {
      const numberBlock = contentArrays.value[index]['id']
      console.log('numberBlock');
      return numberBlock
    }

    const generateUrl = (index) => {
      const mainUrl = "http://tender.one/"
      const url = mainUrl + contentArrays.value[index]["url"]
      return url
    }

    const switchTo = (url) => {
      window.location = url
    }


    return {
      contentArrays,
      showContentKeys,
      toggleShow,
      generateUrl,
      switchTo,
      JSONconverter,
      generateNumberBlock

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
.list-container {
  padding: 0;
  max-width: 1440px;
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
  gap: 20px;
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

.keydn {
  display: none;
}

.key {
  font-size: 20px;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
  text-align: center;
  border: 2px solid #dadada;
  height: 50px;
  width: 500px;
  text-wrap: wrap;
  background-color: lightgreen;
  border-radius: 20px 0 0 20px;
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
.stuff{
  box-shadow: 1px 1px 0px 0px;
}

.link {
  font-size: 24px;
  border: 2px dashed black;
  background-color: transparent;
  margin-right: 40px;
}

.num-block {
  display: inline-block;
  font-size: 28px;
  background-color: transparent;
}


</style>
