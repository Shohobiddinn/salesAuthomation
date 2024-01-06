<template>
  <button
    class="flex excel-btn gap-1 items-center px-4 py-1.8 fs-14 fw-4 text-white rounded-lg hover:bg-green-100 active:bg-green-200"
  >
    <span class="text-[#185C37]"> {{ text }} </span
    ><IconExcelSVG class="z-1" v-if="withIcon" />
    <span v-if="size" class="size-text">
      {{ "(" + size + ")" }}
    </span>
  </button>
</template>
<script setup>
const props = defineProps({
  size: String,
  text: {
    type: String,
    default: "Скачать Excel",
  },
  withIcon: {
    type: Boolean,
    default: true,
  },
});
</script>

<style scoped>
.size-text {
  color: #91ac9f;
}
</style>
