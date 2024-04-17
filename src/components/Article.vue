<template>
  <div v-if="showContainer" class="container">
    <ul class="list-container">
      <li class="one-arr">
        <div class="content-wrap">
          <div>
            <button @click="switchTo(generateUrl(contentArrays.url))" class="link">
              {{ generateUrl(contentArrays.url) }}
            </button>
            <p class="num-block"> {{ name }} / {{ ArrayId }}</p>
          </div>
          <div>
            <button @click="toggleShowItems" class="show-items">
              {{ showItems ? '🔼' : '🔽' }}
            </button>
          </div>
        </div>
        <ul class="arr-list" v-show="showItems">
          <li v-for="(item, key, idx) in contentArrays" :key="key" class="arr-item">

            <div v-if="key === 'content'" class="wrap-for-list">
              <ul v-if="item" class="arr-list">
                <li v-for="(value, key) in JSON.parse(item)" :key="key" class="arr-item arr-item-one">
                  <img v-if="key === 'image'" :src="generateImageUrl(value)" class="image-preview" />
                  <textarea
                    v-else
                    @input="updateValue($event, {value})" 
                    :value="value"
                    :class="{ highlight: showHighlight(key) }"
                    class="inp inp-content" 
                    type="text" 
                  ></textarea>
                  <div :data-tooltip="key" :title="key" class="key key-content">
                    <button @click="saveChanges(ArrayId, {key}, value)" class="btn-save">💾</button>
                  </div>
                </li>
              </ul>
            </div>

            <div v-else-if="key === 'customContent' && !!item" class="wrap-for-list">
              <ul class="arr-list">
                <li v-for="(value, key) in JSON.parse(item)" :key="key" class="arr-item">
                  <SubArticle :name="key" :ArrayId="ArrayId" :contentArrays="value" />
                </li>
              </ul>
            </div>

            <div v-else class="wrap-for-list">
              <ul class="arr-list">
                <li class="arr-item arr-item-one">
                  <textarea 
                    @input="updateValue($event, key, item)" 
                    :value="item" 
                    :class="{ highlight: showHighlight(item) }"
                    class="inp stuff" 
                    type="text" 
                  ></textarea> 
                  <div v-if="name" :data-tooltip="key" class="key key-h">
                    <button @click="saveChanges(ArrayId, {key}, item)" class="btn-save">💾</button>
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

    const saveChanges = (ArrayId, name, value) => {
      console.log(`Изменения в id: ${ArrayId}, Название: ${name.key}, Содержание: ${value}`);
    };

    const generateUrl = (index) => {
      const mainUrl = "http://tender.one/"
      const url = index ? index : null
      if (url === null) {
        return mainUrl
      } else {
        return mainUrl + url
      }
    }

    const switchTo = (url) => {
      window.location = url
    }

    const showHighlight = (value) => {
      if (!props.searchQuery || !value) {
        return false;
      }
      return value.toString().toLowerCase().includes(props.searchQuery.toLowerCase());
    };

    const showItems = ref(false);

    const toggleShowItems = () => {
      showItems.value = !showItems.value;
    };

    const generateImageUrl = (path) => {
      return `https://tender.one/uploads/${path}`;
    };

    return {
      generateUrl,
      switchTo,
      saveChanges,
      updateValue,
      showHighlight,
      showItems,
      toggleShowItems,
      showContainer,
      generateImageUrl 
    };
  }
};
</script>
<style scoped>

.show-items {
  background-color: transparent;
  border: unset;
  font-size: 40px;
}

.content-wrap {
  display: flex;
  justify-content: space-between;
}

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
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.1);
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
  border: 1px solid gray;
  border-radius: 20px;
  padding: 15px 20px;
  background: linear-gradient(135deg, rgba(66, 181, 255, 0.1) 0%, rgba(161, 59, 134, 0.1) 100%);
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
  color: #000000;
  background-color: transparent;
  margin-right: 40px;
}

.num-block {
  display: inline-block;
  font-size: 32px;
  color: #000000;
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

