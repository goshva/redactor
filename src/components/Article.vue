
<template>
  <div class="container" v-if="showContainer">
    <ul class="list-container">
      <li class="one-arr">
        <button class="link" @click="switchTo(generateUrl( contentArrays.url))">{{ generateUrl( contentArrays.url) }}</button>
        <p class="num-block"> {{ name }} / {{ ArrayId }}</p>
        
        <ul class="arr-list">
          
          <li class="arr-item" v-for="(item, key, idx) in contentArrays" :key="key">

            <div class="wrap-for-list" v-if="key === 'content'">
              <ul v-if="item" class="arr-list">
                <li class="arr-item arr-item-one" v-for="(value, key) in JSON.parse(item)" :key="key">
                  <textarea class="inp inp-content" type="text" :value="value"
                    @input="updateValue($event, {key})" :class="{ highlight: showHighlight(key) }"></textarea>
                    <div :data-tooltip="key" :title="key" class="key key-content">
                        <button class="btn-save" @click="saveChanges(ArrayId, {key}, value)">💾</button>
                    </div>
                </li>
              </ul>
            </div>

            <div class="wrap-for-list" v-else-if="key === 'customContent' &&!!item">
              <ul class="arr-list">
                <li v-for="(value, key) in JSON.parse(item)" :key="key" class="arr-item">
                  <SubArticle :name="key" :ArrayId="ArrayId" :contentArrays="value" />
                </li>
              </ul>
            </div>

            <div class="wrap-for-list" v-else>
              <ul class="arr-list">
                <li class="arr-item arr-item-one">
                  <textarea class="inp stuff" type="text" :value="item" @input="updateValue($event, key, item)" :class="{ highlight: showHighlight(name) }"></textarea> 
                  <div :data-tooltip="key" class="key key-h" v-if="name">
                    <button class="btn-save" @click="saveChanges(ArrayId, {key}, item)">💾</button>
                  </div>
                </li>
              </ul>
                </div>
                
          </li>
        </ul>
        <ButtonShow />
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
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
    },
    searchQuery: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const showContainer = computed(() => {
      if (!props.searchQuery) {
        return true;
      }
      return Object.values(props.contentArrays).some(value => {
        if (value && typeof value === 'string' && value.toString().toLowerCase().includes(props.searchQuery.toLowerCase())) {
          return true;
        }
        if (value && typeof value === 'object' && JSON.stringify(value).toLowerCase().includes(props.searchQuery.toLowerCase())) {
          return true;
        }
        return false;
      });
    });

    const updateValue = (event, name) => {
      name.value = event.target.value;
    };

    const saveChanges = (arrayId, name, value) => {
      console.log(`Изменения в id: ${arrayId}, Название: ${name.key}, Содержание: ${value}`);
    };

    const generateNumberBlock = (index) => {
      const numberBlock = props.contentArrays[index]['id']
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

    const showHighlight = (value) => {
      if (!props.searchQuery) {
        return false;
      }
      return value.toString().toLowerCase().includes(props.searchQuery.toLowerCase());
    };

    return {
      generateUrl,
      switchTo,
      generateNumberBlock,
      saveChanges,
      updateValue,
      showHighlight,
      showContainer
    };
  }
};
</script>

<style scoped>

.wrap-for-list {
  width: 100%;
}

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
  min-height: 50px;
  max-width: 850px;
  width: 100%;
  border-radius: 20px 0 0 20px;
  field-sizing: content;
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
  background-color: dodgerblue;
  border-radius: 0 20px 20px 0;
}

.key-h {
  height: 100%;
}

.key-content {
  background-color: hotpink;
}

.highlight {
  color: #fff;
  background-color:  rgba(161, 59, 133, 0.40);
}

.mark {
  color: #fff;
  background-color: rgba(161, 59, 133, 0.40);
  display: inline;
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
  outline: 4px solid #fff;
  outline-offset: -4px;
  border-radius: 12px
}
</style>

