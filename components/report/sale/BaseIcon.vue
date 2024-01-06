<template>
  <div class="flex flex-col items-center cursor-pointer">
    <div class="mb-3">
      <IconSaveReport v-if="icon === 'saveReport'" />
      <IconSave v-if="icon === 'save'" />
      <IconExpand v-if="icon === 'expand'" />
      <IconSave v-if="icon === 'save2'" />
      <IconSetting v-if="icon === 'setting'" />
      <IconUpload v-if="icon === 'upload'" />
      <IconSliders v-if="icon === 'sliders'" />
      <IconMenuBar v-if="icon === 'menu'" />
      <IconExpandDisplay v-if="icon === 'expandDisplay'" />
    </div>
    <div>
      <div class="fw-5 fs-14 text-[#000000]">{{ text }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  icon: String,
  text: String,
});
</script>

<style></style>
