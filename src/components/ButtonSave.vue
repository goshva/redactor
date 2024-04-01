<template>

  <button @click="saveChanges">
    💾
  </button>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
        age: {
            type: Number,
            default: 0
        },
        name: {
            type: String,
            required: true
        },
        fresh: {
            type: String,
            required: true
        },
    },
  methods: {
    saveChanges(age,name,fresh) {
     /* 
      const jsonData = JSON.stringify(this.$parent.$data.contentArrays);
      const blob = new Blob([jsonData], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'contents.json';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      */
      console.log(age,name,fresh);
    }
  },
  setup(props) {
        return {
            name: props.name,
            age: props.age,
            fresh: props.fresh
        };
    }
})

</script>

<style scoped>
button {

  font-size: 40px;
  background-color: unset;
  border: unset;
  cursor: pointer;
}
</style>
