<template>
  <div class="container">
    <ul class="list-container">
      <li class="one-arr">
        <button class="link" @click="switchTo(generateUrl( contentArrays.url))">{{ generateUrl( contentArrays.url) }}</button>
        <p class="num-block"> {{ name }} / {{ ArrayId }}</p>
        <ul class="arr-list">

          <li class="arr-item" v-for="(item, key, idx) in contentArrays" :key="key"
            :style="{ display: showContentKeys ? 'flex' : (key !== 'content' && key !== 'customContent') ? 'none' : 'flex' }">
            <div v-if="key === 'content'">
              <ul class="arr-list">

                <li class="arr-item" v-for="(value, key) in JSON.parse(item)" :key="key">
                  <input v-if="JSON.parse(item)" :value="value" class="inp" type="text"
                    @input="updateValue(key, $event.target.value)">
                  <div  data-tooltip="title" :title="key" class="key key-top">
                    <button class="btn-save" @click="saveChanges(ArrayId, key,  value)">💾</button>
                  </div>
                </li>
              </ul>
            </div>
            <div v-else-if="key === 'customContent'">
              <ul class="arr-list">
                <SubArticle :name="item" :arrayId="contentArrays.id" />
              </ul>
            </div>
            
            <div v-else>
              <ul class="arr-list">
                <li class="arr-item">
                  <input class="inp stuff" type="text" :value="item"
                    @input="updateItem(index, key, idx, $event.target.value)">
                </li>

              </ul>
            </div>

            <div class="keydn" v-if="key === 'content' || key === 'customContent'"></div>
            <div :data-tooltip="key" :title="key" class="key" v-else>
              <button class="btn-save" @click="saveChanges(array.id, key, item, subItem)">💾</button>
            </div>

          </li>
        </ul>
        <ButtonShow :key="index" :contentArrays="contentArrays" @click="toggleShow(index, array.id)" />
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

    const toggleShow = (index, id) => {
      console.log(index)
      fetchJsonFile('https://tender.one/api/?id=' + id);

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

    const saveChanges = (id, key, field) => {

      console.log(`Изменения в id: ${id}, Название: ${key}, Содержание: ${field}`);
      const obj = JSON.stringify({
        id: id,
        column: key,
        value: field
      });
      console.log(obj)
      fetch(`https://tender.one/api/`, {
        method: 'POST',
        body: obj
      })
    };

    const generateNumberBlock = (index) => {
      const numberBlock = contentArrays.value[index]['id']
      console.log('numberBlock');
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
      //contentArrays,
      showContentKeys,
      toggleShow,
      generateUrl,
      switchTo,
      generateNumberBlock,
      saveChanges
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
  width: 300px;
  left: 0;
  top: 0;
  background: lightgreen;
  color: black;
  padding: 0.5em;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
  pointer-events: none;
  opacity: 0;
  transition: 0.5s;
}

[data-tooltip]:hover::after {
  opacity: 1;
  left: 200px;
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
  border: 1px solid #dadada;
  display: block;
  height: 52px;
  padding: 10px 30px;
  min-width: 850px;
  height: 50px;
  border-radius: 20px 0 0 20px;
}

.keydn {
  display: none;
}



.key {
  font-size: 20px;
  font-weight: bold;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
  text-align: center;
  border: 2px solid #dadada;
  height: 50px;
  width: 100%;
  text-wrap: wrap;
  background-color: lightgreen;
  border-radius: 0 20px 20px 0;
}

.key-top {
  font-size: 20px;
  font-weight: bold;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
  text-align: center;
  border: 2px solid #dadada;
  height: 50px;
  width: 50%;
  text-wrap: wrap;
  background-color: lightgreen;
  border-radius: 0 20px 20px 0;
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

.btn-save {
  background-color: transparent;
  border: unset;
  font-size: 40px;
}
</style>
