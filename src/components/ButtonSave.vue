<template>
  <button @click="saveChanges">
    💾
  </button>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  methods: {
    saveChanges() {
      // Save the updated contentArrays data to the JSON file
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
    }
  }
})
</script>

<style scoped>
button {

  font-size: 50px;
  background-color: unset;
  border: unset;
  cursor: pointer;
}
</style>
