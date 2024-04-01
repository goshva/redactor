<template>
  <ul class="arr-list" v-if="!!name">
    <li class="arr-item" v-for="subItem in Object.keys(JSON.parse(name))" :key="subItem">
      <input :value="JSON.parse(name)[subItem].value" class="inp" type="text" @input="updateValue(subItem, $event.target.value)">
      <div :data-tooltip="subItem" class="key-top">
        <button class="btn-savee" @click="saveChanges(arrayId, subItem, JSON.parse(name)[subItem].value)">💾</button>
      </div>
    </li>
  </ul>
  <ul class="arr-list" v-else>
    <li class="arr-item">
      <input class="inp-null" type="text" value="">
      <div class="key-null key-top"></div>
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
      this.$emit('update:name', JSON.stringify({ ...JSON.parse(this.name), [key]: { value } }))
    },
    saveChanges(arrayId, subItem, field) {
  console.log(`Изменения в id: ${arrayId}, Название: ${subItem}, Содержание: ${field}`);

  const formData = new FormData();
  formData.append(subItem, field);

  fetch(`https://tender.one/api/?id=${arrayId}`, {
    method: 'POST',
    body: formData
  })
    .then(response => {
      if (response.ok) {
        console.log('Changes saved successfully!');
      } else {
        throw new Error('Error saving changes');
      }
    })
    .catch(error => {
      console.error(error);
    });
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

.key-null {
  font-size: 20px;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
  text-align: center;
  border: 2px solid #dadada;
  height: 50px;
  width: 50%;
  text-wrap: wrap;
  border-radius: 0 20px 20px 0;
  background-color: lightgreen;
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
</style>
