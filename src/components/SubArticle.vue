<template>
    <ul class="arr-list" v-if="!!name">

        <p>id: {{ age }}</p>
        <li class="arr-item" v-for="subItem in Object.keys(JSON.parse(name))" :key="subItem">
            <p class="key"> {{ subItem }}</p>
            <input :value="JSON.parse(name)[subItem].value" class="inp" type="text">
        </li>

    </ul>
</template>

<script>
import { defineComponent } from 'vue';

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
</style>