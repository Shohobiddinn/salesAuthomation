<template>
  <div class="full-screen-image z-[99999]">
    <img :src="imageUrl" alt="Task image"/>
    <button class="close-button" @click="emit('closeImage')">&times;</button>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  imageUrl: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["closeImage"]);
</script>

<style scoped>
.full-screen-image {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
}

.full-screen-image img {
  max-height: 100%;
  max-width: 100%;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 5px;
  font-size: 55px;
  color: white;
  background-color: transparent;
  border: none;
  cursor: pointer;
}
</style>