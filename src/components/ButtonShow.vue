<template>
  <div class="btn-wrapp">
    <button class="btn-show" @click="toggleImageUploader"> 📂</button>
    <ImageUploader v-if="showImageUploader" />
  </div>
</template>

<script>
import ImageUploader from '@/components/ImageUploader.vue'; 

export default {
  components: {
    ImageUploader 
  },
  data() {
    return {
      showImageUploader: false 
    };
  },
  methods: {
    toggleImageUploader() {
      this.showImageUploader = !this.showImageUploader;
    }
  }
};
</script>

<style>
.btn-show {
  font-size: 50px;
  background-color: transparent;
  border: unset;
}
</style>
