<template>
  <ul class="arr-list">
    <li class="arr-item" v-for="subItem in Object.keys(JSON.parse(name))" :key="subItem">
      <input :value="JSON.parse(name)[subItem].value" class="inp" type="text" @input="updateValue(subItem, $event.target.value)">
      <div :title="subItem" class="key-top">
        <button class="btn-savee" @click="saveChanges(arrayId, subItem, newValue)">💾</button>
      </div>
    </li>
  </ul>


</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SubArticle',
  props: {
    name: {
      type: String,
      required: true
    },
    arrayId: {
      type: Number,
      required: true
    },
    key: {
      type: String,
      required: true
    },
    onSaveChanges: {
      type: Function,
      required: true
    }
  },
  methods: {
  updateValue(key, value) {
    let newValue = {...JSON.parse(this.name), [key]: { value } };
    this.$emit('update:name', newValue);
    this.saveChanges(this.arrayId, key, newValue[key].value);
  },

  saveChanges(arrayId, key, field) {
    console.log(`Изменения в id: ${arrayId}, Название: ${key}, Содержание: ${field}`);
  },
}
});
</script>

<style>

[data-tooltip] {
    position: relative;
   }
   [data-tooltip]::after {
    content: attr(data-tooltip);
    position: absolute;
    width: 300px;
    left: 0; top: 0;
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

.block {
  width: 100%;
}

.arr-list {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
  gap: 30px;
  width: 100%;
}
.arr-item {
  display: flex;
  align-items: center;
  width: 100%;
}

.btn-savee {
  background-color: transparent;
  border: unset;
  font-size: 40px;
}

.btn-save-null {
  width: 144px;
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

.inp-null {
  border: 1px solid #dadada;
  display: block;
  height: 52px;
  padding: 10px 30px;
  min-width: 850px;
  height: 50px;
  background-color: #f1f1f1;
  border-radius: 20px 0 0 20px;
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
  width: 144px;
  text-wrap: wrap;
  background-color: lightgreen;
  border-radius: 0 20px 20px 0;
}
</style>
