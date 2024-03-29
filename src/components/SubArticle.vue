<template>
    <ul class="arr-list" v-if="!!name">

        <p>id: {{ age }}</p> 
        <li class="arr-item" v-for="subItem in Object.keys(JSON.parse(name))" :key="subItem">
            <p class="key"> {{ subItem }}</p>
            <input :class="inp" :value="JSON.parse(name)[subItem].value" class="inp" type="text">
            <ButtonSave :age=item :name=subItem :fresh=JSON.parse(name)[subItem].value />
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
</style>
