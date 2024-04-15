<template>
    <div class="image-uploader">
      <input type="file" @change="handleFileUpload" ref="fileInput" style="display: none;">
      <button @click="openFileInput" class="upload-button">Выбрать изображение</button>
      <span v-if="selectedFileName">{{ selectedFileName }}</span>
      <button @click="uploadImage" class="upload-button">Загрузить изображение</button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        selectedFile: null,
        selectedFileName: ''
      };
    },
    methods: {
      openFileInput() {
        this.$refs.fileInput.click();
      },
      handleFileUpload(event) {
        this.selectedFile = event.target.files[0];
        this.selectedFileName = this.selectedFile ? this.selectedFile.name : '';
      },
      async uploadImage() {
        if (!this.selectedFile) {
          alert('Выберете изображение для загрузки');
          return;
        }
        const formData = new FormData();
        formData.append('Изображение', this.selectedFile);
        try {
          alert('Изображение загружено!');
        } catch (error) {
          console.error('Ошибка при загрузке изображения:', error);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .image-uploader {
    display: flex;
    align-items: center;
  }
  
  .upload-button {
    background-color: #4CAF50;
    color: white;
    padding: 10px 20px;
    border: none;
    cursor: pointer;
    border-radius: 5px;
    margin-right: 10px;
  }
  
  .upload-button:hover {
    background-color: #45a049;
  }
  
  span {
    margin-right: 10px;
  }
  </style>
  