<template>
  <div class="btn-wrapp">
    <button class="btn-show" @click="toggleShow"> 📂</button>
  </div>
</template>

<script>
export default {

  methods: {
    toggleShow() {
      this.$emit("update:showContentKeys", !this.showContentKeys);
      this.contentArrays[this.index] = this.contentArrays[this.index].map((it, key) => {
        if (key === "content" || key === "customContent") {
          return it;
        }
        return {
          ...it,
          show: !this.showContentKeys,
        };
      });
    },
  },
};
</script>

<style>
.btn-show{
  font-size: 50px;
  background-color: transparent;
  border: unset;
}


</style>
