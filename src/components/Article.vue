<template>
  <div class="container">
    <ul class="list-container">
      <li class="one-arr">
        <button class="link" @click="switchTo(generateUrl( contentArrays.url))">{{ generateUrl( contentArrays.url) }}</button>
        <p class="num-block"> {{ name }} / {{ ArrayId }}</p>
        <ul class="arr-list" v-show="showContentKeys">

          <li class="arr-item" v-for="(item, key, idx) in contentArrays" :key="key">
            <div v-if="key === 'content'">
              <ul v-if="item" class="arr-list">

                <li class="arr-item" v-for="(value, key) in JSON.parse(item)" :key="key">
                  <input v-if="JSON.parse(item)" :value="value" class="inp inp-content" type="text"
                    @input="updateValue($event, {value})">
                    <div :data-tooltip="key" :title="key" class="key key-content">
                        <button class="btn-save" @click="saveChanges(ArrayId, {key}, value)">💾</button>
                    </div>
                </li>

              </ul>
            </div>
            <div v-else-if="key === 'customContent' &&!!item">
              <ul class="arr-list">
                <li v-for="(value, key) in JSON.parse(item)" :key="key" class="arr-item">
                <SubArticle :name="key" :ArrayId="ArrayId" :contentArrays="value" /> 
                </li>
              </ul>
            </div>
            
            <div v-else>
              <ul class="arr-list">
                <li class="arr-item">
                  <input class="inp stuff" type="text" :value="item"
                  @input="updateValue($event, {value})">
                </li>

              </ul>
            </div>

            <div class="keydn" v-if="key === 'content' || key === 'customContent'"></div>
            <div :data-tooltip="key" :title="key" class="key key-h" v-else>
              <button class="btn-save" @click="saveChanges(ArrayId, {key}, value)">💾</button>
            </div>

          </li>
        </ul>
        <ButtonShow @click="toggleShow" />
      </li>
    </ul>
  </div>
</template>

<script>
import { ref } from 'vue';
import SubArticle from './SubArticle.vue';
import ButtonShow from './ButtonShow.vue';

export default {
  components: {
    SubArticle,
    ButtonShow
  },
  name: 'MainArticle',
  props: {
    name: {
      type: String,
      required: true
    },
    ArrayId: {
      type: Number,
      required: true
    },
    //contentArrays
    contentArrays: {
      type: Object,
      required: true
    }
  },
  setup() {
    const showContentKeys = ref(false);

    const toggleShow = () => {
      showContentKeys.value =!showContentKeys.value;
    };

    const updateValue = (event, name, value) => {
      name.value = event.target.value;
        console.log(name.value);
    };

    const saveChanges = (arrayId, name, value) => { 
        console.log(`Изменения в id: ${arrayId}, Название: ${name.key}, Содержание: ${value}`); 
    };

    const generateNumberBlock = (index) => {
      const numberBlock = contentArrays.value[index]['id']
      return numberBlock
    }

    const generateUrl = (index) => {
      const mainUrl = "http://tender.one/"
      const url = index? index : null
      if ( url === null) {
        return mainUrl
      } else {
        return mainUrl + url
      }
    }

    const switchTo = (url) => {
      window.location = url
    }

    return {
      generateUrl,
      switchTo,
      generateNumberBlock,
      saveChanges,
      updateValue,
      toggleShow,
      showContentKeys
    };
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
  background: #00FF7F;
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
  background-color: #dadada;
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
  border: 1px solid #00FF7F;
  display: block;
  padding: 10px 30px;
  min-width: 850px;
  height: 100%;
  border-radius: 20px 0 0 20px;
}

.inp-content {
  border: 1px solid #00FF00;

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
  background-color: #00FF7F;
  border-radius: 0 20px 20px 0;
}

.key-h {
  height: 60%;
}

.key-content {
  background-color: #00FF00;
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

.stuff {

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

.btn-save {
  background-color: transparent;
  border: unset;
  font-size: 40px;
}
</style>
