<template> 
  <ul v-if="!!name" class="arr-list"> 
    <li class="arr-item"> 
      <input v-if="contentArrays.type == 'input'" :value="contentArrays.value" class="inp" type="text" 
        @input="updateValue($event, contentArrays)"> 
      <textarea v-else-if="contentArrays.type == 'textarea'" :value="contentArrays.value" class="int" type="text" 
        @input="updateValue($event, contentArrays)" cols="108" rows="2"></textarea> 
      <input v-else-if="contentArrays.type == 'link'" :value="contentArrays.value" class="inp" type="text" 
        @input="updateValue($event, contentArrays)" cols="108" rows="2"> 
      <input v-else-if="contentArrays.type == 'image'" :value="contentArrays.value" class="inp" type="text" 
        @input="updateValue($event, contentArrays)" cols="108" rows="2"> 
      <div :data-tooltip="name" :title="name" class="key key-top"> 
        <button v-if="contentArrays.type == 'input'" class="btn-reset btn-savee-input" @click="saveChanges(ArrayId, contentArrays.value, name, contentArrays.type)">💾</button> 
        <button v-else @click="saveChanges(ArrayId, contentArrays.value, name, contentArrays.type)" class="btn-reset btn-savee-textarea">💾</button> 
      </div> 
    </li> 
  </ul> 
  <ul class="arr-list" v-else> 
    <li class="arr-item"> 
      <input class="inp" type="text" value=""> 
      <div class="key-top"> 
        <button class="btn-reset btn-savee-input" @click="saveChanges(ArrayId, '', name, 'input')">💾</button> 
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
    ArrayId: { 
      type: Number, 
      required: true 
    }, 
    contentArrays: { 
      type: Object, 
      required: true 
    } 
 
  }, 
  methods: { 
    updateValue(event, contentArray) { 
      contentArray.value = event.target.value; 
    }, 
    saveChanges(arrayId, key, field, type) { 
      console.log(`Изменения в id: ${arrayId}, Название: ${field}, Содержание: ${key}, Тип: ${type}`); 
    }, 
  } 
}); 
</script> 


<style>
.int {
  width: 850px;
  border: unset;
  height: 100px;
  padding: 10px 30px;
  border-radius: 20px 0 0 20px;
  border: 1px solid #00FF00;
}

.btn-reset {
  border: unset;
  background-color: transparent;
  font-size: 40px;
}

.btn-savee-textarea {
  height: 100%;
}

[data-tooltip] {
  position: relative;
}

[data-tooltip]::after {
  content: attr(data-tooltip);
  position: absolute;
  width: max-content;
  left: 0;
  top: 0;
  background: #00FF00;
  color: black;
  padding: 5px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
  pointer-events: none;
  opacity: 0;
  transition: 0.5s;
}

[data-tooltip]:hover::after {
  opacity: 1;
  left: 10px;
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


.btn-save-null {
  width: 144px;
}


.inp {
  border: 1px solid #00FF00;
  display: block;
  padding: 10px 30px;
  min-width: 850px;
  height: 100%;
  border-radius: 20px 0 0 20px;
}

.inp-null {
  border: 1px solid #00FF00;
  display: block;
  height: 52px;
  padding: 10px 30px;
  min-width: 850px;
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
  height: 100%;
  width: 144px;
  text-wrap: wrap;
  background-color: #00FF00;
  border-radius: 0 20px 20px 0;
}
</style>
