<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8.46484 15.5355L15.5359 8.46446"
      :stroke="color"
      stroke-width="1.5"
      stroke-linecap="round"
    />
    <path
      d="M8.46484 8.46448L15.5359 15.5355"
      :stroke="color"
      stroke-width="1.5"
      stroke-linecap="round"
    />
  </svg>
</template>

<script setup>
const props = defineProps({
  size: {
    type: String,
    default: "24",
  },
  color: {
    type: String,
    default: "#D10505",
  },
});
</script>

<style scoped></style>
