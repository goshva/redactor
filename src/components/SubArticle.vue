<template>
    <ul class="arr-list" v-if="!!name">
        <p class="block">id: {{ age }}</p> 
        <li class="arr-item" v-for="subItem in Object.keys(JSON.parse(name))" :key="subItem">
            <p class="key-top"> {{ subItem }}</p>
            <input :class="inp" :value="JSON.parse(name)[subItem].value" class="inp" type="text">
            <ButtonSave :age=item :name=subItem :fresh=JSON.parse(name)[subItem].value />
        </li>
    </ul>
    <ul class="arr-list" v-else>
  <li class="arr-item">
    <p class="key-null key-top">customContent</p>
    <input class="inp-null" type="text" value="">
  </li>
    </ul>
</template>

<script>
import { defineComponent } from 'vue';
import ButtonSave from './ButtonSave.vue';


export default defineComponent({
    props: {
        name: {
            type: String,
            required: true
        },
        age: {
            type: Number,
            default: 0
        }
    },
    components: {
        ButtonSave,
  },

    setup(props) {
        return {
            name: props.name,
            age: props.age
        };
    }
});
</script>
<style>

.block {
  width: 100%;
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
    width: 90%;
}

.inp {
  border: 1px solid #dadada;
  display: block;
  height: 52px;
  padding: 10px 30px;
  width: 700px;
  height: 50px;
  border-radius: 0 20px 20px 0;
}

.inp-null {
  border: 1px solid #dadada;
  display: block;
  height: 52px;
  padding: 10px 30px;
  width: 700px;
  height: 50px;
  background-color: #f1f1f1;
  border-radius: 0 20px 20px 0;
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
  background-color: lightgreen;
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
  width: 50%;
  text-wrap: wrap;
  background-color: lightgreen;
  border-radius: 20px 0 0 20px;
}
</style>
